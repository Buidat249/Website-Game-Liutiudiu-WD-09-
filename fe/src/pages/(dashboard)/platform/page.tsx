import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const PlatformPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (platform_id: number) =>
      axios.delete(`http://localhost:8080/platforms/${platform_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["platforms"],
      });
      messageApi.success("Xóa nền tảng thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/platforms`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((platform: any) => ({
        key: platform.platform_id,
        ...platform,
      }));
    },
  });

  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "platform_id", title: "Platform ID", dataIndex: "platform_id" },
    { key: "name", title: "Tên nền tảng", dataIndex: "name" },
    {
      key: "action",
      title: "Action",
      render: (_: any, platform: any) => {
        return (
          <>
            <div className="flex gap-2">
              <Popconfirm
                title="Delete the task"
                description="Bạn có chắc muốn xóa không?"
                onConfirm={() => {
                  console.log("Deleting platform with ID:", platform.platform_id); // kiểm tra platform_id
                  mutate(platform.platform_id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link to={`/admin/platforms/${platform.platform_id}/edit`}>
                <Button>Cập nhật</Button>
              </Link>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Quản lý nền tảng</h1>
        <Button type="primary">
          <Link to="/admin/platforms/add">
            <PlusCircleFilled /> Thêm nền tảng
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default PlatformPage;
