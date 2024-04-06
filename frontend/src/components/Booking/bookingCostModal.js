
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function BookingModal({ booking }) {
    const dispatch = useDispatch();
    const { closeModal, setModalContent } = useModal();

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
        <div className="booking-modal">
            <h2>Reservations</h2>
            <div className="bookings-list">
                <h4>These are your current bookings for this location</h4>
            </div>
        </div>
    );
}

export default BookingModal;
