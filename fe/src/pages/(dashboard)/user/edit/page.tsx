import instance from "@/configs/axios";
import {
  BackwardFilled,
  Loading3QuartersOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { options } from "joi";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

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

type roles = {
    role_id: number;
    name: string;
  };

const UserEditPage: React.FC = () => {
  const { user_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const CLOUD_NAME = "dlcxulvmu"; // Thay bằng cloud name của bạn
const UPLOAD_PRESET = "DATNWD-09"; // Thay bằng upload preset của bạn

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", user_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/users/${user_id}`)
        .then((response) => response.data),
  });

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { mutate } = useMutation({
    mutationFn: (user: any) =>
      axios.put(`http://localhost:8080/users/${user_id}`, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      messageApi.success("Cập nhật người dùng thành công");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const { data: roles = { data: [] } } = useQuery({
    queryKey: ["roles"],
    queryFn: () =>
      axios.get("http://localhost:8080/roles").then((res) => res.data),
  });

  const roleList = Array.isArray(roles.data) ? roles.data : [];

  console.log("roles:", roles);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {

    const imageFile =
    values.avatar && values.avatar[0]
      ? (values.avatar[0] as any).thumbUrl || (values.avatar[0] as any).name
      : undefined;

  const gameData = {
    ...values,
    avatar: imageFile, // Gắn ảnh vào `gameData`
  };

  console.log("Sending data:", gameData); // Kiểm tra dữ liệu trước khi gửi
  mutate(gameData); // Gửi dữ liệu game với ảnh
  }

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Thất bại", errorInfo);
  };

  const handleImageUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        message.success("Ảnh đã được tải lên thành công!");
      } else {
        message.error("Không thể tải ảnh lên. Vui lòng thử lại.");
      }
    } catch (error) {
      message.error("Không thể tải ảnh lên. Vui lòng thử lại.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user: {error.message}</div>;
  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold"> Cập nhật người dùng</h1>
        <Button type="primary">
          <Link to="/admin/users">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          username: data?.data?.username,
          user_id: data?.data?.user_id,
          role_id: data?.data?.role_id,
          email: data?.data?.email,
          password: data?.data?.password,
          phone: data?.data?.phone ,
          address: data?.data?.address,
          avatar: data?.data?.avatar,
        }}
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
          label="Quyền"
          name="role_id"
          rules={[
            { required: true, message: "Vui lòng chọn quyền" },
          ]}
        >
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select placeholder="Chọn quyền">
              {roleList.map((role: any) => (
                <Select.Option key={role.role_id} value={role.role_id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          )}
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

        <Form.Item
          label="Tải avatar lên"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={handleImageUpload}
            showUploadList={false}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>

          {/* Hiển thị ảnh đã có từ dữ liệu */}
          {imageUrl || data?.data?.avatar ? (
            <img
              src={imageUrl || data?.data?.avatar}
              alt="Uploaded"
              style={{ width: "20%", marginTop: 10 }}
            />
          ) : null}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật người dùng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserEditPage;
