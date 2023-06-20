import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [disableBtn, setDisableBtn] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(errors.length) {
            return
        }
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };


     useEffect(() => {
        const err = []
        if (username.length < 4) err.push("Username must be between 4 and 20 characters")
        if (email.length === 0 || !email.includes(".") || !email.includes("@")) err.push("Email must be valid")
        if (firstName.length === 0) err.push("Must have firstname")
        if (lastName.length === 0) err.push("Must have lastname")
        if (password.length < 6) err.push("Passwords must over 6 characters")
        if (password !== confirmPassword) err.push("Passwords must match")
        setErrors(err)
    }, [username, firstName, lastName, password, confirmPassword, email])

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li className='test' key={idx}>{error}</li>)}
                </ul>
                <label className="email">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                </label>
                <label className="username">

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                    />
                </label>
                <label className="first-name">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="First name"
                    />
                </label>
                <label className="last-name">
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Last Name"
                    />
                </label>
                <label className="password">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </label>
                <label className="confirm-password">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm password"
                    />
                </label>
                <button id='sign-in-btn' type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
