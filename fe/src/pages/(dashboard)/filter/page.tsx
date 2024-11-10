
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const FilterPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (filter_id: number) =>
      axios.delete(`http://localhost:8080/filters/${filter_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["filters"],
      });
      messageApi.success("Xóa danh mục thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/filters`);
      console.log('ft',data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((filter: any) => ({
        key: filter.filter_id,
        ...filter,
      }));
    },
  });
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "filter_id", title: "filter ID", dataIndex: "filter_id" },
    { key: "name", title: "Tên danh mục", dataIndex: "name" },
    {
      key: "action",
      title: "Action",
      render: (_: any, filter: any) => {
        return (
          <>
            <div className="flex gap-2">
              <Popconfirm
                title="Delete the task"
                description="Bạn có chắc muốn xóa không?"
                onConfirm={() => {
                  console.log("Deleting filter with ID:", filter.filter_id); // kiểm tra filter_id
                  mutate(filter.filter_id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link to={`/admin/filters/${filter.filter_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
        <Button type="primary">
          <Link to="/admin/filters/add">
            <PlusCircleFilled /> Thêm danh mục
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default FilterPage;
