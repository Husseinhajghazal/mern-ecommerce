import React, { useEffect, useState } from "react";
import Login from "../components/Login/Login.jsx";
import Signup from "../components/Signup/Signup.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [loginMode, setLoginMode] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {loginMode ? (
        <Login onClick={() => setLoginMode((prev) => !prev)} />
      ) : (
        <Signup onClick={() => setLoginMode((prev) => !prev)} />
      )}
    </div>
  );
};

export default LoginPage;
