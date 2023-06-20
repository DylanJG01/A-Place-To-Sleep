import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSpots } from '../../store/spots'
import SpotCard from '../SpotCard'
import './UserSpots.css'
import '../Spots/Spots.css'
const UserSpots = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userSpots = useSelector(state => Object.values(state.spots.allSpots))
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        const load = async () => {
            await dispatch(getUserSpots())
            setLoaded(true)
        }
        load()
    }, [dispatch])

    if (!user) {
        return (
            <div>You are not logged in</div>
        )
    }

    if (!loaded) return <>Loading...</>
    return (
        <>
        <h1 className='manage-spots-h1'>Manage Spots</h1>
        <div className='main-spot-container-div'>
            <ul className={"spots__list"}>
                {!!userSpots.length ? userSpots.map((spot) => (
                    <SpotCard spot={spot} key={spot.id} />
                )) : <></>}
            </ul>

            {!userSpots.length && <h2 className='no-spots'>You have no spots!</h2>}

        </div>
        </>
    )
}

export default UserSpots
