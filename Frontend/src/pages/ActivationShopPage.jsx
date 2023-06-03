import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/styles";

const ActivationShopPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          await axios.post(
            `https://ecommerce-server-ajsh.onrender.com/shop/activation`,
            {
              activation_token,
            }
          );
        } catch (error) {
          setError(true);
        }
      };

      activationEmail();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="flex-col gap-2"
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <>
          <Link to="/shop-create" className={`${styles.button}`}>
            Go To Login Page
          </Link>
          <p>Your shop has been created suceessfully!</p>
        </>
      )}
    </div>
  );
};

export default ActivationShopPage;
