import React, {useRef, useState} from 'react';
import {useMediaQuery, useTheme} from "@material-ui/core";
import {setSearch} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";
import {sortBy} from "../../App";
import Header from "./Header";


function HeaderContainer(props: { refresh: () => void }) {
    // Nødvendig for redux
    const dispatch = useDispatch();
    // State som holder styr på loading icon på input
    const [searchString, setSearchString] = useState("");

    // Tom timeout ref som defineres først;
    let timeoutRef = useRef(setTimeout(() => {
    }, 0));

    // Når input endres tømmer vi den aktive timeouten og starter på nytt. Når der har gått 300ms, bytt ut search filter i state og refresh
    function onChange(e: any) {
        const value = e.target.value;
        setSearchString(value);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            dispatch(setSearch(value));
            props.refresh();
        }, 300);
    }

    const user = useSelector((state: State) => state.user);

    const theme = useTheme();

    const styles = makeStyles({
        root: {
            height: useMediaQuery('(max-width: 1400px)').valueOf() ? '220px' : '120px',
            position: 'fixed',
            width: '100%',
            zIndex: 100,
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            flexDirection: useMediaQuery('(max-width: 1400px)').valueOf() ? 'column' : 'row',
            alignItems: useMediaQuery('(max-width: 1400px)').valueOf() ? 'center' : 'flex-end',
            padding: '10px',
        },
        label: {
            color: theme.palette.info.contrastText,
        },
        textInput: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            borderRadius: '10px',
            height: '5px'
        },
        searchBox: {
            width: useMediaQuery('(max-width: 1400px)').valueOf() ? '80%' : '17%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '10px',
            '& *': {
                margin: 0,
            }
        },
        buttons: {
            width: useMediaQuery('(max-width: 1400px)').valueOf() ? '' : '20%',
        },
        sorting: {
            width: '60%',
            display: useMediaQuery('(max-width: 1400px)').valueOf() ? 'none' : 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            height: '100%',
            '& *': {
                width: (1 / sortBy.length) * 100 + '%',
                fontSize: '1.5em',
                height: '60px'
            }
        },
    })
    const classes = styles();

    return (
        <Header
            refresh={props.refresh}
            classes={classes}
            onChange={onChange}
            logged={!user}
            searchString={searchString}/>
    );
}

export default HeaderContainer;