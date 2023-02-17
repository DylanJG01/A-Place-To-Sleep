import { Link, Route, useHistory } from 'react-router-dom'
import DeleteSpotButton from '../DeleteSpot'
import './SpotCard.css'

function SpotCard ({spot}) {
    const history = useHistory()

    const avgRating = (num) => Math.round(num * 100) / 100
    // console.log(spot)

    return (
        <>
        <div className={"spot-card"}>
            <Link key={spot.id} to={`/spots/${spot.id}`}>
                <img src={spot.preview} alt={"Spot preview"}/>
            </Link>
            <div>
                <div>
                <p>{spot.name}, {spot.averageRating ? avgRating(spot.averageRating) : "New"}</p>
                </div>
                <div className='cost-update-delete-div'>
                    <div>
                    <p>${spot.price} night</p>
                    </div>
                    <div className='update-delete-div'>
                    <Route path={"/spots/current"}>
                        <button onClick={e => history.push(`/spots/${spot.id}/edit`)}>Edit</button>
                        <button><DeleteSpotButton spot={spot} /></button>
                    </Route>
                     </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SpotCard