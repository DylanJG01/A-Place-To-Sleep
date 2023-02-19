import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from 'react'
import { addReviewThunk } from '../../store/reviews'

// export default function AddReviewModal() {
//     const dispatch = useDispatch();
//     const { closeModal } = useModal()
//     const [reviewText, setReviewText] = useState('');

//     // console.log(spot)

//     const postReview = (review) => { //we need spot, too!
//         dispatch(addReviewThunk(review))
//             .then(closeModal)
//     }

//     return (
//         <>
//             <div className="review-spot-modal-div">
//                 <h1>Review</h1>
//                 <h3>How was your stay?</h3>     
//                 <form>
//                     <label>
//                         <div className={'flx'}>
//                             <h5>
//                                 Country
//                             </h5>
//                         </div>
//                         <input
//                             className="reviewText"
//                             type="text"
//                             value={reviewText}
//                             onChange={(e) => setReviewText(e.target.value)}
//                             placeholder="How was your stay?"
//                         // required
//                         />
//                     </label>
//                     <button onClick={() => console.log("Clicky")}>Post Review</button>
//                 </form>
//             </div>
//         </>
//     )
// }