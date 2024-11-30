import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonHome: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: "none",
        border: "none",
        padding: "0",
        cursor: "pointer",
      }}
    >
      <img className=" rounded-full bg-pink-200/75" src="./svg/mi-icono.svg" alt="Home" width="60" height="60" />
    </button>
  );
};

export default ButtonHome;
