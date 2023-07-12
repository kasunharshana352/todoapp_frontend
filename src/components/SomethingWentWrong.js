import React from "react";
import { Link } from "react-router-dom";

function SomethingWentWrong() {
  return (
    <div>
      <h1>Something Went Wrong!</h1>
      <p>
        <Link to="/home">Return Home</Link>
      </p>
    </div>
  );
}

export default SomethingWentWrong;
