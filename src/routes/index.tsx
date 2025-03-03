import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  const handleShareLocation = () => {
    navigate({ to: "/share" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <h1 className="text-4xl font-extrabold text-orange-900 mb-4 text-center">
        ロケシェア
      </h1>
      <p className="text-orange-700 mb-8 text-lg text-center">
        友達や家族と位置情報を共有しましょう。
      </p>
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
