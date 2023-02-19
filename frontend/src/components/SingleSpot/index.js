import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleSpot } from '../../store/spots';
import { useEffect } from 'react'
import ReviewsBySpot from '../ReviewsBySpot';
import AddReview from '../AddReview';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './SingleSpot.css'

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [singleSpot, user, reviews] = useSelector(state => [state.spots.singleSpot, state.session.user, Object.values(state.reviews.spot)])

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch, spotId])

    // console.log("SIGNLE SPOT", singleSpot)
    
    let previewImg = "";
    const otherImgs = []

    if(Object.values(singleSpot).length){
    console.log(singleSpot)
    previewImg = singleSpot.SpotImages
    previewImg = previewImg[0].url
     for(let i = 1; i < 5; i++) {
        if(singleSpot.SpotImages[i])
        otherImgs.push(singleSpot.SpotImages[i].url)
     }
    }

    // if (reviews.length){
    //     // for (const review in reviews){
    //     //     console.log(reviews[review].userId === user.id)
    //     // }
    //     console.log("REVIEWS.FIND")
    //     if (reviews.find(review => review.userId === user.id)){
    //         console.log("A flumping flopping flooping fleeping flounderer flounced")
    //     }
    // }
    console.log("USER, REVIEWS", user)

    return (
        <>
        <div className='container-div'>
            <div className='single-spot-div-1'>
                <div className='single-spot-div-2'>
                    <img className="preview-image single-spot-img" src={previewImg} alt={"Preview"} />
                </div>
                <div className='single-spot-div-3'>
                    
                    {otherImgs.map((img, idx) => (
                <div className='single-spot-div' key={idx}><img className='other-image' src={img} alt={`Other ${idx}`}/></div> 
                    ))}
                </div>
            </div>
        </div>
        <div> Host Information</div>
        <div>
                {user && !reviews.find(review => review.userId === user.id) && <button>
                    <OpenModalMenuItem
                        itemText="Post review"
                        modalComponent={<AddReview spotId={spotId} user={user} />}
                    />
                </button>}
            <div>
                <ReviewsBySpot />
           </div>
        </div>
        </> 
    )
}  





    // return (
    //     <div>
    //         <div>
    //         {singleSpot.name}
    //         </div>
    //         <div className='spot-images-span'>
    //             <div className='preview-image-div'>
    //                 <img className="preview-image" src={previewImg} alt={"Preview"}/>
    //             </div>
    //             <div className='other-images-div'>
    //             <ul className='other-images-ul'>{otherImgs.map((img, idx) => (
    //                 <li><img className='other-image' src={img} alt={`Other ${idx}`}/></li>
    //             ))}
    //                 </ul>
    //             </div>
    //         </div>
    //         <div>
    //             <ReviewsBySpot />
    //         </div>
    //     </div>
    // )

export default SingleSpot