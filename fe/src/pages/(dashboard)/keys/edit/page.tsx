import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { BackwardFilled } from "@ant-design/icons";

type FieldType = {
  key_id?: number;
  name?: string;
};

const EditKeyPage: React.FC = () => {
  const { key_id } = useParams(); // Retrieve key_id from URL params
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // Fetch the existing data for the key to be edited
  const { data, isLoading, error } = useQuery({
    queryKey: ["keys", key_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/keys/${key_id}`)
        .then((response) => response.data),
  });

  // Mutation for updating a key
  const { mutate } = useMutation({
    mutationFn: (key: any) =>
      axios.put(`http://localhost:8080/keys/${key_id}`, key),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keys"] });
      messageApi.success("Cập nhật khóa game thành công");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  // Handle form submission
  const onFinish = (values: FieldType) => {
    console.log("Sending data:", values); // Check the data before submitting
    mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Thất bại", errorInfo);
  };

  // Check the structure of the fetched data
  console.log(data); // Check if the data has been fetched successfully

  // Loading and error handling
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading {error.message}</div>;

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật Khóa Game</h1>
        <Button type="primary">
          <Link to="/admin/keys">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ name: data?.data?.name || "" }} // Ensure correct field access
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên khóa"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật khóa game
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditKeyPage;
