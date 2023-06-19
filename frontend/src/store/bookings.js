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
    dispatch(getUserBookings(bookings))
  }
}

export const getSpotBookingsThunk = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
  if (res.ok) {
    const bookings = await res.json()
    dispatch(getSpotBookings(bookings))
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
        const bookings = action.bookings.Bookings.reduce((acc, el) => {
          acc[el.id] = el
          return acc
        },{})
      return {
        ...state,
        spotBookings: {...state.spotBookings},
        userBookings: bookings
      }
    case GET_SPOT_BOOKINGS:

      return {
        ...state,
        spotBookings: action.bookings
      }
    case EDIT_SPOT_BOOKINGS:
      return {
        ...state,
        spotBookings: {
          ...state.spotBookings,
          [action.booking.id]: action.booking
        }
      }
    case DELETE_BOOKING:
      console.log("!!!!!!!", action)
      const updatedBookings = state.spotBookings.Bookings.filter(el => el.id !== action.bookingId)
      return {
        ...state,
        spotBookings: {Bookings: updatedBookings}
      }
    case ADD_BOOKING:
      console.log(state.spotBookings)
      const Bookings = [...state.spotBookings.Bookings]
      Bookings.push(action.booking)
      return {
        ...state,
        spotBookings: {
          Bookings
        }
      }
    default:
      return state
  }
}
