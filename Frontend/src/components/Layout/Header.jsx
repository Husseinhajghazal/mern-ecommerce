import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { motion } from "framer-motion";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

import { AnimatePresence } from "framer-motion";
import Cart from "../Cart/Cart";
import WishList from "../WishList/WishList";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openCartMobile, setOpenCartMobile] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [openWishListMobile, setOpenWishListMobile] = useState(false);
  const { allProducts } = useSelector((state) => state.product);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    if (term.length > 0) {
      const filteredProducts =
        allProducts &&
        allProducts?.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      setSearchData(filteredProducts.slice(0, 4));
    } else {
      setSearchData([]);
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className="w-full bg-white">
        <div
          className={`${styles.section} hidden 800px:flex items-center justify-between 800px:py-[10px]`}
        >
          <Link to="/">
            <h1 className="text-[30px] font-semibold">
              <span className="text-[#f27a1a]">Eco</span>mmerce
            </h1>
          </Link>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Write Product Name"
              onChange={handleSearchChange}
              className="h-[40px] w-full px-4 bg-[#f3f3f3] rounded-md focus:shadow-md hover:shadow-md duration-200"
            />
            <AiOutlineSearch
              size={25}
              color="#f27a1a"
              className="absolute right-4 top-1.5 cursor-pointer"
            />
            <AnimatePresence>
              {searchData && searchData.length !== 0 && (
                <motion.div
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  exit={{ x: -100, opacity: 0 }}
                  className="absolute mt-4 h-fit w-full bg-[#f3f3f3] shadow-md z-[9] px-4 rounded-md"
                >
                  {searchData &&
                    searchData.map((i, index) => (
                      <Link key={index} to={`/product/${i?._id}`}>
                        <div className="flex items-start-py-3 mt-4 mb-4">
                          <div className="w-[40px] h-[40px] mr-[10px]">
                            <img
                              loading="lazy"
                              src={`${i?.images[0]}`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h1>
                            {i?.name.length > 60
                              ? i?.name.slice(0, 60) + "..."
                              : i?.name}
                          </h1>
                        </div>
                      </Link>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="flex items-center">
                {isSeller ? "Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpenSideBar(true)}
            />
          </div>
          <div>
            <Link to="/">
              <h1 className="text-[30px] font-semibold">
                <span className="text-[#f27a1a]">Eco</span>mmerce
              </h1>
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCartMobile(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
            <AnimatePresence>
              {openCartMobile && <Cart setOpenCart={setOpenCartMobile} />}
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence>
          {openSideBar && (
            <div className="fixed top-0 left-0 w-full z-40 h-screen">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenSideBar(false)}
                className="absolute w-full h-screen top-0 left-0 bg-[#00000030]"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ damping: 0 }}
                className="absolute top-0 left-0 w-[60%] bg-[#fff] h-screen overflow-y-scroll"
              >
                <div className="w-full justify-between flex pr-3">
                  <div>
                    <div className="relative mr-[15px]">
                      <AiOutlineHeart
                        size={30}
                        className="mt-5 ml-3"
                        onClick={() => {
                          setOpenSideBar(false);
                          setOpenWishListMobile(true);
                        }}
                      />
                      <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                        {wishlist && wishlist?.length}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.2, color: "red" }}
                  >
                    <RxCross1
                      size={20}
                      className="ml-4 mt-5"
                      onClick={() => setOpenSideBar(false)}
                    />
                  </motion.div>
                </div>
                <div className="m-auto my-8 w-[92%] relative">
                  <input
                    type="text"
                    placeholder="Write Product Name"
                    onChange={handleSearchChange}
                    className="h-[40px] w-full px-4 bg-[#f3f3f3] rounded-md focus:shadow-md hover:shadow-md duration-200"
                  />
                  <AiOutlineSearch
                    size={25}
                    color="#f27a1a"
                    className="absolute right-4 top-1.5 cursor-pointer"
                  />
                  <AnimatePresence>
                    {searchData && searchData.length !== 0 && (
                      <motion.div
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        exit={{ x: -100, opacity: 0 }}
                        className="absolute mt-4 h-fit w-full bg-[#f3f3f3] shadow-md z-[9] px-4 rounded-md"
                      >
                        {searchData &&
                          searchData.map((i, index) => (
                            <Link key={index} to={`/product/${i?._id}`}>
                              <div className="flex items-start-py-3 mt-4 mb-4">
                                <div className="w-[40px] h-[40px] mr-[10px]">
                                  <img
                                    loading="lazy"
                                    src={`${i?.images[0]}`}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h1>
                                  {i?.name.length > 20
                                    ? i?.name.slice(0, 20) + "..."
                                    : i?.name}
                                </h1>
                              </div>
                            </Link>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Navbar active={activeHeading} />
                <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                  <Link to="/shop-create">
                    <h1 className="text-[#fff] flex items-center">
                      Become Seller <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
                <br />
                <br />
                <br />
                <div className="flex w-full justify-center">
                  {isAuthenticated ? (
                    <div>
                      <Link to="/profile">
                        <div className="w-[100px] h-[100px] rounded-full border-[3px] border-[#eee]">
                          <img
                            loading="lazy"
                            src={`${user.avatar}`}
                            alt=""
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/authentication"
                        className="text-[18px] pr-[10px] text-[#000000b7]"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {openWishListMobile ? (
            <WishList setOpenWishList={setOpenWishListMobile} />
          ) : null}
        </AnimatePresence>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#000000d9] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              <AnimatePresence>
                {dropDown ? <DropDown setDropDown={setDropDown} /> : null}
              </AnimatePresence>
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <motion.div
              whileHover={{ scale: 1.2, color: "#f27a1a" }}
              whileTap={{ scale: 0.9 }}
              className={`${styles.noramlFlex} text-[#FFFFFFD4]`}
              onClick={() => setOpenWishList(!openWishList)}
            >
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} />
                <span className="absolute right-0 top-0 rounded-full bg-[#f27a1a] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist?.length}
                </span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, color: "#f27a1a" }}
              whileTap={{ scale: 0.9 }}
              className={`${styles.noramlFlex} text-[#FFFFFFD4]`}
              onClick={() => setOpenCart(!openCart)}
            >
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart size={30} />
                <span className="absolute right-0 top-0 rounded-full bg-[#f27a1a] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, color: "#f27a1a" }}
              whileTap={{ scale: 0.9 }}
              className={`${styles.noramlFlex} text-[#FFFFFFD4]`}
            >
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <div className="w-[35px] h-[35px] rounded-full">
                      <img
                        loading="lazy"
                        src={`${user?.avatar}`}
                        className="w-full h-full object-cover rounded-full"
                        alt=""
                      />
                    </div>
                  </Link>
                ) : (
                  <Link to="/authentication">
                    <CgProfile size={30} />
                  </Link>
                )}
              </div>
            </motion.div>
            <AnimatePresence>
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            </AnimatePresence>
            <AnimatePresence>
              {openWishList ? (
                <WishList setOpenWishList={setOpenWishList} />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
