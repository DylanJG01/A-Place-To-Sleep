import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "./DeleteSpotModal";

export default function DeleteSpotButton({spot}){

    return(
        <>
            <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<DeleteSpotModal spot={spot}/>}
            />
        </>
    )
}