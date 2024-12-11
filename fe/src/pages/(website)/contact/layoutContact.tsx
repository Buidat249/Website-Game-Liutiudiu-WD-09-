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
    const [activeIndex, setActiveIndex] = useState([0, 0, 0]); // Sử dụng mảng activeIndex cho từng nhóm menu

    const navigate = useNavigate();
    const location = useLocation(); // Để lấy thông tin đường dẫn hiện tại

    const menuItems = [
        { icon: <FaUser />, label: "Giới thiệu Liutiudiu Store", path: "/contact/introduce" },
        { icon: <FaShoppingCart />, label: "Hệ thống fanpage chính thức", path: "/contact/fanpage" },
        { icon: <FaHistory />, label: "Tổng quan website", path: "/contact/overview" },
        { icon: <FaLock />, label: "Điều khoản dịch vụ", path: "/contact/service" },
        { icon: <FaCommentDots />, label: "Chính sách bảo mật", path: "/contact/policy" },
        { icon: <FaHeart />, label: "Hướng dẫn tạo tài khoản", path: "/contact/turtorregister" },
        { icon: <FaShareAlt />, label: "Hướng dẫn nạp tiền", path: "/contact/turtorrecharge" },
        { icon: <FaShareAlt />, label: "Hướng dẫn mua hàng", path: "/contact/turtorbuy" },
        { icon: <FaShareAlt />, label: "Hướng dẫn cài đặt", path: "/contact/turtorsetting" },
        { icon: <FaShareAlt />, label: "Thông tin bảo hành", path: "/contact/guarantee" },
        { icon: <FaShareAlt />, label: "Liên hệ hỗ trợ", path: "/contact/contacthelp" },
    ];

    // Cập nhật activeIndex dựa trên đường dẫn hiện tại
    useEffect(() => {
        const currentIndex = menuItems.findIndex((item) => item.path === location.pathname);
        if (currentIndex !== -1) {
            if (currentIndex < 5) {
                setActiveIndex([currentIndex]);
            } else if (currentIndex >= 5 && currentIndex < 9) {
                setActiveIndex([activeIndex[0], currentIndex - 5, activeIndex[2]]);
            } else {
                setActiveIndex([activeIndex[0], activeIndex[1], currentIndex - 9]);
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
        <aside className="bg-white w-64 pt-6 pb-6 pr-6 pl-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">GIỚI THIỆU</h3>
            <ul className="space-y-2">
                {menuItems.slice(0, 5).map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center p-3 rounded-lg cursor-pointer ${index === activeIndex[0]
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

            <h3 className="text-lg font-bold mt-8 mb-4">HƯỚNG DẪN MUA HÀNG</h3>
            <ul className="space-y-2">
                {menuItems.slice(5, 9).map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center p-3 rounded-lg cursor-pointer ${index === activeIndex[1]
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

            <h3 className="text-lg font-bold mt-8 mb-4">BẢO HÀNH</h3>
            <ul className="space-y-2">
                {menuItems.slice(9, 11).map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center p-3 rounded-lg cursor-pointer ${index === activeIndex[2]
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
