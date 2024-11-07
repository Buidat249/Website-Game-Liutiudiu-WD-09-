import instance from "@/configs/axios";
import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
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
import React from "react";
import { Link } from "react-router-dom";

type FieldType = {
  game_id?: number;
  brand_id?: number;
  category_id?: number;
  platform_id: number;
  name?: string;
  price?: number;
  discount?: number;
  rating?: number;
  image?: string;
  description?: string;
};

type Brands = {
  brand_id: number;
  name: string;
  image: string;
}

type Categories = {
  category_id: number;
  name: string;
}

type Platforms = {
  platform_id: number;
  name: string;
}

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

  const { data: brands = { data: [] }, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      axios.get("http://localhost:8080/brands").then((res) => res.data),
  });

  console.log("Brands:", brands);

  const brandList = Array.isArray(brands.data) ? brands.data : [];

  const { data: categories = { data: [] } } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get("http://localhost:8080/categories").then((res) => res.data),
  });

  console.log("Categories:", categories);

  const categoryList = Array.isArray(categories.data) ? categories.data : [];

  const { data: platforms = { data: [] } } = useQuery({
    queryKey: ["platforms"],
    queryFn: () =>
      axios.get("http://localhost:8080/platforms").then((res) => res.data),
  });

  console.log("Platforms:", platforms);

  const platformList = Array.isArray(platforms.data) ? platforms.data : [];

  // Kiểm tra dữ liệu nhận được
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    

    const imageFile = values.image && values.image[0] 
        ? (values.image[0] as any).thumbUrl || (values.image[0] as any).name 
        : undefined;

    const platformData = {
        ...values,
        image: imageFile, // Gắn ảnh vào `brandData`
    };

    console.log("Sending data:", platformData); // Kiểm tra dữ liệu trước khi gửi
    mutate(platformData); // Gửi dữ liệu brand với ảnh
    console.log("Sending data:", values);
    mutate(values);
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
      <Form name='basic' labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
          <Form.Item<FieldType>
            label="Tên hãng phát triển"
            name="brand_id"
            rules={[{ required: true, message: "Vui lòng chọn tên hãng phát triển" }]}
          >
            {isLoading ? (
              <Spin indicator={<Loading3QuartersOutlined spin/>}/>
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
            label="Tên danh mục"
            name="category_id"
            rules={[{ required: true, message: "Vui lòng chọn tên danh mục" }]}
          >
            {isLoading ? (
              <Spin indicator={<Loading3QuartersOutlined spin/>}/>
            ) : (
              <Select placeholder="Chọn tên danh mục">
                {categoryList.map((category: any) => (
                  <Select.Option key={category.category_id} value={category.category_id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item<FieldType>
            label="Nền tang"
            name="platform_id"
            rules={[{ required: true, message: "Vui lòng chọn nền tảng" }]}
          >
            {isLoading ? (
              <Spin indicator={<Loading3QuartersOutlined spin />} />
            ) : (
              <Select placeholder="Chọn nền tảng">
                {platformList.map((platform: any) => (
                  <Select.Option key={platform.platform_id} value={platform.platform_id}>
                    {platform.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>


          <Form.Item<FieldType>
            label="Tên game"
            name="name"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item<FieldType>
            label="Giá game"
            name="price"
            rules={[
              { required: true, message: "Không được bỏ trống" },
              {
                type: "number",
                min: 0,
                message: "Giá sản phẩm phải là số dương",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item<FieldType>
            label="Giảm giá"
            name="discount"
            rules={[
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Giảm giá phải từ 0 đến 100",
              },
            ]}
            >
            <InputNumber addonAfter="%" />
          </Form.Item>


          <Form.Item label="Tải ảnh lên" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item<FieldType> label="Mô tả game" name="description">
            <TextArea rows={5} />
          </Form.Item>


          <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type='primary' htmlType='submit'>
                  Thêm hãng game
                </Button>
            </Form.Item>
      </Form>
    </>
  );
};

export default GameAddPage;







/**<>
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
>
  <Form.Item<FieldType>
    label=""
    name="brand_id"
    rules={[{ required: true, message: "Vui lòng chọn nền tảng" }]}
  >
    {isLoading ? (
      <Spin indicator={<Loading3QuartersOutlined spin />} />
    ) : (
      <Select placeholder="Chọn nền tảng">
        {brandList.map((brand: any) => (
          <Select.Option key={brand.brand_id} value={brand.brand_id}>
            {brand.name}
          </Select.Option>
        ))}
      </Select>
    )}
  </Form.Item>

  <Form.Item<FieldType>
    label=""
    name="category_id"
    rules={[{ required: true, message: "Vui lòng chọn danh muc" }]}
  >
    {isLoading ? (
      <Spin indicator={<Loading3QuartersOutlined spin />} />
    ) : (
      <Select placeholder="Chọn nền tảng">
        {categoryList.map((category: any) => (
          <Select.Option
            key={category.category_id}
            value={category.category_id}
          >
            {category.name}
          </Select.Option>
        ))}
      </Select>
    )}
  </Form.Item>

  <Form.Item<FieldType>
    label="Tên game"
    name="name"
    rules={[{ required: true, message: "Không được bỏ trống" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item<FieldType> label="Mô tả sản phẩm" name="description">
    <TextArea rows={5} />
  </Form.Item>

  <Form.Item<FieldType>
    label="Giá sản phẩm"
    name="price"
    rules={[
      { required: true, message: "Không được bỏ trống" },
      {
        type: "number",
        min: 0,
        message: "Giá sản phẩm phải là số dương",
      },
    ]}
  >
    <InputNumber />
  </Form.Item>

  <Form.Item<FieldType>
    label="Giảm giá"
    name="discount"
    rules={[
      {
        type: "number",
        min: 0,
        max: 100,
        message: "Giảm giá phải từ 0 đến 100",
      },
    ]}
  >
    <InputNumber addonAfter="%" />
  </Form.Item>

  <Form.Item<FieldType>
    label="Tên nen tang"
    name="platform"
    rules={[{ required: true, message: "Không được bỏ trống" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item<FieldType>
    label="Ảnh game"
    name="image"
    rules={[{ required: true, message: 'Không được bỏ trống' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button type="primary" htmlType="submit">
      Thêm game
    </Button>
  </Form.Item>
</Form>
</> */