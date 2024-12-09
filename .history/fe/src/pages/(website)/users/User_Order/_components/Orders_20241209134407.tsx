import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";  // Import Modal từ Ant Design

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
      const response = await axios.get(`http://localhost:8080/orders/${user.user_id}`);
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
      filtered = filtered.filter(order => String(order.order_id).includes(filters.orderId));
    }
    if (filters.amountFrom) {
      filtered = filtered.filter(order => order.total_price >= parseInt(filters.amountFrom));
    }
    if (filters.amountTo) {
      filtered = filtered.filter(order => order.total_price <= parseInt(filters.amountTo));
    }
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= new Date(filters.startDate) && orderDate <= new Date(filters.endDate);
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

  return (
    <div>
      {/* Bộ lọc đơn hàng và Bảng đơn hàng */}
      {/* Thêm cột Chi tiết */}
      <table>
        <thead>
          <tr>
            <th>Thời gian</th>
            <th>Mã đơn hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.order_id}>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.order_id}</td>
              <td>{order.total_price}₫</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => showOrderDetails(order)}>Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal chi tiết đơn hàng */}
      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?.order_id}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div>
          <h3>Thông tin đơn hàng</h3>
          <p><strong>Mã đơn hàng:</strong> {selectedOrder?.order_id}</p>
          <p><strong>Thời gian:</strong> {new Date(selectedOrder?.createdAt).toLocaleString()}</p>
          <p><strong>Tổng tiền:</strong> {selectedOrder?.total_price}₫</p>
          <p><strong>Trạng thái:</strong> {selectedOrder?.status}</p>

          <h4>Chi tiết sản phẩm</h4>
          {selectedOrder?.games.map((game: any, index: number) => (
            <div key={index}>
              <p><strong>{game.name}</strong></p>
              {game.key_ids.map((key: any, keyIndex: number) => (
                <p key={keyIndex}>- {key.key_name}</p>
              ))}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
