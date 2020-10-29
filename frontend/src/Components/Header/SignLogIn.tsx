import React, {useState} from "react";
import {Button, Input, Modal} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {User} from "../../types/user";
import {login} from "../../actions";

function SignLogIn() {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Holder styr på inputs
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Lager request for fetch
    const req = (reqUser: User) => {
        return ({
            method: 'POST',
            body: JSON.stringify(reqUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // Legger til en bruker på serveren
    function addUser(reqUser: User) {
        fetch('http://localhost:5000/api/user/add', req(reqUser))
            .then(response => {
                if (response.ok) {
                    dispatch(login(reqUser));
                }})
            .catch(error => {
                console.log(error)
            });
    }

    // Logger inn hvis brukeren finnes
    function onLogin(user: User) {
        fetch('http://localhost:5000/api/user?userName=' + user.userName)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(movies => {
                            user.movies = movies;
                            dispatch(login(user))
                        })
                } else {
                    console.log("User does not exist");
                }
            })
    }

    // @ts-ignore
    function handleNameChange(value: string) {
        setUsername(value);
    }

    // @ts-ignore
    function handlePasswordChange(value: string) {
        setPassword(value)
    }

    return (
        <Modal size={"mini"}
               trigger={<Button style={{zIndex: '1000000'}}>Log in/Sign up</Button>}
               closeIcon>
            <Modal.Header>Log in / Sign in</Modal.Header>
            <Modal.Content>
                <Input id={"UsernameID"} autoFocus label={"Username"} onChange={(e, {value}) => handleNameChange(value)}
                       name={"userName"} placeholder='Username'/>
            </Modal.Content>
            <Modal.Content>
                <Input id={"PasswordID"} label={"Password"} onChange={(e, {value}) => handlePasswordChange(value)}
                       name={"password"} placeholder='Password'/>
            </Modal.Content>
            <Modal.Actions>
                <Button id={"loginButtonID"} onClick={() => onLogin({
                    userName: userName,
                    password: password,
                    movies: []
                })} type='submit'>Log in</Button>
                <Button id={"submitButtonID"}
                        onClick={() => addUser({userName: userName, password: password, movies: []})} type='submit'>Sign
                    up</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default SignLogIn;