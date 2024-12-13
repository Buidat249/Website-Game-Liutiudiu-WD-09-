// src/Menu.js
import React from "react";

const Menu = () => {
  return (
    <aside className="bg-white w-80 pt-6 pb-6 pr-6 pl-6 shadow-lg h-screen mr-5 sticky top-0">
      {/* GIỚI THIỆU */}
      <h3 className="text-lg font-bold mb-4">GIỚI THIỆU</h3>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Giới thiệu Liutiudiu Shop
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Hệ thống fanpage chính thức
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Tổng quan website
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Điều khoản dịch vụ
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Chính sách bảo mật
          </a>
        </li>
      </ul>

      {/* HƯỚNG DẪN MUA HÀNG */}
      <h3 className="text-lg font-bold mt-8 mb-4">HƯỚNG DẪN MUA HÀNG</h3>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Hướng dẫn tạo tài khoản
          </a>
        </li>
        <li>
          <a href="Recharge" className="text-gray-700 hover:text-blue-600">
            Hướng dẫn nạp tiền
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Hướng dẫn mua hàng siêu tốc
          </a>
        </li>
        <li>
          <a href="order" className="text-gray-700 hover:text-blue-600">
            Quản lý đơn hàng
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Hướng dẫn cài đặt
          </a>
        </li>
      </ul>

      {/* BẢO HÀNH */}
      <h3 className="text-lg font-bold mt-8 mb-4">BẢO HÀNH</h3>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Thông tin bảo hành
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Liên hệ hỗ trợ
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Menu;
