import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSpots } from '../../store/spots'
import SpotCard from '../SpotCard'
import './UserSpots.css'
import '../Spots/Spots.css'
const UserSpots = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userSpots = useSelector(state =>
      {
         return Object.values(state.spots.allSpots)})


         //What do I want to do ?
         // Only give UserSpots a value after user state is updated. I don't want to
         //preload the page with the previous store setting. 
    useEffect(() => {
        dispatch(getUserSpots())

    }, [dispatch])

    if (!user) {
        return (
            <div>You are not logged in</div>
        )
    }

    // console.log("userSpots!!" ,userSpots)
    return (
        <>
        <h1 className='manage-spots-h1'>Manage Spots</h1>
        <div className='main-spot-container-div'>
            <ul className={"spots__list"}>
                {!!userSpots.length ? userSpots.map((spot) => (
                    <SpotCard spot={spot} key={spot.id} />  
                )) : <h1>Loading Content</h1>}
            </ul>

        </div>
        </>
    )
}

export default UserSpots