// @ts-nocheck
import React, { useRef, useEffect, useContext, useState } from "react";
import mapboxgl, { LngLatLike, Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { convertToGeoJSON } from "../utils/convertToGeoJson";
import customMarkerImg from "../../public/teest.png";

export default function Brew({ breweries }: any) {
  const geoJSON = convertToGeoJSON(breweries);
  const [selectedBrewery, setSelectedBrewery] = useState();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-105.9);
  const [lat, setLat] = useState(39.35);
  const [zoom, setZoom] = useState(10);
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiYmFsdGhhemFyZWx5IiwiYSI6ImNrZzQ3YjMxcjBocTcyc2xwMG96MGQ4Y24ifQ.SHxeF6FTzlNpMSnfGz-qqg";
  mapboxgl.accessToken = MAPBOX_TOKEN;
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-103.5917, 40.6699],
      zoom: 3,
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (!map.current) return;

    map.current.on("load", () => {
      map.current?.addSource("earthquakes", {
        type: "geojson",
        data: geoJSON,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });
      map.current?.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });
      map.current?.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 16,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      map.current?.loadImage(customMarkerImg, (error, image) => {
        if (error) throw error;

        map.current?.addImage("custom-marker", image);

        map.current?.addLayer({
          id: "unclustered-point",
          type: "symbol",
          source: "earthquakes",
          filter: ["!", ["has", "point_count"]],
          layout: {
            "icon-image": "custom-marker",
            "icon-size": 0.8,
          },
        });
      });

      map.current.on("click", "clusters", (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        console.log(features);
        const clusterId = features[0].properties.cluster_id;
        map.current
          .getSource("earthquakes")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });
      map.current.on("click", "unclustered-point", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const mag = e.features[0].properties;
        setSelectedBrewery(mag);
      });
    });
  }, []);

  return (
    <div className="relative dashboard">
      <div className="map-container" ref={mapContainer} />
      {selectedBrewery && JSON.stringify(selectedBrewery)}
    </div>
  );
}
