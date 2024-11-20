import React from "react";
import Sidebar from "./_components/Sidebar";
import Orders from "./_components/Orders";

const OrderHistory = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-max">
      <Sidebar />
      <Orders />
    </div>
  );
};

export default OrderHistory;
