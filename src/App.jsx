import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10); // Default array size
  const [sortingSpeed, setSortingSpeed] = useState(50); // Default speed in ms
  const [isSorting, setIsSorting] = useState(false);

  // Generate a new array on size change
  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100 + 1)
    );
    setArray(newArray);
  };

  const bubbleSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
        }
      }
    }
    setIsSorting(false);
  };

  const insertionSort = async () => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setIsSorting(false);
  };

  const selectionSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; // Swap
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }
    setIsSorting(false);
  };

  const handleSort = async (type) => {
    setIsSorting(true);
    if (type === "bubble") await bubbleSort();
    if (type === "insertion") await insertionSort();
    if (type === "selection") await selectionSort();
  };

  return (
    <div className="screen">
      <div className="options">
        <h1 className="">Algorithm Visualizer</h1>

        {/* Controls */}
        <div className="sizeSliderDiv">
          <span>Size {arraySize}</span>
          <input
            className="slider"
            type="range"
            min="5"
            max="50"
            disabled={isSorting}
            step={5}
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
          />
        </div>

        <div className="sizeSliderDiv">
          <span>Speed {sortingSpeed}ms</span>
          <input
            className="slider"
            type="range"
            min="10"
            max="500"
            disabled={isSorting}
            step={10}
            value={sortingSpeed}
            onChange={(e) => setSortingSpeed(Number(e.target.value))}
          />
        </div>

        {/* Buttons */}
        <div className="sortTypes">
            <button
              className="btn btn-blue"
              onClick={() => handleSort("bubble")}
              disabled={isSorting}
            >
              Bubble Sort
            </button>
            <button
              className="btn btn-blue"
              onClick={() => handleSort("insertion")}
              disabled={isSorting}
            >
              Insertion Sort
            </button>
            <button
              className="btn btn-blue"
              onClick={() => handleSort("selection")}
              disabled={isSorting}
            >
              Selection Sort
            </button>

            <button
            className="btn"
            onClick={resetArray}
            disabled={isSorting}
          >
            Reset Array
          </button>
        </div>
        </div>

      {/* Array Visualization */}
      <div className="visualizer">
        {array.map((val, idx) => (
          <div
            key={idx}
            className="arrayItem bg-blue-500 inline-block"
            style={{ height: `${val * 3}px`, width: `${1000 / array.length}px` }} // Dynamically set width
          ></div>
        ))}
      </div>

    </div>
  );
};

export default App;
