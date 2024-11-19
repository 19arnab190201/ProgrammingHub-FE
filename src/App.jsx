import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import CreateCourse from "./pages/CreateCourse";

function App({ navigation }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("programminghub"));
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/course' element={<Course />} />
        <Route path='/course/create' element={<CreateCourse />} />
        <Route path='/course/create/:id' element={<CreateCourse />} />
      </Route>
    </Routes>
  );
}

export default App;
