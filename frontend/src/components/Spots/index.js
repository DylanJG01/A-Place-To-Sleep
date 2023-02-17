import { useEffect } from 'react'
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

    return (
        <div className='main-spot-container-div'>
            <ul className={"spots__list"}>
                {allSpots ? allSpots.map(spot => <SpotCard spot={spot} key={spot.id} />) : <h1>'Loading Site'</h1>}
            </ul>
        </div>
    )
}

export default AllSpots