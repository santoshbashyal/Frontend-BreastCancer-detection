import React, { useState } from "react";
import axios from "axios";
import Spinner from "../spinner";
import "./uploadpage.css";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState("");
  const [BreastCancerState, setBreastCancerState] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("model-1");

  console.log({model})

  const handleFileChange = (event) => {
    setImagePreview(null);
    setResult("");
    setBreastCancerState("");

    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //Call API to detect BreastCancer and set the state as the result
  const handleBreastCancerDetection = () => {
    setLoading(true);
    setBreastCancerState("BreastCancer Detected");
    setTimeout(() => setLoading(false), 2000);
  };

  //Call API to process image and set the state as the result
  const handleDetectClick = () => {
    setLoading(true);
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append('modelName', model)

    console.log({formData})

    axios
      .post("http://localhost:4000/predict", formData)
      .then((response) => {
        setLoading(false);
        console.log(response.data.message);
        setResult(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        // setError("Error Occured");
      });
  };


  return (
    <div className="body-upload">
      {loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div className="container">

          <h1 className="page-title text-uppercase">
            Upload Image for Breast Cancer Detection
          </h1>
          <div className="file-input ">
            <label htmlFor="fileInput">Select Image:</label>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
            />
          </div>

          {imagePreview && (
            <div className="picture">
              <img
              src={imagePreview}
              alt="Preview"
              className="image-preview"
            />
              </div>
          )}

          <div className="text-white">
            <label htmlFor="modelSelect">Select Model:</label>
            <select id="modelSelect" value = {model} onChange={(e) => setModel(e.target.value)}>
              <option value="ann" >ANN </option>
              <option value="final-cnn">Final CNN </option>
              <option value="base-cnn">Base CNN</option>
              <option value="resNet">ResNet</option>
            </select>
          </div>

          <button
            type="button"
            className="process-button"
            onClick={handleDetectClick}
          >
            Process Image
          </button>
          {result?.status ?
          <div className="result-section" style={{backgroundColor: result?.data  !== 'Cancer Detected' ? 'green'  : 'red', color: 'white'}}>
             <p style={{textAlign: 'center'}}>{result?.data}</p> 
            {error ? <p>{error}</p> : null}
          </div>: null}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
