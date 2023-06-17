import React, { useState, useEffect } from "react";
import { editSpotBookingsThunk } from "../../store/bookings"
import { useDispatch } from "react-redux";
import { DatePicker } from '@mui/x-date-pickers';
import { useModal } from "../../context/Modal";
import EditBooking from "./EditBooking";
// const dayjs = require('dayjs')

//

function BookingModal({ bookings, user }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
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

    return (
        <div>
            <h1>Reserve</h1>
            <h3>Book lot!</h3>
            <div>
                <h3>These are your current bookings for this location</h3>
                {bookings.filter(el => el.userId === user?.id).map(el => (
                    <EditBooking booking={el} bookings={bookings} user={user} key={el.id}/>
                ))}

            </div>

        </div>
    );
}

export default BookingModal;
