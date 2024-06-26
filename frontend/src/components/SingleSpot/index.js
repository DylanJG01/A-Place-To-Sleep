import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleSpot } from '../../store/spots';
import { useEffect, useState } from 'react'
import ReviewsBySpot from '../ReviewsBySpot';
import AddReview from '../AddReview';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import Booking from '../Booking'
import './SingleSpot.css'
import Map from '../GoogleMap'

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [loaded, setLoaded] = useState(false)
    const [singleSpot, user, reviews] = useSelector(state => [state.spots.singleSpot, state.session.user, Object.values(state.reviews.spot)])

    useEffect(() => {
        const load = async () => {
            await dispatch(getSingleSpot(spotId))
            setLoaded(true)
        }
        load()
    }, [dispatch, spotId])

    let previewImg = "";
    const otherImgs = []

    if(Object.values(singleSpot).length){
    previewImg = singleSpot.SpotImages
    previewImg = previewImg[0].url
     for(let i = 1; i < 5; i++) {
        if(singleSpot.SpotImages[i])
        otherImgs.push(singleSpot.SpotImages[i].url)
     }
    }

    const avgRating = (reviews) =>{
        let total = 0;
        let count = 0;
        reviews.forEach(el => {
            count++;
            total += el.stars})
        if (!total) return;

        if ((Math.round((total / count) * 100) / 100) % 1 === 0) return (Math.round((total / count) * 100) / 100).toFixed(1)
        return (Math.round((total/count) * 100) / 100).toFixed(2)}

    if(!loaded) return <>Loading Content, please be patient, you wonderful, beautiful human creature.</>
    if (loaded && !Object.values(singleSpot).length) return <>Page Not Found, Page Might Not Exist!</>

    return (
        <div className='single-spot-page'>
            <h2>{singleSpot.name}</h2>
            <h4>{singleSpot.city}, {singleSpot.state}, {singleSpot.country} </h4>
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
        <div className='hosted-by-and-reserve-div'>
            <div className='host-and-description'>
                <h2>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</h2>
                    <p>{singleSpot.description}</p>
            </div>
            <div className='reserve-div'>
                <div className='price-and-review'>
                     <div className='single-spot-price'>${singleSpot.price && (singleSpot.price).toFixed(2)
                     }<h5> night</h5></div>
                     <div className='single-spot-review'>
                            <i className="fas fa-sharp fa-solid fa-star" />
                            {reviews.length ? avgRating(reviews) : "New"}
                            {reviews.length ? (<p className='dot'>·</p>) : ""}
                        <div className='review-number'>
                            {reviews.length ? reviews.length === 1 ? "1 review" : `${reviews.length} reviews` : ""}
                        </div>
                    </div>
                </div>
                {/* <div className='reserve-button-div'><button onClick={() => alert("Feature Coming Soon...")}>Register</button></div>
                 */}
                { user && singleSpot?.ownerId !== user.id ?
                    <Booking spotId={spotId}/> :
                    user ?
                    <div>You own this property.</div> :
                    <div>Log in to reserve spot.</div>

                }

            </div>
        </div>
        <div className='above-post-review'>
            <i className="fas fa-sharp fa-solid fa-star" />
            {reviews.length ? avgRating(reviews) : "New"}
            {reviews.length ? (<p className='dot'>·</p>) : ""}
            <div className='review-number'>
                {reviews.length ? reviews.length === 1 ? "1 review" : `${reviews.length} reviews` : ""}
            </div>
        </div>
       <div className='reviews-div'>
            {user && !Object.values(reviews).find(review => review.userId === user?.id) &&
                singleSpot?.Owner.id !== user?.id &&
            <button className="delete-button post-review-button">
                <OpenModalMenuItem
                    itemText="Post Your Review"
                    modalComponent={<AddReview spotId={spotId} user={user} />}
                />
            </button>}
            {!reviews.length && user &&
            singleSpot.Owner.id !== user.id &&
            !Object.values(reviews).find(review => review.userId === user.id)
            && <>Be the first to post a review!</>}
            <div>
                <ReviewsBySpot />
           </div>
        </div>
        <Map lat={singleSpot.lat} lng={singleSpot.lng}/>
        </div>
    )
}

export default SingleSpot
