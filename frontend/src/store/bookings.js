import { csrfFetch } from "./csrf"

export const GET_USER_BOOKINGS = 'bookings/GET_USER'
export const GET_SPOT_BOOKINGS = 'bookings/GET_SPOT'
export const EDIT_SPOT_BOOKINGS = 'bookings/EDIT'
export const DELETE_BOOKING = 'bookings/DELETE'
export const ADD_BOOKING = 'bookings/ADD_BOOKING'

const getUserBookings = bookings => ({
  type: GET_USER_BOOKINGS,
  bookings
})

const getSpotBookings = bookings => ({
  type: GET_SPOT_BOOKINGS,
  bookings
})

const editSpotBookings = booking => ({
  type: EDIT_SPOT_BOOKINGS,
  booking
})

const deleteBooking = bookingId => ({
  type: DELETE_BOOKING,
  bookingId
})

const addBooking = booking => ({
  type: ADD_BOOKING,
  booking
})

export const getUserBookingsThunk = userId => async dispatch => {
  const res = await csrfFetch(`/api/bookings/current`)
  if (res.ok) {
    const bookings = await res.json()
    const spotBookings = bookings.Bookings.reduce((acc, el) => {
      if(el) acc[el.id] = el
      return acc
    }, {})

    dispatch(getUserBookings(spotBookings))
    return spotBookings
  }
}

export const getSpotBookingsThunk = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`)

  if (res.ok) {
    const bookings = await res.json()
    let spotBookings = {};

    if (typeof bookings !== 'string') {
      spotBookings = bookings.Bookings.reduce((acc, el) => {
      if(el) acc[el.id] = el
      return acc
    }, {})
}
    dispatch(getSpotBookings(spotBookings))
    return spotBookings
  }
}

export const editSpotBookingsThunk = booking => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  })

  if (res.ok) {
    const updatedBooking = await res.json()
    dispatch(editSpotBookings(updatedBooking))
    return updatedBooking;
  }
}

export const deleteBookingThunk = bookingId => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.ok) {
    dispatch(deleteBooking(bookingId))
    const message = await res.json()
    return message;
  }
}

export const addBookingThunk = (bookingData, spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData)
  })
  if (res.ok) {
    const booking = await res.json()
    dispatch(addBooking(booking))
    return booking;
  }
}

const initialState = {
  userBookings: {},
  spotBookings: {}
}

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_BOOKINGS:
      return {
        ...state,
        spotBookings: {...state.spotBookings},
        userBookings: action.bookings
      }
    case GET_SPOT_BOOKINGS:
      return {
        ...state,
        spotBookings: action.bookings,
        userBookings: {...state.userBookings}
      }
    case EDIT_SPOT_BOOKINGS:
      let spot = {...state.userBookings[action.booking.id].Spot}
      let booking = action.booking
      booking.Spot = spot
      return {
        ...state,
        spotBookings: {
          ...state.spotBookings,
          [action.booking.id]: booking
        },
        userBookings: {
          ...state.userBookings,
          [action.booking.id]: booking
        }
      }
    case DELETE_BOOKING:
      const [spotBookingsArr, userBookingsArr] = [{...state.spotBookings}, {...state.userBookings}]
      delete spotBookingsArr[action.bookingId]
      delete userBookingsArr[action.bookingId]
      return {
        ...state,
        spotBookings: {...spotBookingsArr},
        userBookings: {...userBookingsArr}
      }

    case ADD_BOOKING:
      const newBookings = {...state.spotBookings}
      newBookings[action.booking.id] = action.booking
      return {
        ...state,
        spotBookings: {...newBookings}
      }
    default:
      return state
  }
}
