import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from  'react-redux' 
import { reviewsBySpot } from '../../store/reviews';
import DeleteReviewButton from '../DeleteReview'
import _dateFormatter from './_dateFormatter';

const ReviewsBySpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = Object.values(useSelector(state => state.reviews.spot))
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(reviewsBySpot(spotId))
    }, [dispatch, spotId])

    console.log("REVIEWS@!@!@!" , reviews)
    
    return (
      <> 
        {reviews.length ?
        <ul>
        {   reviews.map(review => (
            <li key={review.id}>{review.User.firstName} {review.User.lastName} <br/> 
            {_dateFormatter(review.createdAt)} <br/>
            {review.review}
                {user.id === review.userId ? <button><DeleteReviewButton review={review}/></button> : <></>}
            </li>
            ))
        }
        </ul> : <h1>Flump</h1>
}
   
    </>
    )
}

// {
//     <ul>
//     {reviews.map(review => (
//         <li key={review.id}>{review.review}</li>
//     ))}
// </ul>
// }
export default ReviewsBySpot