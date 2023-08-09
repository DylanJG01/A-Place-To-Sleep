import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker } from '@mui/x-date-pickers';
import {deleteBookingThunk, editSpotBookingsThunk, getUserBookingsThunk } from '../../store/bookings'
import getBookingDates from "./_helpers";
import { useModal } from "../../context/Modal";

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc)

const EditBooking = ({booking, bookings}) => {
    const dispatch = useDispatch()
    const [disabledDates, setDisabledDates] = useState([])
    const [newStartDate, setNewStartDate] = useState(dayjs(booking.startDate).add(1, 'day'))
    const [newEndDate, setNewEndDate] = useState(dayjs(booking.endDate).add(1, 'day'))
    const [maxDate, setMaxDate] = useState(null)
    const [minDate, setMinDate] = useState(dayjs(Date.now()).add(2, 'day'))

    const {setModalContent, closeModal} = useModal()

    useEffect(() => {
    const bookingsExceptEdit = Object.values(bookings).filter(el => el.id !== booking.id)
    setDisabledDates(getBookingDates(bookingsExceptEdit))
    }, [bookings])


    const startDateFunc = (startDate) => {
        setNewStartDate(startDate)
        setMinDate(dayjs(startDate).add(1, 'day'))
        for (let i = 0; i < 21; i++){
            if (isUnavailableDay(dayjs(startDate).add(i, 'day'))) return setMaxDate(dayjs(startDate).add(i, 'day'))
        }
        setMaxDate(dayjs(startDate).add(21, 'day'))
    }

    const bookMe = async () => {
        const bookingData = {
            startDate: newStartDate.format('YYYY-MM-DD'),
            endDate: newEndDate.format('YYYY-MM-DD'),
            startId: booking.startId,
            id: booking.id,
            userId: booking.userId
        }
        if (!(newStartDate.format('YYYY-MM-DD') < newEndDate.format('YYYY-MM-DD'))){
            return alert("Start date must proceed end date")
        }
        let x = await dispatch(editSpotBookingsThunk(bookingData, booking.spotId))
        if (x){
            setModalContent(
            <div className="success-booking-update">
                    <h3>Booking successfully updated to</h3>
                    <p>Start Date: {x.startDate.slice(0, 10)}</p>
                    <p>End Date: {x.endDate.slice(0, 10)}</p>
                    <div className="close" onClick={closeModal}>Close</div>
            </div>)
        }

    }
    const isUnavailableDay = (date) => {
        return disabledDates.reduce((acc, el)=> {
             if (date.get('day') === dayjs(el).get('day')
             && date.get('month') === dayjs(el).get('month')
             && date.get('week') === dayjs(el).get('week')
             && date.get('year') === dayjs(el).get('year')) {
                acc = true
             }
            return acc
         }, false)
    }

    const deleteBooking = async (e) => {
        let x = await dispatch(deleteBookingThunk(booking.id))
        if (x.message) {
            // setTimeout(() => closeModal(), 1000)
            return setModalContent(
                    <div className="successful-delete-modal">
                        <h2 className="booking-delete" onClick={closeModal}>Booking successfully cancelled</h2>
                        <button className="close-delete-modal" onClick={closeModal}>Close</button>
                </div>)
        }
        else setModalContent(<h2>Something went wrong, booking was not cancelled</h2>)
    }

    return (
        <div className="edit-booking-div">
        <h3>Edit Booking</h3>

        <DatePicker
        label="Start Date"
        value={newStartDate}
        onChange={(newStartDate) => startDateFunc(newStartDate)}
        shouldDisableDate={isUnavailableDay}
        minDate={dayjs(Date.now()).add(1, 'day')}
        views={['year', 'month', 'day']}
        />

        <DatePicker
        label="End Date"
        value={newEndDate}
        onChange={(newEndDate) => setNewEndDate(newEndDate)}
        minDate={minDate}
        maxDate={maxDate}
        shouldDisableDate={isUnavailableDay}
        views={['year', 'month', 'day']}
        />

        {(dayjs(booking.startDate)) > dayjs(Date.now()) ?
        <div className="another-name">
        <button className="edit-delete-booking-button" disabled={!newStartDate || !newEndDate } onClick={() => bookMe()}>Update Booking</button>
        <button className="edit-delete-booking-button" onClick={deleteBooking}>Delete booking</button>
        </div> :
        dayjs(booking.endDate) < dayjs(Date.now()) ? <>Booking Complete!</>
        :
        <>Booking in progress</>
        }

        </div>
    )
}


export default EditBooking
