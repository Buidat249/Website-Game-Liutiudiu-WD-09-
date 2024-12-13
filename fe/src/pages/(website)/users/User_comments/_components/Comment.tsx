import React, { useState } from "react";

const Comment = () => {
  const [filters, setFilters] = useState({
    description: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    console.log("Filters applied:", filters);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Bình luận của tôi</h2>
      <p className="text-gray-600 mb-4">
        Bình luận và trả lời mà bạn đã viết trên Liutiudiu Shop
      </p>

      {/* Bộ lọc */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          placeholder="Nội dung"
          className="col-span-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="date"
          placeholder="Từ ngày"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="date"
          placeholder="Đến ngày"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          onClick={handleFilter}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-700 w-1/4 border-r">
                Thời gian
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-700">
                Nội dung
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 border-b text-gray-600">
                Không có dữ liệu
              </td>
              <td className="py-3 px-4 border-b text-gray-600"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comment;
