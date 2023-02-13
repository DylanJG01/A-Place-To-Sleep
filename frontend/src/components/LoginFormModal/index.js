import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [disableBtn, setDisableBtn] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    useEffect(() => {
        if (credential.length < 4
        || password.length < 6) return setDisableBtn(true)
        return setDisableBtn(false)
    },[credential, password])

    const demoUserLogin = (e) => {
        setCredential('DemoUser1')
        setPassword('thebestpassword')
    }
    // email: 'demo@user.io',
    // `username: 'DemoUser1',
    // `firstName: 'Alex',
    // `lastName: 'Flanders',
    // `hashedPassword: bcrypt.hashSync('thebestpassword')

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <ul>
                    {errors.map((error, idx) => (
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
                <button type="submit" disabled={disableBtn}>Log In</button>
            </form>
            <p class={'demo-user'} onClick={demoUserLogin}>Demo User</p>
        </>
    );
}

export default LoginFormModal;