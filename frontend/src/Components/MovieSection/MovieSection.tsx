import {Button, Drawer, Grid} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import ErrorPage from "./ErrorPage";
import PagePicker from "./PagePicker";
import PopupContainer from "./PopupContainer";

export default function MovieSection(props: {
    page: number,
    pages: number
    classes: any,
    dispatch: (f: { payload: any; type: string }) => void,
    closePopup: () => void,
    popupShow: boolean,
    refresh: (number: number) => void,
    movieCards: JSX.Element[],
    myMovies: boolean
}) {
    return (
        <div className={props.classes.root}>
            <ErrorPage classes={props.classes} myMovies={props.myMovies}/>
            <div className={props.classes.moviePage}>
                <Drawer anchor={'right'} open={props.popupShow} onClose={props.closePopup}>
                    <Button data-testid='popupClose' startIcon={<ArrowBackIcon/>}
                            onClick={props.closePopup}>Close</Button>
                    <div className={props.classes.popup}>
                        <PopupContainer refresh={props.refresh}/>
                    </div>
                </Drawer>
                <div className={props.classes.main}>
                    <PagePicker refresh={props.refresh} dispatch={props.dispatch} page={props.page}
                                pages={props.pages}/>
                    <Grid
                        data-testid='movieGrid'
                        className={props.classes.movieGrid}
                        container
                        justify="center"
                        alignItems="stretch"
                        spacing={4}
                    >
                        {props.movieCards}
                    </Grid>
                    <PagePicker refresh={props.refresh} dispatch={props.dispatch} page={props.page}
                                pages={props.pages}/>
                </div>
            </div>
        </div>
    )
}