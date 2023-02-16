import _imgValidator from "./_imageValidator";

export default function spotValidator(spot){
    const errors = []; 
    if(!spot.country) errors.push("Country")
    if(!spot.address) errors.push("Address")
    if(!spot.city) errors.push("City")
    if(!spot.state) errors.push("State")
    if(!spot.lat) errors.push("Latitude")
    if(!spot.lng) errors.push("Longitude")
    if(!spot.name) errors.push("Name")
    if(!spot.price) errors.push("Price")
    if(!spot.description || spot.description.length < 30) errors.push("Description")

    for(let i = 0; i < 5; i++) {
        // console.log(picture)
        const picture = spot.pictures[i]
        if(i === 0 && !picture) errors.push("Preview")
        else if (!picture){}
        else if (!_imgValidator(picture)) errors.push(`Url${i + 1}`)
    }
    // console.log(errors)
    if(!errors.length) return []
    return errors
}