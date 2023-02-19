import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReviewModal"

export default function DeleteModalButton({ review }) {

    return (
        <>
            <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<DeleteReviewModal review={review} />}
            />
        </>
    )
}