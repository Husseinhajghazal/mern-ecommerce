import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { motion } from "framer-motion";
import { categoriesData } from "../../data/data";

const DropDown = ({ setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
  };
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "fit-content" }}
      exit={{ height: 0 }}
      className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm"
    >
      {categoriesData &&
        categoriesData.map((i, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0 }}
            whileHover={{ color: "#f27a1a" }}
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              loading="lazy"
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default DropDown;
