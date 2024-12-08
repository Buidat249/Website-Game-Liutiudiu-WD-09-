import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VnpayPayment from "./_components/payvnpay";
import CartItemVnpay from "./_components/itemvnpay";
import CheckoutSummaryVnpay from "./_components/vnpayconfirm";

const PagePayVnPay = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    if (location.state?.selectedItems) {
      console.log("Updated selectedItems from location state momo:", location.state.selectedItems);
      setSelectedItems(location.state.selectedItems);
    } else {
      console.error("No selectedItems in location.state");
    }
  }, [location.state]);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px] space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Hộp bên trái: Các sản phẩm trong giỏ */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Giỏ hàng ({selectedItems.length} sản phẩm)
        </h2>
        {selectedItems.map((item) => (
          <CartItemVnpay key={item.game_id} game={item} quantity={item.quantity} />
        ))}
      </div>

      {/* Hộp bên phải: Tổng kết thanh toán */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
        {/* Truyền selectedItems vào CheckoutSummary */}
        <CheckoutSummaryVnpay games={selectedItems} />
      </div>
    </div>
  );
};

export default PagePayVnPay;
