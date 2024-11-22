import React from "react";

const Referral = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      {/* Phần tiêu đề */}
      <h1 className="text-lg font-bold mb-3">Giới thiệu bạn bè</h1>
      <p className="text-gray-600 mb-4 text-sm">
        Chia sẻ thế giới game và sản phẩm rộng lớn từ Divine Shop với bạn bè để
        hưởng hoa hồng.
      </p>

      {/* Thông tin giới thiệu */}
      <div className="mb-4">
        <h2 className="text-md font-semibold mb-2">Thông tin</h2>
        <p className="text-gray-600 mb-3 text-sm">
          Khi khách hàng truy cập <strong>link giới thiệu</strong> này để tạo tài khoản
          mới hoặc sử dụng mã giới thiệu của bạn khi thanh toán đơn hàng đầu
          tiên, Divine Shop sẽ ưu đãi 5% giá trị đơn hàng đầu tiên đó.
        </p>
        <a href="#" className="text-blue-500 underline text-sm">
          Xem thông tin chi tiết
        </a>
      </div>

      {/* Liên kết giới thiệu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-gray-700 font-medium text-sm">Liên kết giới thiệu 1</label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              value="https://divineshop.vn/?ru=ngodat2004"
              readOnly
              className="flex-1 p-1 border rounded-l-lg border-gray-300 text-sm"
            />
            <button className="bg-blue-500 text-white px-3 py-1 rounded-r-lg text-sm">
              Copy
            </button>
          </div>
        </div>
        <div>
          <label className="text-gray-700 font-medium text-sm">Liên kết giới thiệu 2</label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              value="https://divineshop.vn/?ri=1216912"
              readOnly
              className="flex-1 p-1 border rounded-l-lg border-gray-300 text-sm"
            />
            <button className="bg-blue-500 text-white px-3 py-1 rounded-r-lg text-sm">
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Thông tin tổng hợp */}
      <div className="bg-gray-100 p-3 rounded-lg mb-6">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <h3 className="text-md font-bold">Tổng tiền nhận được</h3>
            <p className="text-blue-500 text-lg font-bold">0 ACoin</p>
          </div>
          <div>
            <h3 className="text-md font-bold">Tổng số người giới thiệu</h3>
            <p className="text-gray-700 text-lg font-bold">0 người</p>
          </div>
          <div>
            <h3 className="text-md font-bold">Số tiền còn lại</h3>
            <p className="text-gray-700 text-lg font-bold">0 ACoin</p>
          </div>
        </div>
        <button className="mt-3 bg-green-500 text-white w-full py-1 rounded-lg text-sm">
          Quy đổi
        </button>
      </div>

      {/* Phần Lịch sử giao dịch */}
      <div>
        <h2 className="text-md font-bold mb-3">Lịch sử giao dịch</h2>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {/* Các trường nhập cho bộ lọc */}
          <input
            type="text"
            placeholder="Mô tả"
            className="p-1 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="number"
            placeholder="Số tiền từ"
            className="p-1 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="number"
            placeholder="Số tiền đến"
            className="p-1 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="date"
            placeholder="Từ ngày"
            className="p-1 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="date"
            placeholder="Đến ngày"
            className="p-1 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm mb-3">
          Lọc
        </button>
        {/* Bảng lịch sử */}
        <table className="w-full border-collapse border border-gray-300 text-left text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-1">Thời gian</th>
              <th className="border border-gray-300 p-1">Mô tả</th>
              <th className="border border-gray-300 p-1">Số tiền</th>
              <th className="border border-gray-300 p-1">Số dư</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-1">--</td>
              <td className="border border-gray-300 p-1">--</td>
              <td className="border border-gray-300 p-1">--</td>
              <td className="border border-gray-300 p-1">--</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Referral;
