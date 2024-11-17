import React from "react";

const Orders = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-2xl font-semibold mb-4">Lịch sử đơn hàng</h2>
      <p className="text-gray-500 mb-6">
        Hiển thị thông tin các sản phẩm bạn đã mua tại Liutiudiu Shop
      </p>

      {/* Bộ lọc đơn hàng */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Mã đơn hàng"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Số tiền từ"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Số tiền đến"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
        Lọc
      </button>

      {/* Bảng lịch sử đơn hàng */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Thời gian
              </th>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Mã đơn hàng
              </th>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Sản phẩm
              </th>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Tổng tiền
              </th>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Thêm các dòng đơn hàng ở đây */}
            <tr>
              <td className="py-4 px-6 border-b">01/11/2024</td>
              <td className="py-4 px-6 border-b">#123456</td>
              <td className="py-4 px-6 border-b">Game A</td>
              <td className="py-4 px-6 border-b">500.000₫</td>
              <td className="py-4 px-6 border-b text-green-600">Hoàn tất</td>
            </tr>
            <tr>
              <td className="py-4 px-6 border-b">15/10/2024</td>
              <td className="py-4 px-6 border-b">#789012</td>
              <td className="py-4 px-6 border-b">Game B</td>
              <td className="py-4 px-6 border-b">300.000₫</td>
              <td className="py-4 px-6 border-b text-yellow-500">Đang xử lý</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
