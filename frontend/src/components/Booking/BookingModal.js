import React, { useState } from "react";
import { editSpotBookingsThunk } from '../../store/bookings'

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import EditBooking from "./EditBooking";


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

    return (
        <div className="booking-modal">
            <h2>Reservations</h2>
            <div className="bookings-list">
                <h4>These are your current bookings for this location</h4>
                {Object.values(bookings).filter(el => el.userId === user?.id).map(el => (
                    // <EditBooking booking={el} bookings={bookings} user={user} setDates={setDates} key={el.id}/>
                    <div key={el.id}>
                        <div className="booking-dates">{el.startDate.slice(0, 10)} - {el.endDate.slice(0, 10)}</div>
                        {Date.now() < new Date(el.startDate) ?
                        <>
                        <button className='edit-delete-button' onClick={() => editBooking(el)}>Edit / Cancel booking</button>
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
