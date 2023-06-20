import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {useHistory} from 'react-router-dom'
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [disableBtn, setDisableBtn] = useState(true)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.length){
            setSubmitted(true)
            return
        }
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .then(history.push('/'))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    useEffect(() => {
        const err = []
        if (credential.length < 4) err.push("Username too short")
        if (password.length < 6) err.push("Password too short")
        setErrors(err)
    },[credential, password])

    const demoUserLogin = () => {
        return dispatch(sessionActions.login({ credential: "DemoUser1", password: "thebestpassword" }))
            .then(closeModal)
            .then(history.push('/'))
    }

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <ul>
                    {submitted && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    <input
                        className="credential"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                        placeholder="Username or Email"

                    />
                </label>
                <label>
                    <input
                        className="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </label>
                <button type="submit">Log In</button>
            </form>
            <div className="p-wrapper">
             <p className={'demo-user'} onClick={() => demoUserLogin()}>Demo User</p>
            </div>
        </>
    );
}

export default LoginFormModal;
