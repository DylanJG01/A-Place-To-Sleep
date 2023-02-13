import { useState, useEffect } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllSpots } from '../../store/spots'
import './Spots.css'

const AllSpots = () => {
    const dispatch = useDispatch();

    const allSpots = Array.from(useSelector(state => Object.values(state.spots.allSpots)))
   
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    // console.log("ALLSPOTS", allSpots)

    const avgRating = (num) => Math.round(num * 100)/100

    const mapSpots = () => {

        if (!allSpots) return
        return allSpots.map(spot => (

            <li key={spot.id}>
                <img src={spot.preview} alt={"Spot Preview"}/>
                <p>{spot.id} , {spot.address}, {spot.averageRating ? avgRating(spot.averageRating) : "New"}</p>
            </li>
        ))
    }
 

    return (
        <div>
            <ul className={"spots__list"}>
                { allSpots ? mapSpots() :'placeholder'}
            </ul>
        </div>
    )
}

export default AllSpots