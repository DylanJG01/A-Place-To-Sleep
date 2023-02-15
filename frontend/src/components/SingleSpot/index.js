import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleSpot } from '../../store/spots';
import { useEffect } from 'react'
import ReviewsBySpot from '../ReviewsBySpot';

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const singleSpot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch])

    // console.log(singleSpot)
    
    return (
        <div>
            <div>
            {singleSpot.name}
            </div>
            <div>
                <ReviewsBySpot />
            </div>
        </div>

    )
}  

export default SingleSpot