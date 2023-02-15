import { Link, Route } from 'react-router-dom'

function SpotCard ({spot}) {
    const avgRating = (num) => Math.round(num * 100) / 100
    console.log(spot)
    return (
        <>
        <Link className={"spot-card"} key={spot.id} to={`/spots/${spot.id}`}>
            <img src={spot.preview} alt={"Spot preview"}/>
            <div>
                <p>{spot.city}, {spot.state}, {spot.averageRating ? avgRating(spot.averageRating) : "New"}</p>
                <p>${spot.price} night</p>
            </div>
        <Route path={"/spots/current"}>
            <button>Edit</button>
            <button>Delete</button>
        </Route>
        </Link>
        </>
    )
}

export default SpotCard