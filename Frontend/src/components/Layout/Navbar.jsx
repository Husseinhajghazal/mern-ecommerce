import React from "react";
import { navItems } from "../../data/data";
import styles from "../../styles/styles";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <motion.div
            whileHover={{ color: "#f27a1a" }}
            className="flex text-black 800px:text-[#fff]"
            key={index}
          >
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? "text-[#f27a1a]" : null
              } font-[500] px-6 mb-5 800px:mb-0 cursor-pointer`}
            >
              {i.title}
            </Link>
          </motion.div>
        ))}
    </div>
  );
};

export default Navbar;
