import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";

function HomePage() {
    return (
    <div className="homepage-container">
      <Link to="/upload-image">
        <button type="button" class="button-homepage">
          Proceed to Upload Image
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
