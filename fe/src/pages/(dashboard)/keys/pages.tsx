import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const KeysPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // Mutation for deleting a key
  const { mutate } = useMutation({
    mutationFn: (key_id: number) =>
      axios.delete(`http://localhost:8080/keys/${key_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["keys"],
      });
      messageApi.success("Xóa khóa thành công");
    },
  });

  // Fetch keys data
  const { data, isLoading, error } = useQuery({
    queryKey: ["keys"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/keys`);
      return data.data.map((key: any) => ({
        key: key.key_id,
        ...key,
      }));
    },
  });

  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "key_id", title: "Key ID", dataIndex: "key_id" },
    { key: "name", title: "Tên khóa", dataIndex: "name" },
    {
      key: "action",
      title: "Action",
      render: (_: any, key: any) => {
        return (
          <div className="flex gap-2">
            <Popconfirm
              title="Delete the task"
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => {
                console.log("Deleting key with ID:", key.key_id); // kiểm tra key_id
                mutate(key.key_id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Link to={`/admin/keys/${key.key_id}/edit`}>
              <Button>Cập nhật</Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Quản lý Khóa Game</h1>
        <Button type="primary">
          <Link to="/admin/keys/add">
            <PlusCircleFilled /> Thêm Khóa Game
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default KeysPage;
