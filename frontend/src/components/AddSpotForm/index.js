import React, { useState, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { addSpotThunk } from "../../store/spots"
import "./AddSpotForm.css"
const AddSpotForm = () => {
    const dispatch = useDispatch()
    const [country, setCountry] = useState('')//country
    const [address, setAddress] = useState('')//address
    const [city, setCity] = useState('')//city
    const [state, setState] = useState('')//state
    const [latitude, setLatitude] = useState('')//lat
    const [longitude, setLongitude] = useState('')//lng
    const [description, setDescription] = useState('')//description
    const [title, setTitle] = useState('')//name
    const [price, setPrice] = useState('')
    // const [pictures, setPictures] = useState([])
    const [errors, setErrors] = useState([])
    const [disableBtn, setDisableBtn] = useState(true)

    const user = useSelector(state => state.session.user)

    // useEffect(() => {

    // })

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        const spot = {
            country,
            address,
            city,
            state,
            lat: +latitude,
            lng: +longitude,
            description,
            name: title,
            price: +price
        }
        return dispatch(addSpotThunk(user, spot))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }

    if (!user) return (
        <>Please Login to make create a new spot</>
    )

    return  (
        <>
            <h1> Create a New Spot! </h1>
            <form onSubmit={handleSubmit} className="add-spot-form">
                <ul>
                    {!!errors.length && errors.map((error, idx) => {})}
                </ul>
                <label>
                    <h5>Country</h5>
                    <input 
                        className="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                        required
                    />
                </label>
                <label>
                    <h5>Street Adrress</h5>
                    <input
                        className="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street Address"
                        required
                    />
                </label>
                <label>
                    <h5>City</h5>
                    <input
                        className="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder="City"
                    />
                </label>
                <label>
                    <h5>State</h5>
                    <input
                        className="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder="State"
                    />
                </label>
                <label>
                    <h5>Latitude</h5>
                    <input
                        className="latitude"
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        required
                        placeholder="Latitude"
                    />
                </label>
                <label>
                    <h5>Longitude</h5>
                    <input
                        className="longitude"
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        required
                        placeholder="Longitude"
                    />
                </label>
                <label>
                    <h4>Describe your place to guests</h4>
                    <input
                        className="description"
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Description"
                    />
                </label>
                <label>
                    <h4>Create a title for your spot</h4>
                    <input
                        className="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Title"
                    />
                </label>
                <label>
                    <h4>Set a base price for your spot</h4>
                    <input
                        className="price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="Price"
                    />
                </label>
                <div>
                <button type="submit" disabled={false}>Create Spot</button>
                </div>
                {/* <label>
                    <h4>Liven up your spots with photos</h4>
                    <input
                        className=""
                    />
                </label> */}
            </form>
        </>
    )
}

export default AddSpotForm