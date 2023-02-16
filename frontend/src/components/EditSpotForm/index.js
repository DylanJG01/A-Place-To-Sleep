import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addSpotThunk } from "../../store/spots"
import { useHistory } from 'react-router-dom'
import _spotValidator from '../AddSpotForm/_spotValidator'
import _imgValidator from "../AddSpotForm/_imageValidator"
import { getSingleSpot } from "../../store/spots"
import { useParams } from 'react-router-dom'
// import "./AddSpotForm.css"

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
    const [pictures, setPictures] = useState([])
    const [errors, setErrors] = useState([])
    const [picture1, setPicture1] = useState('')
    const [picture2, setPicture2] = useState('')
    const [picture3, setPicture3] = useState('')
    const [picture4, setPicture4] = useState('')
    const [picture5, setPicture5] = useState('')
    const [displayErrors, setDisplayErrors] = useState(false)
    const { spotId } = useParams();

    const [user, spot] = useSelector(state => {
        return [state.session.user, state.spots.singleSpot]})
   
    console.log("EDIT PAGE CONSOLE LOG", spot)

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch, spotId])

    const handleSubmit = async (e) => { //NEED TO FIX HANDLE SUBMIT TOO
        e.preventDefault();
        if (errors.length) {
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
        //NEED DIFFERENT THUNK
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
    }, [picture1, picture2, picture3, picture4, picture5])

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

    useEffect(() => {
        if (!spot) return
        setCountry(spot.country)
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setLatitude(spot.lat)
        setLongitude(spot.lng)
        setDescription(spot.description)
        setTitle(spot.name)
        setPrice(spot.price)

        if(!spot.SpotImages) return
        for(let i = 0; i < spot.SpotImages.length; i++){
            switch (i) {
                case i === 0: setPicture1(spot.SpotImages[i])
                break;
                case i === 1: setPicture2(spot.SpotImages[i])
                break;
                case i === 2: setPicture3(spot.SpotImages[i])
                break;
                case i === 3: setPicture4(spot.SpotImages[i])
                break;
                case i === 4: setPicture5(spot.SpotImages[i])
                break;
                default: return
            }
        }
    },[spot])

    if (!user) return (
        <h2>Please Login to create a new spot</h2>
    )
    if (!spot) return (
        <h2>This Spot Does not Exist!</h2>
    )

    if((user && Object.values(spot).length) && user.id !== spot.ownerId) return ( 
    <>{ history.push('/spots/current')} </>)

    return (
        <>
            <h1> EDIT SPOT! </h1>
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

export default EditSpotForm