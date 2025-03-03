import ReactMapGL, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useEffect, useState } from "react";
import { z } from "zod";

const shareSearchSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const Route = createFileRoute("/share")({
  component: Share,
  validateSearch: zodValidator(shareSearchSchema),
});

function Share() {
  const { latitude, longitude } = Route.useSearch();

  const [currentLocation, setCurrentLocation] = useState<{
    longitude: number;
    latitude: number;
  }>({
    longitude,
    latitude,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <ReactMapGL
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: currentLocation.longitude,
          latitude: currentLocation.latitude,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker {...currentLocation} />
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
