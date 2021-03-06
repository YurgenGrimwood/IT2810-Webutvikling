// Henter inn filmer, og sorterer basert på et filter
import {Movie} from "./types/Movie";
import {State} from "./types/State";

export function fetchMovies(
    fetchUpdate: {
        setIndex: (list: string[]) => void,
        pushMovies: (list: Movie[]) => void,
        updatePages: (pages: number) => void,
        setGenres: (genres: string[]) => void,
        setError: (error: boolean) => void
    },
    state: State,
    first: boolean,
    page: number) {

    const body = {
        genre: state.filter.genre === "Select genre..." ? "" : state.filter.genre,
        title: state.filter.search,
        sort: state.filter.sort,
        desc: state.filter.desc,
        yearRange: state.filter.year,
        scoreRange: state.filter.score,
        user: state.filter.myMovies ? state.user.userName : "",
        page: state.filter.myMovies ? 0 : page
    }

    const req = ({
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const IDreq = (idList: string[]) => {
        return ({
            method: 'POST',
            body: JSON.stringify({ids: idList}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    fetch('http://localhost:5000/api/movies/index', req)
        .then(response => {
            if (response.ok) {
                response.json().then((response: any) => {
                    let data = response.movies;
                    fetchUpdate.setIndex(data);
                    const pages = response.pages;
                    fetchUpdate.updatePages(pages)
                    data = data.filter((id: string) => !state.movieCache.map(movie => movie._id).includes(id))
                    if (pages > 0) {
                        fetchUpdate.setError(false);
                        if (data.length > 0) {
                            fetch('http://localhost:5000/api/movies', IDreq(data))
                                .then(response => {
                                    if (response.ok) {
                                        response.json().then((response: Movie[]) => {
                                            const movies = response;
                                            fetchUpdate.pushMovies(movies)
                                            // Bare oppdater sjanger listen hvis det er første gang vi laster inn
                                            if (first) {
                                                genreUpdate(movies.map((movie: Movie) => movie.genres), fetchUpdate.setGenres, state.genres);
                                            }
                                        })
                                    } else {
                                        fetchUpdate.setError(true);
                                    }
                                })
                        }
                    } else {
                        fetchUpdate.setError(true);
                    }
                })
            } else {
                fetchUpdate.setError(true);
            }
        })
}

// Setter sjangrene i state
function genreUpdate(movies: string[][], setGenres: (genres: string[]) => void, genreCache: string[]) {
    let genres: string[] = [];
    movies.forEach((movieGenres: string[]) => {
        movieGenres.forEach((genre: string) => {
            if (!genreCache.includes(genre) && !genres.includes(genre)) {
                genres.push(genre);
            }
        })
    })
    setGenres(genres);
}

export function parseTime(time: number): string {
    let minutes = time;
    let hours = 0;
    while (minutes - 60 > 0) {
        minutes -= 60;
        hours++;
    }
    return hours + 'h' + minutes + 'm';
}