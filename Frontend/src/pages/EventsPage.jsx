import React, { useEffect } from "react";
import EventCard from "../components/Route/EventCard";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents?.map((event, index) => (
            <EventCard key={index} data={event} />
          ))}
          {allEvents && allEvents.length === 0 && (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              <br />
              <br />
              <br />
              No events Found!
            </h1>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
