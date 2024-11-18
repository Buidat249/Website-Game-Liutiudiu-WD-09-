import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CartItem from './_components/item';
import CheckoutSummary from './_components/paycofirm';

const PagePayCofirm = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // Kiểm tra dữ liệu khi nhận state từ location
  useEffect(() => {
    if (location.state?.selectedItems) {
      console.log("Updated selectedItems from location state:", location.state.selectedItems);
      setSelectedItems(location.state.selectedItems);
    }
  }, [location.state]);  // Đảm bảo lắng nghe thay đổi của location.state

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-4/5 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Hộp bên trái: Các sản phẩm trong giỏ */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Giỏ hàng ({selectedItems.length} sản phẩm)</h2>
        {selectedItems.map((item) => (
          <CartItem key={item.game_id} game={item} quantity={item.quantity} />
        ))}
      </div>

      {/* Hộp bên phải: Tổng kết thanh toán */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default PagePayCofirm;
