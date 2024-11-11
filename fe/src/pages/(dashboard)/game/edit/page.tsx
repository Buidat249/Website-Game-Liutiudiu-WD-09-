
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
  game_id?: number;
  brand_id?: number;
  category_id?: number;
  platform_id?: number;
  filter_id?: number;
  name?: string;
  price?: number;
  discount?: number;
  final_price?: number;
  rating?: number;
  image?: string;
  description?: string;
};

const GameEditPage: React.FC = () => {
  const { game_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const CLOUD_NAME = "dlcxulvmu"; // Thay bằng cloud name của bạn
  const UPLOAD_PRESET = "DATNWD-09"; // Thay bằng upload preset của bạn

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

  const onFinish = (values: FieldType) => {

    const price = values.price || 0;
    const discount = values.discount || 0;
    const final_price = price - (price * discount) / 100;
    const gameData = {
      ...values,
      final_price,
      image: imageUrl || data?.data?.image,
    }; // Nếu không có ảnh mới, giữ ảnh cũ
    mutate(gameData);
  };

  // Fetch lists for brands, categories, platforms, and filters
  const { data: brands = { data: [] } } = useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      axios.get("http://localhost:8080/brands").then((res) => res.data),
  });

  const brandList = Array.isArray(brands.data) ? brands.data : [];

  const { data: categories = { data: [] } } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get("http://localhost:8080/categories").then((res) => res.data),
  });

  const categoriesList = Array.isArray(categories.data) ? categories.data : [];

  const { data: platforms = { data: [] } } = useQuery({
    queryKey: ["platforms"],
    queryFn: () =>
      axios.get("http://localhost:8080/platforms").then((res) => res.data),
  });

  const platformsList = Array.isArray(platforms.data) ? platforms.data : [];

  const { data: filters = { data: [] } } = useQuery({
    queryKey: ["filters"],
    queryFn: () =>
      axios.get("http://localhost:8080/filters").then((res) => res.data),
  });

  const filtersList = Array.isArray(filters.data) ? filters.data : [];

  // Hàm tính toán final_price
  const calculateFinalPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  // Cập nhật final_price khi giá trị price hoặc discount thay đổi
  const handlePriceChange = (value: number) => {
    const newFinalPrice = calculateFinalPrice(value, discount);
    setFinalPrice(newFinalPrice);
    setPrice(value);
  };

  const handleDiscountChange = (value: number) => {
    const newFinalPrice = calculateFinalPrice(price, value);
    setFinalPrice(newFinalPrice);
    setDiscount(value);
  };

  useEffect(() => {
    if (data?.data?.price && data?.data?.discount) {
      setPrice(data?.data?.price);
      setDiscount(data?.data?.discount);
      setFinalPrice(
        calculateFinalPrice(data?.data?.price, data?.data?.discount)
      );
    }
  }, [data]);

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
          filter_id: data?.data?.filter_id || [],
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
          rules={[
            { required: true, message: "Vui lòng chọn tên hãng phát triển" },
          ]}
        >
          <Select mode="multiple" placeholder="Chọn tên hãng phát triển">
            {brandList.map((brand: any) => (
              <Select.Option key={brand.brand_id} value={brand.brand_id}>
                {brand.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Tên thể loại"
          name="category_id"
          rules={[{ required: true, message: "Vui lòng chọn tên thể loại" }]}
        >
          <Select mode="multiple" placeholder="Chọn tên thể loại">
            {categoriesList.map((category: any) => (
              <Select.Option
                key={category.category_id}
                value={category.category_id}
              >
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Giá game"
          name="price"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <InputNumber
            value={price}
            onChange={handlePriceChange}
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Giảm giá"
          name="discount"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <InputNumber
            value={discount}
            onChange={handleDiscountChange}
            min={0}
            max={100}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Giá sau giảm giá">
          <InputNumber value={finalPrice} disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
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
            customRequest={handleImageUpload}
            maxCount={1}
          >
            <Button icon={<PlusOutlined />}>Tải lên ảnh</Button>
          </Upload>
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

export default GameEditPage



