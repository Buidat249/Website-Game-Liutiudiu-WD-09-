import React from "react";
import { Form, Input, Button, Typography, Card, Select, message } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const TheCaoForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    // Display the notification when the form is submitted
    message.info("Đang xử lý, vui lòng đợi 5-10 phút.");
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
            src="https://cdn.divineshop.vn/image/catalog/Logo-bank/Viettel.png?hash=1604888771"
            alt="Credit card"
            style={{ marginRight: 15 }}
            width={35}
          />
          <div>
            <Text strong>Nạp tiền qua thẻ cào Viettel</Text>
            <br />
            <Text type="secondary">
              Nạp tiền qua thẻ cào Viettel, phí giao dịch 30%
            </Text>
          </div>
        </div>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Mệnh giá thẻ"
            name="cardAmount"
            rules={[{ required: true, message: "Vui lòng chọn mệnh giá thẻ!" }]}
          >
            <Select placeholder="---" style={{ width: "100%" }}>
              <Option value="10000">
                Thẻ 10.000 - Nhận 7.000 vào tài khoản
              </Option>
              <Option value="20000">
                Thẻ 20.000 - Nhận 14.000 vào tài khoản
              </Option>
              <Option value="30000">
                Thẻ 30.000 - Nhận 21.000 vào tài khoản
              </Option>
              <Option value="50000">
                Thẻ 50.000 - Nhận 35.000 vào tài khoản
              </Option>
              <Option value="100000">
                Thẻ 100.000 - Nhận 70.000 vào tài khoản
              </Option>
              <Option value="200000">
                Thẻ 200.000 - Nhận 140.000 vào tài khoản
              </Option>
              <Option value="300000">
                Thẻ 300.000 - Nhận 210.000 vào tài khoản
              </Option>
              <Option value="500000">
                Thẻ 500.000 - Nhận 350.000 vào tài khoản
              </Option>
              <Option value="1000000">
                Thẻ 1.000.000 - Nhận 700.000 vào tài khoản
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Số serial"
            name="serialNumber"
            rules={[{ required: true, message: "Vui lòng nhập số serial!" }]}
          >
            <Input placeholder="Số serial" />
          </Form.Item>

          <Form.Item
            label="Mã thẻ"
            name="cardCode"
            rules={[{ required: true, message: "Vui lòng nhập mã thẻ!" }]}
          >
            <Input placeholder="Mã thẻ" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Nạp Liucoin
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TheCaoForm;
