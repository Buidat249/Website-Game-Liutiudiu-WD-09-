import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Introduce = () => {
  return (
    <div className="flex-1 p-8  bg-white ml-6">
      <div className="header mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Giới thiệu Liutiudiu Shop</h2>
        <p className="text-lg text-gray-600 mt-3">
          Chuyên bán các sản phẩm về Game bản quyền, Phần mềm, Tiện ích uy tín hàng đầu Việt Nam.
        </p>
      </div>

      <p className="text-xl font-semibold text-gray-700 mt-4">
        Liutiudiu Shop có mục tiêu đơn giản như sau:
      </p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center">
          <span className="font-bold text-lg text-blue-600 mr-3">1.</span>
          <span className="text-lg text-gray-800">Tốc độ nhanh</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-lg text-blue-600 mr-3">2.</span>
          <span className="text-lg text-gray-800">Bảo hành - Uy tín</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-lg text-blue-600 mr-3">3.</span>
          <span className="text-lg text-gray-800">Chất lượng dịch vụ</span>
        </div>
      </div>

      

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Vì sao khách hàng chọn liutiudiu Shop?</h3>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-700">1. Uy tín 9 năm hoạt động</h4>
          <p className="text-gray-600">Do chính cộng đồng bình chọn.</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700">2. Sản phẩm đa dạng</h4>
          <p className="text-gray-600">Windows, Office, Adobe, AutoDesk, Freepik, Canva, ChatGPT, v.v.</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700">3. Hình thức thanh toán thuận tiện</h4>
          <ul className="list-disc pl-8 space-y-2 text-gray-600">
            <li>Momo</li>
            <li>VNPay</li>
            <li>Chuyển khoản ngân hàng</li>
            <li>ATM</li>
            <li>Thẻ Viettel</li>
            <li>Megapay</li>
            <li>Visa, Master</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700">4. Chế độ bảo hành và hỗ trợ</h4>
          <p className="text-gray-600">Thông tin bảo hành từng sản phẩm được ghi chi tiết.</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700">5. Giá cả và ưu đãi</h4>
        </div>
      </div>

      <div className="mt-8">
        <Button className="bg-blue-500 h-auto text-white hover:bg-blue-600 px-6 py-2 rounded-lg shadow-md">
          <Link to="/contact/fanpage">
            <div className="text-center">Tiếp theo</div>
            <div className="text-sm text-center mt-2">Hệ thống fanpage chính thức</div>
          </Link>
        </Button>
      </div>

      {/* SVG Sections */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Sản phẩm của chúng tôi</h3>
        <div className="mt-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 text-blue-500 mr-4"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-gray-600">Tăng cường hiệu suất với các công cụ công nghệ của chúng tôi.</p>
        </div>
        <div className="mt-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 text-green-500 mr-4"
          >
            <path d="M12 2v20m8-8H4" />
          </svg>
          <p className="text-gray-600">Các sản phẩm chúng tôi cung cấp sẽ giúp bạn đạt hiệu quả cao nhất.</p>
        </div>
      </div>

      {/* Phần nội dung thêm */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800">Đội ngũ hỗ trợ của liutiudiu Shop</h3>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-700">1. Hỗ trợ khách hàng 24/7</h4>
            <p className="text-gray-600">Đội ngũ chăm sóc khách hàng luôn sẵn sàng giải đáp mọi thắc mắc.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700">2. Phản hồi nhanh chóng</h4>
            <p className="text-gray-600">Giải quyết nhanh chóng và hiệu quả mọi yêu cầu từ khách hàng.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
