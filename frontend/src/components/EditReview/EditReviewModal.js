import React, { useState, useEffect } from "react";
import { editReviewThunk } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import _checked from "./_checked";

import '../AddReview/AddReview.css'
import "../LoginFormModal/LoginForm.css"; // I don't think I need this.
//

function EditReviewModal({review, spotOrUser}) {
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(review.stars)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [disableBtn, setDisableBtn] = useState(true)

    useEffect(() => {
        if (reviewText.length < 10 || !stars) return setDisableBtn(true)
        return setDisableBtn(false)
    }, [reviewText, stars])

    useEffect(() => {
        setReviewText(review.review)
    },[review])

    // console.log("!@#$@!$12432143214", spotOrUser)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        // console.log("Handle submit", spotId)
        // console.log(stars)
        return dispatch(editReviewThunk({ review: reviewText, stars: +stars }, review.id, spotOrUser))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <>
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <ul>
                    {errors.map((error, idx) => (
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
                    <input type="radio" id="star1" name="rate" required value={stars} onChange={e => setStars(5)} checked={(5===stars)}/>
                    <label htmlFor="star1" title="text"></label>
                    <input type="radio" id="star2" name="rate" value={stars} onChange={e => setStars(4)} checked={(4===stars)}/>
                    <label htmlFor="star2" title="text"></label>
                    <input type="radio" id="star3" name="rate" value={stars} onChange={e => setStars(3)} checked={(3===stars)} />
                    <label htmlFor="star3" title="text"></label>
                    <input type="radio" id="star4" name="rate" value={stars} onChange={e => setStars(2)} checked={(2===stars)}/>
                    <label htmlFor="star4" title="text"></label>
                    <input type="radio" id="star5" name="rate" value={stars} onChange={e => setStars(1)} checked={(1===stars)} />
                    <label htmlFor="star5" title="text"></label>
                </div>
                <button type="submit" disabled={disableBtn}>Submit Review</button>
            </form>
        </>
    );
}

export default EditReviewModal;
