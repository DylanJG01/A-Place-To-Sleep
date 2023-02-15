import { Link, Route, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

function SpotCard ({spot}) {
    const history = useHistory()

    const avgRating = (num) => Math.round(num * 100) / 100
    console.log(spot)


    return (
        <>
        <div className={"spot-card"}>
            <Link key={spot.id} to={`/spots/${spot.id}`}>
                <img src={spot.preview} alt={"Spot preview"}/>
            </Link>
            <div>
                <p>{spot.city}, {spot.state}, {spot.averageRating ? avgRating(spot.averageRating) : "New"}</p>
                <p>${spot.price} night</p>
            <Route path={"/spots/current"}>
                <button onClick={e => history.push(`/spots/${spot.id}/edit`)}>Edit</button>
                <button>Delete</button>
            </Route>
            </div>
        </div>
        </>
    )
}

export default SpotCard