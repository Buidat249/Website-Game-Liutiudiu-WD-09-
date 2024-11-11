import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import axios from "axios";
<<<<<<< HEAD
import React from "react";

type FieldType = {
  user_id?: number;
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

type FieldType = {
  user_id?: number | undefined;
>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f
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
<<<<<<< HEAD
  
=======
  const [showPassword, setShowPassword] = useState(false); // state để kiểm soát hiển thị mật khẩu
  const navigate = useNavigate(); // Khởi tạo navigate

  // Toggle function để chuyển đổi trạng thái hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f
  const { mutate } = useMutation({
    mutationFn: (user: any) => axios.post(`http://localhost:8080/register`, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
<<<<<<< HEAD
        queryKey: ["users"],
      });
      messageApi.success("Đăng ký thành công");
      form.resetFields();
=======
        queryKey: [""],
      });

      messageApi.success("Đăng ký thành công");
      form.resetFields();

      // Chuyển hướng sang trang đăng nhập sau khi đăng ký thành công
      navigate("/login"); // Dùng navigate để chuyển hướng đến trang đăng nhập
>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
<<<<<<< HEAD
    // Gán giá trị cho role_id dưới dạng số (ví dụ: 1 cho "member")
    const userData = { ...values, role_id: 1 }; // Gán role_id là số, không phải chuỗi
    
    // Gửi yêu cầu đăng ký với userData
    mutate(userData);
  };
  
=======
    // Kiểm tra và chuyển đổi các giá trị số (phone, user_id, v.v.)
    const phoneNumber = values.phone ? String(values.phone) : ''; // Chuyển phone thành string nếu có giá trị

    // Kiểm tra nếu phoneNumber không hợp lệ
    if (phoneNumber && isNaN(Number(phoneNumber))) {
      messageApi.error("Số điện thoại không hợp lệ");
      return; // Dừng quá trình nếu số điện thoại không hợp lệ
    }

    // Gán giá trị cho role_id dưới dạng số (ví dụ: 1 cho "member")
    const userData = { ...values, role_id: 1, phone: phoneNumber }; // Gán phone là string

    // Gửi yêu cầu đăng ký với userData
    mutate(userData);
    console.log(userData);
  };
>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Thất bại", errorInfo);
  };

  return (
    <>
      {contextHolder}
<<<<<<< HEAD
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
=======
      <div className="main">
        <div className="banner">
          <div className="register-form">
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
                rules={[{ required: true, message: "Không được bỏ trống" }]} >
                <Input placeholder="Nhập tên của bạn" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: "Không được bỏ trống" }, { type: "email", message: "Email không đúng định dạng" }]}>
                <Input placeholder="Nhập email của bạn" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: "Không được bỏ trống" }, { min: 6, message: "Mật khẩu tối thiểu phải có 6 kí tự" }]}>
                <Input
                  type={showPassword ? "text" : "password"} // Đổi giữa 'text' và 'password' dựa trên trạng thái showPassword
                  style={{ width: '100%' }}
                  placeholder="Nhập mật khẩu của bạn"
                  addonAfter={
                    <Button
                      type="link"
                      onClick={togglePasswordVisibility}
                      style={{ padding: 0 }}
                    >
                      {showPassword ? <p style={{ color: 'red' }}>Ẩn</p> : <p style={{ color: 'blue' }}>Hiện</p>}
                    </Button>
                  }
                />
              </Form.Item>

              <Form.Item<FieldType>
                label="Số điện thoại"
                name="phone">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Địa chỉ"
                name="address">
                <Input placeholder="Nhập địa chỉ của bạn" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f
    </>
  );
};

export default RegisterPage;
