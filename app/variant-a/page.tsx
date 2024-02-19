"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [keyCount, setKeyCount] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [averageTypingSpeed, setAverageTypingSpeed] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setStartTime(Date.now()); // Record the start time when the component mounts
  }, []);
  const startTimer = () => {
    setStartTime(Date.now());
  };

  const stopTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    setElapsedTime(Date.now() - (startTime || 0));
  };

  const updateTime = () => {
    const currentTime = Date.now();
    const elapsedTimeInSeconds = (currentTime - (startTime || 0)) / 1000;
    setElapsedTime(elapsedTimeInSeconds);
  };

  const handleInputClick = () => {
    startTimer();
  };

  const handleSubmit = () => {
    // Check if all fields are filled out
    if (day && month && year) {
      setIsModalVisible(true);

      stopTimer();
      const currentTime = Date.now();
      const timeTakenInSeconds = (currentTime - (startTime || 0)) / 1000;

      setTimeTaken(timeTakenInSeconds); // Update the timeTaken state
      if (timeTakenInSeconds && keyCount > 0) {
        const speed = (keyCount + backspaceCount) / timeTakenInSeconds;
        setAverageTypingSpeed(parseFloat(speed.toFixed(2)));
      }

      const date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      console.log(date); // Dispatch or handle the date as needed
      console.log(isModalVisible);
    } else {
      alert("Please fill out all fields before submitting.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [46, 8, 9, 27, 13, 110, 190];
    const ctrlKeys = [65, 67, 86, 88];
    const isCtrlPressed = event.ctrlKey || event.metaKey;
    const isSpecialKey =
      allowedKeys.includes(event.keyCode) ||
      (ctrlKeys.includes(event.keyCode) && isCtrlPressed);
    const isNavigationKey = event.keyCode >= 35 && event.keyCode <= 40;
    const isNumericInput =
      (!event.shiftKey && event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105);

    if (event.keyCode === 8) setBackspaceCount(backspaceCount + 1);

    if (!(isSpecialKey || isNavigationKey || isNumericInput)) {
      event.preventDefault();
    } else {
      setKeyCount(keyCount + 1);
    }
  };

  const navigateToVariantB = () => {
    console.log("Navigating to Variant B...");
    window.location.href = "/variant-b"; // Navigate to Variant B Page
    console.log("Navigation complete.");
  };

  return (
    <div className="text-center mt-5">
      <h1>Enter your Birthday</h1>

      <div className="form-group date-picker">
        <div className="form-group">
          <label htmlFor="day">Day</label>
          <input
            value={day}
            onChange={(e) => setDay(e.target.value)}
            id="day"
            className="date-picker--day"
            type="number"
            min="1"
            max="31"
            placeholder="dd"
            maxLength={2}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="form-group">
          <label htmlFor="month">Month</label>
          <input
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            id="month"
            className="date-picker--month"
            type="number"
            min="1"
            max="12"
            placeholder="mm"
            maxLength={2}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            id="year"
            className="date-picker--year"
            type="number"
            placeholder="yyyy"
            maxLength={4}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            style={{ width: "80px" }}
          />
        </div>
      </div>

      {isModalVisible && (
        <div className="new-notification-modal" id="newNotificationModal">
          <div className="new-notification-content">
            <h2 style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              Take a screenshot!
            </h2>
            <p>Click below to continue.</p>
            <button className="btn btn-primary" onClick={navigateToVariantB}>
              Continue
            </button>
          </div>
        </div>
      )}

      <div>Key Count: {keyCount}</div>
      <div>Backspace Count: {backspaceCount}</div>
      <div>Time Taken: {(timeTaken || 0 / 1000).toFixed(2)} seconds</div>
      <div>
        Average Typing Speed: {averageTypingSpeed.toFixed(2)} keys per second
      </div>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Page;
