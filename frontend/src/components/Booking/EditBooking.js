
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker } from '@mui/x-date-pickers';
import { addBookingThunk, editSpotBookingsThunk, getSpotBookingsThunk, getUserBookingsThunk } from '../../store/bookings'
import getBookingDates from "./_helpers";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import BookingModal from './BookingModal'

const dayjs = require('dayjs')

const EditBooking = ({ booking, bookings, user}) => {
    const dispatch = useDispatch()
    const [disabledDates, setDisabledDates] = useState([])
    const [newStartDate, setNewStartDate] = useState(dayjs(booking.startDate))
    const [newEndDate, setNewEndDate] = useState(dayjs(booking.endDate))
    const [maxDate, setMaxDate] = useState(dayjs(Date.now()))

    useEffect(() => {
    const bookingsExceptEdit = bookings.filter(el => el.id !== booking.id)
    setDisabledDates(getBookingDates(bookingsExceptEdit))
    }, [bookings])

    const bookMe = async () => {
        const bookingData = {
            startDate: newStartDate.format('YYYY-MM-DD'),
             endDate: newEndDate.format('YYYY-MM-DD')
        }
        if (!(newStartDate.format('YYYY-MM-DD') < newEndDate.format('YYYY-MM-DD'))){
            return alert("Start date must proceed end date")
        }
        await dispatch(editSpotBookingsThunk(bookingData, booking.spotId))
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

    const setDates = (newStartDate) => {
        setNewStartDate(newStartDate)
        for (let i = 0; i < 21; i++){
            if (isUnavailableDay(dayjs(newStartDate).add(i, 'day'))) return setMaxDate(dayjs(newStartDate).add(i, 'day'))
        }
        setNewEndDate(null)
        setMaxDate(dayjs(newStartDate).add(21, 'day'))
    }

    const openModal = () => {
        return <OpenModalMenuItem itemText='fdsafdsa'
            modalComponent={<BookingModal bookings={bookings}/>}
            />
    }

    return (
        <>
        <DatePicker
        label="Start Date"
        value={newStartDate}
        onChange={(newStartDate) => setDates(newStartDate)}
        shouldDisableDate={isUnavailableDay}
        minDate={dayjs(Date.now()).add(1, 'day')}
        views={['year', 'month', 'day']}
        />

        <DatePicker
        label="End Date"
        value={newEndDate}
        onChange={(newEndDate) => setNewEndDate(newEndDate)}
        minDate={dayjs(newStartDate).add(1, 'day')}
        maxDate={maxDate}
        shouldDisableDate={isUnavailableDay}
        views={['year', 'month', 'day']}
        />

        <button disabled={!(newStartDate) || !(newEndDate)} onClick={() => bookMe()}>Edit Booking</button>
        </>
    )
}


export default EditBooking
