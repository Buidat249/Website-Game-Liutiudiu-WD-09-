import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const RolePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (role_id: number) =>
      axios.delete(`http://localhost:8080/roles/${role_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
      messageApi.success("Xóa thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/roles`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((role: any) => ({
        key: role.role_id,
        ...role,
      }));
    },
  });

  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "role_id", title: "Role ID", dataIndex: "role_id" },
    { key: "name", title: "Tên", dataIndex: "name" },
    {
      key: "action",
      title: "Action",
      render: (_: any, role: any) => {
        return (
          <>
            <Popconfirm
              title="Delete the task"
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => {
                console.log("Deleting category with ID:", role.role_id); // kiểm tra category_id
                mutate(role.role_id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Link to={`/admin/roles/${role.role_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý Quyen </h1>
        <Button type="primary">
          <Link to="/admin/roles/add">
            <PlusCircleFilled /> Thêm  
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default RolePage;
