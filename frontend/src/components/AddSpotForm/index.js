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
    const [errors, setErrors] = useState([])
    const [images, setImages] = useState([null, null, null, null, null]);
    const [fileInputKeys, setFileInputKeys] = useState([0, 0, 0, 0, 0]);
    const [displayErrors, setDisplayErrors] = useState(false)

    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(errors.length){
            setDisplayErrors(true)
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
            images
            // image1
        }
            await dispatch(addSpotThunk(user, spot))
            .then(res => history.push(`/spots/${res.id}`))
               .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    }
                );
    }

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
            images
        }))
    }, [country, address, city, state, latitude, longitude, description, title, price, images])

    const updateFile = (e, index) => {
        // e.preventDefault()
        // e.stopPropagation()
        let file;
        if (e.target.files) file = e.target.files[0];
        const newImages = [...images]
        newImages[index] = file;
        setImages(newImages)
      };

      const clearFileInput = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
        setFileInputKeys((prevKeys) => {
          const newKeys = [...prevKeys];
          newKeys[index] += 1;
          return newKeys;
        });
      };
    // const updateFiles = (e) => {
    //     e.preventDefault()
    //     e.stopPropgation()
    //     const files = e.target.files;
    //     setImages(files);
    // };

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

                            {displayErrors && errors.includes("country-long") &&
                            (<div className="error">Country length exceeded</div>)}
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

                             {displayErrors && errors.includes("add-long") &&
                            (<div className="error">Address length exceeded</div>)}
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
                    <label className="city-label">
                        <div className={'flx city-label'}>
                            <div>City</div>
                            {displayErrors && errors.includes("City") &&
                            (<div className="error">City is required</div>)}
                            {displayErrors && errors.includes("city-long") &&
                            (<div className="error">City length exceeded</div>)}
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

                            {displayErrors && errors.includes("state-long") &&
                            (<div className="error">State length exceeded</div>)}
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
                    <label className="lat-label">
                        <div className={'flx'}>
                            <div>Latitude</div>
                            {displayErrors && errors.includes("Latitude") &&
                            (<div className="error">Latitude required</div>)}
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
                    (<div className="error description-error">Description is required (30 - 254 characters)</div>)}
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
                        {displayErrors && errors.includes("title-long") &&
                            (<div className="error description-error">Name length exceeded</div>)}
                </label>
                <label className="description-label">
                        <div className={'flx price-box'}>
                        <div>Set a base price for your spot</div>
                        <div className="smaller-text">Competitive pricing can help your listing stand out and rank higher in search results.</div>
                        <div></div>
                        {displayErrors && errors.includes("Price") &&
                                (<div className="error description-error">Price is required</div>)}
                         {displayErrors && errors.includes("negative-price") &&
                                (<div className="error description-error">Price cannot be negative</div>)}

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
                <div className="choose-image-div">
                {displayErrors && errors.includes("Image") && (<div className="error img-err">Requires 1 to 5 images</div>)}
                {images.map((image, index) => (
                    <div key={index} className="add-image-div">
                        <label>
                        <input
                            key={fileInputKeys[index]}
                            type="file"
                            onChange={(e) => updateFile(e, index)}
                            value={undefined} // Clear the value by setting it to undefined
                        />
                        </label>
                        <div className="reset-image" onClick={() => clearFileInput(index)}> x </div>
                    </div>
                    ))}
                </div>
                <div className="create-spot-div">
                    <button className="delete-button update-button" type="submit" disabled={false}>Create Spot</button>
                </div>
            </form>
        </div>
    )
}

export default AddSpotForm
