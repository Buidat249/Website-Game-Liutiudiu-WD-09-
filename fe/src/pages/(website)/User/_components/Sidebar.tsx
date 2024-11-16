// src/components/Sidebar.js
import React, { useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaHistory,
  FaLock,
  FaCommentDots,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { icon: <FaUser />, label: "Tài khoản" },
    { icon: <FaShoppingCart />, label: "Lịch sử đơn hàng" },
    { icon: <FaHistory />, label: "Lịch sử giao dịch" },
    { icon: <FaLock />, label: "Mật khẩu và bảo mật" },
    { icon: <FaCommentDots />, label: "Bình luận của tôi" },
    { icon: <FaHeart />, label: "Sản phẩm yêu thích" },
    { icon: <FaShareAlt />, label: "Giới thiệu bạn bè" },
  ];

  return (
    
      <div className="w-64 bg-white p-4 my-6 mr-6 h-1/4 rounded-lg shadow-md">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center p-3 rounded-lg cursor-pointer ${
                index === activeIndex
                  ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    
  );
};

export default Sidebar;
