import React from "react";
import Profile from "./_components/Profile";
import Sidebar from "./_components/Sidebar";

const PageProfile = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-max">
      <Sidebar />
      
        <Profile />
      
    </div>
  );
};

export default PageProfile;