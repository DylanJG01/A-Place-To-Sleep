import { useState, useEffect } from 'react'
import { NavLink, Route, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllSpots } from '../../store/spots'

const AllSpots = () => {
    const dispatch = useDispatch();

    const allSpots = useSelector(state => Object.values(state.spots.allSpots))
    const allSpots2 = Array.from(allSpots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    console.log("ALLSPOTS", allSpots)

    const funct = () => {

        console.log(!allSpots2, typeof allSpots2)
        if (!allSpots) return

        return allSpots2.map(spot => (
            <p>{spot.id} , {spot.address}</p>
        ))
    }
    console.log(typeof allSpots, "#@$!$!@#$!")
    
    if(!allSpots.length) return

    return (
        <div>
            <ul>
                <li>{ allSpots ? funct() :'placeholder'}</li>
            </ul>
        </div>
    )
}

export default AllSpots