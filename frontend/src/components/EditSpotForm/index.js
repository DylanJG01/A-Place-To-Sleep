import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { editSpotThunk } from "../../store/spots"
import { useHistory, useParams } from 'react-router-dom'
import _editSpotValidator from "./_editSpotValidator"
import { getSingleSpot } from "../../store/spots"

import "../AddSpotForm/AddSpotForm.css"

const EditSpotForm = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [country, setCountry] = useState('')//country
    const [address, setAddress] = useState('')//address
    const [city, setCity] = useState('')//city
    const [state, setState] = useState('')//state
    const [latitude, setLatitude] = useState('')//lat
    const [longitude, setLongitude] = useState('')//lng
    const [description, setDescription] = useState('')//description
    const [title, setTitle] = useState('')//name
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState([])
    const [displayErrors, setDisplayErrors] = useState(false)
    const { spotId } = useParams();

    const [user, spot] = useSelector(state => {
        // console.log("!!!!!", state)
        return [state.session.user, state.spots.singleSpot]
    })

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        // console.log(spot)
        // console.log("!SPOT", !Object.values(spot).length)
        if (!Object.values(spot).length) return
        setCountry(spot.country)
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setLatitude(spot.lat)
        setLongitude(spot.lng)
        setDescription(spot.description)
        setTitle(spot.name)
        setPrice(spot.price)
    }, [spot])

    useEffect(() => {
        setErrors(_editSpotValidator({
            country,
            address,
            city,
            state,
            lat: +latitude,
            lng: +longitude,
            description,
            name: title,
            price: +price
        }))
    }, [country, address, city, state, latitude, longitude, description, title, price])

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.length) {
            setDisplayErrors(true)
            console.log(errors)
            return
        }
        const spot = {
            id: spotId,
            country,
            address,
            city,
            state,
            lat: +latitude,
            lng: +longitude,
            description,
            name: title,
            price: +price,
        }
        const createdSpot = await dispatch(editSpotThunk(user, spot))
            .catch(
                async (res) => {
                    console.log(res)
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        return history.push(`/spots/${createdSpot.id}`)
    }
    
    if (!user) return (
        <h2>Please Login to edit this spot</h2>
    )
    if (!Object.values(spot).length) return (
        <h2>Loading</h2>
    )

    if ((user && Object.values(spot).length) && user.id !== spot.ownerId) return (
        <>{history.push('/spots/current')} </>)

    return (
        <>
            <h1> Edit Spot! </h1>
            <form onSubmit={handleSubmit} className="add-spot-form">
                <label>
                    <div className={'flx'}>
                        <h5>
                            Country
                        </h5>
                        {displayErrors && errors.includes("Country") &&
                            (<h5 className="error">Country is required</h5>)}
                    </div>
                    <input
                        className="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                    // required
                    />
                </label>
                <label>
                    <div className={'flx'}>
                        <h5>Street Address</h5>
                        {displayErrors && errors.includes("Address") &&
                            (<h5 className="error">Address is required</h5>)}
                    </div>
                    <input
                        className="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street Address"
                    // required
                    />
                </label>
                <label>
                    <div className={'flx'}>
                        <h5>City</h5>
                        {displayErrors && errors.includes("City") &&
                            (<h5 className="error">City is required</h5>)}
                    </div>
                    <input
                        className="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        // required
                        placeholder="City"
                    />
                </label>
                <label>
                    <div className={'flx'}>
                        <h5>State</h5>
                        {displayErrors && errors.includes("State") &&
                            (<h5 className="error">State is required</h5>)}
                    </div>
                    <input
                        className="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        // required
                        placeholder="State"
                    />
                </label>
                <label>
                    <div className={'flx'}>
                        <h5>Latitude</h5>
                        {displayErrors && errors.includes("Latitude") &&
                            (<h5 className="error">Latitude is required</h5>)}
                    </div>
                    <input
                        className="latitude"
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        // required
                        placeholder="Latitude"
                    />
                </label>
                <label>
                    <div className={'flx'}>
                        <h5>Longitude</h5>
                        {displayErrors && errors.includes("Longitude") &&
                            (<h5 className="error">Longitude is required</h5>)}
                    </div>
                    <input
                        className="longitude"
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        // required
                        placeholder="Longitude"
                    />
                </label>
                <label>
                    <div className={'flx'}>
                        <h5>Describe your place to guests</h5>
                    </div>
                    <input
                        className="description"
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        // required
                        placeholder="Description"
                    />
                    {displayErrors && errors.includes("Description") &&
                        (<h5 className="error">Description is required</h5>)}
                </label>
                <label>
                    <div className={'flx'}>
                        <h5>Create a title for your spot</h5>
                        {displayErrors && errors.includes("Name") &&
                            (<h5 className="error">Name is required</h5>)}
                    </div>
                    <input
                        className="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        // required
                        placeholder="Name of your spot"
                    />
                </label>
                <label>
                    <div className={'flx'}>
                        <h5>Set a base price for your spot</h5>
                        {displayErrors && errors.includes("Price") &&
                            (<h5 className="error">Price is required</h5>)}
                    </div>
                    <input
                        className="price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        // required
                        placeholder="Price per night (USD)"
                    />
                </label>
                <div>
                    <button type="submit">Create Spot</button>
                </div>
            </form>
        </>
    )
}

export default EditSpotForm