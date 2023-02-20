import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { reviewsByUser } from '../../store/reviews';
import  _dateFormatter  from '../ReviewsBySpot/_dateFormatter'
import DeleteReviewButton from '../DeleteReview'
import './GetUserReviews.css'
const UserReviews = () => {
    const dispatch = useDispatch()
    const [user, reviews] = useSelector(state => [state.session.user, Object.values(state.reviews.user)])
    
    useEffect (() => {
        dispatch(reviewsByUser(user))
    }, [dispatch, user])
    // console.log(reviews, "!!")
    console.log("!!!!", reviews)  
    if (!reviews.length) return (
        <>
    <h1 className='manage-reviews-h1'>My Reviews</h1>
    <h2>Please Visit a spot to post a review!</h2>
        </>
    )

    return (
        <div className='manage-reviews-div'>
        <h1 className='manage-reviews-h1'>My Reviews</h1>
        <ul>{user && reviews.length && (reviews.map(review => {
            review = Object.values(review)[0]
            if(review){
            return(<li key={review.id} className='review-list-item'>
                <div className='get-reviews-spot-name'>{review.Spot.name}</div> 
                <div className='get-reviews-date'>{_dateFormatter(review.updatedAt)}</div>
                <div className='get-reviews-review'>{review.review}</div>
                <div className='get-reviews-stars'><i className="fas fa-sharp fa-solid fa-star" /> {review.stars}</div>
                <button className={'delete-button'}><DeleteReviewButton review={review} /></button>
                </li>
            )}}))}
        </ul>
        </div>
    )
}

export default UserReviews;