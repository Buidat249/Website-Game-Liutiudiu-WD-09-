import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select, Upload, message, FormProps } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { BackwardFilled, PlusOutlined } from "@ant-design/icons";

type FieldType = {
  name?: string;
  descriptiondetail_id?: number;
  image?: string;
  content?: string;
};

const DescriptionDetailEditPage: React.FC = () => {
  const { descriptiondetail_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const CLOUD_NAME = "dlcxulvmu"; // Thay bằng cloud name của bạn
  const UPLOAD_PRESET = "DATNWD-09"; // Thay bằng upload preset của bạn

  // Lấy dữ liệu mô tả chi tiết cụ thể
  const { data, isLoading, error } = useQuery({
    queryKey: ["descriptiondetails", descriptiondetail_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/descriptiondetails/${descriptiondetail_id}`)
        .then((response) => response.data),

  });

  // Lấy tất cả các mô tả (Description)
  const { data: descriptions, isLoading: isDescriptionsLoading } = useQuery({
    queryKey: ["descriptions"],
    queryFn: () =>
      axios
        .get("http://localhost:8080/descriptions")
        .then((response) => response.data),
  });

  const descriptionList = Array.isArray(descriptions?.data)
    ? descriptions.data
    : [];

  const { mutate } = useMutation({
    mutationFn: (descriptiondetail: any) =>
      axios.put(`http://localhost:8080/descriptiondetails/${descriptiondetail_id}`, descriptiondetail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["descriptiondetails"] });
      messageApi.success("Cập nhật mô tả chi tiết thành công");
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
    if (e && e.fileList) {
      return e.fileList.map((file: any) => {
        if (file.response) {
          return {
            uid: file.uid,
            name: file.name,
            status: file.status,
            url: file.response.secure_url, // Lấy URL từ Cloudinary
          };
        }
        return file;
      });
    }
    return [];
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const descriptionData = { ...values, image: imageUrl || data?.data?.image }; // Nếu không có ảnh mới, giữ ảnh cũ
    mutate(descriptionData);
    window.location.reload();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Thất bại", errorInfo);
  };

  if (isLoading || isDescriptionsLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading description detail: {error.message}</div>;

  // Kiểm tra cấu trúc dữ liệu
  console.log("Description Detail data:", data?.data); // Kiểm tra dữ liệu

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật mô tả chi tiết</h1>
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
        initialValues={{
          name: data?.data?.[0]?.name || "", // Lấy tên
          content: data?.data?.[0]?.content || "", // Lấy tên
          description_id: data?.data?.[0]?.description_id || [], // Lấy ID mô tả
          image: data?.data?.[0]?.image?.[0]
            ? [
              {
                uid: "-1",
                name: "Uploaded Image",
                status: "done",
                url: data.data[0].image[0], // URL ảnh
              },
            ]
            : [],
        }}

        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên mô tả chi tiết"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Nội dung mô tả chi tiết"
          name="content"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            listType="picture"
            customRequest={({ file, onSuccess }) => {
              handleImageUpload(file).then(() => onSuccess?.("ok"));
            }}
            defaultFileList={
              data?.data?.[0]?.image?.[0]
                ? [
                  {
                    uid: "-1",
                    name: "Uploaded Image",
                    status: "done",
                    url: data.data[0].image[0], // Lấy ảnh từ API
                  },
                ]
                : []
            }
            maxCount={1}
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          >
            <Button icon={<PlusOutlined />}>Tải lên ảnh</Button>
          </Upload>
        </Form.Item>



        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật mô tả chi tiết
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DescriptionDetailEditPage;
