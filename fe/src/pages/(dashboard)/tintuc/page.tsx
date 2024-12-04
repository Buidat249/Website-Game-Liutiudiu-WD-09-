import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Image, message, Popconfirm, Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBrand } from "@/common/types/brand";
import { IFilter } from "@/common/types/filter";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICategory } from "@/common/types/category";
import { IPlatform } from "@/common/types/platform";
import { IDescription } from "@/common/types/description";
import { ICategoryNew } from "@/common/types/categorynew";

const TintucPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (tintuc_id: number) =>
      axios.delete(`http://localhost:8080/tintucs/${tintuc_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tintucs"],
      });
      messageApi.success("Xóa thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["tintucs"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/tintucs`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((tintuc: any) => ({
        key: tintuc.tintuc_id,
        ...tintuc,
      }));
    },
  });
  const [descriptions, setDescription] = useState<IDescription[]>([]);

  useEffect(() => {
      fetch("http://localhost:8080/descriptions/")
      .then((response) => response.json())
      .then((data) => setDescription(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu descriptions:", error));
  }, []);

  const [categorynews, setCategorynew,] = useState<ICategoryNew[]>([]);

  useEffect(() => {
      fetch("http://localhost:8080/categorynews/")
      .then((response) => response.json())
      .then((data) => setCategorynew(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu categorynew:", error));
  }, []);

  if (error) return <div>Lỗi: {error.message}</div>;

  const columns = [
    { key: "tintuc_id", title: "Tin tuc ID", dataIndex: "tintuc_id" },
    {
      key: "description_id",
      title: "mô tả",
      dataIndex: "description_id",
      render: (description_id: any) => {
        if (isLoading || !descriptions.length) {
          return "Đang tải danh mục..."; // Nếu dữ liệu chưa có
        }

        if (Array.isArray(description_id)) {
          return description_id
            .map((id) => {
              const description = descriptions.find((c) => c.description_id === id);
              return description ? description.name : "mô tả không xác định";
            })
            .join(", ");
        } else {
          const description = descriptions.find(
            (c) => c.description_id === description_id
          );
          return description ? description.name : "mô tả không xác định";
        }
      },
      ellipsis: true,
    },
    { key: "title", title: "Tieu de", dataIndex: "title" },
    {
      key: "categorynew_id",
      title: "danh mục",
      dataIndex: "categorynew_id",
      render: (categorynew_id: any) => {
        if (isLoading || !categorynews.length) {
          return "Đang tải danh mục..."; // Nếu dữ liệu chưa có
        }

        if (Array.isArray(categorynew_id)) {
          return categorynew_id
            .map((id) => {
              const categorynew = categorynews.find((c) => c.categorynew_id === id);
              return categorynew ? categorynew.name : "danh mục không xác định";
            })
            .join(", ");
        } else {
          const categorynew = categorynews.find(
            (c) => c.categorynew_id === categorynew_id
          );
          return categorynew ? categorynew.name : "danh mục không xác định";
        }
      },
      ellipsis: true,
    },
    {
      key: "image",
      title: "Ảnh",
      render: (_: any, tintuc: any) => (
        <Image src={tintuc.image} width={100} height={100} />
      ),
    },
    {
      key: "action",
      title: "Hành động",
      render: (_: any, tintuc: any) => {
        return (
          <>
            <div className="flex gap-2">
              <Popconfirm
                title="Xóa tác vụ"
                description="Bạn có chắc muốn xóa không?"
                onConfirm={() => {
                  mutate(tintuc.tintuc_id);
                }}
                okText="Có"
                cancelText="Không"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link to={`/admin/tintucs/${tintuc.tintuc_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý tin tuc</h1>
        <Button type="primary">
          <Link to="/admin/tintucs/add">
            <PlusCircleFilled /> Thêm tin tuc
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default TintucPage;
