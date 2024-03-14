import { useRef, useEffect } from "react";
import "./Map.css"
export default function Map(){
  const ref = useRef();
  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      zoom: 4,
      center: { lat: -25.363, lng: 131.044 },
    });
  });

  return <div ref={ref} id="map" />;
}