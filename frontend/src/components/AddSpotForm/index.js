import { useState, useEffect } from "react"
import {useDispatch} from 'react-redux'

export const AddSpotForm = () => {
    const [country, setCountry] = useState('')//country
    const [address, setAddress] = useState('')//address
    const [city, setCity] = useState('')//city
    const [state, setState] = useState('')//state
    const [latitude, setLatitude] = useState(null)//lat
    const [longitude, setLongitude] = useState(null)//lng
    const [discription, setDescription] = useState('')//description
    const [title, setTitle] = useState('')//name
    const [price, setPrice] = useState(null)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return  (
        <>
            <h1> Create a New Spot! </h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => {})}
                </ul>
            </form>
        </>
    )
}