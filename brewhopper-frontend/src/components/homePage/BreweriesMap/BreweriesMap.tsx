// @ts-nocheck
import React, { useRef, useEffect, useContext, useState } from "react";
import mapboxgl, { LngLatLike, Map, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { convertToGeoJSON } from "../../../utils/convertToGeoJson";
import customMarkerImg from "../../../../public/hop.png";

export function BreweriesMap({
  breweries,
  setSelectedBrewery,
  selectedBrewery,
}: any) {
  const geoJSON = convertToGeoJSON(breweries);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const popupRef = useRef(new mapboxgl.Popup({ closeOnClick: false }));

  // const [selectedBrewery, setSelectedBrewery] = useState();
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
      center: [-121.31, 44.06],
      zoom: 12,
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    console.log(geoJSON, "selectedBrewery");
  }, [geoJSON]);

  useEffect(() => {
    if (selectedPoint) {
      const { coordinates, brewery } = selectedPoint;
      const popupContent = `
      <div class="py-2 px-4">
        <h3 class="text-lg font-bold">${brewery.name}</h3>
        <p class="mt-1">${brewery.address}</p>
        <p class="font-bold">${brewery.phone_number}</p>
      </div>
      `;

      // Set the popup coordinates and content
      popupRef.current
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    } else {
      // If no point is selected, remove the popup from the map
      popupRef.current.remove();
    }
  }, [selectedPoint]);

  useEffect(() => {
    if (!map.current) return;

    map.current.on("load", () => {
      if (!map.current?.getSource("earthquakes")) {
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
              "#93BF60",
              100,
              "#93BF60",
              750,
              "#93BF60",
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

        // map.current?.addLayer({
        //   id: "unclustered-point",
        //   type: "circle",
        //   source: "earthquakes",
        //   filter: ["!", ["has", "point_count"]],
        //   paint: {
        //     "circle-color": "#11b4da",
        //     "circle-radius": 8,
        //     "circle-stroke-width": 1,
        //     "circle-stroke-color": "#fff",
        //   },
        // });

        map.current?.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          })
        );
        map.current.on("click", "clusters", (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
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
          const brewery = e.features[0].properties;
          setSelectedBrewery(brewery);
          setSelectedPoint({
            coordinates: coordinates,
            brewery: brewery,
          });
        });
      }
    });
  }, []);

  return <div className="map-container w-full h-full " ref={mapContainer} />;
}
