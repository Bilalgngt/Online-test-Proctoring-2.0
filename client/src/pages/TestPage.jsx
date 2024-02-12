import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../styles/TestPage.css";

function TestPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  const [testDetails, setTestDetails] = useState(null);
  const { testId } = useParams();

  // const initialAnswers = testDetails?.questionSet?.map(() => null);
  const initialAnswers = (testDetails?.questionSet ?? []).map(() => null);

  const [answers, setAnswers] = useState(initialAnswers);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {
      index: optionIndex + 1,
      answer: testDetails?.questionSet[questionIndex]?.options[optionIndex],
    };
    setAnswers(newAnswers);
  };

  const handleClearOption = (questionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = null;
    setAnswers(newAnswers);
  };

  const getTestDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/test/getTestDetails/${testId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Cache-Control': 'no-cache', // Indique de ne pas utiliser le cache
          'Pragma': 'no-cache', // Pour les navigateurs plus anciens
        },      
      });
      if (res.data.success) {
        const test = res.data.test;
        setTestDetails(test);
        message.success("Test details fetched successfully");
      } else {
        message.error("Error in fetching test details");
      }
    } catch (error) {
      message.error("Error in fetching test details");
      console.log(error);
    }
  };

  

  useEffect(() => {

    if (testId) {
      getTestDetails();
    }

    const requestFullScreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };
  
    const handleFullScreenRequest = () => {
      const userConfirmed = window.confirm("Do you want to enter fullscreen mode?");
      if (userConfirmed) {
        requestFullScreen();
        document.removeEventListener("click", handleFullScreenRequest);
      }
      else{
        requestFullScreen();
        document.removeEventListener("click", handleFullScreenRequest);

      }
    };
  
    document.addEventListener("click", handleFullScreenRequest);
  
    return () => {
      document.removeEventListener("click", handleFullScreenRequest);
    };

  }, [testId]);

  useEffect(() => {
    // Met à jour `answers` chaque fois que `testDetails` change
    const initialAnswers = (testDetails?.questionSet ?? []).map(() => null);
    setAnswers(initialAnswers);
  }, [testDetails]);




let tabSwitchCount = parseInt(localStorage.getItem('tabSwitchCount')) || 0;

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === 'visible') {
    tabSwitchCount++;
    localStorage.setItem('tabSwitchCount', tabSwitchCount);
    console.log("Tab switched. Count: ", tabSwitchCount);
  }
});




  const handleSubmit = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/submit-test`);
      let activities;
      if (res.data) {
        activities = res.data;
      } else {
        message.error("Error in submitting test1");
      }

      const tabCounts = parseInt(localStorage.getItem('tabSwitchCount')) ;
      localStorage.removeItem('tabSwitchCount');



      const res2 = await axios.post(
        `/api/v1/test/submitTest`,
        { userId, answers, testId, activities, tabCounts },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res2.data.success) {
        message.success("Test submitted successfully");
        navigate(`/result/${testId}`);
      } else {
        message.error("Error in submitting test2");
      }
    } catch (error) {
      message.error("Error in submitting test");
      console.log(error);
    }
  };

  return (
<>
  <h1 className="text-3xl text-center my-5 font-serif text-blue-900"> {testDetails?.testName} </h1>
  <form className="flex flex-col items-center min-h-screen p-5 bg-gray-50 shadow-lg rounded-lg">
    <div className="w-full max-w-4xl">
      {testDetails?.questionSet?.map((question, index) => (
        <div key={index} className="p-5 mb-5 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="mb-4 text-lg font-medium text-gray-900">
            Q.{index + 1}. {question.question}
          </p>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center mb-2">
              <input
                type="radio"
                id={`q${index}-option${optionIndex}`}
                name={`q${index}`}
                value={optionIndex}
                checked={answers[index] !== null && answers[index]?.index === optionIndex + 1}
                onChange={() => handleOptionSelect(index, optionIndex)}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label
                htmlFor={`q${index}-option${optionIndex}`}
                className="ml-2 block text-sm font-normal text-gray-800 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
          <button
            className="mt-3 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow"
            type="button"
            onClick={() => handleClearOption(index)}
          >
            Clear Option
          </button>
        </div>
      ))}
    </div>
    <button
      className="mt-5 py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-lg transition duration-200"
      type="button"
      onClick={handleSubmit}
    >
      Submit
    </button>
  </form>
  <div className="stream-area mt-5 rounded overflow-hidden shadow-lg">
    <img src={`http://localhost:9000/stream`} alt="Live Streaming" className="w-full" />
  </div>
</>

  );
}

export default TestPage;
