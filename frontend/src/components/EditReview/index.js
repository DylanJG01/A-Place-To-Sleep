import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditReviewModal from "./EditReviewModal"

export default function EditModalButton({ review, spotOrUser }) {

    return (
        <>
            <OpenModalMenuItem
                itemText="Edit"
                modalComponent={<EditReviewModal review={review} spotOrUser={spotOrUser} />}
            />
        </>
    )
}
