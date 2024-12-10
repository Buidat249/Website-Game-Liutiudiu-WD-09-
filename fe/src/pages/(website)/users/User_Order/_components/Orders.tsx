import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd"; // Import Modal từ Ant Design

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    orderId: "",
    amountFrom: "",
    amountTo: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
      setOrders(response.data.data);
      setFilteredOrders(response.data.data);
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilter = () => {
    filterOrders();
  };

  const filterOrders = () => {
    let filtered = [...orders];
    if (filters.orderId) {
      filtered = filtered.filter((order) =>
        String(order.order_id).includes(filters.orderId)
      );
    }
    if (filters.amountFrom) {
      filtered = filtered.filter(
        (order) => order.total_price >= parseInt(filters.amountFrom)
      );
    }
    if (filters.amountTo) {
      filtered = filtered.filter(
        (order) => order.total_price <= parseInt(filters.amountTo)
      );
    }
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate >= new Date(filters.startDate) &&
          orderDate <= new Date(filters.endDate)
        );
      });
    }
    setFilteredOrders(filtered);
  };

  const showOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
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
        return "text-gray-400"; // Màu vàng cam
      case "completed":
        return "text-green-500"; // Màu xanh lá
      case "canceled":
        return "text-orange-500"; // Màu xám
      case "payment_failed":
        return "text-red-500"; // Màu đỏ
      default:
        return "text-black"; // Mặc định là màu đen
    }
  };



  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-4 px-6 border-b">Thời gian</th>
            <th className="py-4 px-6 border-b">Mã đơn hàng</th>
            <th className="py-4 px-6 border-b">Tổng tiền</th>
            <th className="py-4 px-6 border-b">Trạng thái</th>
            <th className="py-4 px-6 border-b">Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.order_id}>
              <td className="py-4 px-6 border-b">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="py-4 px-6 border-b">{order.order_id}</td>
              <td className="py-4 px-6 border-b">{order.total_price}₫</td>
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
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div>
          <p>
            <strong>Mã đơn hàng:</strong> {selectedOrder?.order_id}
          </p>
          <p>
            <strong>Thời gian:</strong>{" "}
            {new Date(selectedOrder?.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Tổng tiền:</strong> {selectedOrder?.total_price}₫
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span className={getStatusClass(selectedOrder?.status)}>
              {getStatusLabel(selectedOrder?.status)}
            </span>
          </p>

          {selectedOrder?.status === "completed" ? (
            selectedOrder?.games.map((game: any, index: number) => (
              <div key={index}>
                <p>
                  <strong>Tên game:</strong> {game.name}
                </p>
                <p>
                  <strong>Key game:</strong>
                </p>
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
    </div>

  );
};

export default Orders;
