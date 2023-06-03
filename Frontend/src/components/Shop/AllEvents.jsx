import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsShop, deleteEvent } from "../../redux/actions/event";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const AllEvents = () => {
  const { events, isLoading, error } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller?._id));
  }, [dispatch, seller?._id]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "startDate",
      headerName: "Start date",
      minWidth: 130,
      flex: 1.4,
    },
    {
      field: "endDate",
      headerName: "End date",
      minWidth: 130,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.id;
        return (
          <>
            <Link to={`/event/${d}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item?._id,
        name: item?.name,
        price: "US$ " + item?.discountPrice,
        sold: item?.sold_out,
        startDate: item?.startDate.split("T")[0],
        endDate: item?.endDate.split("T")[0],
      });
    });

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ y: "-120%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          className="w-full 800px:mx-8 mr-3 mt-3 bg-white"
        >
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllEvents;
