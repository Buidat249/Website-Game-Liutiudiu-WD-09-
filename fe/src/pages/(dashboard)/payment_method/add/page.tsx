import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

type FieldType = {
  payment_method_id?: number;
  name?: string;
};

const Payment_MethodAddPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payment_method: any) =>
      axios.post(`http://localhost:8080/payment_methods`, payment_method),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payment_methods"],
      });
      messageApi.success("Thêm phương thức thanh toán thành công");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Sending data:", values); // Kiểm tra dữ liệu trước khi gửi
    mutate(values); // Gửi tên phương thức thanh toán
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Thất bại", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Thêm phương thức thanh toán</h1>
        <Button type="primary">
          <Link to="/admin/payment_methods">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên phương thức thanh toán"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm phương thức thanh toán
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};
export default Payment_MethodAddPage;
