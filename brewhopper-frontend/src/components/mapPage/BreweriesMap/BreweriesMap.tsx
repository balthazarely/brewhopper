// @ts-nocheck
import React, { useRef, useEffect, useContext, useState } from "react";
import mapboxgl, { LngLatLike, Map, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { convertToGeoJSON } from "../../../utils/convertToGeoJson";
import customMarkerImg from "../../../../public/hop.png";
import customMarkerImgWine from "../../../../public/wine.png";
import { Brewery } from "../../../types";

interface BreweriesMapProps {
  breweries: Brewery[];
  setSelectedBrewery: (state: Brewery) => void;
  selectedBrewery: Brewery | null;
  sortFilterBy: string;
}

export function BreweriesMap({
  breweries,
  setSelectedBrewery,
  selectedBrewery,
  sortFilterBy,
}: BreweriesMapProps) {
  const geoJSONBreweries = convertToGeoJSON(breweries, "brewery");
  const geoJSONWineries = convertToGeoJSON(breweries, "winery");

  const [selectedPoint, setSelectedPoint] = useState(null);
  const popupRef = useRef(new mapboxgl.Popup({ closeOnClick: false }));

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-105.9);
  const [lat, setLat] = useState(39.35);
  const [zoom, setZoom] = useState(10);
  const [styleDataSet, setStyleDataSet] = useState(false);

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
        map.current?.addLayer({
          id: "unclustered-breweries",
          type: "circle",
          source: "breweries",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#93BF60",
            "circle-radius": 10,
            "circle-stroke-width": 5,
            "circle-stroke-color": "#fff",
          },
        });
        map.current?.on("click", "unclustered-breweries", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const brewery = e.features[0].properties;
          setSelectedPoint({
            coordinates: coordinates,
            brewery: brewery,
          });
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
        map.current?.on("styledata", () => {
          setStyleDataSet(true);
        });
      }
      // WINE TIME
      if (!map.current?.getSource("wineries")) {
        map.current?.addSource("wineries", {
          type: "geojson",
          data: geoJSONWineries,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });
        map.current?.addLayer({
          id: "clusters-wine",
          type: "circle",
          source: "wineries",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#ad0b09",
              100,
              "#ad0b09",
              750,
              "#ad0b09",
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
        map.current?.addLayer({
          id: "unclustered-wineries",
          type: "circle",
          source: "wineries",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#ad0b09",
            "circle-radius": 10,
            "circle-stroke-width": 5,
            "circle-stroke-color": "#fff",
          },
        });
        map.current?.on("click", "unclustered-wineries", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const brewery = e.features[0].properties;
          setSelectedPoint({
            coordinates: coordinates,
            brewery: brewery,
          });
        });
        map.current?.on("click", "clusters-wine", (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ["clusters-wine"],
          });
          const clusterId = features[0].properties.cluster_id;

          map.current
            .getSource("wineries")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              map.current.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });
      }
    });
  }, []);

  const flyToCoords = (long, lat) => {
    map.current?.flyTo({
      center: [Number(lat), Number(long)],
      zoom: 16,
      duration: 2000,
      essential: true,
    });
  };

  const visibilityLookup = {
    brewery: {
      clusters: "visible",
      "unclustered-breweries": "visible",
      "clusters-wine": "none",
      "unclustered-wineries": "none",
    },
    winery: {
      clusters: "none",
      "unclustered-breweries": "none",
      "clusters-wine": "visible",
      "unclustered-wineries": "visible",
    },
    all: {
      clusters: "visible",
      "unclustered-breweries": "visible",
      "clusters-wine": "visible",
      "unclustered-wineries": "visible",
    },
  };

  const toggleCategory = (str, property) => {
    map.current?.setLayoutProperty(str, "visibility", property);
  };

  useEffect(() => {
    if (map.current && styleDataSet) {
      const visibility = visibilityLookup[sortFilterBy];

      if (visibility) {
        for (const category in visibility) {
          toggleCategory(category, visibility[category]);
        }
      }
    }
  }, [sortFilterBy, styleDataSet]);

  return <div className="map-container w-full h-full" ref={mapContainer} />;
}
