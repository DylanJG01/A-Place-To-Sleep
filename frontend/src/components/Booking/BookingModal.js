import React, { useState, useEffect } from "react";
import { editSpotBookingsThunk } from "../../store/bookings"
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
        console.log("!")
        setModalContent(<EditBooking booking={booking} bookings={bookings} user={user} setDates={setDates}/>)
    }

    return (
        <div>
            <h1>Reserve</h1>
            <h3>Book lot!</h3>
            <div>
                <h3>These are your current bookings for this location</h3>
                {bookings.filter(el => el.userId === user?.id).map(el => (
                    // <EditBooking booking={el} bookings={bookings} user={user} setDates={setDates} key={el.id}/>
                    <div key={el.id}>
                        <div>{el.startDate.slice(0, 10)} - {el.endDate.slice(0, 10)}</div>
                        <button onClick={() => editBooking(el)}>Edit booking</button>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default BookingModal;
