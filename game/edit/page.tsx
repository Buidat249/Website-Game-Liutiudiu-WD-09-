import React, { useState } from "react";
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
import { PlusOutlined, Loading3QuartersOutlined, BackwardFilled } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

type FieldType = {
  game_id?: number;
  brand_id?: number;
  category_id?: number;
  platform_id?: number;
  name?: string;
  price?: number;
  discount?: number;
  rating?: number;
  image?: string;
  description?: string;
};

const CLOUD_NAME = "dlcxulvmu"; // Thay bằng cloud name của bạn
const UPLOAD_PRESET = "DATNWD-09"; // Thay bằng upload preset của bạn

const GameEditPage: React.FC = () => {
  const { game_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Fetch game data
  const { data, isLoading, error } = useQuery({
    queryKey: ["games", game_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/games/${game_id}`)
        .then((response) => response.data),
  });

  // Mutation for updating game
  const { mutate } = useMutation({
    mutationFn: (game: any) =>
      axios.put(`http://localhost:8080/games/${game_id}`, game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
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
        setImageUrl(data.secure_url);
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

  const onFinish = (values: FieldType) => {
    const gameData = { ...values, image: imageUrl };
    mutate(gameData);
  };

  //
  const { data: brands = { data: [] } } = useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      axios.get("http://localhost:8080/brands").then((res) => res.data),
  });

  console.log("Categories:", brands);
  const brandList = Array.isArray(brands.data) ? brands.data : [];

  //

   const { data: categories = { data: [] } } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get("http://localhost:8080/categories").then((res) => res.data),
  });

  console.log("Categories:", categories);
const categoriesList = Array.isArray(categories.data) ? categories.data : [];

//

const { data: platforms = { data: [] } } = useQuery({
  queryKey: ["platforms"],
  queryFn: () =>
    axios.get("http://localhost:8080/platforms").then((res) => res.data),
});

console.log("platforms:", platforms);
const platformsList = Array.isArray(platforms.data) ? platforms.data : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brand: {error.message}</div>;

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật game</h1>
        <Button type="primary">
          <Link to="/admin/games">
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
          brand_id: data?.data?.brand_id || [],
          category_id: data?.data?.category_id || [],
          platform_id: data?.data?.platform_id || [],
          price: data?.data?.price || 0,
          discount: data?.data?.discount || 0,
          image: data?.data?.image || "",
          description: data?.data?.description || "",
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên game"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên hãng phát triển"
          name="brand_id"
          rules={[{ required: true, message: "Vui lòng chọn tên hãng phát triển" }]}
        >
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn tên hãng phát triển">
              {brandList.map((brand: any) => (
                <Select.Option key={brand.brand_id} value={brand.brand_id}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Tên danh mục"
          name="category_id"
          rules={[{ required: true, message: "Vui lòng chọn tên danh mục" }]}
        >
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn tên danh mục">
              {categoriesList.map((category: any) => (
                <Select.Option key={category.category_id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Nền tảng"
          name="platform_id"
          rules={[{ required: true, message: "Vui lòng chọn nền tảng" }]}
        >
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn nền tảng">
              {platformsList.map((platform: any) => (
                <Select.Option key={platform.platform_id} value={platform.platform_id}>
                  {platform.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Giá game"
          name="price"
          rules={[
            { required: true, message: "Không được bỏ trống" },
            { type: "number", min: 0, message: "Giá sản phẩm phải là số dương" },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Giảm giá"
          name="discount"
          rules={[{ type: "number", min: 0, max: 100, message: "Giảm giá phải từ 0 đến 100" }]}
        >
          <InputNumber addonAfter="%" />
        </Form.Item>

        <Form.Item
          label="Tải ảnh lên"
          name="image"
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
          {imageUrl || data?.data?.image ? (
            <img
              src={imageUrl || data?.data?.image}
              alt="Uploaded"
              style={{ width: "20%", marginTop: 10 }}
            />
          ) : null}
        </Form.Item>

        <Form.Item label="Mô tả game" name="description">
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật game
          </Button>
        </Form.Item>
      </Form>

    </>
  );
};

export default GameEditPage;
