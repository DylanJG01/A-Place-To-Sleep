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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        console.log("Handle submit", spotId)
        console.log(stars)
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
        if (reviewText.length < 10 || !stars) return setDisableBtn(true)
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
                    <textarea
                        className="reviewText"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        placeholder="How was your stay?"
                        rows={4}
                        cols={40}

                    />
                </label>
                {/* <label>
                    <input
                        className="stars"
                        type="stars"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </label> */}
                <div className="rate">
                    
                    
                    
                    
                    <input type="radio" id="star1" name="rate" required value={stars} onChange={e => setStars(1)} />
                    <label htmlFor="star1" title="text"></label>
                    <input type="radio" id="star2" name="rate" value={stars} onChange={e => setStars(2)} />
                    <label htmlFor="star2" title="text"></label>
                    <input type="radio" id="star3" name="rate" value={stars} onChange={e => setStars(3)} />
                    <label htmlFor="star3" title="text"></label>
                    <input type="radio" id="star4" name="rate" value={stars} onChange={e => setStars(4)} />
                    <label htmlFor="star4" title="text"></label>
                    <input type="radio" id="star5" name="rate" value={stars} onChange={e => setStars(5)} />
                    <label htmlFor="star5" title="text"></label>
                </div>
                <button type="submit" disabled={disableBtn}>Submit Review</button>
            </form>
        </>
    );
}

export default AddReviewModal;