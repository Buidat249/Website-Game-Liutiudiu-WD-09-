import { IPayment_method } from "@/common/types/payment_method";
import { IUser } from "@/common/types/user";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Skeleton, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // Fetch orders
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8080/orders");
      return response.data.data.map((order: any) => ({
        key: order.order_id,
        ...order,
      }));
    },
  });

  // Fetch users for mapping user_id to username
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle updating order status
  const handleChangeStatus = async (e: React.ChangeEvent<HTMLSelectElement>, order_id: number) => {
    const newStatus = e.target.value;
    try {
      await axios.put(`http://localhost:8080/orders/${order_id}`, { status: newStatus });
      messageApi.success("Cập nhật trạng thái thành công");

      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    } catch (error) {
      messageApi.error("Cập nhật trạng thái thất bại");
      console.error(error);
    }
  };

  // Mutation for deleting an order
  const { mutate: deleteOrder } = useMutation({
    mutationFn: (order_id: number) => axios.delete(`http://localhost:8080/orders/${order_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      messageApi.success("Xóa đơn hàng thành công");
    },
  });

  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "order_id", title: "Order ID", dataIndex: "order_id" },
    {
      key: "user_id",
      title: "Người dùng",
      dataIndex: "user_id",
      render: (user_id: any) => {
        const user = users.find((b) => b.user_id === user_id);
        return user ? user.username : "Unknown user";
      },
    },
    { key: "total_price", title: "Total Price", dataIndex: "total_price" },
    {
      key: "games",
      title: "Games",
      render: (_: any, order: any) => (
        <ul>
          {order.games.map((game: any) => (
            <li key={game.game_id}>
              {game.name} ({game.quantity})
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (_: any, order: any) => (
        <select
          disabled={order.status == "completed"}
          value={order.status}
          onChange={(e) => handleChangeStatus(e, order.order_id)}
        >
          <option value="pending">Chưa thanh toán</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_: any, order: any) => (
        <>
          <Popconfirm
            title="Xóa đơn hàng?"
            description="Bạn có chắc muốn xóa không?"
            onConfirm={() => {
              deleteOrder(order.order_id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button disabled={order.status == "completed"} danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Quản lý đơn hàng</h1>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default OrderPage;
