import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();

    // Lấy dữ liệu từ query params
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("order_id") || "N/A";
    const totalAmount = queryParams.get("amount") || "0";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Container */}
            <div className="bg-white shadow-lg rounded-2xl p-12 w-[48rem] text-center">
                {/* Icon */}
                <div className="flex items-center justify-center w-32 h-32 mx-auto mb-8 bg-green-100 rounded-full">
                    <svg
                        className="w-16 h-16 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                </div>

                {/* Title */}
                <h2 className="text-4xl font-bold text-gray-800">
                    Thanh toán thành công
                </h2>

                {/* Order ID */}
                <p className="mt-6 text-xl text-gray-600">
                    Mã số đơn hàng của bạn là{" "}
                    <span className="font-bold text-green-600">{orderId}</span>.
                </p>

                {/* Total Amount */}
                <p className="mt-4 text-lg text-gray-600">
                    Tổng số tiền thanh toán là{" "}
                    <span className="font-bold text-green-600">
                        {parseInt(totalAmount).toLocaleString()}đ
                    </span>.
                </p>

                {/* Link */}
                <p className="mt-4 text-lg text-gray-500">
                    Bạn có thể xem chi tiết trong{" "}
                    <a
                        href="/user/orders"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        đơn hàng của tôi.
                    </a>
                </p>

                {/* Delivery time (optional text) */}
                <p className="mt-4 text-lg text-gray-500">
                    Thời gian dự kiến giao hàng là ...
                </p>

                {/* Button */}
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-8 bg-blue-600 text-white text-xl px-8 py-4 rounded-xl hover:bg-blue-700 transition"
                >
                    Tiếp tục mua hàng
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
