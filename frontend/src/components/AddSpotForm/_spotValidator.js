import _imgValidator from "./_imageValidator";

export default function spotValidator(spot){
    const errors = [];
    // console.log(spot.lat)
    if(!spot.country) errors.push("Country")
    if(!spot.address) errors.push("Address")
    if(!spot.city) errors.push("City")
    if(!spot.state) errors.push("State")
    if(!spot.name) errors.push("Name")
    if (spot.name && spot.name.length > 49) errors.push("Title")
    if(!spot.price) errors.push("Price")
    if(!spot.description || spot.description.length < 30) errors.push("Description")

    latChecker(spot.lat, errors)
    lngChecker(spot.lng, errors)

    let atLeasetOneImage = false
    for(let i = 0; i < 5; i++) {
        if (spot.images[i]) atLeasetOneImage = true
    }
    // console.log(errors)
    if (!atLeasetOneImage) errors.push("Image")
    if(!errors.length) return []
    return errors
}

function latChecker(lat, errors) {
    // console.log(lat)
    if(lat === undefined || lat === "") return errors.push("Latitude")
    if(isNaN(lat)) return errors.push("Latitude")
    if (lat > 90 || lat < -90) errors.push("Latitude")
}

function lngChecker(lng, errors) {
    if (lng === undefined || lng === "") return errors.push("Longitude")
    if (isNaN(lng)) return errors.push("Longitude")
    if (lng > 180 || lng < -180) errors.push("Longitude")
}
