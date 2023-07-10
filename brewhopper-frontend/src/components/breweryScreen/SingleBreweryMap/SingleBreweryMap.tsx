import { useRef, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFsdGhhemFyZWx5IiwiYSI6ImNrZzQ3YjMxcjBocTcyc2xwMG96MGQ4Y24ifQ.SHxeF6FTzlNpMSnfGz-qqg";

interface SingleBreweryMapProps {
  lat: number;
  long: number;
}

export function SingleBreweryMap({ lat, long }: SingleBreweryMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  // const [zoom, setZoom] = useState<number>(10);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [long, lat],
      zoom: 15,
    });

    // const marker = new Marker().setLngLat([long, lat]).addTo(map.current);
  }, [long, lat, 10]);

  return <div className="map-container w-full h-full" ref={mapContainer} />;
}
