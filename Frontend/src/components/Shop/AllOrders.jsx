import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { AnimatePresence, motion } from "framer-motion";

const AllOrders = () => {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch, seller?._id]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 100, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.7,
      cellClassName: (params) => {
        if (params.formattedValue === "Delivered") {
          return "greenColor";
        } else {
          return "redColor";
        }
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "date",
      headerName: "Date",
      type: "number",
      minWidth: 100,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      cellClassName: "!justify-center",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders?.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        date: item.createdAt.slice(0, 10),
        status: item.status,
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

export default AllOrders;
