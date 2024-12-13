import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaHistory,
  FaLock,
  FaCommentDots,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaUser />, label: "Tài khoản", path: "/user/profile" },
    { icon: <FaShoppingCart />, label: "Lịch sử đơn hàng", path: "/user/orders" },
    { icon: <FaHistory />, label: "Lịch sử giao dịch", path: "/user/transactions" },
    { icon: <FaLock />, label: "Mật khẩu và bảo mật", path: "/user/security" },
    { icon: <FaCommentDots />, label: "Bình luận của tôi", path: "/user/comments" },
    { icon: <FaHeart />, label: "Sản phẩm yêu thích", path: "/user/favorites" },
    { icon: <FaShareAlt />, label: "Giới thiệu bạn bè", path: "/user/referrals" },
  ];

  // Cập nhật activeIndex dựa trên đường dẫn hiện tại
  useEffect(() => {
    const currentIndex = menuItems.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveIndex(currentIndex);
  }, [location.pathname]); // Chạy lại khi đường dẫn thay đổi

  const handleMenuClick = (index : any, path : any) => {
    navigate(path); // Điều hướng đến đường dẫn tương ứng
  };



  return (
    <div className="w-64 bg-white p-4 my-6 mr-8 rounded-lg shadow-md">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center p-3 rounded-lg cursor-pointer ${
              index === activeIndex
                ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500"
                : "text-gray-700"
            }`}
            onClick={() => handleMenuClick(index, item.path)}
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
