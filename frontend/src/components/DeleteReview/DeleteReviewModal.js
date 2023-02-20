import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import './DeleteSpotModal.css'
import { deleteReviewThunk } from "../../store/reviews";
// import { getSingleSpot } from '../../store/spots';
// import { useParams } from 'react-router-dom'

export default function DeleteSpotModal({ review }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    // const { spotId } = useParams();
    // const reviews = useSelector(state => state.reviews)
    // console.log(spot)

    const confirmDelete = (review) => {
        dispatch(deleteReviewThunk(review))
        .then(closeModal)
    }
//    useEffect(() => {
//     dispatch(getSingleSpot(spotId))
        
//    }, [dispatch, reviews])

    return (
        <>
            <div className="delete-spot-modal-div">
                <h1>Confirm Delete</h1>
                <h3>Are you sure you want to delete this review?</h3>
                <button onClick={() => confirmDelete(review)}>Delete! (Delete Review)</button>
                <button onClick={() => closeModal()}>No (Keep review)</button>
            </div>
        </>
        )
}