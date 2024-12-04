// src/Menu.js
import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <aside className="bg-white w-64 pt-6 pb-6 pr-6 pl-6 shadow-lg h-screen">
      <h3 className="text-lg font-bold mb-4">GIỚI THIỆU</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/contact/introduce" className="text-gray-700 hover:text-blue-600">
            Giới thiệu Liutiudiu Store
          </Link>
        </li>
        <li>
          <Link to="/contact/fanpage" className="text-gray-700 hover:text-blue-600">
            Hệ thống fanpage chính thức
          </Link>
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

      <h3 className="text-lg font-bold mt-8 mb-4">HƯỚNG DẪN MUA HÀNG</h3>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Hướng dẫn tạo tài khoản
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Hướng dẫn nạp tiền
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Hướng dẫn mua hàng
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Quản lý đơn hàng
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Hướng dẫn cài đặt
          </a>
        </li>
      </ul>

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
