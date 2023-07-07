// @ts-nocheck
import React, { useRef, useEffect, useContext, useState } from "react";
import mapboxgl, { LngLatLike, Map, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { convertToGeoJSON } from "../../../utils/convertToGeoJson";
import customMarkerImg from "../../../../public/hop.png";
import customMarkerImgWine from "../../../../public/wine.png";

export function BreweriesMap({
  breweries,
  setSelectedBrewery,
  selectedBrewery,
}: any) {
  const geoJSONBreweries = convertToGeoJSON(breweries, "brewery");
  const geoJSONWineries = convertToGeoJSON(breweries, "winery");

  const [selectedPoint, setSelectedPoint] = useState(null);
  const popupRef = useRef(new mapboxgl.Popup({ closeOnClick: false }));

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
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-121.31, 44.06],
      zoom: 12,
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (selectedBrewery) {
      flyToCoords(selectedBrewery?.lat, selectedBrewery?.long);
    }
  }, [selectedBrewery]);

  const flyToCoords = (long, lat) => {
    map.current?.flyTo({
      center: [Number(lat), Number(long)],
      zoom: 16,
      duration: 2000,
      essential: true,
    });
  };

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
      popupRef.current
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    } else {
      popupRef.current.remove();
    }
  }, [selectedPoint]);

  useEffect(() => {
    if (!map.current) return;

    map.current.on("load", () => {
      if (!map.current?.getSource("breweries")) {
        map.current?.addSource("breweries", {
          type: "geojson",
          data: geoJSONBreweries,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });
        map.current?.loadImage(customMarkerImg, (error, image) => {
          if (error) throw error;
          if (!map.current?.hasImage("custom-marker")) {
            map.current?.addImage("custom-marker", image);
            map.current?.addLayer({
              id: "unclustered-breweries",
              type: "symbol",
              source: "breweries",
              filter: ["!has", "point_count"],

              layout: {
                "icon-image": "custom-marker",
              },
            });
            map.current?.on("click", "unclustered-breweries", (e) => {
              const coordinates = e.features[0].geometry.coordinates.slice();
              const brewery = e.features[0].properties;
              // setSelectedBrewery(brewery);
              setSelectedPoint({
                coordinates: coordinates,
                brewery: brewery,
              });
            });

            map.current?.addLayer({
              id: "clusters",
              type: "circle",
              source: "breweries",
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
              source: "breweries",
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

            map.current?.on("click", "clusters", (e) => {
              const features = map.current.queryRenderedFeatures(e.point, {
                layers: ["clusters"],
              });
              const clusterId = features[0].properties.cluster_id;

              map.current
                .getSource("breweries")
                .getClusterExpansionZoom(clusterId, (err, zoom) => {
                  if (err) return;

                  map.current.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom,
                  });
                });
            });
            map.current?.addControl(
              new mapboxgl.GeolocateControl({
                positionOptions: {
                  enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserHeading: true,
              })
            );
          }
        });

        // WINE TIME
        map.current?.addSource("wineries", {
          type: "geojson",
          data: geoJSONWineries,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });
        map.current?.loadImage(customMarkerImgWine, (error, image) => {
          if (error) throw error;
          if (!map.current?.hasImage("custom-marker-2")) {
            map.current?.addImage("custom-marker-2", image);
            map.current?.addLayer({
              id: "unclustered-wineries",
              type: "symbol",
              source: "wineries",
              filter: ["!has", "point_count"],

              layout: {
                "icon-image": "custom-marker-2",
              },
            });
            map.current?.on("click", "unclustered-wineries", (e) => {
              const coordinates = e.features[0].geometry.coordinates.slice();
              const brewery = e.features[0].properties;
              // setSelectedBrewery(brewery);
              setSelectedPoint({
                coordinates: coordinates,
                brewery: brewery,
              });
            });

            map.current?.addLayer({
              id: "clusters-wineries",
              type: "circle",
              source: "wineries",
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
              id: "cluster-count-wineries",
              type: "symbol",
              source: "wineries",
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

            map.current?.on("click", "clusters-wineries", (e) => {
              const features = map.current.queryRenderedFeatures(e.point, {
                layers: ["clusters"],
              });
              const clusterId = features[0].properties.cluster_id;

              map.current
                .getSource("breweries")
                .getClusterExpansionZoom(clusterId, (err, zoom) => {
                  if (err) return;

                  map.current.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom,
                  });
                });
            });
            map.current?.addControl(
              new mapboxgl.GeolocateControl({
                positionOptions: {
                  enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserHeading: true,
              })
            );
          }
        });
      }
    });
  }, []);
  // useEffect(() => {
  //   if (!map.current) return;

  //   // Update the data source for wineries
  //   if (map.current) {
  //     if (map.current.getSource("wineries")) {
  //       map.current.getSource("wineries").setData(geoJSONWineries);
  //     }
  //   }
  // }, [geoJSONWineries]);
  return <div className="map-container w-full h-full " ref={mapContainer} />;
}

// map.current?.loadImage(customMarkerImg, (error, image) => {
//   if (error) throw error;
//   map.current?.addImage("custom-marker", image);
//   map.current?.addLayer({
//     id: "unclustered-point",
//     type: "symbol",
//     source: "breweries",
//     filter: ["!", ["has", "point_count"]],
//     layout: {
//       "icon-image": "custom-marker",
//       "icon-size": 0.8,
//     },
//   });
// });

//OLD
// map.current?.addLayer({
//   id: "unclustered-point",
//   type: "circle",
//   source: "breweries",
//   filter: ["!", ["has", "point_count"]],
//   paint: {
//     "circle-color": "#11b4da",
//     "circle-radius": 10,
//     "circle-stroke-width": 5,
//     "circle-stroke-color": "#fff",
//   },
// });

// map.current?.addLayer({
//   id: "unclustered-point",
//   type: "symbol",
//   source: "breweries",
//   filter: ["!", ["has", "point_count"]],
//   layout: {
//     "icon-image": "custom-marker", // Specify the custom marker image
//     "icon-size": 1, // Adjust the size of the marker if needed
//     "icon-allow-overlap": true, // Allow markers to overlap
//   },
//   paint: {},
// });

// map.current?.loadImage(customMarkerImg, (error, image) => {
//   if (error) throw error;
//   if (!map.current?.hasImage("custom-marker")) {
//     map.current?.addImage("custom-marker", image);
//   }
// });
