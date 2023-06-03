import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../redux/actions/order";

const AllRefundOrders = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders(user?._id));
  }, [dispatch, user?._id]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 100, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.7,
      cellClassName: (params) => {
        if (params.formattedValue === "Refund Success") {
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
      headerName: "date",
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
            <Link to={`/user/order/${params.id}`}>
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
      if (
        item.status === "Processing refund" ||
        item.status === "Refund Success"
      )
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          date: item.createdAt.slice(0, 10),
          status: item.status,
        });
    });

  return (
    <div className="800px:pl-8 pt-1 overflow-x-scroll">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllRefundOrders;
