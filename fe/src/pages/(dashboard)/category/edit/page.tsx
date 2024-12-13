import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { BackwardFilled } from "@ant-design/icons";

type FieldType = {
  category_id?: number;
  name?: string;
};

const CategoryEditPage: React.FC = () => {
  const { category_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  // Lấy dữ liệu thể loại cụ thể
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", category_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/categories/${category_id}`)
        .then((response) => response.data),
  });

  const { mutate } = useMutation({
    mutationFn: (category: any) =>
      axios.put(`http://localhost:8080/categories/${category_id}`, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      messageApi.success("Cập nhật thể loại thành công");
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
  console.log("Category data:", data); // Kiểm tra dữ liệu

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brand: {error.message}</div>;

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật thể loại</h1>
        <Button type="primary">
          <Link to="/admin/categories">
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
          label="Tên thể loại "
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật thể loại
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoryEditPage;
