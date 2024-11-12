import { IDescription } from "@/common/types/description";
import { IDescriptiondetail } from "@/common/types/description_detail";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DescriptionPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [descriptiondetails, setDescriptiondetail] = useState<IDescriptiondetail[]>([]);

  const { mutate } = useMutation({
    mutationFn: (description_id: number) =>
      axios.delete(`http://localhost:8080/descriptions/${description_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["descriptions"],
      });
      messageApi.success("Xóa mô tả thành công");
    },
    
  });

  useEffect(() => {
    fetch("http://localhost:8080/descriptiondetails/")
      .then((response) => response.json())
      .then((data) => setDescriptiondetail(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu descriptiondetails:", error));
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["descriptions"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/descriptions`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((description: any) => ({
        key: description.description_id,
        ...description,
      }));
    },
  });
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "description_id", title: "description ID", dataIndex: "description_id" },
    { key: "name", title: "Tên mô tả", dataIndex: "name" },
    {
        key: "descriptiondetail_id",
        title: "mô tả",
        dataIndex: "descriptiondetail_id",
        render: (descriptiondetail_id: any) => {
          if (isLoading || !descriptiondetails.length) {
            return "Đang tải danh mục..."; // Nếu dữ liệu chưa có
          }
  
          if (Array.isArray(descriptiondetail_id)) {
            return descriptiondetail_id
              .map((id) => {
                const descriptiondetail = descriptiondetails.find((c) => c.descriptiondetail_id === id);
                return descriptiondetail ? descriptiondetail.name : "mô tả không xác định";
              })
              .join(", ");
          } else {
            const descriptiondetail = descriptiondetails.find(
              (c) => c.descriptiondetail_id === descriptiondetail_id
            );
            return descriptiondetail ? descriptiondetail.name : "mô tả không xác định";
          }
        },
        ellipsis: true,
      },
    {
      key: "action",
      title: "Action",
      render: (_: any, description: any) => {
        return (
          <>
            <div className="flex gap-2">
              <Popconfirm
                title="Delete the task"
                description="Bạn có chắc muốn xóa không?"
                onConfirm={() => {
                  console.log("Deleting description with ID:", description.description_id); // kiểm tra description_id
                  mutate(description.description_id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link to={`/admin/descriptions/${description.description_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý mô tả</h1>
        <Button type="primary">
          <Link to="/admin/descriptions/add">
            <PlusCircleFilled /> Thêm mô tả
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default DescriptionPage;
