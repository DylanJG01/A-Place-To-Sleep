import { csrfFetch } from "./csrf"

export const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'
export const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

// export const EDIT_REVIEW = 'review/EDIT_REVIEW' //Currently unrequired.

const spotReviews = reviews => ({
    type: GET_SPOT_REVIEWS,
    reviews
})

const userReviews = reviews => ({
    type: GET_USER_REVIEWS,
    reviews
})

const addReview = (review, user) => ({
    type: ADD_REVIEW,
    review,
    user
})

const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review,
})

export const reviewsBySpot = (spotId) => async dispatch => {
    if(isNaN(parseInt(spotId))) return //We shouldn't need this anymore, this can be on the backlog for things to test
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews = await res.json()
        console.log("REVIEWS: ", reviews)
        return dispatch(spotReviews(reviews))
    }
    return console.log(res.status, "reviewsBySpot")
}

export const reviewsByUser = () => async dispatch => {
    const res = await csrfFetch(`/api/reviews/current`)

    if (res.ok) {
        const reviews = await res.json()
        console.log("REVIEWS BY USER: ", reviews    )
        return dispatch(userReviews(reviews))
    }
}

export const addReviewThunk = (review, spotId, user) => async dispatch => {
    // console.log(spotId)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (res.ok){
        const review = await res.json()
        console.log("AddReview response", review)
        return dispatch(addReview(review, user))
    }
}

export const deleteReviewThunk = (review) => async dispatch => {
    console.log(review)
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE', 
        headers: {"Content-Type": "application/json"},
    })

    if (res.ok){
        // const message = await res.json();
        // console.log("DeleteReviewThunk")
        return dispatch(deleteReview(review))
    }
}


const initialState = {
    spot: {
        
    },
    user: {
        reviewId: {
        
        }
    }
}

export default function reviewReducer(state = initialState, action){
    switch(action.type){
        case GET_SPOT_REVIEWS: {
            const reviews = { spot: {} }; // 
            // console.log("ReviewReducer Get Spot Reviews", action.reviews.Reviews)
            action.reviews.Reviews.forEach(review => { 
                // console.log("REVIEW", review)
                reviews.spot[review.id] = review
            })
            const newState = {...state, ...reviews}
            return newState
        }

        case GET_USER_REVIEWS:{
            const reviews = { user: { }}
            action.reviews.Reviews.forEach(review => {
                reviews.user[review.id] = {[review.id]: review }
            })
            const newState = {...state, ...reviews}
            return newState
        }

        case ADD_REVIEW: {
            const newState = {...state}
            // console.log("ADD REVIEW ACTION", action)
            // console.log("ADD REVIEW STATE", state)
            const User = {...action.user}
            delete User.email
            delete User.username
            const review = { ...action.review }
            review.User = {...User}
            newState.spot[action.review.id] = {...review}

            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            // console.log(action)
            delete newState.spot[action.review.id]
            delete newState.user[action.review.id]
            return newState
        }
        default: return state
    }
}



