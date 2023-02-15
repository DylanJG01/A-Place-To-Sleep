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
    if(spot.description.length < 30) errors.push("Description")
    if(!spot.picture1) errors.push("Preview")
    if(!errors.length) return []
    return errors
}