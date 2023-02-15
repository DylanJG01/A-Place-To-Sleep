import { csrfFetch } from "./csrf"

export const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'
export const GET_USER_REVIEWS = 'review/GET_USER_REVIEWS'
export const EDIT_REVIEW = 'review/EDIT_REVIEW'

const spotReviews = reviews => ({
    type: GET_SPOT_REVIEWS,
    reviews
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


const initialState = {
    spot: {
        // reviewId: {
        //     reviewData: {},
        //     User: {
        //         userData: {}
        //     },
        //     ReviewImages: [],
        // },
        // optionalOrderedList: []
    },
    user: {
        reviewId: {
        //     reviewData: {},
        //     User: {
        //         userData: {}
        //     },
        //     Spot: {
        //         spotData: {}
        //     },
        //     ReviewImages: []
        // },
        // optionalOrderedList: []
        }
    }
}

export default function reviewReducer(state = initialState, action){
    switch(action.type){
        case GET_SPOT_REVIEWS: {
            const reviews = { spot: {} };
            console.log("ReviewReducer Get Spot Reviews", action.reviews.Reviews)
            action.reviews.Reviews.forEach(review => { 
                console.log("REVIEW", review)
                reviews.spot[review.id] = review
            })
            const newState = {...state, ...reviews}
            return newState
        }
        default: return state
    }
}



