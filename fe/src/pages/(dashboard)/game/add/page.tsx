import instance from "@/configs/axios";
import { BackwardFilled, PlusOutlined, Loading3QuartersOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
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
import React from "react";
import { Link } from "react-router-dom";

type FieldType = {
  game_id?: number;
  brand_id?: number;
  category_id?: number;
  platform_id?: number;
  filter_id?: number;
  description_id?: number;
  name?: string;
  price?: number;
  discount?: number;
  final_price?: number;
  rating?: number;
  image?: string;
  configuration?: string;
  key_id?:number;
};

type Brands = {
  brand_id: number;
  name: string;
  image: string;
};

type Categories = {
  category_id: number;
  name: string;
};

type Platforms = {
  platform_id: number;
  name: string;
};

const GameAddPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate } = useMutation({
    mutationFn: (game: any) => axios.post(`http://localhost:8080/games`, game),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["games"],
      });
      messageApi.success("Thêm game thành công");
      form.resetFields();
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

  // fetch brand
  const { data: brands = { data: [] }, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      axios.get("http://localhost:8080/brands").then((res) => res.data),
  });

  const brandList = Array.isArray(brands.data) ? brands.data : [];

  // fetch category
  const { data: categories = { data: [] } } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get("http://localhost:8080/categories").then((res) => res.data),
  });

  const categoryList = Array.isArray(categories.data) ? categories.data : [];

  // fetch platform
  const { data: platforms = { data: [] } } = useQuery({
    queryKey: ["platforms"],
    queryFn: () =>
      axios.get("http://localhost:8080/platforms").then((res) => res.data),
  });

  const platformList = Array.isArray(platforms.data) ? platforms.data : [];

  // fetch filter
  const { data: filters = { data: [] } } = useQuery({
    queryKey: ["filters"],
    queryFn: () =>
      axios.get("http://localhost:8080/filters").then((res) => res.data),
  });

  const filterList= Array.isArray(filters.data) ? filters.data : [];

  // fetch description
  const { data: descriptions = { data: [] } } = useQuery({
    queryKey: ["descriptions"],
    queryFn: () =>
      axios.get("http://localhost:8080/descriptions").then((res) => res.data),
  });

  const descriptionList= Array.isArray(descriptions.data)
    ? descriptions.data
    : [];

    // fetch keys
  const { data: keys = { data: [] } } = useQuery({
    queryKey: ["keys"],
    queryFn: () =>
      axios.get("http://localhost:8080/keys").then((res) => res.data),
  });

  const keysList = Array.isArray(keys.data) ? keys.data : [];

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const imageFile =
      values.image && values.image[0]
        ? (values.image[0] as any).thumbUrl || (values.image[0] as any).name
        : undefined;

    // Đảm bảo key_count được truyền vào
    const gameData = {
      ...values,
      image: imageFile,
    };

    console.log("Sending data:", gameData);  // Kiểm tra dữ liệu có đúng không
    mutate(gameData);  // Gửi dữ liệu tới backend
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
        <h1 className="text-2xl font-semibold">Thêm game</h1>
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          label="Tên game"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Tên hãng phát triển"
          name="brand_id"
          rules={[{ required: true, message: "Vui lòng chọn tên hãng phát triển" }]}>
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

        <Form.Item<FieldType>
          label="Tên thể loại"
          name="category_id"
          rules={[{ required: true, message: "Vui lòng chọn tên thể loại" }]}>
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn tên thể loại">
              {categoryList.map((category: any) => (
                <Select.Option key={category.category_id} value={category.category_id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item<FieldType>
          label="Tên nền tảng"
          name="platform_id"
          rules={[{ required: true, message: "Vui lòng chọn tên nền tảng" }]}>
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn tên nền tảng">
              {platformList.map((platform: any) => (
                <Select.Option key={platform.platform_id} value={platform.platform_id}>
                  {platform.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          label="danh mục"
          name="filter_id"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}>
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn danh mục">
              {filterList.map((filter: any) => (
                <Select.Option key={filter.filter_id} value={filter.filter_id}>
                  {filter.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item<FieldType>
          label="Tên keys"
          name="key_id"
          rules={[{ required: true, message: "Vui lòng chọn keys" }]}>
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn tên nền tảng">
              {keysList.map((key: any) => (
                <Select.Option key={key.key_id} value={key.key_id}>
                  {key.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item<FieldType>
          label="mô tả"
          name="description_id"
          rules={[{ required: true, message: "Vui lòng chọn mô tả" }]}>
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn mô tả">
              {descriptionList.map((description: any) => (
                <Select.Option key={description.description_id} value={description.description_id}>
                  {description.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá game"
          name="price"
          rules={[
            { required: true, message: "Không được bỏ trống" },
            { type: "number", min: 0, message: "Giá sản phẩm phải là số dương" },
          ]}>
          <InputNumber />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giảm giá"
          name="discount"
          rules={[
            { type: "number", min: 0, max: 100, message: "Giảm giá phải từ 0 đến 100" },
          ]}>
          <InputNumber addonAfter="%" />
        </Form.Item>

        <Form.Item
          label="Tải ảnh lên"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item<FieldType>
          label="Cấu hình"
          name="configuration">
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm game
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default GameAddPage;
