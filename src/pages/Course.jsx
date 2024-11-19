import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { FaClock } from "react-icons/fa";
import { MdPeople } from "react-icons/md";

const Course = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const handleCreateCourse = () => {
    console.log("Create course");
    navigate("/course/create");
  };

  const getCourses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/courses`
      );
      const data = response.data;
      console.log("Data", data.data);
      setCourses(data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

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
      <div>
        {courses.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#fff",
                margin: 0,
              }}>
              No course available
            </h2>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}>
            {courses.map((course) => (
              <div
                key={course._id}
                style={{
                  padding: "20px",
                  background: "#fff",
                  borderRadius: "10px",
                  width: "330px",
                  backgroundColor: "#242424",
                }}>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    backgroundRepeat: "no-repeat",
                    marginBottom: "20px",
                  }}></div>
                <h2
                  style={{
                    fontSize: "22px",
                    width: "90%",
                    fontWeight: "600",
                    color: "#fff",
                    marginBottom: "10px",
                  }}>
                  {course.courseTitle}
                </h2>
                <p
                  style={{
                    color: "#fff",
                  }}>
                  {course.courseDescription}
                </p>

                <br />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}>
                  <FaClock color='#fff' size={22} />
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                    }}>
                    {course.courseDuration}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}>
                  <MdPeople color='#fff' size={22} />
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                    }}>
                    120,320 Viewers
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}>
                  <PrimaryButton
                    onClick={() => navigate(`/course/create/${course._id}`)}
                    text='View Course'
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
