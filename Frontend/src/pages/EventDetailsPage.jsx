import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import EventDetails from "../components/Events/EventDetails";
import { useSelector } from "react-redux";

const EventDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { allEvents } = useSelector((state) => state.event);

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = allEvents && allEvents?.find((i) => i._id === id);
    setData(data);
  }, [allEvents, id]);

  return (
    <div>
      <Header />
      <EventDetails data={data} />
      <Footer />
    </div>
  );
};

export default EventDetailsPage;
