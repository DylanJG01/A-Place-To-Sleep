import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "./DeleteSpotModal";

export default function DeleteSpotButton({spot, user}){

    return(
        <>
            <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<DeleteSpotModal />}
            />
        </>
    )
}