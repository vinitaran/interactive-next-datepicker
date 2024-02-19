"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [dateInput, setDateInput] = useState("");
  const [keyCount, setKeyCount] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [isBackspacePressed, setIsBackspacePressed] = useState(false);
  const [isTimeStarted, setIsTimeStarted] = useState(false);
  const [isValidDate, setIsValidDate] = useState(false);
  const [errorSummary, setErrorSummary] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Start the timer when the component mounts
    setStartTime(Date.now());
    setIsTimeStarted(true);
  }, []);

  const navigateToVariantB = () => {
    console.log("Navigating to Variant B...");
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLSfN5KSoGmuhVcXFXDH3oUEPKHdj0gL-akc3NcKcvvXsCcY0-w/viewform";
    console.log("Navigation complete.");
  };

  const startTimer = () => {
    setStartTime(Date.now());
    setIsTimeStarted(true);
  };

  const autoFormatDate = (input: string) => {
    let preFormattedInput = input;

    if (input && !isBackspacePressed) {
      preFormattedInput = preFormattedInput.replaceAll("/", "");

      if (preFormattedInput.length > 2) {
        preFormattedInput =
          preFormattedInput.slice(0, 2) +
          "/" +
          preFormattedInput.slice(2, 4) +
          "/" +
          preFormattedInput.slice(4, 8);
      } else if (preFormattedInput.length > 4) {
        preFormattedInput =
          preFormattedInput.slice(0, 4) + "/" + preFormattedInput.slice(4, 8);
      }
    }

    setDateInput(preFormattedInput);
  };

  const onDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    autoFormatDate(value);
    if (!isTimeStarted) startTimer();
  };

  const stopTimer = () => {
    setEndTime(Date.now());
    setIsTimeStarted(false);
  };

  const validateDate = () => {
    if (dateInput) {
      const [day, month, year] = dateInput.split("/");
      const formattedDate = new Date(`${year}-${month}-${day}`);

      if (
        !isNaN(formattedDate.getDate()) &&
        formattedDate.getFullYear() === parseInt(year)
      ) {
        setIsValidDate(true);
        setErrorSummary("");
      } else {
        setIsValidDate(false);
        setErrorSummary("Please enter a valid date in the format DD/MM/YYYY.");
        return; // Do not proceed further if the date is not valid
      }
    } else {
      setIsValidDate(false);
      setErrorSummary("Please enter a date.");
      return; // Do not proceed further if the date is empty
    }

    setIsModalVisible(true);
    stopTimer();
  };

  useEffect(() => {
    // Calculate speed when endTime state updates
    calculateSpeed();
  }, [endTime]);

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;
    setIsBackspacePressed(keyCode === 8);
    if (keyCode === 8) setBackspaceCount(backspaceCount + 1);
    setKeyCount(keyCount + 1);
  };
  const calculateSpeed = () => {
    const timeTakenInSeconds = Math.abs((endTime - startTime) / 1000);

    setTimeTaken(timeTakenInSeconds);

    // Check if timeTakenInSeconds and keyCount are both greater than 0
    if (timeTakenInSeconds > 0 && keyCount > 0) {
      const speed = keyCount / timeTakenInSeconds; // keys per second
      setAverageSpeed(parseFloat(speed.toFixed(2)));
    }
  };

  return (
    <div className="body-variant-b">
      <div className="container">
        <h1>Enter your Birthday</h1>
        <input
          id="dateInput"
          className="date-input"
          type="text"
          placeholder="DD/MM/YYYY"
          value={dateInput}
          onChange={onDateInputChange}
          onKeyDown={keyDown}
        />

        <button className="calculate" onClick={validateDate}>
          Validate
        </button>

        <div className={`error-summary ${isValidDate ? "" : "error"}`}>
          {errorSummary}
        </div>
        <div>Key Count: {keyCount}</div>
        <div>Backspace Count: {backspaceCount}</div>
        <div>Time Taken: {timeTaken} milliseconds</div>
        <div>Average Speed: {averageSpeed.toFixed(2)} keys per second</div>

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
      </div>
    </div>
  );
};

export default Page;
