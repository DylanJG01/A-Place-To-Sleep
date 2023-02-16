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

    console.log("SIGNLE SPOT", singleSpot.SpotImages)
    
    let previewImg = "";
    const otherImgs = []
    
    if(Object.values(singleSpot).length){
     previewImg = singleSpot.SpotImages[0].url

     for(let i = 1; i < 5; i++) {
        otherImgs.push(singleSpot.SpotImages[i])
     }
    }

    return (
        <div>
            <div>
            {singleSpot.name}
            </div>
            <div className='spot-images-div'>
            <div className='preview-image-div'>
                <img className="preview-image" src={previewImg} alt={"Preview"}/>
            </div>
            <div className='other-images-div'>
               <ul>{otherImgs.map((img, idx) => (
                    <li><img src={img.url} alt={`Other ${idx}`}/></li>
               ))}
                </ul> 
            </div>
            </div>
            <div>
                <ReviewsBySpot />
            </div>
        </div>
    )
}  

export default SingleSpot