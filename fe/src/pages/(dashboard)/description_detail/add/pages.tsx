import instance from "@/configs/axios";
import {
  BackwardFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

type FieldType = {
  descriptiondetaildetail_id?: number;
  name?: string;
  image?: string;
  content?: string;
};

const DescriptionDetailAddPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (descriptiondetail: any) =>
      axios.post(`http://localhost:8080/descriptiondetails`, descriptiondetail),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["descriptiondetails"],
      });
      messageApi.success("Thêm mô tả chi tiết thành công");
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

    const descriptiondetailData = {
      ...values,
      image: imageFile, // Gắn ảnh vào `descriptiondetailData`
    };

    console.log("Sending data:", descriptiondetailData); // Kiểm tra dữ liệu trước khi gửi
    mutate(descriptiondetailData); // Gửi dữ liệu descriptiondetail với ảnh
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
        <h1 className="text-2xl font-semibold">Thêm mô tả chi tiết</h1>
        <Button type="primary">
          <Link to="/admin/description_details">
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
          label="Tên mô tả chi tiết "
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

        <Form.Item<FieldType>
          label="Nội dung mô tả chi tiết "
          name="content"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm mô tả chi tiết
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DescriptionDetailAddPage;
