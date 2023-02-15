import React, { useState, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { addSpotThunk } from "../../store/spots"
import { useHistory } from 'react-router-dom'
import _spotValidator from './_spotValidator'
import _imgValidator from "./_imageValidator"
import "./AddSpotForm.css"

const AddSpotForm = () => {
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
    const [pictures, setPictures] = useState([]) 
    const [errors, setErrors] = useState([])
    const [picture1, setPicture1] = useState('')
    const [picture2, setPicture2] = useState('')
    const [picture3, setPicture3] = useState('')
    const [picture4, setPicture4] = useState('')
    const [picture5, setPicture5] = useState('')
    const [displayErrors, setDisplayErrors] = useState(false)

    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(errors.length){
            setDisplayErrors(true)
            console.log(errors)
            return
        }
        const spot = {
            country,
            address,
            city,
            state,
            lat: +latitude,
            lng: +longitude,
            description,
            name: title,
            price: +price,
            pictures
        }
        const createdSpot = await dispatch(addSpotThunk(user, spot))
               .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    }
        );
        return history.push(`/spots/${createdSpot.id}`)
    }

    useEffect(() => {
        setPictures([picture1, picture2, picture3, picture4, picture5])
    },[picture1, picture2, picture3, picture4, picture5])

    useEffect(() => {
        setErrors(_spotValidator({
            country,
            address,
            city,
            state,
            lat: +latitude,
            lng: +longitude,
            description,
            name: title,
            price: +price,
            picture1
        }))
    }, [country, address, city, state, latitude, longitude, description, title, price, picture1])

    if (!user) return (
        <h2>Please Login to create a new spot</h2>
    )
    return  (
        <>
            <h1> Create a New Spot! </h1>
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
                <label>
                    <div className={'flx'}>
                        <h5>Liven up your spots with photos</h5>
                    </div>
                    <input
                        className="img-link"
                        type="text"
                        value={picture1}
                        onChange={(e) => setPicture1(e.target.value)}
                        // required
                        placeholder="Preview Image Url"
                        />
                    {displayErrors && errors.includes("Preview") &&
                    (<h5 className="error">Preview image is required</h5>)}
                    {displayErrors && !errors.includes("Preview") && _imgValidator(picture1)}
                </label>
                <label>
                    <input
                        className="img-link"
                        type="text"
                        value={picture2}
                        onChange={(e) => setPicture2(e.target.value)}
                        placeholder="Image Url"
                    />
                    {displayErrors && !!picture2.length && _imgValidator(picture2)}
                </label>
                <label>
                    <input
                        className="img-link"
                        type="text"
                        value={picture3}
                        onChange={(e) => setPicture3(e.target.value)}
                        placeholder="Image Url"
                    />
                    {displayErrors && !!picture3.length && _imgValidator(picture3)}
                </label>
                <label>
                    <input
                        className="img-link"
                        type="text"
                        value={picture4}
                        onChange={(e) => setPicture4(e.target.value)}
                        placeholder="Image Url"
                    />
                    {displayErrors && !!picture4.length && _imgValidator(picture4)}
                </label>
                <label>
                    <input
                        className="img-link"
                        type="text"
                        value={picture5}
                        onChange={(e) => setPicture5(e.target.value)}
                        placeholder="Image Url"
                    />
                    {displayErrors && !!picture5.length && _imgValidator(picture5)}
                </label>
                <div>
                <button type="submit" disabled={false}>Create Spot</button>
                </div>
            </form>
        </>
    )
}

export default AddSpotForm