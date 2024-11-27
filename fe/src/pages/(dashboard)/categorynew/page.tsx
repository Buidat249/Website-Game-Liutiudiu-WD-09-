import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CategoryNewPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (categorynew_id: number) =>
      axios.delete(`http://localhost:8080/categorynews/${categorynew_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categorynews"],
      });
      messageApi.success("Xóa thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["categorynews"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/categorynews`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((categorynew: any) => ({
        key: categorynew.categorynew_id,
        ...categorynew,
      }));
    },
  });

  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "categorynew_id", title: "Category ID", dataIndex: "categorynew_id" },
    { key: "name", title: "Tên thể loại", dataIndex: "name" },
    {
      key: "action",
      title: "Action",
      render: (_: any, categorynew: any) => {
        return (
          <>
            <div className="flex gap-2">
              <Popconfirm
                title="Delete the task"
                description="Bạn có chắc muốn xóa không?"
                onConfirm={() => {
                  console.log("Deleting categorynew with ID:", categorynew.categorynew_id); // kiểm tra categorynew_id
                  mutate(categorynew.categorynew_id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link to={`/admin/categories/${categorynew.categorynew_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý thể loại</h1>
        <Button type="primary">
          <Link to="/admin/categorynews/add">
            <PlusCircleFilled /> Thêm thể loại
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default CategoryNewPage;
