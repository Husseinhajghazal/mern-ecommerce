import React from "react";
import styles from "../../styles/styles";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.product);

  return (
    <div className="mb-12">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Product</h1>
        </div>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts &&
            allProducts
              ?.slice(0, 5)
              ?.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
