import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSpots } from '../../store/spots'
import SpotCard from '../SpotCard'
import './UserSpots.css'
const UserSpots = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userSpots = useSelector(state => Object.values(state.spots.allSpots))
   
    useEffect(() => {
        if(!user) return
        dispatch(getUserSpots(user.id))
    }, [dispatch, user])

    if (!user) {
        return (
            <div>You are not logged in</div>
        )
    }

    console.log("userSpots" ,userSpots)
    return (
        <div className='main-spot-container-div'>
            <ul className={"user-spots-list"}>
                {/* { allSpots ? mapSpots() :'placeholder'} */}
                {!!userSpots.length ? userSpots.map((spot, idx) => (
                    <SpotCard spot={spot} key={spot.id} />  
                )) : <h1>Loading Content</h1>}
            </ul>

        </div>
    )
}

export default UserSpots