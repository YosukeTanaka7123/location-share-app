import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapView } from "../components/Map";

export const Route = createFileRoute("/share")({
  component: Share,
});

function Share() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(`位置情報の取得に失敗しました: ${error.message}`);
        },
        { enableHighAccuracy: true },
      );
    } else {
      console.error("お使いのブラウザは位置情報をサポートしていません");
    }
  }, []);

  if (!location) {
    return <div>位置情報を取得中...</div>;
  }

  return (
    <MapView
      latitude={location.latitude}
      longitude={location.longitude}
      onBack={() => {}}
    />
  );
}
