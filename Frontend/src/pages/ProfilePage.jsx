import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProfileSider from "../components/Profile/ProfileSider";
import ProfileContent from "../components/Profile/ProfileContent";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [active, setActive] = useState(1);

  return (
    <div>
      <Header />
      <div
        className={`${styles.section} 800px:flex bg-[#f5f5f5] py-10 overflow-hidden`}
      >
        <div className="800px:w-[335px] mb-4">
          <ProfileSider active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
