import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          navigate({
            to: "/share",
            search: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError("位置情報の利用が許可されていません。");
          } else {
            setError("位置情報の取得に失敗しました。");
          }
        }
      );
    } else {
      setError("お使いのブラウザは位置情報に対応していません。");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <h1 className="text-4xl font-extrabold text-orange-900 mb-4 text-center">
        ロケシェア
      </h1>
      <p className="text-orange-700 mb-8 text-lg text-center">
        友達や家族と位置情報を共有しましょう。
      </p>
      {error && (
        <div className="text-red-500 mb-4 bg-red-100 border-red-500 border rounded-md p-4 w-full max-w-md overflow-x-auto">
          {error}
        </div>
      )}
      <button
        type="button"
        className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-md"
        onClick={handleShareLocation}
      >
        位置情報を共有する
      </button>
    </div>
  );
}
