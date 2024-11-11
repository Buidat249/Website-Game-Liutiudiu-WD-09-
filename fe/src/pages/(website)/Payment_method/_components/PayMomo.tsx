import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";

const { Title, Text } = Typography;

const PayMoMOForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <Title level={3}>Nạp tiền vào tài khoản</Title>
      <Text>Bạn có thể chọn các phương thức thanh toán khả dụng bên dưới</Text>
      <Card style={{ marginTop: 20 }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <img
            src="https://cdn.divineshop.vn/image/catalog/Logo-bank/Momo.png?hash=1604888771" // Thay bằng link hình ảnh của bạn
            alt="QR code"
            style={{ marginRight: 15 }}
            width={35}
          />
          <div>
            <Text strong>Nạp số dư trực tiếp bằng Momo Payment</Text>
            <br />
            <Text type="secondary">
              Nạp Dcoin tự động liên kết với Momo, hoàn thành tức thì. Phí 5
            </Text>
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
   
      </Card>
    </div>
  );
};

export default PayMoMOForm;
