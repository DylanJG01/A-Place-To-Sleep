import { csrfFetch } from "./csrf"

export const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'
export const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
export const EDIT_USER_REVIEW = 'reviews/EDIT_USER_REVIEW'
export const EDIT_SPOT_REVIEW = 'reviews/EDIT_SPOT_REVIEW'

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

const editUserReview = (review) => ({
    type: EDIT_USER_REVIEW,
    review
})

const editSpotReview = (review) => ({
    type: EDIT_SPOT_REVIEW,
    review
})


export const reviewsBySpot = (spotId) => async dispatch => {
    if(isNaN(parseInt(spotId))) return //We shouldn't need this anymore, this can be on the backlog for things to test
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews = await res.json()
        return dispatch(spotReviews(reviews))
    }
}

export const reviewsByUser = () => async dispatch => {
    const res = await csrfFetch(`/api/reviews/current`)

    if (res.ok) {
        const reviews = await res.json()
        return dispatch(userReviews(reviews))
    }
}

export const addReviewThunk = (review, spotId, user) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (res.ok){
        const review = await res.json()
        return dispatch(addReview(review, user))
    }
}

export const editReviewThunk = (review, id, spotOrUser) => async dispatch => {

    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    })


    if (res.ok){
        const review = await res.json()
        if(spotOrUser === "user"){
            return dispatch(editUserReview(review, id))
        } else if (spotOrUser === "spot"){
            return dispatch(editSpotReview(review, id))
        }
    }
}

export const deleteReviewThunk = (review) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
    })

    if (res.ok){
        return dispatch(deleteReview(review.id))
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
            const reviews = { spot: {} };
            action.reviews.Reviews.forEach(review => {
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
            const User = {...action.user}
            delete User.email
            delete User.username
            const review = { ...action.review}
            review.User = {...User}
            newState.spot[action.review.id] = {...review}
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState.spot[action.review]
            delete newState.user[action.review]
            return newState
        }
        case EDIT_USER_REVIEW: {
            const newState = {...state}
            newState.user[action.review.id][action.review.id] = {...newState.user[action.review.id][action.review.id]}
            newState.user[action.review.id][action.review.id].review = action.review.review
            newState.user[action.review.id][action.review.id].stars = action.review.stars
            return newState
        }
        case EDIT_SPOT_REVIEW: {
            const newState = {...state}
            newState.spot[action.review.id] = {...newState.spot[action.review.id] }
            newState.spot[action.review.id].review = action.review.review
            newState.spot[action.review.id].stars = action.review.stars
            return newState
        }
        default: return state
    }
}
