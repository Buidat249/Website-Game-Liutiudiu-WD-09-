import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, message } from "antd";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [confirmation, setConfirmation] = useState({
    visible: false,
    action: "",
    orderId: null,
  });

  console.log('tt', selectedOrder);

  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.user_id) {
      setError("Không tìm thấy thông tin người dùng.");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/orders/${user.user_id}`
      );
      const sortedOrders = response.data.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    } catch (error) {
      setError("Có lỗi xảy ra khi tải dữ liệu.");
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCancelDetailsModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleAction = async () => {
    const order = filteredOrders.find((order) => order.order_id === confirmation.orderId);

    if (!order) {
      message.error("Không tìm thấy thông tin đơn hàng.");
      setConfirmation({ visible: false, action: "", orderId: null });
      return;
    }

    if (confirmation.action === "cancel") {
      // Huỷ đơn hàng (Xoá đơn hàng)
      try {
        await axios.delete(`http://localhost:8080/orders/${confirmation.orderId}`);
        message.success("Đơn hàng đã được hủy.");
        window.location.reload();
        fetchOrders();
      } catch (error) {
        message.error("Hủy đơn hàng thất bại.");
      }
    } else if (confirmation.action === "continue") {
      // Xoá đơn hàng cũ trước khi tạo đơn mới
      try {
        // Xoá đơn hàng cũ
        await axios.delete(`http://localhost:8080/orders/${order.order_id}`);

        // Tạo đơn hàng mới và chuyển hướng đến VNPAY
        const response = await axios.post('http://localhost:8080/orders', {
          user_id: order.user_id,
          games: order.games,
          total_price: order.total_price,
          status: "pending", // Trạng thái "pending" cho đơn hàng đang chờ thanh toán
        });

        // Kiểm tra nếu backend trả về URL thanh toán từ VNPAY
        const paymentUrl = response.data.data.urlPay;

        if (paymentUrl) {
          // Chuyển hướng đến VNPAY với URL thanh toán
          window.location.href = ('http://localhost:8080/' + paymentUrl) as any;
        } else {
          message.error("Không tìm thấy URL thanh toán.");
        }
      } catch (error) {
        message.error("Xử lý đơn hàng thất bại.");
      }
    }

    // Đặt lại trạng thái confirmation
    setConfirmation({ visible: false, action: "", orderId: null });
  };


  const getStatusLabel = (status: any) => {
    switch (status) {
      case "pending":
        return "Chưa thanh toán";
      case "completed":
        return "Đã thanh toán";
      case "canceled":
        return "Đã hủy";
      case "payment_failed":
        return "Thanh toán thất bại";
      default:
        return "Không xác định";
    }
  };

  const getStatusClass = (status: any) => {
    switch (status) {
      case "pending":
        return "text-gray-400";
      case "completed":
        return "text-green-500";
      case "canceled":
        return "text-orange-500";
      case "payment_failed":
        return "text-red-500";
      default:
        return "text-black";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 border-b">Thời gian</th>
            <th className="py-4 px-6 border-b">Mã đơn hàng</th>
            <th className="py-4 px-6 border-b">Tổng tiền</th>
            <th className="py-4 px-6 border-b">Trạng thái</th>
            <th className="py-4 px-6 border-b">
              Chi tiết
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.order_id}>
              <td className="py-4 px-6 border-b">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="py-4 px-6 border-b">{order.order_id}</td>
              <td className="py-4 px-6 border-b"> {order.total_price ? Number(order.total_price).toLocaleString('vi-VN') : "0"}₫</td>
              <td className={`py-4 px-6 border-b ${getStatusClass(order.status)}`}>
                {getStatusLabel(order.status)}
              </td>
              <td className="py-4 px-6 border-b">
                <button
                  onClick={() => showOrderDetails(order)}
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?.order_id}`}
        visible={isModalVisible}
        onCancel={handleCancelDetailsModal}
        footer={null}
        width={800}
      >
        <div>
          <p><strong>Mã đơn hàng:</strong> {selectedOrder?.order_id}</p>
          <p><strong>Thời gian:</strong> {new Date(selectedOrder?.createdAt).toLocaleString()}</p>
          <p><strong>Tổng tiền:</strong> {selectedOrder?.total_price}₫</p>
          <p><strong>Trạng thái:</strong> <span className={getStatusClass(selectedOrder?.status)}>{getStatusLabel(selectedOrder?.status)}</span></p>

          {selectedOrder?.status === "pending" && (
            <div className="mt-4">
              <button
                onClick={() =>
                  setConfirmation({ visible: true, action: "cancel", orderId: selectedOrder?.order_id })
                }
                className="bg-red-500 text-white p-2 rounded-lg mr-4"
              >
                Hủy đơn hàng
              </button>
              <button
                onClick={() =>
                  setConfirmation({ visible: true, action: "continue", orderId: selectedOrder?.order_id })
                }
                className="bg-green-500 text-white p-2 rounded-lg"
              >
                Tiếp tục thanh toán
              </button>
            </div>
          )}

          {selectedOrder?.status === "completed" ? (
            selectedOrder?.games.map((game: any, index: number) => (
              <div key={index}>
                <p><strong>Tên game:</strong> {game.name}</p>
                <p><strong>Key game:</strong></p>
                {game.key_ids.map((key: any, keyIndex: number) => (
                  <p key={keyIndex}>{key.key_name}</p>
                ))}
              </div>
            ))
          ) : (
            <p className="text-red-500">Thanh toán để nhận key game.</p>
          )}

        </div>
      </Modal>

      <Modal
        title="Xác nhận hành động"
        visible={confirmation.visible}
        onOk={handleAction}
        onCancel={() =>
          setConfirmation({ visible: false, action: "", orderId: null })
        }
        okText="Có"
        cancelText="Không"
      >
        <p>
          {confirmation.action === "cancel"
            ? "Bạn có chắc chắn muốn hủy đơn hàng này không?"
            : "Bạn có chắc chắn muốn tiếp tục thanh toán đơn hàng này không?"}
        </p>
      </Modal>
    </div>
  );
};

export default Orders;
