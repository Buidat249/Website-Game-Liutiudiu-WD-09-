import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Tạo kiểu phản hồi từ API
type LoginResponse = {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  avatar: string;
};

type FieldType = {
  username?: string;
  password?: string;
};

const LoginPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate } = useMutation({
    mutationFn: (user: FieldType) =>
      axios.post<LoginResponse>(`http://localhost:8080/login`, user),
    onSuccess: (response) => {
      const data = response.data;

      // Kiểm tra phản hồi từ API
      if (!data || typeof data.user_id !== "number" || !data.username) {
        messageApi.error("Dữ liệu phản hồi không hợp lệ.");
        return;
      }

      // Lưu thông tin vào localStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("user_id", JSON.stringify(data?.user_id));
      console.log("user Id", data?.user_id);

      // Cập nhật cache và điều hướng
      queryClient.invalidateQueries({ queryKey: ["users"] });
      messageApi.success("Đăng nhập thành công");

      // Reset form và điều hướng đến trang chủ
      form.resetFields();

      // Reload trang để đảm bảo các thông tin được cập nhật ngay lập tức


      // Hoặc sử dụng navigate("/") để chuyển đến trang chủ
      navigate("/");

      window.location.reload();
    },
    onError: (error) => {
      let errorMessage = "Đăng nhập thất bại, vui lòng thử lại!";

      // Kiểm tra lỗi từ axios hoặc phản hồi lỗi
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }

      messageApi.open({
        type: "error",
        content: errorMessage,
      });
    },
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // Toggle function để chuyển đổi trạng thái hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Thất bại", errorInfo);
    messageApi.error("Vui lòng kiểm tra lại thông tin và thử lại.");
  };

  return (
    <>
      {contextHolder}

      <div className="">
        <div className="">
          <div className="login-form">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Tên"
                name="username"
                rules={[{ required: true, message: "Không được bỏ trống" }]}>
                <Input placeholder="Nhập tên của bạn" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: "Không được bỏ trống" }, { min: 6, message: "Mật khẩu tối thiểu phải có 6 kí tự" }]}>
                <Input
                  type={showPassword ? "text" : "password"}
                  style={{ width: "100%" }}
                  placeholder="Nhập mật khẩu của bạn"
                  addonAfter={
                    <Button type="link" onClick={togglePasswordVisibility} style={{ padding: 0 }}>
                      {showPassword ? <p style={{ color: "red" }}>Ẩn</p> : <p style={{ color: "blue" }}>Hiện</p>}
                    </Button>
                  }
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
