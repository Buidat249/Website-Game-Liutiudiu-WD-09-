import React from "react";

const VnpayPayment = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 my-10">
      {/* Thông tin Thanh toán VNPAY-QR */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div className="flex items-center">
          <img
            src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
            alt="VNPAY Logo"
            className="w-16 h-16 mr-4"
          />
          <h2 className="text-2xl font-semibold">Thanh toán VNPAY-QR</h2>
        </div>
      </div>

      {/* Thông tin giao dịch */}
      <div className="mb-8">
        <div className="flex justify-between text-gray-700 mb-2">
          <p>Số tiền:</p>
          <p className="font-semibold">357.000đ</p>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <p>Phí giao dịch (5%):</p>
          <p className="font-semibold">17.850đ</p>
        </div>
        <div className="flex justify-between text-gray-700 border-t pt-4">
          <p className="font-bold">Tổng tiền:</p>
          <p className="font-bold">374.850đ</p>
        </div>
      </div>

      {/* QR Code và hướng dẫn thanh toán */}
      <div className="flex items-start">
        {/* Mã QR */}
        <div className="w-1/3">
          <img
            src="https://cdn.pixabay.com/photo/2023/02/28/01/51/qr-code-7819654_640.jpg"
            alt="QR Code"
            className="rounded-lg w-full"
          />
        </div>

        {/* Hướng dẫn thanh toán */}
        <div className="w-2/3 pl-8">
          <h3 className="text-lg font-semibold mb-4">
            Thực hiện theo hướng dẫn sau để thanh toán:
          </h3>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>Mở ứng dụng Mobile Banking của ngân hàng</li>
            <li>Chọn "Thanh Toán" và quét mã QR tại hướng dẫn này</li>
            <li>
              Hoàn thành các bước thanh toán theo hướng dẫn và đợi Lutrialdu
              Shop xử lý trong giây lát
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default VnpayPayment;
