// /*import React, { useState } from 'react';

// const UploadPage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleDetectClick = () => {
//     // Perform the logic for image detection here
//     if (selectedFile) {
//       // You can upload the selectedFile to your server for prediction
//       // Display the result accordingly
//       // Example: make a POST request using fetch or Axios

//       // Placeholder code for demonstration
//       const prediction = Math.random() > 0.5 ? 'Pneumonia detected' : 'No pneumonia detected';
//       alert(prediction);
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Page</h2>
//       <div className="image-upload">
//         <label htmlFor="upload-input">Select X-ray Image:</label>
//         <input id="upload-input" type="file" accept="image/*" onChange={handleFileChange} />
//       </div>
//       <button className="detect-button" onClick={handleDetectClick} disabled={!selectedFile}>
//         Detect Pneumonia
//       </button>
//     </div>
//   );
// };

// export default UploadPage;
// */
// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);

//   const handleFileUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('image', file);

//       const response = await axios.post('http://localhost:4000/process-image', formData);

//       console.log(response.data); // Handle the response from the server here

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload and Process Image</button>
//     </div>
//   );
// };

// export default UploadPage;

//Mathi ko code lai replace garxu ma

import React, { useState } from "react";
import axios from "axios";
import Spinner from "../spinner";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState("");
  const [pneumoniaState, setPneumoniaState] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setImagePreview(null);
    setResult("");
    setPneumoniaState("");

    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //Call API to detect Pneumonia and set the state as the result
  const handlePneumoniaDetection = () => {
    setLoading(true);
    setPneumoniaState("Pneumonia Detected");
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

    axios
      .post("http://localhost:4000/process-image", formData)
      .then((response) => {
        setLoading(false);
        console.log(response.data.message);
        setResult(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        setError("Error Occured");
      });
  };

  return (
    <>
      {/* <Spinner /> */}
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-center mt-2 text-uppercase">
            Upload Image for Pneumonia Detection
          </h1>
          <div className="d-flex flex-column align-items-center mt-5">
            <div>
              {/* File upload input */}
              <input type="file" onChange={handleFileChange} />
            </div>

            {/* Image preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "200px", height: "200px" }}
                className="img-thumbnail"
              />
            )}

            {/* <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div> */}
            {/* Process Image button */}
            <button
              type="button"
              className="btn btn-success mt-3"
              onClick={handleDetectClick}
            >
              Process Image
            </button>
            {result ? (
              <>
                <p>{result.message}</p>
                {/* Detect button */}
                <button
                  type="button"
                  className="btn btn-success mt-5"
                  onClick={handlePneumoniaDetection}
                >
                  Detect Pneumonia
                </button>
                {/* Display result for pneumonia detection */}
                {pneumoniaState ? (
                  <>
                    <h3 className="mt-4">Result:</h3>
                    <p>{pneumoniaState}</p>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {error ? (
              <>
                <p>{error}</p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>

    // <div className="row">
    //   <div className="col d-flex flex-column justify-content-center">
    // {/* File upload input */}
    // <input type="file" onChange={handleFileChange} />

    // {/* Image preview */}
    // {imagePreview && (
    //   <img
    //     src={imagePreview}
    //     alt="Preview"
    //     style={{ width: "200px", height: "200px" }}
    //     className="img-thumbnail"
    //   />
    // )}
    //   </div>

    //   <div className="col">
    // {/* Detect button */}
    // <button
    //   type="button"
    //   className="btn btn-success"
    //   onClick={handleDetectClick}
    // >
    //   Detect Pneumonia
    // </button>
    // {result ? <p>{result.message}</p> : <></>}
    //   </div>
    // </div>
  );
};

export default UploadPage;
