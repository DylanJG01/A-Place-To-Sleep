import { useRef, useEffect } from "react";

export default function Map({
  center,
}
// : {
//   center: google.maps.LatLngLiteral;
//   zoom: number;
// }
){
  const ref = useRef();
  console.log("huh?")
  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      zoom: 4,
      center: { lat: -25.363, lng: 131.044 },
    });
  });

  return <div ref={ref} id="map" />;
}