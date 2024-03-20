import { createContext, useReducer } from "react";
import axios from "axios";
// import send_xhr from "../utility/send_xhr";
export const AuthContext = createContext();

const logOut = async () => {
  const url = `${import.meta.env.VITE_API_URL}/api/v1/logout`;

  const response = await axios.get(url);
  console.log(JSON.parse(response));

  localStorage.removeItem("minervauser");

  window.open("/");
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      logOut();
      return { user: null };
    case "UPDATE_USER":
      return { user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem("minervauser")) || null,
  });

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
