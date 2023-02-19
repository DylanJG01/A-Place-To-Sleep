import React, { useState, useEffect } from "react";
import { addReviewThunk } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "../LoginFormModal/LoginForm.css"; // I don't think I need this.
//

function AddReviewModal({spotId, user}) {
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [disableBtn, setDisableBtn] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        console.log("Handle submit", spotId)
        return dispatch(addReviewThunk({ review: reviewText, stars: +stars }, spotId, user ))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    useEffect(() => {
        if (reviewText.length < 10 ) return setDisableBtn(true)
        return setDisableBtn(false)
    }, [reviewText, stars])

    return (
        <>
            <h1>Review</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    <input
                        className="reviewText"
                        type="text"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        placeholder="How was your stay?"

                    />
                </label>
                <label>
                    <input
                        className="stars"
                        type="stars"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </label>
                <button type="submit" disabled={disableBtn}>Submit Review</button>
            </form>
        </>
    );
}

export default AddReviewModal;