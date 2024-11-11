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
    const { mutate } = useMutation({
      mutationFn: (order_id: number) =>
        axios.delete(`http://localhost:8080/orders/${order_id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
        messageApi.success("Xóa đơn hàng thành công");
      },
    });
  
    const { data, isLoading, error } = useQuery({
      queryKey: ["orders"],
      queryFn: async () => {
        const { data } = await axios.get(`http://localhost:8080/orders`);
        console.log(data); // Kiểm tra lại cấu trúc dữ liệu
        return data.data.map((order: any) => ({
          key: order.order_id,
          ...order,
        }));
      },
    });

    const [users, setUsers] = useState<IUser[]>([]); // Ensure brands is initialized as an array

  useEffect(() => {
    // Fetch dữ liệu users từ backend
    fetch("http://localhost:8080/users/") // Thay đường dẫn API phù hợp
      .then((response) => response.json())
      .then((data) => {
        console.log("users fetched:", data.data); // Inspect the response
        setUsers(data.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  
    if (error) return <div>Error: {error.message}</div>;
  
    const columns = [
      { key: "order_id", title: "Order ID", dataIndex: "order_id" },
      {
        key: "user_id",
        title: "Phương thức thanh toán",
        dataIndex: "user_id",
        render: (user_id: any) => {
          if (Array.isArray(user_id)) {
            return user_id
              .map((id) => {
                const user = users.find((b) => b.user_id === id);
                return user ? user.username : "Unknown user";
              })
              .join(", ");
          } else {
            const user = users.find((b) => b.user_id === user_id);
            return user ? user.username : "Unknown user";
          }
        }
      },
      {
        key: "action",
        title: "Action",
        render: (_: any, order: any) => {
          return (
            <>
              <Popconfirm
                title="Delete the task"
                description="Bạn có chắc muốn xóa không?"
                onConfirm={() => {
                  console.log("Deleting payment_method with ID:", order.order_id); // kiểm tra payment_method_id
                  mutate(order.order_id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link to={`/admin/orders/${order.order_id}/edit`}>
                <Button>Cập nhật</Button>
              </Link>
            </>
          );
        },
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