import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import axios from "axios";
import React from "react";

type FieldType = {
  user_id?: number;
  role_id?: number;
  username?: string;
  email?: string;
  password?: string;
  phone?: number;
  address?: string;
  avatar?: string;
};

const RegisterPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  
  const { mutate } = useMutation({
    mutationFn: (user: any) => axios.post(`http://localhost:8080/register`, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      messageApi.success("Đăng ký thành công");
      form.resetFields();
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // Gán giá trị cho role_id dưới dạng số (ví dụ: 1 cho "member")
    const userData = { ...values, role_id: 1 }; // Gán role_id là số, không phải chuỗi
    
    // Gửi yêu cầu đăng ký với userData
    mutate(userData);
  };
  

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Thất bại", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          label="Tên"
          name="username"
          rules={[{ required: true, message: "Không được bỏ trống" }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống" },
            { type: "email", message: "Email không đúng định dạng" },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Không được bỏ trống" },
            { min: 6, message: "Mật khẩu tối thiểu phải có 6 kí tự" },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Số điện thoại"
          name="phone">
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Địa chỉ"
          name="address">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterPage;
