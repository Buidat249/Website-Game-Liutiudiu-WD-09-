import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Image, message, Popconfirm, Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBrand } from "@/common/types/brand";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { ICategory } from "@/common/types/category";
import { IPlatform } from "@/common/types/platform";
import { IUser } from "@/common/types/user";
import { IRole } from "@/common/types/role";

const UserPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (user_id: number) =>
      axios.delete(`http://localhost:8080/users/${user_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      messageApi.success("Xóa thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/users`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((user: any) => ({
        key: user.user_id,
        ...user,
      }));
    },
  });

  const [roles, setRoles] = useState<IRole[]>([]); // Ensure platforms is initialized as an array

  useEffect(() => {
    // Fetch dữ liệu categories từ backend
    fetch("http://localhost:8080/roles/") // Thay đường dẫn API phù hợp
      .then((response) => response.json())
      .then((data) => {
        console.log("users fetched:", data.data); // Inspect the response
        setRoles(data.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "user_id", title: "User ID", dataIndex: "user_id" },
    {
      key: "role_id",
      title: "Quyền",
      dataIndex: "role_id",
      render: (role_id: any) => {
          if (Array.isArray(role_id)) {
            return role_id
              .map((id) => {
                const role = roles.find((c) => c.role_id === id);
                return role ? role.name : "Unknown Category";
              })
              .join(", ");
          } else {
            const role = roles.find((c) => c.role_id === role_id);
            return role ? role.name : "Unknown Category";
          }
        }
    },
    { key: "username", title: "Tên đăng nhập", dataIndex: "username" },
    { key: "password", title: "Mật khẩu", dataIndex: "password",ellipsis: true },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "phone", title: "SĐT", dataIndex: "phone" },
    { key: "address", title: "Địa chỉ", dataIndex: "address" },
    {
      key: "avatar", title: "Avatar", 
      render: (_: any, user: any) => (
          <Image src={user.avatar} width={100} height={100} />
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_: any, user: any) => {
        return (
          <>
            <Popconfirm
              title="Delete the task"
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => {
                console.log("Deleting user with ID:", user.user_id); // kiểm tra game_id
                mutate(user.user_id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Link to={`/admin/users/${user.user_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý nguoi dung</h1>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default UserPage;
