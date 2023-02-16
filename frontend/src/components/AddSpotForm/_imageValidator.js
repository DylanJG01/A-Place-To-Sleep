import isUrl from "./isUrl"
//returns Error JSX if invalid, FALSE if invalid
export default function _imgValidator(imgUrl){
    if(!isUrl(imgUrl)) return false 
    if (imgUrl.endsWith(".jpg")) return true
    if (imgUrl.endsWith(".png")) return true
    if (imgUrl.endsWith(".jpeg")) return true
    return false
}


