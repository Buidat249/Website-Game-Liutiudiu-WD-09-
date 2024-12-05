import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";  // Đảm bảo đã cài lodash nếu sử dụng debounce

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]); // Khởi tạo orders là một mảng rỗng
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]); // Lưu trữ danh sách đơn hàng đã lọc
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading
  const [filters, setFilters] = useState({
    orderId: "",
    amountFrom: "",
    amountTo: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState<string>(""); // Trạng thái lỗi

  // Hàm gọi API lấy đơn  
  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.user_id) {
      setError("Không tìm thấy thông tin người dùng.");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      console.log("Fetching orders from backend...");
      const response = await axios.get(`http://localhost:8080/orders/${user.user_id}`);

      // Lưu dữ liệu vào state orders
      console.log('Orders data:', response.data.data);
      setOrders(response.data.data); // Giả sử response trả về mảng các đơn hàng
      setFilteredOrders(response.data.data); // Khởi tạo filteredOrders với toàn bộ dữ liệu từ backend
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Nếu có lỗi thì đảm bảo orders là mảng rỗng
      setFilteredOrders([]); // Đảm bảo filteredOrders là mảng rỗng
      setError("Có lỗi xảy ra khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm lọc đơn hàng dựa trên bộ lọc
  const filterOrders = () => {
    let filtered = [...orders]; // Sao chép mảng orders ban đầu

    // Lọc theo mã đơn hàng
    if (filters.orderId) {
      filtered = filtered.filter(order => String(order.order_id).includes(filters.orderId));
    }

    // Lọc theo số tiền
    if (filters.amountFrom) {
      filtered = filtered.filter(order => order.total_price >= parseInt(filters.amountFrom));
    }

    if (filters.amountTo) {
      filtered = filtered.filter(order => order.total_price <= parseInt(filters.amountTo));
    }

    // Lọc theo ngày bắt đầu và kết thúc
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= new Date(filters.startDate) && orderDate <= new Date(filters.endDate);
      });
    }

    setFilteredOrders(filtered); // Cập nhật danh sách đơn hàng đã lọc
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchOrders();
  }, []); // Phụ thuộc vào việc component mount lần đầu tiên

  // Hàm thay đổi filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Hàm xử lý khi nhấn nút lọc
  const handleApplyFilter = () => {
    filterOrders(); // Áp dụng bộ lọc khi nhấn nút
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Lịch sử đơn hàng</h2>
      <p className="text-gray-500 mb-6">
        Hiển thị thông tin các sản phẩm bạn đã mua tại Liutiudiu Shop
      </p>

      {/* Thông báo lỗi */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Bộ lọc đơn hàng */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Mã đơn hàng"
          name="orderId"
          value={filters.orderId}
          onChange={handleFilterChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Số tiền từ"
          name="amountFrom"
          value={filters.amountFrom}
          onChange={handleFilterChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Số tiền đến"
          name="amountTo"
          value={filters.amountTo}
          onChange={handleFilterChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Nút lọc */}
      <div className="mb-6">
        <button
          onClick={handleApplyFilter}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Lọc
        </button>
      </div>

      {/* Bảng lịch sử đơn hàng */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Thời gian
              </th>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Mã đơn hàng
              </th>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Tổng tiền
              </th>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Trạng thái
              </th>
              <th className="py-3 px-6 bg-gray-100 border-b text-left text-sm font-medium text-gray-600">
                Key IDs
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-4 px-6 text-center">
                  Đang tải...
                </td>
              </tr>
            ) : (
              filteredOrders.length > 0 ? (
                filteredOrders.map((order: any) => (
                  <tr key={order.order_id}>
                    <td className="py-4 px-6 border-b">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="py-4 px-6 border-b">{order.order_id}</td>
                    <td className="py-4 px-6 border-b">{order.total_price}₫</td>
                    <td className="py-4 px-6 border-b">
                      <span
                        className={`${order.status === "completed"
                          ? "text-green-600"
                          : order.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b">
                      {order.status === "completed" && order.games.map((game: any, gameIndex: number) => (
                        <div key={gameIndex}>
                          <p>
                            <strong>{game.name}</strong> :{" "}
                            {game.key_ids.map((key: any, keyIndex: number) => (
                              <span key={key._id || keyIndex}>
                                {key.key_name}
                                {keyIndex < game.key_ids.length - 1 && ", "} {/* Thêm dấu phẩy giữa các key */}
                              </span>
                            ))}
                          </p>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 px-6 text-center">Không có đơn hàng phù hợp.</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Orders;
