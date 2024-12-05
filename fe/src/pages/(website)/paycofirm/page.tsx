import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CartItem from "./_components/item";
import CheckoutSummary from "./_components/paycofirm";

const PagePayConfirm = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [keyIds, setKeyIds] = useState<Record<number, number[]>>({}); // Lưu key_ids cho từng game

  // Kiểm tra dữ liệu khi nhận state từ location
  useEffect(() => {
    if (location.state?.selectedItems) {
      console.log(
        "Updated selectedItems from location state:",
        location.state.selectedItems
      );
      setSelectedItems(location.state.selectedItems);
    }
  }, [location.state]); // Đảm bảo lắng nghe thay đổi của location.state

  // Callback để cập nhật key_ids cho từng game
  const handleKeyIdsUpdate = (gameId: number, keyIds: number[]) => {
    setKeyIds((prevKeyIds) => ({
      ...prevKeyIds,
      [gameId]: keyIds,
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px] space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Hộp bên trái: Các sản phẩm trong giỏ */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Giỏ hàng ({selectedItems.length} sản phẩm)
        </h2>
        {selectedItems.map((item) => (
          <CartItem
            key={item.game_id}
            game={item}
            quantity={item.quantity}
            onKeyIdsUpdate={handleKeyIdsUpdate} // Gửi callback để nhận key_ids
          />
        ))}
      </div>

      {/* Hộp bên phải: Tổng kết thanh toán */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
        {/* Truyền selectedItems và keyIds vào CheckoutSummary */}
        <CheckoutSummary
          games={selectedItems.map((item) => ({
            ...item,
            key_id: keyIds[item.game_id] || [],
          }))}
        />
      </div>
    </div>
  );
};

export default PagePayConfirm;
