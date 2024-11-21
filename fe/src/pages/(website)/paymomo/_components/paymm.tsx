import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentMomo = ({ selectedItems }: { selectedItems: any[] }) => {
  useEffect(() => {
    // Kiểm tra xem selectedItems đã được truyền đúng chưa
    console.log("Selected Items in PaymentMomo:", selectedItems);
  }, [selectedItems]);

  // Tính tổng tiền và phí giao dịch
  const totalAmount = selectedItems.reduce((total, item) => total + item.final_price * item.quantity, 0);
  const transactionFee = totalAmount * 0.05; // Phí 5%
  const totalPayment = totalAmount + transactionFee;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
      {/* Header */}
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
          <p className="font-semibold">{totalAmount.toLocaleString()}đ</p>
        </div>
        <div className="flex justify-between text-gray-700">
          <p>Phí giao dịch (5%):</p>
          <p className="font-semibold">{transactionFee.toLocaleString()}đ</p>
        </div>
        <div className="flex justify-between text-gray-700 border-t pt-2">
          <p className="font-bold">Tổng tiền:</p>
          <p className="font-bold">{totalPayment.toLocaleString()}đ</p>
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

      {/* Danh sách các sản phẩm đã chọn - Bảng */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Sản phẩm đã chọn:</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4">Tên sản phẩm</th>
              <th className="text-left py-2 px-4">Số lượng</th>
              <th className="text-left py-2 px-4">Giá</th>
              <th className="text-left py-2 px-4">Tổng giá</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={item.game_id} className="border-t">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">{item.final_price.toLocaleString()}đ</td>
                {/* Cột "Tổng giá" */}
                <td className="py-2 px-4">
                  {(item.final_price * item.quantity).toLocaleString()}đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentMomo;
