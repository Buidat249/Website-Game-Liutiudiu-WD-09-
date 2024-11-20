import React from "react";
import Sidebar from "./_components/Sidebar";
import Transactions from "./_components/Transaction";

const TransactionsHistory = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-max">
      <Sidebar />
      <Transactions />
    </div>
  );
};

export default TransactionsHistory;
