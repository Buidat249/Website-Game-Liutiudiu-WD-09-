import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { BackwardFilled } from "@ant-design/icons";

type FieldType = {
  filter_id?: number;
  name?: string;
};

const FilterEditPage: React.FC = () => {
  const { filter_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // Lấy dữ liệu hãng phát triển cụ thể
  const { data, isLoading, error } = useQuery({
    queryKey: ["filters", filter_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/filters/${filter_id}`)
        .then((response) => response.data),
  });

  const { mutate } = useMutation({
    mutationFn: (filter: any) =>
      axios.put(`http://localhost:8080/filters/${filter_id}`, filter),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filters"] });
      messageApi.success("Cập nhật danh mục thành công");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const onFinish = (values: FieldType) => {
    console.log("Sending data:", values);
    mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Thất bại", errorInfo);
  };

  // Kiểm tra cấu trúc dữ liệu
  console.log("filter data:", data); // Kiểm tra dữ liệu

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brand: {error.message}</div>;

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật danh mục</h1>
        <Button type="primary">
          <Link to="/admin/filters">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ name: data?.data?.name || "" }} // Đảm bảo truy cập đúng trường
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên danh mục "
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật tên danh mục
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FilterEditPage;
