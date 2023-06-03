import React, { useEffect } from "react";
import "./styles/App.css";
import Router from "./router/Router.js";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useLogedIn } from "./hooks/useLogedIn";
import { getAllEvents } from "./redux/actions/event";
import { getAllProducts } from "./redux/actions/product";

const App = () => {
  useLogedIn();

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllEvents());
    Store.dispatch(getAllProducts());
  }, []);

  return <Router />;
};

export default App;
