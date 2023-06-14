import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker } from '@mui/x-date-pickers';
import { addBookingThunk, getSpotBookingsThunk } from '../../store/bookings'
import getBookingDates from "./_helpers";

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc');

const Booking = ({spotId}) => {
    const bookings = useSelector(state => state.bookings.spotBookings.Bookings)
    const dispatch = useDispatch()
    const [disabledDates, setDisabledDates] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [maxDate, setMaxDate] = useState(dayjs(Date.now()))

    useEffect(() => {
        dispatch(getSpotBookingsThunk(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
    setDisabledDates(getBookingDates(bookings))
    }, [bookings])

    const bookMe = async () => {
        const bookingData = {
            startDate: startDate.format('YYYY-MM-DD'),
             endDate: endDate.format('YYYY-MM-DD')
        }
        if (!(startDate.format('YYYY-MM-DD') < endDate.format('YYYY-MM-DD'))){
            return alert("Start date must proceed end date")
        }
        await dispatch(addBookingThunk(bookingData, spotId))

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

    const setDates = (startDate) => {
        setStartDate(startDate)
        for (let i = 0; i < 21; i++){
            if (isUnavailableDay(dayjs(startDate).add(i, 'day'))) return setMaxDate(dayjs(startDate).add(i, 'day'))
        }
        console.log("!!!")
        setEndDate(null)
        setMaxDate(dayjs(startDate).add(21, 'day'))
    }

    return (
        <>
        <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(startDate) => setDates(startDate)}
        shouldDisableDate={isUnavailableDay}
        minDate={dayjs(Date.now()).add(1, 'day')}
        views={['year', 'month', 'day']}
        />

        <DatePicker
        label="End Date"
        value={endDate}
        onChange={(endDate) => setEndDate(endDate)}
        minDate={dayjs(startDate).add(1, 'day')}
        maxDate={maxDate}
        shouldDisableDate={isUnavailableDay}
        views={['year', 'month', 'day']}
        />

        <button disabled={!(startDate) || !(endDate)} onClick={() => bookMe()}>Book me!</button>
        </>
    )
}


export default Booking
