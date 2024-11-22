import React from "react";
import Orders from "./_components/Orders";
import Sidebar from "../layoutUser";

const OrderHistory = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Sidebar />
      <Orders />
    </div>
  );
};

export default OrderHistory;
