import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getSpotBookingsThunk, getUserBookingsThunk } from '../../store/bookings'
import { useModal } from "../../context/Modal";
import './Booking.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import EditBooking from "./EditBooking";

const MyBookings = () => {
    const [allUserBookings, user] = useSelector(state => [state.bookings.userBookings, state.session.user])
    const dispatch = useDispatch()
    const [allSpotBookings, setAllSpotBookings] = useState({})
    const [loaded, setLoaded] = useState(false)
    const {setModalContent} = useModal();

    useEffect(() => {
        const load = async () => {
          const userBookings = await dispatch(getUserBookingsThunk())
          const masterBookingList = { ...allSpotBookings };
          for (const key in userBookings) {
            const spotBookings = await dispatch(getSpotBookingsThunk(userBookings[key].spotId));

            if (!masterBookingList[userBookings[key].spotId]) {
              masterBookingList[userBookings[key].spotId] = [];
            }
            masterBookingList[userBookings[key].spotId].push(...Object.values(spotBookings));
          }
          setAllSpotBookings(masterBookingList);
          setLoaded(true);
        };
        load();
      }, [dispatch]);

    const editBooking = (booking, bookings) => {
        setModalContent(<EditBooking booking={booking} bookings={bookings} user={user}/>)
    }
    if (!loaded) {
        return <h2>Loading... </h2>
    }
    return (
            <div className="my-bookings-wrapper">
                <div className="my-bookings-div">

                {Object.values(allUserBookings).length ?
                <div className="user-bookings-list">
                    <h2>Your Bookings</h2>
                {Object.values(allUserBookings).map(el => (
                <li key={el.id} className="booking-li">
                    <div className="booking-spot-name">{el?.Spot?.name}</div>
                    <img className="booking-img" src={`${el?.Spot.previewImage}`} alt='spot-image'/>
                    <div className="my-booking-dates">
                    <span className="my-booking-start-date my-booking-date">{el.startDate.slice(0, 10)}</span>
                    <span className="my-booking-date">{el.endDate.slice(0, 10)}</span>
                    </div>
                    <div>
                    <button className='edit-delete-button' onClick={() => editBooking(el, allSpotBookings[el.spotId])}>Edit / Cancel booking</button>
                    </div>
                </li>))}
                </div>
                :
                <div className="my-bookings-div">
                    <h2>You have no spots booked</h2>
                    <h3 className="view-spots">View some <NavLink to='/' className='spots-to-book'>spots</NavLink> to book!</h3>
                </div>}
                </div>
            </div>
    )
}

export default MyBookings

//we need to get the spot id's off the booking and search for the current bookings for each unique spot because we need to know all of their spotbookings to edits
//we can run too thunks and be yucky about it.
//
