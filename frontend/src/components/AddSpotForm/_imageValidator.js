
//returns Error JSX if invalid, FALSE if invalid
export default function _imgValidator(imgUrl){
    if (imgUrl.endsWith(".jpg")) return
    if (imgUrl.endsWith(".png")) return
    if (imgUrl.endsWith(".jpeg")) return

    return (
    <h5 className="error">
        Image URL must end in .png, .jpg, or .jpeg
    </h5>
    )
}