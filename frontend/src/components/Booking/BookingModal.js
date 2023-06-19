import React, { useState, useEffect } from "react";
import { addBookingThunk, deleteBookingThunk, editSpotBookingsThunk, getSpotBookingsThunk, getUserBookingsThunk } from '../../store/bookings'

import { useDispatch } from "react-redux";
import { DatePicker } from '@mui/x-date-pickers';
import { useModal } from "../../context/Modal";
import EditBooking from "./EditBooking";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

// const dayjs = require('dayjs')

//

function BookingModal({ bookings, user, setDates }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const { closeModal, setModalContent } = useModal();
    const [disableBtn, setDisableBtn] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(editSpotBookingsThunk )
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    const editBooking = (booking) => {
        setModalContent(<EditBooking booking={booking} bookings={bookings} user={user} setDates={setDates}/>)
    }

    const deleteBooking = async (e, booking) => {
        let x = await dispatch(deleteBookingThunk(booking.id))
        if (x.message) return setModalContent(<h2>Booking successfully cancelled</h2>)
        else setModalContent(<h2>Something went wrong, booking was not cancelled</h2>)
    }

    return (
        <div>
            <h2>Reservations</h2>
            <div>
                <h4>These are your current bookings for this location</h4>
                {Object.values(bookings).filter(el => el.userId === user?.id).map(el => (
                    // <EditBooking booking={el} bookings={bookings} user={user} setDates={setDates} key={el.id}/>
                    <div key={el.id}>
                        <div>{el.startDate.slice(0, 10)} - {el.endDate.slice(0, 10)}</div>
                        {Date.now() < new Date(el.startDate) ?
                        <>
                        <button onClick={() => editBooking(el)}>Edit / Cancel booking</button>
                        </>
                        :
                        <div>Reservation has begun and can no longer be cancelled</div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingModal;
