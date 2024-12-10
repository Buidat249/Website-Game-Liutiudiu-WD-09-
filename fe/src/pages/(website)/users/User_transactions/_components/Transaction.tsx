import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    transactionId: "",
    amountFrom: "",
    amountTo: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const fetchTransactions = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.user_id) {
      setError("Không tìm thấy thông tin người dùng.");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/transactions/${user.user_id}`
      );
      setTransactions(response.data.data);
      setFilteredTransactions(response.data.data);
    } catch (error) {
      setError("Có lỗi xảy ra khi tải dữ liệu.");
      setTransactions([]);
      setFilteredTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilter = () => {
    filterTransactions();
  };

  const filterTransactions = () => {
    let filtered = [...transactions];
    if (filters.transactionId) {
      filtered = filtered.filter((transaction) =>
        String(transaction.transaction_id).includes(filters.transactionId)
      );
    }
    if (filters.amountFrom) {
      filtered = filtered.filter(
        (transaction) => transaction.total_price >= parseInt(filters.amountFrom)
      );
    }
    if (filters.amountTo) {
      filtered = filtered.filter(
        (transaction) => transaction.total_price <= parseInt(filters.amountTo)
      );
    }
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        return (
          transactionDate >= new Date(filters.startDate) &&
          transactionDate <= new Date(filters.endDate)
        );
      });
    }
    setFilteredTransactions(filtered);
  };

  const showTransactionDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const getTransactionLabel = (status: any) => {
    switch (status) {
      case "failed":
        return "Nạp tiền thất bại";
      case "completed":
        return "Nạp tiền thành công";
      default:
        return "Không xác định";
    }
  };

  const getTransactionClass = (status: any) => {
    switch (status) {
      case "failed":
        return "text-red-500"; // Màu vàng cam
      case "completed":
        return "text-green-500"; // Màu xanh lá
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
            <th className="py-4 px-6 border-b">Mã giao dịch</th>
            <th className="py-4 px-6 border-b">Tổng tiền</th>
            <th className="py-4 px-6 border-b">Trạng thái</th>
            <th className="py-4 px-6 border-b">Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.transaction_id}>
              <td className="py-4 px-6 border-b">
                {new Date(transaction.createdAt).toLocaleString()}
              </td>
              <td className="py-4 px-6 border-b">
                {transaction.transaction_id}
              </td>
              <td className="py-4 px-6 border-b">{transaction.total_price}₫</td>
              <td className={`py-4 px-6 border-b ${getTransactionClass(transaction.status)}`}>
                {getTransactionLabel(transaction.status)}
              </td>
              <td className="py-4 px-6 border-b">
                <button
                  onClick={() => showTransactionDetails(transaction)}
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal chi tiết giao dịch */}
      <Modal
        title={`Chi tiết giao dịch #${selectedTransaction?.transaction_id}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div>
          <p>
            <strong>Mã giao dịch:</strong> {selectedTransaction?.transaction_id}
          </p>
          <p>
            <strong>Thời gian:</strong>{" "}
            {new Date(selectedTransaction?.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Tổng tiền:</strong> {selectedTransaction?.total_price}₫
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span className={getTransactionClass(selectedTransaction?.status)}>
              {getTransactionLabel(selectedTransaction?.status)}
            </span>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Transactions;
