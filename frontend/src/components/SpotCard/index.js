import { NavLink, Link, Route, useHistory } from 'react-router-dom'
import DeleteSpotButton from '../DeleteSpot'
import './SpotCard.css'

function SpotCard ({spot}) {
    const history = useHistory()

    const avgRating = (num) => (Math.round(num * 100) / 100).toFixed(2)
    // console.log(spot)

    const updateSpot = (e) => {
         e.stopPropagation()
                            history.push(`/spots/${spot.id}/edit`)
    }

    return (
        <>
        <div className={"spot-card"} onClick={e => history.push(`/spots/${spot.id}`)}>
            <img src={spot.preview} alt={"Spot preview"}/>
            <div className='spot-card-info'>
                <div className='spot-card-text'>
                    <p>{spot.name} </p>
                    <p><i className="fas fa-sharp fa-solid fa-star" /> {spot.averageRating ? avgRating(spot.averageRating) : "New"}</p>
                </div>
                <div className='cost-update-delete-div'>
                    <div>
                        <div>
                            ${spot.price.toFixed(2)} / Night
                        </div>
                    </div>
                    <div className='update-delete-div'>
                    <Route path={"/spots/current"}>
                        <button className="delete-button" onClick={e => updateSpot(e)}>Update</button>

                        <button className="delete-button" onClick={e => e.stopPropagation()}><DeleteSpotButton spot={spot} /></button>
                    </Route>
                    </div>
                </div>
            </div>
            {/* </Link> */}
        </div>
        </>
    )
}

export default SpotCard
