import React, { useState } from "react";

const Transactions = () => {
  const [filters, setFilters] = useState({
    description: "",
    amountFrom: "",
    amountTo: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    console.log("Filters applied:", filters);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Lịch sử giao dịch</h2>
      <p className="text-gray-600 mb-6">
        Hiển thị tất cả các giao dịch bạn đã thực hiện tại Liutiudiu Shop
      </p>

      {/* Bộ lọc */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          value={filters.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amountFrom"
          placeholder="Số tiền từ"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          value={filters.amountFrom}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amountTo"
          placeholder="Số tiền đến"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          value={filters.amountTo}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dateFrom"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          value={filters.dateFrom}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dateTo"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          value={filters.dateTo}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white rounded-lg p-2 flex items-center justify-center hover:bg-blue-600"
          onClick={handleFilter}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h3.757a1 1 0 01.707.293l2.828 2.828a1 1 0 00.707.293H21a1 1 0 011 1v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a1 1 0 011-1z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8h18M9 21v-3a3 3 0 013-3h0a3 3 0 013 3v3M3 14h18"
            />
          </svg>
          Lọc
        </button>
      </div>

      {/* Bảng lịch sử giao dịch */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Thời gian
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Mô tả
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Số tiền
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Số dư
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 border-b text-gray-600">
                Không có dữ liệu
              </td>
              <td className="py-3 px-4 border-b text-gray-600"></td>
              <td className="py-3 px-4 border-b text-gray-600"></td>
              <td className="py-3 px-4 border-b text-gray-600"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
