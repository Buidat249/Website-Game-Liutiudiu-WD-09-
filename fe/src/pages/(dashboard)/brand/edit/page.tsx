import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, Upload, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { BackwardFilled, PlusOutlined } from '@ant-design/icons';

type FieldType = {
  brand_id?: number,
  name?: string;
  image?: string;
};

const BrandEditPage: React.FC = () => {
  const { brand_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // Lấy dữ liệu hãng phát triển cụ thể
  const { data, isLoading, error } = useQuery({
    queryKey: ['brands', brand_id],
    queryFn: () => axios.get(`http://localhost:8080/brands/${brand_id}`).then(response => response.data),
  });

  const { mutate } = useMutation({
    mutationFn: (brand: any) => axios.put(`http://localhost:8080/brands/${brand_id}`, brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      messageApi.success('Cập nhật hãng phát triển thành công');
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

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    // Kiểm tra xem values.image có phải là một mảng chứa đối tượng hình ảnh không
    const imageFile = values.image && values.image[0] 
        ? (values.image[0] as any).thumbUrl || (values.image[0] as any).name 
        : undefined;

    const brandData = {
        ...values,
        image: imageFile, // Gắn ảnh vào `brandData`
    };

    console.log("Sending data:", brandData); // Kiểm tra dữ liệu trước khi gửi
    mutate(brandData); // Gửi dữ liệu brand với ảnh
};

  const onFinishFailed = (errorInfo: any) => {
    console.log('Thất bại', errorInfo);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brand: {error.message}</div>;

  // Kiểm tra cấu trúc dữ liệu
  console.log("Brand data:", data); // Kiểm tra dữ liệu

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật hãng phát triển</h1>
        <Button type="primary">
          <Link to="/admin/brands">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ name: data?.data?.name || '' }} // Đảm bảo truy cập đúng trường
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Tên hãng phát triển '
          name='name'
          rules={[{ required: true, message: 'Không được bỏ trống' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Tải ảnh lên" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Cập nhật hãng phát triển
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BrandEditPage;

