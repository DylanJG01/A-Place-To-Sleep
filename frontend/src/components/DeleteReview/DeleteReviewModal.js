import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import './DeleteSpotModal.css'
import { deleteReviewThunk } from "../../store/reviews";

export default function DeleteSpotModal({ review }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    // console.log(spot)

    const confirmDelete = (review) => {
        dispatch(deleteReviewThunk(review))
            .then(closeModal)
    }

    return (
        <>
            <div className="delete-spot-modal-div">
                <h1>Confirm Delete</h1>
                <h3>Are you sure you want to remove review??</h3>
                <button onClick={() => confirmDelete(review)}>Delete!</button>
                <button onClick={() => closeModal()}>No (Keep)</button>
            </div>
        </>
        )
}