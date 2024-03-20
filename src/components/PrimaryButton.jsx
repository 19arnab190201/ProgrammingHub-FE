import React from "react";

const PrimaryButton = ({ text, onClick }) => {
  const buttonStyle = {
    backgroundColor: "#FAD85D" /* Green */,
    border: "none",
    color: "#1D1D1",
    borderRadius: "12px",
    padding: "15px 22px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "4px 2px",
    cursor: "pointer",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
