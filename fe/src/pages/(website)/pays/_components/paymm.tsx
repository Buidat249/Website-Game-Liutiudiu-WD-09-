import React from "react";

const PaymentMomo = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
      
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
            alt="Momo Logo"
            className="w-12 h-12 mr-3"
          />
          <div>
            <h2 className="text-xl font-semibold">
              Nạp số trực tuyến bằng Momo Payment
            </h2>
            <p className="text-sm text-gray-500">
              Nạp Dcoin từ động liên kết với Momo, hoàn thành trước khi. Phí 5%
            </p>
          </div>
        </div>
      </div>

      {/* Thông tin thanh toán */}
      <div className="mb-4">
        <div className="flex justify-between text-gray-700">
          <p>Số tiền:</p>
          <p className="font-semibold">357.000đ</p>
        </div>
        <div className="flex justify-between text-gray-700">
          <p>Phí giao dịch (5%):</p>
          <p className="font-semibold">17.850đ</p>
        </div>
        <div className="flex justify-between text-gray-700 border-t pt-2">
          <p className="font-bold">Tổng tiền:</p>
          <p className="font-bold">374.850đ</p>
        </div>
      </div>

      {/* QR Code và hướng dẫn */}
      <div className="flex">
        {/* Mã QR */}
        <div className="w-1/3">
          <img
            src="https://cdn.pixabay.com/photo/2023/02/28/01/51/qr-code-7819654_640.jpg"
            alt="QR Code"
            className="rounded-lg w-full"
          />
        </div>

        {/* Hướng dẫn thanh toán */}
        <div className="w-2/3 pl-6">
          <h3 className="text-lg font-semibold mb-3">
            Thực hiện theo hướng dẫn sau để thanh toán:
          </h3>
          <ol className="list-decimal list-inside text-gray-600">
            <li>Mở ứng dụng Momo để thanh toán</li>
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

export default PaymentMomo;
