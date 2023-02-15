import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from  'react-redux' 
import { reviewsBySpot } from '../../store/reviews';

const ReviewsBySpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = Object.values(useSelector(state => state.reviews.spot))

    useEffect(() => {
        dispatch(reviewsBySpot(spotId))
    }, [dispatch, spotId])

    console.log("REVIEWS@!@!@!" , reviews)

    return (
        <ul>
        {reviews.map(review => (
            <li>{review.review}</li>
        ))}
        </ul>
    )
}

export default ReviewsBySpot