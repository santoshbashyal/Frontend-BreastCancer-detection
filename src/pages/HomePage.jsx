import React from "react";
import { Link } from "react-router-dom";
import HomeHeader from "../assets/image.svg";

function HomePage() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col d-flex flex-column justify-content-center">
          <h1 className="mt-5 text-uppercase">Pneumonia Detection</h1>
          <span className="text-center mt-2">
            This is a Pneumonia Detection application which detects whether the
            xray has pneumonia or not.
          </span>
          <div className="d-flex justify-content-center mt-5">
            <Link to="/upload-image">
              <button type="button" class="btn btn-success">
                Proceed to Upload Image
              </button>
            </Link>
          </div>
        </div>
        <div className="col">
          <img src={HomeHeader} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
