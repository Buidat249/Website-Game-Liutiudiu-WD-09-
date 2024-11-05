import instance from '@/configs/axios';
import { BackwardFilled, Loading3QuartersOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, InputNumber, Select, Spin, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { date } from 'joi';
import React from 'react';
import { Link } from 'react-router-dom';

type FieldType = {
  game_id?: number,
  brand_id?: number,
  category_id?: number,
  name?: string,
  description?: string,
  price?: number,
  discount?: number,
  platform?: string,
  rating?: number,
  image?: string,
};

type Brands = {
  _id: string;
  name: string;
};

const GameAddPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // Fetch brands from backend
  const { data: brands = { data: [] }, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: () => axios.get('http://localhost:8080/brands').then(res => res.data),
  });

  console.log("Brands:", brands);


  const { mutate } = useMutation({
    mutationFn: (game: FieldType) => axios.post(`http://localhost:8080/games`, game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      messageApi.success('Thêm game thành công');
    },
    onError: (error: any) => {
      messageApi.error(error.message || 'Đã xảy ra lỗi!');
    },
  });

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log("Sending data:", values);
    mutate(values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Thất bại', errorInfo);
  };

  const brandList = Array.isArray(brands.data) ? brands.data : [];

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
      >
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
          rules={[{ required: true, message: 'Vui lòng chọn nền tảng' }]}
        >
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select placeholder="Chọn nền tảng">
              {brandList.map((brand : any) => (
                <Select.Option key={brand._id} value={brand.name}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          )}
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
            Thêm game
          </Button>
        </Form.Item>
      </Form>
    </>
  );

};

export default GameAddPage;

