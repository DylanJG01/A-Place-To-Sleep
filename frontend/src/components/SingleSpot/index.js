import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleSpot } from '../../store/spots';
import { useEffect } from 'react'
import ReviewsBySpot from '../ReviewsBySpot';
import AddReview from '../AddReview';
import './SingleSpot.css'

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const singleSpot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch, spotId])

    console.log("SIGNLE SPOT", Object.values(singleSpot).length)
    
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

    return (
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
    )
}  


export default SingleSpot