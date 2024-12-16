import React from "react";
import { useLocation } from "react-router-dom";

const PaymentFall = () => {
    const location = useLocation();

    // Lấy dữ liệu từ query params
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("order_id") || "N/A";
    const errorMessage = queryParams.get("error") || "Đã có lỗi xảy ra trong quá trình thanh toán.";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Container */}
            <div className="bg-white shadow-lg rounded-2xl p-12 w-[48rem] text-center">
                {/* Icon */}
                <div className="flex items-center justify-center w-32 h-32 mx-auto mb-8 bg-red-100 rounded-full">
                    <svg
                        className="w-16 h-16 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </div>

                {/* Title */}
                <h2 className="text-4xl font-bold text-gray-800">
                    Thanh toán thất bại
                </h2>

                {/* Error Message */}
                <p className="mt-6 text-xl text-gray-600">
                    {errorMessage}
                </p>

                {/* Order ID */}
                <p className="mt-4 text-lg text-gray-600">
                    Nếu bạn có mã số đơn hàng, vui lòng kiểm tra lại đơn hàng của bạn:
                    <span className="font-bold text-red-600"> {orderId}</span>.
                </p>

                {/* Link */}
                <p className="mt-4 text-lg text-gray-500">
                    Bạn có xem lại đơn hàng trong
                    <a
                        href="/user/orders"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        đơn hàng của tôi.
                    </a>
                </p>

                {/* Button */}
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-8 bg-red-600 text-white text-xl px-8 py-4 rounded-xl hover:bg-red-700 transition"
                >
                    Quay về trang chủ
                </button>
            </div>
        </div>
    );
};
export default PaymentFall;
