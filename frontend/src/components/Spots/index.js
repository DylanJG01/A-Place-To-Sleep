import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllSpots } from '../../store/spots'
import SpotCard from '../SpotCard'
import './Spots.css'

const AllSpots = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => Object.values(state.spots.allSpots))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            await dispatch(getAllSpots())
            setLoading(false)
        }
        load()
    }, [dispatch])

    if (loading) return <h2>Loading ...</h2>

    return (
        <div className='main-spot-container-div'>
            <ul className={"spots__list"}>
                {allSpots ? allSpots.map(spot => <SpotCard spot={spot} key={spot.id} />) : <h1>'Loading Site'</h1>}
            </ul>
        </div>
    )
}

export default AllSpots
