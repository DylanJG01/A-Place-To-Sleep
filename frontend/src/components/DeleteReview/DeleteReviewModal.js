
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";


export default function DeleteReviewModal({ review }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()


    const confirmDelete = (review) => {
        dispatch(deleteReviewThunk(review))
        .then(closeModal)
    }


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
