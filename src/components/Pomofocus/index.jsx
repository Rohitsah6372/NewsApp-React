import React, { useEffect, useRef, useState } from "react";

const Pomofocus = () => {
  const [id, setId] = useState(0);
  const [time, setTime] = useState({ min: 25, sec: 0 });
  const [title, setTitle] = useState("Pomofocus");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const { min, sec } = prev;
          if (min === 0 && sec === 0) {
            clearInterval(intervalRef.current);
            return { min: 0, sec: 0 };
          } else if (sec === 0) {
            return { min: min - 1, sec: 59 };
          } else {
            return { min: min, sec: sec - 1 };
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleClick = () => setIsRunning((prev) => !prev);

  const handleNext = () => {
    const nextId = (id + 1) % 3;
    setId(nextId);

    const times = [
      { min: 25, sec: 0 },
      { min: 5, sec: 0 },
      { min: 15, sec: 0 },
    ];

    const titles = ["Pomofocus", "Short Break", "Long Break"];

    setTime(times[nextId]);
    setTitle(titles[nextId]);
    setIsRunning(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 via-yellow-100 to-green-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-80 text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

        <div className="text-6xl font-mono text-gray-700">
          {String(time.min).padStart(2, "0")} :{" "}
          {String(time.sec).padStart(2, "0")}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomofocus;
