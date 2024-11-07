import instance from '@/configs/axios';
import { BackwardFilled, Loading3QuartersOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Form, FormProps, Input, InputNumber, Select, Spin, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { options } from 'joi';
import React from 'react'
import { Link, useParams } from 'react-router-dom';

type FieldType = {
  game_id?: number,
  brand_id?: number,
  category_id?: number,
  name?: string,
  description?: string
  price?: number,
  discount?: number,
  platform?: string,
  rating?: number,
  image?: string
};

type Brands = {
  brand_id: number;
  name: string;
}

type Categories = {
  category_id: number;
  name: string;
}

const GameEditPage: React.FC = () => {
  const { game_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

    // Lấy dữ liệu hãng phát triển cụ thể
    const { data, isLoading, error } = useQuery({
      queryKey: ['games', game_id],
      queryFn: () => axios.get(`http://localhost:8080/games/${game_id}`).then(response => response.data),
    });

    const { mutate } = useMutation({
      mutationFn: (game: any) => axios.put(`http://localhost:8080/games/${game_id}`, game),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['games'] });
        messageApi.success('Cập nhật game thành công');
      },
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: error.message,
        });
      },
    });

    const { data: brands = { data: [] } } = useQuery({
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
  
    console.log("categories:", categories);
  
    const categoryList = Array.isArray(categories.data) ? categories.data : [];
  
  

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
      console.log("Sending data:", values);
      mutate(values);
    };
  
    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
      errorInfo
    ) => {
      console.log("Thất bại", errorInfo);
    };
  
      // Kiểm tra cấu trúc dữ liệu
      console.log("Category data:", data); // Kiểm tra dữ liệu
  
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error loading brand: {error.message}</div>;

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold"> Cập nhật game</h1>
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
        initialValues={{ name: data?.data?.name || '' }} // Đảm bảo truy cập đúng trường
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
<Form.Item<FieldType>
          label="Hãng"
          name="brand_id"
          rules={[{ required: true, message: 'Vui lòng chọn Hãng' }]}
        >
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select placeholder="chọn Hang">
              {brandList.map((brand : any) => (
                <Select.Option key={brand.brand_id} value={brand.name}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          label="Danh mục "
          name="category_id"
          rules={[{ required: true, message: 'Vui lòng chọn Danh mục ' }]}
        >
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select placeholder="chọn DAnh muc ">
              {categoryList.map((category : any) => (
                <Select.Option key={category.category_id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          label="Tên game"
          name="name"
          rules={[{ required: true, message: 'Không được bỏ trống' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả sản phẩm"
          name="description"
        >
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: 'Không được bỏ trống' },
            { type: 'number', min: 0, message: 'Giá sản phẩm phải là số dương' }
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giảm giá"
          name="discount"
          rules={[
            { type: "number", min: 0, max: 100, message: "Giảm giá phải từ 0 đến 100" },
          ]}
        >
          <InputNumber addonAfter="%" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Nền tảng"
          name="platform"
        >
          <Input placeholder="PC, Console, Mobile..." />
        </Form.Item>    

        <Form.Item<FieldType>
          label="Đánh giá"
          name="rating"
          rules={[
            { type: "number", min: 0, max: 5, message: "Đánh giá phải từ 0 đến 5" },
          ]}
        >
          <InputNumber step={0.1} />
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
          Cập nhật game
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default GameEditPage