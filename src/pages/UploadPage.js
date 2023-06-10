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

import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDetectClick = () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    axios.post('http://localhost:4000/process-image', formData)
      .then(response => {
        console.log(response.data.message)
        setResult(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
    <div>
      {/* File upload input */}
      <input type="file" onChange={handleFileChange} />

      {/* Image preview */}
      {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ width: "200px", height: "200px" }} />}

      {/* Detect button */}
      <button onClick={handleDetectClick}>Detect Pneumonia</button>
      {result ? <p>{result.message}</p> : <></>}
    </div>

  )
}

export default UploadPage;
