import React from "react";
import locationIcon from "../assets/location.png";

const handleClick = () => {
  alert("clickecd");
};

const locationMarker = () => {

  return (
    <div
      className="custom-marker"
      style={{
        backgroundImage: `url('${locationIcon}')`,
        width: "30px",
        height: "30px",
        backgroundSize: "cover",
        cursor: "pointer",
      }}
      onClick={handleClick}
    />
  );
};

export default locationMarker