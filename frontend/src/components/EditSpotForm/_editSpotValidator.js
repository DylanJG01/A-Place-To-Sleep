export default function _editSpotValidator(spot) {
    const errors = [];
    if (!spot.country) errors.push("Country")
    if (!spot.address) errors.push("Address")
    if (!spot.city) errors.push("City")
    if (!spot.state) errors.push("State")
    latChecker(spot.lat, errors)
    lngChecker(spot.lng, errors)
    if (!spot.name ) errors.push("Name")
    if (spot.name && spot.name.length > 49) errors.push("Title")
    if (!spot.price) errors.push("Price")
    if (!spot.description || spot.description.length < 30) errors.push("Description")

    // console.log(errors)

    
    if (!errors.length) return []
    return errors
}

function latChecker(lat, errors) {
    if (lat === undefined || lat === "") return errors.push("Latitude")
    if (isNaN(lat)) return errors.push("Latitude")
    if (lat > 90 || lat < -90) errors.push("Latitude")
}

function lngChecker(lng, errors) {
    if (lng === undefined || lng === "") return errors.push("Longitude")
    if (isNaN(lng)) return errors.push("Longitude")
    if (lng > 180 || lng < -180) errors.push("Longitude")
}