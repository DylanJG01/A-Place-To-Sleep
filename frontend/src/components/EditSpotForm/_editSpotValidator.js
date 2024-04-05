export default function spotValidator(spot){
    const errors = [];
    if(!spot.country) errors.push("Country")
    if(spot.country && spot.country.length > 50) errors.push("country-long")

    if(!spot.address) errors.push("Address")
    if(spot.address && spot.address.length > 255) errors.push("add-long")
    if(!spot.city) errors.push("City")
    if(spot.city && spot.city.length > 50) errors.push("city-long")

    if(!spot.state) errors.push("State")
    if(spot.state && spot.state.length > 50) errors.push("state-long")

    if(!spot.name) errors.push("Name")
    if (spot.name && spot.name.length > 49) errors.push("title-long")

    if(!spot.price) errors.push("Price")
    if(spot.price && spot.price < 0) errors.push("negative-price")

    if(!spot.description || spot.description.length < 30 || spot.description.length > 254) errors.push("Description")

    latChecker(spot.lat, errors)
    lngChecker(spot.lng, errors)

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
