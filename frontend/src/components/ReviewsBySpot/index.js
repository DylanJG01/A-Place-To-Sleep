import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from  'react-redux'
import { reviewsBySpot } from '../../store/reviews';
import { getSingleSpot } from '../../store/spots';
import DeleteReviewButton from '../DeleteReview'
import EditReviewModal from '../EditReview';
import _dateFormatter from './_dateFormatter';
import _avgRating from './_avgRating';

const ReviewsBySpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // const reviews = Object.values(useSelector(state => state.reviews.spot))

    const reviews = useSelector(state => state.reviews.spot)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(reviewsBySpot(spotId))
    }, [dispatch, spotId])

    // console.log("REVIEWS@!@!@!" , reviews)

    return (
      <>
            {Object.values(reviews).length ?
        <ul className='spot-reviews'>
        {   Object.values(reviews).map(review => (
            <li className='spot-review-li' key={review.id}><div className='reviewer-name'>{review.User.firstName} {review.User.lastName} {review.stars}<i className="fas fa-sharp fa-solid fa-star" /></div>
                <div className='review-date'>{_dateFormatter(review.createdAt)}</div>
            <div>
                <div className='the-actual-review'>{review.review}</div>
                {user && user.id === review.userId ?
                <>
                <button className={'delete-button'}><DeleteReviewButton review={review}/></button>
                <button className={'delete-button'}><EditReviewModal review={review} spotOrUser={"spot"}/></button>
                </>
                : <></>
                }

            </div>
            </li>
            ))
        }
        </ul> : <></>
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
