import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker } from '@mui/x-date-pickers';
import { addBookingThunk, getSpotBookingsThunk, getUserBookingsThunk } from '../../store/bookings'
import getBookingDates from "./_helpers";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import BookingModal from './BookingModal'
import { useModal } from "../../context/Modal";
import './Booking.css'

const dayjs = require('dayjs')

const Booking = ({spotId}) => {
    const [bookings, user] = useSelector(state => [state.bookings.spotBookings, state.bookings.userBookings, state.session.user])
    const dispatch = useDispatch()
    const [disabledDates, setDisabledDates] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)
    const [minDate, setMinDate] = useState(dayjs(Date.now()).add(2, 'day'))
    const [bookingSuccessful, setBookingSuccessful] = useState(false)
    const {setModalContent, closeModal} = useModal()
    useEffect(() => {
        dispatch(getSpotBookingsThunk(spotId))
        dispatch(getUserBookingsThunk())
    }, [dispatch, spotId])

    useEffect(() => {
        const arr = Object.values(bookings)
        setDisabledDates(getBookingDates(arr))
    }, [bookings])

    useEffect(() => {
    }, [bookingSuccessful])

    const bookMe = async () => {
        if (startDate >= endDate) {
            return alert("End Date cannot be on or before start date")
        }
        if (endDate - startDate > 1814400000) {
            return alert("You may only book a spot for three weeks maximum")
        }

        const bookingData = {
            startDate: startDate.format('YYYY-MM-DD'),
             endDate: endDate.format('YYYY-MM-DD')
        }
        if (!(startDate.format('YYYY-MM-DD') < endDate.format('YYYY-MM-DD'))){
            return alert("Start date must proceed end date")
        }
        let x = await dispatch(addBookingThunk(bookingData, spotId))
        if (x.id) {
            console.log(x)
            setStartDate(null)
            setEndDate(null)
            setModalContent(
                <div className="success-booking-update">
                        <h3>Booking successfull</h3>
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

    const setDates = (startDate) => {
        setStartDate(startDate)
        setMinDate(dayjs(startDate).add(1, 'day'))
        for (let i = 0; i < 21; i++){
            if (isUnavailableDay(dayjs(startDate).add(i, 'day'))) return setMaxDate(dayjs(startDate).add(i, 'day'))
        }
        setMaxDate(dayjs(startDate).add(21, 'day'))
    }

    return (
        <div className="booking-div">
        {bookingSuccessful && <div className="successful-booking">Booking Successful!</div>}
        { bookings && Object.values(bookings).reduce((acc, el) =>  el.userId === user?.id ? true : null, false) &&
            <div className='your-spot-bookings' >
                <button className="delete-button">
                <OpenModalMenuItem itemText="Your current bookings"
                    modalComponent={<BookingModal bookings={bookings} user={user} setDates={setDates}/>}
                    />
                </button>
            </div>
        }
        <div className="date-pickers">
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
            minDate={minDate}
            maxDate={maxDate}
            shouldDisableDate={isUnavailableDay}
            views={['year', 'month', 'day']}
            />
        </div>

        <button className="book-me-button" disabled={!(startDate) || !(endDate)} onClick={() => bookMe()}>Book Spot</button>
        </div>
    )
}


export default Booking
