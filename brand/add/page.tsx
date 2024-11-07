import instance from "@/configs/axios";
import {
  BackwardFilled,
  Loading3QuartersOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, Upload, message } from "antd";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

type FieldType = {
  brand_id?: number;
  name?: string;
  image?: string;
};

const BrandAddPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (brand: any) =>
      axios.post(`http://localhost:8080/brands`, brand),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
      messageApi.success("Thêm hãng phát triển thành công");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // Kiểm tra xem values.image có phải là một mảng chứa đối tượng hình ảnh không
    const imageFile =
      values.image && values.image[0]
        ? (values.image[0] as any).thumbUrl || (values.image[0] as any).name
        : undefined;

    const brandData = {
      ...values,
      image: imageFile, // Gắn ảnh vào `brandData`
    };

    console.log("Sending data:", brandData); // Kiểm tra dữ liệu trước khi gửi
    mutate(brandData); // Gửi dữ liệu brand với ảnh
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
        <h1 className="text-2xl font-semibold">Thêm hãng phát triển</h1>
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
          label="Tải ảnh lên"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm hãng phát triển
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BrandAddPage;
