import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, Upload, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { BackwardFilled, PlusOutlined } from "@ant-design/icons";

type FieldType = {
  brand_id?: number;
  name?: string;
  image?: string;
};


const BrandEditPage: React.FC = () => {
  const { brand_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const CLOUD_NAME = "dlcxulvmu"; // Thay bằng cloud name của bạn
  const UPLOAD_PRESET = "DATNWD-09"; // Thay bằng upload preset của bạn

  // Lấy dữ liệu hãng phát triển cụ thể
  const { data, isLoading, error } = useQuery({
    queryKey: ["brands", brand_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/brands/${brand_id}`)
        .then((response) => response.data),
  });

  const { mutate } = useMutation({
    mutationFn: (brand: any) =>
      axios.put(`http://localhost:8080/brands/${brand_id}`, brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      messageApi.success("Cập nhật hãng phát triển thành công");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

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
        setImageUrl(data.secure_url); // Cập nhật URL ảnh mới
        message.success("Ảnh đã được tải lên thành công!");
      } else {
        message.error("Không thể tải ảnh lên. Vui lòng thử lại.");
      }
    } catch (error) {
      message.error("Không thể tải ảnh lên. Vui lòng thử lại.");
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {

    const branData = { ...values, image: imageUrl || data?.data?.image }; // Nếu không có ảnh mới, giữ ảnh cũ
    mutate(branData);
    window.location.reload();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Thất bại", errorInfo);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brand: {error.message}</div>;

  // Kiểm tra cấu trúc dữ liệu
  console.log("Brand data:", data); // Kiểm tra dữ liệu

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật hãng phát triển</h1>
        <Button type="primary">
          <Link to="/admin/brands">
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
          name: data?.data?.name || "",
          image: data?.data?.image || "",
        }} // Đảm bảo truy cập đúng trường
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên hãng phát triển "
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Vui lòng tải lên hình ảnh" }]}
        >
          <Upload
            name="file"
            action=""
            listType="picture"
            beforeUpload={handleImageUpload}
            maxCount={1}
          >
            <Button icon={<PlusOutlined />}>Tải lên ảnh</Button>
          </Upload>
          {imageUrl || data?.data?.image ? (
            <img
              src={imageUrl || data?.data?.image}
              alt="Uploaded"
              style={{ width: "50%", marginTop: 10 }}
            />
          ) : null}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật hãng phát triển
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BrandEditPage;
