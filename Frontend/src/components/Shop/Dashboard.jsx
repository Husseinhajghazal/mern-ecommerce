import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { BsBoxSeam, BsBox2Heart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const [deliveredOrders, setDeliveredOrders] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    dispatch(getAllProductsShop(seller?._id));

    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");

    setDeliveredOrders(orderData);
  }, [dispatch, orders, seller?._id]);

  const totalEarningWithoutTax =
    deliveredOrders &&
    deliveredOrders.reduce((acc, item) => acc + item.totalPrice, 0);

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
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        date: item.createdAt.slice(0, 10),
        status: item.status,
      });
    });
  return (
    <motion.div
      initial={{ y: "-120%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      className="w-full p-2 800px:p-8"
    >
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] h-[22vh] bg-white shadow rounded p-5">
          <div className="flex items-center">
            <RiMoneyDollarCircleLine
              size={40}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            $ {(totalEarningWithoutTax * 0.9)?.toFixed(2)}
          </h5>
          <Link to="/dashboard">
            <h5 className="pt-4 pl-2 text-[#f27a1a]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] h-[22vh] bg-white shadow rounded p-5">
          <div className="flex items-center">
            <BsBox2Heart size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard/orders">
            <h5 className="pt-4 pl-2 text-[#f27a1a]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] h-[22vh] bg-white shadow rounded p-5">
          <div className="flex items-center">
            <BsBoxSeam size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to="/dashboard/products">
            <h5 className="pt-4 pl-2 text-[#f27a1a]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full h-auto bg-white rounded">
        <DataGrid
          rows={row.slice(0, 3)}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
