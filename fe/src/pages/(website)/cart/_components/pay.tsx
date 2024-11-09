import PaymentMomo from "@/pages/(website)/pays/_components/paymm";
import VnpayPayment from "@/pages/(website)/pays/_components/payvnpay";
import React from "react";
import { useNavigate } from "react-router-dom";

const CheckoutBoxRight = () => {
  const navigate = useNavigate();

  // Hàm chuyển hướng đến các trang thanh toán
  const handlePayment = (method: any) => {
    if (method === "vnpay") {
      navigate("/pay-vnpay");
    } else if (method === "momo") {
      navigate("/pay-momo");
    } else {
      // Khi nhấn nút "Thanh Toán" chuyển tới PagePayCofirm
      navigate("/payconfirm");
    }
  };

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Thanh toán</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Tổng giá trị sản phẩm</span>
          <span>39.000đ</span>
        </div>
        <div className="flex justify-between">
          <span>Tổng giá trị phải thanh toán</span>
          <span>39.000đ</span>
        </div>
        <div className="flex justify-between">
          <span>Số dư hiện tại</span>
          <span>0đ</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Số tiền cần nạp thêm</span>
          <span>39.000đ</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={() => handlePayment("confirm")}
        >
          Thanh Toán
        </button>
        <button
          className="w-full bg-blue-700 text-white py-2 rounded flex items-center justify-center"
          onClick={() => handlePayment("vnpay")}
        >
          <span className="mr-2">📱</span> Mua siêu tốc qua Mobile Banking
        </button>
        <button
          className="w-full bg-pink-500 text-white py-2 rounded flex items-center justify-center"
          onClick={() => handlePayment("momo")}
        >
          <span className="mr-2">💸</span> Mua siêu tốc với MoMo
        </button>
      </div>
    </div>
  );
};

export default CheckoutBoxRight;
