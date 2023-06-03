import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginSeller from "../components/Shop/LoginSeller";
import SignupSeller from "../components/Shop/SignupSeller";

const ShopCreatePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loginMode, setLoginMode] = useState(true);
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isSeller, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {loginMode ? (
        <LoginSeller onClick={() => setLoginMode((prev) => !prev)} />
      ) : (
        <SignupSeller onClick={() => setLoginMode((prev) => !prev)} />
      )}
    </div>
  );
};

export default ShopCreatePage;
