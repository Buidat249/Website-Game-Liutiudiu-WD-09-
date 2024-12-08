import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Spin,
} from "antd";

import {
  PlusOutlined,
  Loading3QuartersOutlined,
  BackwardFilled,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { options } from "joi";
import { Link, useParams } from "react-router-dom";

type FieldType = {
    tintuc_id?: number,
    title?: string,
    description_id?: number,
    image?: string,
    categorynew_id: number;
};

const TintucEditPage: React.FC = () => {
  const { tintuc_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const CLOUD_NAME = "dlcxulvmu"; // Thay bằng cloud name của bạn
  const UPLOAD_PRESET = "DATNWD-09"; // Thay bằng upload preset của bạn

  // Fetch game data
  const { data, isLoading, error } = useQuery({
    queryKey: ["tintucs", tintuc_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/tintucs/${tintuc_id}`)
        .then((response) => response.data),
  });

  // Mutation for updating game
  const { mutate } = useMutation({
    mutationFn: (tintuc: any) =>
      axios.put(`http://localhost:8080/tintucs/${tintuc_id}`, tintuc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tintucs"] });
      messageApi.success("Cập nhật game thành công");
    },
    onError: (error) => {
      messageApi.error(error.message);
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

   //fetch categorynew
   const { data: categorynew = { data: [] } } = useQuery({
    queryKey: ["categorynew"],
    queryFn: () =>
      axios.get("http://localhost:8080/categorynews").then((res) => res.data),
  });

  console.log("Categorynew:", categorynew);

  const categorynewList = Array.isArray(categorynew.data) ? categorynew.data : [];

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values: FieldType) => {
    const gameData = {
      ...values,
      image: imageUrl || data?.data?.image,
    }; // Nếu không có ảnh mới, giữ ảnh cũ
    mutate(gameData);
    window.localStorage.roload();
  };

  
  const { data: descriptions = { data: [] } } = useQuery({
    queryKey: ["descriptions"],
    queryFn: () =>
      axios.get("http://localhost:8080/descriptions").then((res) => res.data),
  });

  const descriptionList = Array.isArray(descriptions.data)
    ? descriptions.data
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brand: {error.message}</div>;

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật tin tuc</h1>
        <Button type="primary">
          <Link to="/admin/tintucs">
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
          title: data?.data?.title || "",
          description_id: data?.data?.description_id || [],
          image: data?.data?.image || "",
          categorynew_id: data?.data?.categorynew_id || [],
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tieu de"
          name="title"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Tên thể loại"
          name="categorynew_id"
          rules={[{ required: true, message: "Vui lòng chọn tên thể loại" }]}
        >
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn tên thể loại">
              {categorynewList.map((categorynew: any) => (
                <Select.Option
                  key={categorynew.categorynew_id}
                  value={categorynew.categorynew_id}
                >
                  {categorynew.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Tên mô tả"
          name="description_id"
          rules={[{ required: true, message: "Vui lòng chọn tên mô tả" }]}
        >
          <Select mode="multiple" placeholder="Chọn tên mô tả">
            {descriptionList.map((description: any) => (
              <Select.Option
                key={description.description_id}
                value={description.description_id}
              >
                {description.name}
              </Select.Option>
            ))}
          </Select>
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
            Cập nhật tin tuc
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TintucEditPage;
