import { csrfFetch } from "./csrf"

export const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
export const GET_SPOT = 'spots/GET_SPOT'
export const GET_USER_SPOTS = 'spots/GET_USER_SPOTS'
export const DELETE_SPOT = 'spot/DELETE_SPOT'
export const ADD_SPOT = 'spot/ADD_SPOT'
export const EDIT_SPOT = 'spot/EDIT_SPOT'

const allSpots = spots => ({
    type: GET_ALL_SPOTS,
    spots
})
export const getSpot = spot => ({
    type: GET_SPOT,
    spot
})

export const userSpots = (userId, spots) => ({
    type: GET_USER_SPOTS,
    userId, 
    spots
})

export const getAllSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    // const res = await fetch('/')
    if(res.ok){
        const spots = await res.json();
        console.log("Spots: ", spots);
        return dispatch(allSpots(spots))
    }
    return console.log(res.status, "getAllSpots")
}


export const getSingleSpot = spotId => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if(res.ok) {
        const spot = await res.json()
        console.log ("Spot: ", spot)
        return dispatch(getSpot(spot))
    }
    return console.log(res.status, "getSingleSpot")
}

export const getUserSpots = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/current`)

    if(res.ok) {
        const spots = await res.json();
        console.log("getUserSpotsThunk", spots)
        console.log(userId, spots)
        return dispatch(userSpots(userId, spots))
    }
    console.log(res.status, "getUserSpots")
}

const initialState = {
    allSpots: {
 
    },
    singleSpot: {

    }
}

export default function spotReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_SPOTS:{
            const allSpots = {}
            // console.log("ACTIONSPOTS LINE48", action.spots)
            action.spots.spots.forEach(spot => {
                // console.log("SPOT LINE 50", spot)
                allSpots[spot.id] = spot
            })
            // console.log("ALLSPOTS LINE53", allSpots)
            const newState = {...state}
            return {...newState, allSpots}
        }
        case GET_SPOT: {
            const newState = {...state, singleSpot: action.spot}
            return newState
            }
        case GET_USER_SPOTS: {
            const allSpots = {}
            // console.log(action.spots.spots)
            action.spots.spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
            const newState = {...state, allSpots}
            console.log(newState)
            return newState
        }
        default: 
            return state
    }
}