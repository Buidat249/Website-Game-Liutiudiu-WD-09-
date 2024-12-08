import React from "react";
import Profile from "./_components/Profile";
import Sidebar from "../layoutUser";


const PageProfile = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Sidebar />
      <Profile />
    </div>
  );
};

export default PageProfile;