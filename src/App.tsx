import "./App.css";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-50">
      <h1 className="text-4xl font-extrabold text-orange-900 mb-4">
        Location Share App
      </h1>
      <p className="text-orange-700 mb-8 text-lg">
        Share your location with friends and family.
      </p>
      <button className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-xl shadow-md">
        Share Location
      </button>
    </div>
  );
}

export default App;
