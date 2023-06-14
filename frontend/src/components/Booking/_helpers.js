const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc)

export default function getBookingDates(bookings) {
    const dates = [];
    bookings?.forEach(booking => {
      const bookingDates = getDates(booking.startDate, booking.endDate);
      dates.push(...bookingDates);
    });
    return dates;
}

function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate)
    const finalDate = new Date(endDate)
    while (currentDate <= finalDate) {
      const x = new Date(currentDate)
      dates.push(dayjs.utc(x));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
