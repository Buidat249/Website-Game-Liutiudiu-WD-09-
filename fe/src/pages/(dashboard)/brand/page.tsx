import { IBrand } from "@/common/types/brand";
import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Skeleton, Table } from "antd";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const BrandPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (brand_id: number) =>
      axios.delete(`http://localhost:8080/brands/${brand_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
      messageApi.success("Xóa hãng phát triển thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/brands`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((brand: any) => ({
        key: brand.brand_id,
        ...brand,
      }));
    },
  });
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "brand_id", title: "Brand ID", dataIndex: "brand_id" },
    { key: "name", title: "Tên hãng phát triển", dataIndex: "name" },
    {
      key: "image",
      title: "Ảnh hãng phát triển",
      render: (_: any, brand: any) => (
        <Image src={brand.image} width={400} height={200} />
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_: any, brand: any) => {
        return (
          <>
            <div className="flex gap-2">
              <Popconfirm
                title="Delete the task"
                description="Bạn có chắc muốn xóa không?"
                onConfirm={() => {
                  console.log("Deleting brand with ID:", brand.brand_id); // kiểm tra brand_id
                  mutate(brand.brand_id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link to={`/admin/brands/${brand.brand_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý hãng phát triển</h1>
        <Button type="primary">
          <Link to="/admin/brands/add">
            <PlusCircleFilled /> Thêm hãng phát triển
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default BrandPage;
