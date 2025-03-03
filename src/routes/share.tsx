import ReactMapGL, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const TokyoStation = {
  latitude: 35.681236,
  longitude: 139.767125,
};

export const Route = createFileRoute("/share")({
  component: Share,
});

function Share() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: TokyoStation.latitude,
    longitude: TokyoStation.longitude,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 5000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <ReactMapGL
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          ...location,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker longitude={location.longitude} latitude={location.latitude} />
      </ReactMapGL>

      {/* 戻るボタン */}
      <button
        type="button"
        className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-10"
        onClick={() => history.back()}
      >
        ← 戻る
      </button>
    </div>
  );
}
