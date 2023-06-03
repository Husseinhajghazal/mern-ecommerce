import React, { useEffect } from "react";
import styles from "../styles/styles";
import ShopInfo from "../components/Shop/ShopInfo";
import ShopProfileData from "../components/Shop/ShopProfileData";

const ShopPreviewPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex flex-col 800px:flex-row py-10 justify-between">
        <div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll 800px:sticky top-10 left-0 z-10">
          <ShopInfo isOwner={false} />
        </div>
        <div className="800px:w-[72%] rounded-[4px] mt-5">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
