function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
      <h1 className="text-4xl font-extrabold text-orange-900 mb-4">
        ロケシェア
      </h1>
      <p className="text-orange-700 mb-8 text-lg">
        友達や家族と位置情報を共有しましょう。
      </p>
      <button
        type="button"
        className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-xl shadow-md"
      >
        位置情報を共有する
      </button>
    </div>
  );
}

export default App;
