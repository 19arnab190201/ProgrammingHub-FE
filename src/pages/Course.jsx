import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const Course = () => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    console.log("Create course");
    navigate("/course/create");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100px",
        }}>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "600",
            color: "#fff",
            margin: 0,
          }}>
          Course
        </h1>
        <PrimaryButton onClick={handleCreateCourse} text='Create Course' />
      </div>
    </div>
  );
};

export default Course;
