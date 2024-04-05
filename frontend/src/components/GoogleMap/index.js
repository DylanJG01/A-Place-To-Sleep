import { useRef, useEffect, useLayoutEffect } from "react";
import "./Map.css"
export default function Map({lat, lng}){
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      zoom: 4,
      center: { lat, lng },
    });
  });

  return <div ref={ref} id="map" />;
}