import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";

const { Title, Text } = Typography;

const NapTienTuDongForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-gray-100 p-6  mx-auto w-[1048px]">
      <Title level={3}>Nạp tiền vào tài khoản</Title>
      <Text>Bạn có thể chọn các phương thức thanh toán khả dụng bên dưới</Text>
      <Card style={{ marginTop: 20 }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <img
            src="https://cdn.divineshop.vn/image/catalog/Logo-bank/Atm.png?hash=1604888771" // Thay bằng link hình ảnh của bạn
            alt="QR code"
            style={{ marginRight: 15 }}
            width={35}
          />   
          <div>
            <Text strong>Nap Số DƯ Tự Động Bằng Thể Ngân Hàng</Text>
            <br />
            <Text type="secondary">Phí 0.9% + 900đ</Text>
          </div>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Nhập số tiền"
            name="soTien"
            rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
          >
            <Input placeholder="Nhập số tiền" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Nạp Liucoin
          </Button>
        </Form>
        {/* <Text type="danger" style={{ display: "block", marginTop: 10 }}>
          error !!!!!!!!!!!
        </Text> */}
      </Card>
    </div>
  );
};

export default NapTienTuDongForm;
