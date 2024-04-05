import { useRef, useEffect, useLayoutEffect } from "react";
import "./Map.css"
export default function Map({lat, lng}){
  const ref = useRef();
  // console.log(process.env.REACT_APP_MAP_API_KEY)
  console.log(useLayoutEffect, lng)

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      zoom: 4,
      center: { lat, lng },
    });
  });

  return <div ref={ref} id="map" />;
}