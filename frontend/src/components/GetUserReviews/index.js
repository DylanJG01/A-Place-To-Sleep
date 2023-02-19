import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { reviewsByUser } from '../../store/reviews';


const UserReviews = () => {
    const dispatch = useDispatch()
    const [user, reviews] = useSelector(state => [state.session.user, Object.values(state.reviews.user)])
    
    useEffect (() => {
        dispatch(reviewsByUser(user))
    }, [dispatch, user])
    // console.log(reviews, "!!")
    // console.log(user)  
    return (
        <ul>{user && reviews.length && (reviews.map(review => {
            review = Object.values(review)[0]
            if(review){
            return(<li key={review.id}>Review :{review.review} Stars: {review.stars} <br /> </li>
            )}}))}
        </ul>
    )
}

export default UserReviews;