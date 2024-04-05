export default function _avgRating(blob){
    let total = 0;
    let count = 0;
    for (const key in blob){
        total += (blob[key].stars)
        count++;
    }

    if(count > 0) return avgRating(total/count)

    return 0
}

const avgRating = (num) => (Math.round(num * 100) / 100).toFixed(2)