import React, { useState, useEffect } from "react";
import { addReviewThunk } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './AddReview.css'
import "../LoginFormModal/LoginForm.css"; // I don't think I need this.
//

function AddReviewModal({spotId, user}) {
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [disableBtn, setDisableBtn] = useState(true)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (errors.length) {

        }
        setErrors([]);
        // console.log("Handle submit", spotId)
        // console.log(stars)
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
        const err = []
        if (reviewText.length < 10 ) err.push("Review too short")
        if (!stars) err.push("Must select star rating")
        setErrors(err)
    }, [reviewText, stars])

    return (
        <>
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <ul>
                    {submitted && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    <textarea
                        className="reviewText"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        placeholder="Leave your review here..."
                        rows={4}
                        cols={40}
                    />
                </label>

                <div className="rate">
                    <input type="radio" id="star1" name="rate" required value={stars} onChange={e => setStars(5)} />
                    <label htmlFor="star1" title="text"></label>
                    <input type="radio" id="star2" name="rate" value={stars} onChange={e => setStars(4)} />
                    <label htmlFor="star2" title="text"></label>
                    <input type="radio" id="star3" name="rate" value={stars} onChange={e => setStars(3)} />
                    <label htmlFor="star3" title="text"></label>
                    <input type="radio" id="star4" name="rate" value={stars} onChange={e => setStars(2)} />
                    <label htmlFor="star4" title="text"></label>
                    <input type="radio" id="star5" name="rate" value={stars} onChange={e => setStars(1)} />
                    <label htmlFor="star5" title="text"></label>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </>
    );
}

export default AddReviewModal;
