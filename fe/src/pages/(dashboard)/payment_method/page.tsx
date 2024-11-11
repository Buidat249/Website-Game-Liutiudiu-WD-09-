import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Payment_MethodPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payment_method_id: number) =>
      axios.delete(`http://localhost:8080/payment_methods/${payment_method_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payment_methods"],
      });
      messageApi.success("Xóa phương thức thanh toán thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["payment_methods"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/payment_methods`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((payment_method: any) => ({
        key: payment_method.payment_method_id,
        ...payment_method,
      }));
    },
  });

  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "payment_method_id", title: "Payment_method ID", dataIndex: "payment_method_id" },
    { key: "name", title: "Tên phương thức thanh toán", dataIndex: "name" },
    {
      key: "action",
      title: "Action",
      render: (_: any, payment_method: any) => {
        return (
          <>
            <Popconfirm
              title="Delete the task"
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => {
                console.log("Deleting payment_method with ID:", payment_method.payment_method_id); // kiểm tra payment_method_id
                mutate(payment_method.payment_method_id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Link to={`/admin/payment_methods/${payment_method.payment_method_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý phương thức thanh toán</h1>
        <Button type="primary">
          <Link to="/admin/payment_methods/add">
            <PlusCircleFilled /> Thêm phương thức thanh toán
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default Payment_MethodPage;
