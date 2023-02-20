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
            // console.log(errors)
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
            SpotImages: pictures
        }
        const createdSpot = await dispatch(addSpotThunk(user, spot))
               .catch(
                    async (res) => {
                        console.log(res)
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    }
        );
        return history.push(`/spots/${createdSpot.id}`)
    }

    useEffect(() => {
        setPictures([picture1 === '' ? null : picture1,
            picture2 === '' ? null : picture2,  
            picture3 === '' ? null : picture3,
            picture4 === '' ? null : picture4,
            picture5 === '' ? null : picture5
        ])
    },[picture1, picture2, picture3, picture4, picture5])

    useEffect(() => {
        setErrors(_spotValidator({
            country,
            address,
            city,
            state,
            lat: latitude,
            lng: longitude,
            description,
            name: title,
            price: +price,
            pictures
        }))
    }, [country, address, city, state, latitude, longitude, description, title, price, pictures])

    if (!user) return (
        <h2>Please Login to create a new spot</h2>
    )
    return  (
        <div className="add-spot-form">
            <h1> Create a New Spot! </h1>
            <form onSubmit={handleSubmit} className="add-spot-form">
                <div className="location-information">
                    <label>
                        <div className={'flx'}>
                            <div>
                                Country
                            </div>
                            {displayErrors && errors.includes("Country") &&
                            (<div className="error">Country is required</div>)}
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
                        <div>Street Address</div>
                            {displayErrors && errors.includes("Address") &&
                            (<div className="error">Address is required</div>)}
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
                    <div className="city-state-div">
                    <label>
                        <div className={'flx city-label'}>
                            <div>City</div>
                            {displayErrors && errors.includes("City") &&
                            (<div className="error">City is required</div>)}
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
                    <label className="state-label">
                        <div className={'flx'}>
                            <div>State</div>
                            {displayErrors && errors.includes("State") &&
                            (<div className="error">State is required</div>)}
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
                    </div>
                    <div className="lat-and-lng-div">
                        <label>
                        <div className={'flx'}>
                            <div>Latitude</div>
                            {displayErrors && errors.includes("Latitude") &&
                            (<div className="error">Latitude is required</div>)}
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
                            <div>Longitude</div>
                            {displayErrors && errors.includes("Longitude") &&
                            (<div className="error">Longitude required</div>)}
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
                    </div>
                </div>
                <div className="title-and-price">
                <label className="description-label">
                    <div className={'flx'}>
                        <div>Describe your place to guests</div>
                    </div>
                    <textarea
                        className="description"
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        // required
                        placeholder="Description"
                        rows={4}
                        cols={40}
                    />
                    {displayErrors && errors.includes("Description") &&
                    (<div className="error description-error">Description is required (min 30 characters)</div>)}
                </label>
                </div>
                <div >
                    <label className="description-label">
                    <div className={'flx add-form-spot-title'}>
                        <div>Create a title for your spot</div>
                        <div className="smaller-text">Catch guests attention with a spot title that highlights what makes your place special.</div>
                    </div>
                    <input
                        className="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        // required
                        placeholder="Name of your spot"
                    />
                        {displayErrors && errors.includes("Name") &&
                            (<div className="error description-error">Name is required</div>)}
                        {displayErrors && errors.includes("Title") &&
                            (<div className="error description-error">Name too long</div>)}
                </label>
                <label className="description-label">
                        <div className={'flx price-box'}>
                        <div>Set a base price for your spot</div>
                        <div className="smaller-text">Competitive pricing can help your listing stand out and rank higher in search results.</div>
                        <div></div>
                        {displayErrors && errors.includes("Price") &&
                                (<div className="error description-error">Price is required</div>)}
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
                </div>
                <label className="img-form-label">
                    <div className={''}>
                        <div>Liven up your spots with photos</div>
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
                    (<div className="error description-error">Preview image is required</div>)}

                    {displayErrors && errors.includes("Url1") && !_imgValidator(picture1) && (
                    <div className="error description-error">Valid url required that ends with .jpg, .jpeg, or .png</div>)}

                </label>
                <label className="img-form-label">
                    <input
                        className="img-link"
                        type="text"
                        value={picture2}
                        onChange={(e) => setPicture2(e.target.value)}
                        placeholder="Image Url"
                    />
                    {displayErrors && errors.includes("Url2") && !_imgValidator(picture2) && (
                        <div className="error description-error">Valid url required that ends with .jpg, .jpeg, or .png</div>)}
                </label>
                <label className="img-form-label">
                    <input
                        className="img-link"
                        type="text"
                        value={picture3}
                        onChange={(e) => setPicture3(e.target.value)}
                        placeholder="Image Url"
                    />
                    {displayErrors && errors.includes("Url3") && !_imgValidator(picture3) && (
                        <div className="error description-error">Valid url required that ends with .jpg, .jpeg, or .png</div>)}
                </label>
                <label className="img-form-label">
                    <input
                        className="img-link"
                        type="text"
                        value={picture4}
                        onChange={(e) => setPicture4(e.target.value)}
                        placeholder="Image Url"
                    />
                    {displayErrors && errors.includes("Url4") && !_imgValidator(picture4) && (
                        <div className="error description-error">Valid url required that ends with .jpg, .jpeg, or .png</div>)}
                </label>
                <label className="img-form-label description-label">
                    <input
                        className="img-link"
                        type="text"
                        value={picture5}
                        onChange={(e) => setPicture5(e.target.value)}
                        placeholder="Image Url"
                    />
                    {displayErrors && errors.includes("Url5") && !_imgValidator(picture5) && (
                        <div className="error description-error">Valid url required that ends with .jpg, .jpeg, or .png</div>)}
                </label>
                <div>
                    <button className="delete-button update-button" type="submit" disabled={false}>Create Spot</button>
                </div>
            </form>
        </div>
    )
}

export default AddSpotForm