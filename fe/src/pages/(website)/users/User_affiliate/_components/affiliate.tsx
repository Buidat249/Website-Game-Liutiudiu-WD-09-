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
              value="https://liutiudiu.vn/?name=ngodat2004"
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
              value="https://liutiudiu.vn/?name=vannhat187"
              readOnly
              className="flex-1 p-1 border rounded-l-lg border-gray-300 text-sm"
            />
            <button className="bg-blue-500 text-white px-3 py-1 rounded-r-lg text-sm">
              Copy
            </button>
          </div>
        </div>
      </div>

      

    </div>
  );
};

export default Referral;
