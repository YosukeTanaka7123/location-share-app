import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapViewProps {
  longitude: number;
  latitude: number;
  onBack: () => void;
}

export function MapView({ longitude, latitude, onBack }: MapViewProps) {
  return (
    <div className="relative w-full h-screen">
      <ReactMapGL
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude,
          latitude,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker longitude={longitude} latitude={latitude} />
        <NavigationControl />
        <GeolocateControl trackUserLocation />
      </ReactMapGL>

      {/* 戻るボタン */}
      <button
        type="button"
        className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-10"
        onClick={onBack}
      >
        ← 戻る
      </button>
    </div>
  );
}
