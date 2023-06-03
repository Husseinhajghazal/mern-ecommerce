import { useEffect } from "react";

export const useLogedIn = () => {
  const timeout =
    new Date(localStorage.getItem("expiresIn")).getTime() - Date.now();

  useEffect(() => {
    if (localStorage.getItem("expiresIn") && localStorage.getItem("token")) {
      setTimeout(() => {
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("token");
        window.location.reload();
      }, timeout);
    }
  }, [timeout]);

  const timeoutSeller =
    new Date(localStorage.getItem("expiresIn-seller")).getTime() - Date.now();

  useEffect(() => {
    if (
      localStorage.getItem("expiresIn-seller") &&
      localStorage.getItem("seller-token")
    ) {
      setTimeout(() => {
        localStorage.removeItem("expiresIn-seller");
        localStorage.removeItem("seller-token");
        window.location.reload();
      }, timeoutSeller);
    }
  }, [timeoutSeller]);
};
