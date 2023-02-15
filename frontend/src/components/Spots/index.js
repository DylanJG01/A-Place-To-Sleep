import { useState, useEffect } from 'react'
import { NavLink, Route, useParams, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllSpots } from '../../store/spots'
import SpotCard from '../SpotCard'
import './Spots.css'

const AllSpots = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => Object.values(state.spots.allSpots))
   
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    // console.log("ALLSPOTS", allSpots)

    const avgRating = (num) => Math.round(num * 100)/100

    // const mapSpots = () => {
    //     if (!allSpots) return
    //     return allSpots.map(spot => (
    //         <Link key={spot.id} className={'spot-card'} to={`/spots/${spot.id}`}>
    //             <img src={spot.preview} alt={"Spot Preview"}/>
    //             {/* <div> */}
    //             <p>{spot.city}, {spot.state}, {spot.averageRating ? avgRating(spot.averageRating) : "New"}</p>
    //             <p>${spot.price} night</p>
    //             {/* </div> */}
    //         </Link>
    //     ))
    // }
 
    return (
        <div>
            <ul className={"spots__list"}>
                {/* { allSpots ? mapSpots() :'placeholder'} */}
                {allSpots ? allSpots.map(spot => SpotCard(spot)) : 'placeholder'}
            </ul>
        </div>
    )
}

export default AllSpots