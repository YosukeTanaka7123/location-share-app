import { useState } from "react";
import { MapView } from "./components/Map";

function App() {
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShareLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("お使いのブラウザは位置情報をサポートしていません");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setShowMap(true);
        setLoading(false);
      },
      (error) => {
        setError(`位置情報の取得に失敗しました: ${error.message}`);
        setLoading(false);
      },
      { enableHighAccuracy: true },
    );
  };

  const handleBack = () => {
    setShowMap(false);
  };

  if (showMap && location) {
    return (
      <MapView
        latitude={location.latitude}
        longitude={location.longitude}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <h1 className="text-4xl font-extrabold text-orange-900 mb-4 text-center">
        ロケシェア
      </h1>
      <p className="text-orange-700 mb-8 text-lg text-center">
        友達や家族と位置情報を共有しましょう。
      </p>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
          {error}
        </div>
      )}
      <button
        type="button"
        className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-md"
        onClick={handleShareLocation}
        disabled={loading}
      >
        {loading ? "位置情報を取得中..." : "位置情報を共有する"}
      </button>
    </div>
  );
}

export default App;
