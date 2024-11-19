// Dashboard.jsx

import React from "react";
import dashboard from "../assets/HomePage.svg";

const Dashboard = () => {
  console.log("Dashboard");
  return (
    <img
      style={{
        width: "100%",
        height: "120%",
        objectFit: "cover",
        marginLeft: "-90px",
      }}
      src={dashboard}
      alt=''
    />
  );
};

export default Dashboard;
