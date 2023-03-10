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
    // const res = await fetch('/')
    if(res.ok){
        const spots = await res.json();
        // console.log("Spots: ", spots);
        return dispatch(allSpots(spots))
    }
    // return console.log(res.status, "getAllSpots")
}

export const getSingleSpot = spotId => async dispatch => {
    if(isNaN(parseInt(spotId))) return
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if(res.ok) {
        const spot = await res.json()
        // console.log ("Spot: ", spot)
        return dispatch(getSpot(spot))
    }
    // return console.log(res.status, "getSingleSpot")
}

export const getUserSpots = () => async dispatch => {
    const res = await csrfFetch(`/api/spots/current`)

    if(res.ok) {
        const spots = await res.json();
        // console.log("getUserSpotsThunk", spots)
        // console.log(spots)
        return dispatch(userSpots( spots))
    }
    // console.log(res.status, "getUserSpots")
}

export const addSpotThunk = (user, spot) => async dispatch => {

    const spotImages = []
    //Create a spotImage Array filled only with (not null) values
    spot.SpotImages.forEach(img => {
        if (img !== null) spotImages.push(img)
    })

    const res = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(spot)
    })

    if(res.ok) {
        const spot = await res.json()
        
        // console.log("SPOT IMAGES", spotImages)
        spot.SpotImages = []
        let preview = true;

        for(const image of spotImages){
            
            const res = await csrfFetch(`/api/spots/${spot.id}/images`,{
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({url: image, preview: preview})
            })

            preview = false;//Set preview to true only for first time, then all others are false.

            // console.log("RES", res)
            if (res.ok) {
                const image = await res.json()
                // console.log(image)
                spot.SpotImages.push(image)
                // console.log("5555555", spot)
            }
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
        // console.log("SPOT", spot)
        dispatch(editSpot(user, spot))
        spot.id = +id;
        return spot;
    }
}

export const deleteSpotThunk = (spot) => async dispatch => {
    // console.log("SPOT BEFORE fetch",spot)

    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'DELETE', 
        headers: {'Content-Type': 'application/json'},
    })
    // console.log("SPOT AFTER fetch", spot)
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
            // console.log("ACTIONSPOTS, action.spots)
            action.spots.spots.forEach(spot => {
                // console.log("SPOT", spot)
                allSpots[spot.id] = spot
            })
            // console.log("ALLSPOTS", allSpots)
            const newState = {...state}
            return {...newState, allSpots}
        }
        case GET_SPOT: {
            const newState = {...state, singleSpot: action.spot}
            // console.log("GET SPOT IN REDUCER", action.spot)
            const owner = newState.singleSpot.User
            delete newState.singleSpot.User
            newState.singleSpot.Owner = owner
            return newState
            }
        case GET_USER_SPOTS: {
            const allSpots = {}
            // console.log(action.spots.spots)
            action.spots.spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
            const newState = {...state, allSpots}
            // console.log(newState)
            return newState
        }
        case ADD_SPOT: {
            const newState = {...state, singleSpot: {}}
            // console.log("ACTION", action)
            const singleSpot = {
                ...action.spot,
                Owner: {...action.user}
            }
            newState.singleSpot = {...singleSpot}
            // console.log(newState)
            return newState;
        }
        case EDIT_SPOT: {
            const newState = {...state, singleSpot: {}}
            // console.log("STATE IN EDITSPOT", state)
            const SpotImages = {...state.singleSpot.SpotImages}
            // console.log(action)
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
            // console.log("NEW STATE DELETE SPOT",newState)
            // console.log("action!", action)
            delete newState.allSpots[action.spot.id]
            newState.singleSpot = {}
            return newState
        }
        default: 
            return state
    }
}