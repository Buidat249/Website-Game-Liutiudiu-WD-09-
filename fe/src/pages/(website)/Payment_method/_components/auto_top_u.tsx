import React from "react";
import { Form, Input, Button, Typography, Card, Modal } from "antd";

const { Title, Text } = Typography;

const NapTienTuDongForm: React.FC = () => {
  const onFinish = (values: any) => {
    // Hiển thị thông báo bảo trì
    Modal.warning({
      title: "Thông báo bảo trì",
      content: (
        <div>
          <p>Hệ thống thanh toán tự động đang được nâng cấp.</p>
          <p>Vui lòng thử lại sau hoặc liên hệ với chúng tôi để được hỗ trợ.</p>
        </div>
      ),
      okText: "Đóng",
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleBack = () => {
    // Xử lý logic quay lại
    window.history.back(); // Điều hướng về trang trước
  };

  return (
    <div className="bg-gray-100 p-6 mx-auto w-[1048px]">
      <Title level={3}>Nạp tiền vào tài khoản</Title>
      <Text>Bạn có thể chọn các phương thức thanh toán khả dụng bên dưới</Text>
      <Card style={{ marginTop: 20 }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <img
            src="https://cdn.divineshop.vn/image/catalog/Logo-bank/Atm.png?hash=1604888771"
            alt="ATM Logo"
            style={{ marginRight: 15 }}
            width={35}
          />
          <div>
            <Text strong>Nạp Số Tự Động Bằng Thẻ Ngân Hàng</Text>
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
          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="primary" htmlType="submit">
              Nạp Liucoin
            </Button>
            <Button type="default" onClick={handleBack}>
              Quay lại
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default NapTienTuDongForm;
