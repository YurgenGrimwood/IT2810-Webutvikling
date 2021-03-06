import React from "react";
import {User} from "../../types/User";
import {logout, myMovies} from "../../actions";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@material-ui/core";

function SignLogIn(props: {
    dispatch: (f: { payload: any; type: string } | { type: string }) => void,
    classes: any,
    handlePassword: (password: string) => void,
    handleName: (name: string) => void,
    onLogin: (user: User) => void,
    addUser: (reqUser: User) => void,
    userName: string,
    password: string,
    open: boolean,
    error: false | { message: string, name: boolean, password: boolean },
    isLogged: boolean,
    refresh: () => void,
    setOpen: (b: boolean) => void
}) {
    return (
        <div>
            <div className={`${props.isLogged ? props.classes.initial : props.classes.none}`}>
                <Button data-testid='loginButton' className={props.classes.loginButton}
                        onClick={() => props.setOpen(true)}>Log in/Sign
                    up</Button>
                <Dialog className={props.classes.root} open={props.open} onClose={() => props.setOpen(false)}
                        title='Log in/Sign up'>
                    <DialogTitle>Log in/Sign up</DialogTitle>
                    {props.error ? <DialogContent>
                        <Typography variant='body2' component='h1' color='error'>{props.error.message}</Typography>
                    </DialogContent> : null}
                    <DialogContent>
                        <TextField label='Username' variant='outlined' inputMode='text'
                                   error={!!props.error && props.error.name} data-testid="UsernameID" autoFocus
                                   title={"Username"}
                                   onChange={(e) => props.handleName(e.target.value)}
                                   name={"userName"}/>
                    </DialogContent>
                    <DialogContent>
                        <TextField label='Password' variant='outlined' type='password'
                                   error={!!props.error && props.error.password} data-testid="PasswordID"
                                   title={"Password"}
                                   onChange={(e) => props.handlePassword(e.target.value)}
                                   name={"password"}/>
                    </DialogContent>
                    <DialogActions>
                        <Button data-testid="loginButtonID" onClick={() => props.onLogin({
                            userName: props.userName,
                            password: props.password,
                            movies: []
                        })} type='submit'>Log in</Button>
                        <Button data-testid="submitButtonID"
                                onClick={() => props.addUser({
                                    userName: props.userName,
                                    password: props.password,
                                    movies: []
                                })}
                                type='submit'>Sign
                            up</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className={`${props.isLogged ? props.classes.none : props.classes.initial}`}>
                <Button onClick={() => {
                    props.dispatch(myMovies())
                    props.dispatch(logout())
                    props.refresh()
                }} className={props.classes.loginButton} data-testid='logoutButton'>Log out</Button>
            </div>
        </div>
    )
}

export default SignLogIn;