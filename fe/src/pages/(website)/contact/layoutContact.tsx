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

const LayouContact = () => {
    // Mặc định chọn mục đầu tiên của nhóm "Giới thiệu" (index 0)
    const [activeIndex, setActiveIndex] = useState([0, -1, -1]);

    const navigate = useNavigate();
    const location = useLocation(); // Để lấy thông tin đường dẫn hiện tại

    const menuItems = [
        { icon: <FaUser />, label: "Giới thiệu Liutiudiu Store", path: "/contact/introduce" },
        { icon: <FaShoppingCart />, label: "Hệ thống fanpage chính thức", path: "/contact/fanpage" },
        { icon: <FaHeart />, label: "Hướng dẫn tạo tài khoản", path: "/contact/turtorregister" },
        { icon: <FaShareAlt />, label: "Hướng dẫn nạp tiền", path: "/contact/turtorrecharge" },
        { icon: <FaShareAlt />, label: "Hướng dẫn mua hàng", path: "/contact/turtorbuy" },
        { icon: <FaShareAlt />, label: "Liên hệ hỗ trợ", path: "/contact/contacthelp" },
    ];

    useEffect(() => {
        // Kiểm tra đường dẫn hiện tại và cập nhật activeIndex
        const currentIndex = menuItems.findIndex((item) => item.path === location.pathname);

        if (currentIndex !== -1) {
            if (currentIndex < 5) {
                setActiveIndex([currentIndex, -1, -1]); // Cập nhật nhóm đầu tiên
            } else if (currentIndex >= 5 && currentIndex < 9) {
                setActiveIndex([-1, currentIndex - 5, -1]); // Cập nhật nhóm hướng dẫn mua hàng
            } else {
                setActiveIndex([-1, -1, currentIndex - 9]); // Cập nhật nhóm bảo hành
            }
        }
    }, [location.pathname]);

    const handleMenuClick = (index: number, path: string, group: number) => {
        navigate(path); // Điều hướng đến đường dẫn tương ứng
        const newActiveIndex = [...activeIndex];
        newActiveIndex[group] = index; // Cập nhật activeIndex của nhóm tương ứng
        setActiveIndex(newActiveIndex);
    };

    return (
        <aside className="bg-white w-64 h-full  p-6  shadow-lg">
            {/* GIỚI THIỆU */}
            <h3 className="text-lg font-bold mb-4">GIỚI THIỆU</h3>
            <ul className="space-y-2">
                {menuItems.slice(0, 2).map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center p-3 rounded-lg cursor-pointer ${
                            index === activeIndex[0]
                                ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500"
                                : "text-gray-700"
                        }`}
                        onClick={() => handleMenuClick(index, item.path, 0)} // Gửi nhóm 0 (Giới thiệu)
                    >
                        <span className="text-xl mr-3">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </li>
                ))}
            </ul>

            {/* HƯỚNG DẪN MUA HÀNG */}
            <h3 className="text-lg font-bold mt-8 mb-4">HƯỚNG DẪN MUA HÀNG</h3>
            <ul className="space-y-2">
                {menuItems.slice(2, 5).map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center p-3 rounded-lg cursor-pointer ${
                            index === activeIndex[1]
                                ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500"
                                : "text-gray-700"
                        }`}
                        onClick={() => handleMenuClick(index + 5, item.path, 1)} // Gửi nhóm 1 (Hướng dẫn mua hàng)
                    >
                        <span className="text-xl mr-3">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </li>
                ))}
            </ul>

            {/* BẢO HÀNH */}
            <h3 className="text-lg font-bold mt-8 mb-4">BẢO HÀNH</h3>
            <ul className="space-y-2">
                {menuItems.slice(5, 6).map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center p-3 rounded-lg cursor-pointer ${
                            index === activeIndex[2]
                                ? "bg-blue-100 text-blue-500 border-l-4 border-blue-500"
                                : "text-gray-700"
                        }`}
                        onClick={() => handleMenuClick(index + 9, item.path, 2)} // Gửi nhóm 2 (Bảo hành)
                    >
                        <span className="text-xl mr-3">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default LayouContact;
