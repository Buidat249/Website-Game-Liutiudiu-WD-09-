import { IDescription } from "@/common/types/description";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Skeleton, Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const DescriptionDetailPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (descriptiondetail_id: number) =>
      axios.delete(`http://localhost:8080/descriptiondetails/${descriptiondetail_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["descriptiondetails"],
      });
      messageApi.success("Xóa mô tả chi tiết thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["descriptiondetails"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/descriptiondetails`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((descriptiondetail: any) => ({
        key: descriptiondetail.descriptiondetail_id,
        ...descriptiondetail,
      }));
    },
  });
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "descriptiondetail_id", title: "description ID", dataIndex: "descriptiondetail_id" },
    { key: "name", title: "Tên mô tả chi tiết", dataIndex: "name" },
    {
      key: "image",
      title: "Ảnh mô tả chi tiết",
      render: (_: any, description: any) => (
        <Image src={description.image} width={400} height={200} />
      ),
    },
    { key: "content", title: "Nội dung mô tả chi tiết", dataIndex: "content" },
    {
      key: "action",
      title: "Action",
      render: (_: any, descriptiondetail: any) => {
        return (
          <>
            <div className="flex gap-2">
              <Popconfirm
                title="Delete the task"
                description="Bạn có chắc muốn xóa không?"
                onConfirm={() => {
                  console.log("Deleting description with ID:", descriptiondetail.descriptiondetail_id); // kiểm tra descriptiondetail_id
                  mutate(descriptiondetail.descriptiondetail_id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link to={`/admin/description_details/${descriptiondetail.descriptiondetail_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý mô tả chi tiết</h1>
        <Button type="primary">
          <Link to="/admin/description_details/add">
            <PlusCircleFilled /> Thêm mô tả chi tiết
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default DescriptionDetailPage;
