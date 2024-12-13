import React from "react";
import { Form, Input, Button, Typography, Card, Modal } from "antd";

const { Title, Text } = Typography;

const CardBankForm: React.FC = () => {
  const onFinish = (values: any) => {
    Modal.warning({
      title: "Thông báo bảo trì",
      content: (
        <div>
          <p>Hệ thống thanh toán đang được nâng cấp để phục vụ tốt hơn.</p>
          <p>Vui lòng thử lại sau hoặc liên hệ với chúng tôi nếu cần hỗ trợ.</p>
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
            src="https://cdn.divineshop.vn/image/catalog/Logo-bank/visa-master.png?hash=1604888771"
            alt="Card logo"
            style={{ marginRight: 15 }}
            width={35}
          />
          <div>
            <Text strong>Thanh toán bằng thẻ Master/Visa/JCB</Text>
            <br />
            <Text type="secondary">Phí 2.36% + 2.660 đ</Text>
          </div>
        </div>
        <Text>Hệ thống thanh toán bằng thẻ Master/Visa/JCB.</Text>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div style={{ marginBottom: 8 }}>
            <Text strong style={{ color: "red" }}>
              Lưu Ý:
            </Text>{" "}
            <Text>Chỉ nhận thẻ của các ngân hàng trong nước</Text>
          </div>
          <Form.Item
            name="soTien"
            rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
          >
            <Input placeholder="Nhập số tiền" />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Nạp Liucoin
          </Button>
          <Button type="default" onClick={handleBack}>
            Quay lại
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CardBankForm;
