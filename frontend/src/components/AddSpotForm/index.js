import React, { useState, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { addSpotThunk } from "../../store/spots"
import _spotValidator from './_spotValidator'
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
    const [pictures, setPictures] = useState([]) 
    const [errors, setErrors] = useState([])
    const [picture1, setPicture1] = useState('')
    const [picture2, setPicture2] = useState('')
    const [picture3, setPicture3] = useState('')
    const [picture4, setPicture4] = useState('')
    const [picture5, setPicture5] = useState('')
    const [displayErrors, setDisplayErrors] = useState(false)

    const user = useSelector(state => state.session.user)

    const handleSubmit = (e) => {
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
        return dispatch(addSpotThunk(user, spot))
               .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    }
        );
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
            price: +price
        }))
    }, [country, address, city, state, latitude, longitude, description, title, price])

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
                    <div>
                    <h5>
                        Country{displayErrors && errors.includes("Country") && 
                        // (<p>Country is required</p>)}
                             (<>  Country is required</>)}
                    </h5>
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
                    <h5>Street Adrress</h5>
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
                    <h5>City</h5>
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
                    <h5>State</h5>
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
                    <h5>Latitude</h5>
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
                    <h5>Longitude</h5>
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
                    <h4>Describe your place to guests</h4>
                    <input
                        className="description"
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        // required
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
                        // required
                        placeholder="Name of your spot"
                    />
                </label>
                <label>
                    <h4>Set a base price for your spot</h4>
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
                    <h4>Liven up your spots with photos</h4>
                    <input
                        className="img-link"
                        type="text"
                        value={picture1}
                        onChange={(e) => setPicture1(e.target.value)}
                        // required
                        placeholder="Preview Image Url"
                    />
                </label>
                <label>
                    <input
                        className="img-link"
                        type="text"
                        value={picture2}
                        onChange={(e) => setPicture2(e.target.value)}
                        
                        placeholder="Image Url"
                    />
                </label>
                <label>
                    <input
                        className="img-link"
                        type="text"
                        value={picture3}
                        onChange={(e) => setPicture3(e.target.value)}
                      
                        placeholder="Image Url"
                    />
                </label>
                <label>
                    <input
                        className="img-link"
                        type="text"
                        value={picture4}
                        onChange={(e) => setPicture4(e.target.value)}
                       
                        placeholder="Image Url"
                    />
                </label>
                <label>
                    <input
                        className="img-link"
                        type="text"
                        value={picture5}
                        onChange={(e) => setPicture5(e.target.value)}
                        placeholder="Image Url"
                    />
                </label>
                <div>
                <button type="submit" disabled={false}>Create Spot</button>
                </div>
            </form>
        </>
    )
}

export default AddSpotForm