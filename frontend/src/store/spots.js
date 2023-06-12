import { csrfFetch } from "./csrf"

export const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
export const GET_SPOT = 'spots/GET_SPOT'
export const GET_USER_SPOTS = 'spots/GET_USER_SPOTS'
export const DELETE_SPOT = 'spot/DELETE_SPOT'
export const ADD_SPOT = 'spot/ADD_SPOT'
export const EDIT_SPOT = 'spot/EDIT_SPOT'
export const ADD_SPOT_IMAGE = 'spot/ADD_SPOT_IMAGE'

const allSpots = spots => ({
    type: GET_ALL_SPOTS,
    spots
})
export const getSpot = spot => ({
    type: GET_SPOT,
    spot
})

export const userSpots = ( spots) => ({
    type: GET_USER_SPOTS,
    spots
})

const addSpot = (user, spot) => ({
    type: ADD_SPOT,
    user,
    spot
})

const editSpot = (user, spot) => ({
    type: EDIT_SPOT,
    spot,
    user
})
const deleteSpot = (spot) => ({
    type: DELETE_SPOT,
    spot
})


export const getAllSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    if(res.ok){
        const spots = await res.json();
        return dispatch(allSpots(spots))
    }
}

export const getSingleSpot = spotId => async dispatch => {
    if(isNaN(parseInt(spotId))) return
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if(res.ok) {
        const spot = await res.json()
        return dispatch(getSpot(spot))
    }
}

export const getUserSpots = () => async dispatch => {
    const res = await csrfFetch(`/api/spots/current`)
    if(res.ok) {
        const spots = await res.json();
        return dispatch(userSpots( spots))
    }
}

export const addSpotThunk = (user, spot) => async dispatch => {
    const images = spot.images
    const res = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(spot)
    })

    if(res.ok) {
        const spot = await res.json()
        const formData = new FormData()

        if (images && images.length){
            if (images && images.length !== 0) {
                for (var i = 0; i < images.length; i++) {
                  formData.append("images", images[i]);
                }
              }
        }

        const response = await csrfFetch(`/api/spots/${spot.id}/images`,{
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
              },
            body: formData
        })

        if (response.ok) {
            const images = await response.json()
            console.log(spot)
            spot.SpotImages = images
        }
        dispatch(addSpot(user, spot))
        return spot;
    }
}

export const editSpotThunk = (user, spot) => async dispatch => {
    const id = spot.id
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const spot = await res.json()
        dispatch(editSpot(user, spot))
        spot.id = +id;
        return spot;
    }
}

export const deleteSpotThunk = (spot) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    if (res.ok) {
        const message = res.json();
        dispatch(deleteSpot(spot))
        return message;
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}

export default function spotReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_SPOTS:{
            const allSpots = {}
            action.spots.spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
            const newState = {...state}
            return {...newState, allSpots}
        }
        case GET_SPOT: {
            const newState = {...state, singleSpot: action.spot}
            const owner = newState.singleSpot.User
            delete newState.singleSpot.User
            newState.singleSpot.Owner = owner
            return newState
            }
        case GET_USER_SPOTS: {
            const allSpots = {}
            action.spots.spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
            const newState = {...state, allSpots}
            return newState
        }
        case ADD_SPOT: {
            const newState = {...state, singleSpot: {}}
            const singleSpot = {
                ...action.spot,
                Owner: {...action.user}
            }
            newState.singleSpot = {...singleSpot}
            return newState;
        }
        case EDIT_SPOT: {
            const newState = {...state, singleSpot: {}}
            const SpotImages = {...state.singleSpot.SpotImages}
            const singleSpot = {
                ...action.spot,
                Owner: {...action.user}
            }
            newState.singleSpot = {...singleSpot}
            newState.singleSpot.SpotImages = SpotImages
            return newState
        }
        case DELETE_SPOT : {
            const newState = {...state}
            delete newState.allSpots[action.spot.id]
            newState.singleSpot = {}
            return newState
        }
        default:
            return state
    }
}
