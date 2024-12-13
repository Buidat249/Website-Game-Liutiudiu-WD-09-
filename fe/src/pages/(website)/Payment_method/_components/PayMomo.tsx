import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Modal } from "antd";

const { Title, Text } = Typography;

const PayMoMOForm: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState<string>("");

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

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleBack = () => {
    // Xử lý logic quay lại
    window.history.back(); // Điều hướng về trang trước
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
            src="https://cdn.divineshop.vn/image/catalog/Logo-bank/Momo.png?hash=1604888771"
            alt="QR code"
            style={{ marginRight: 15 }}
            width={35}
          />
          <div>
            <Text strong>Nạp số dư trực tiếp bằng Momo Payment</Text>
            <br />
            <Text type="secondary">
              Nạp Dcoin tự động liên kết với Momo, hoàn thành tức thì. Phí 5%
            </Text>
          </div>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Nhập số tiền"
            name="soTien"
            rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
          >
            <Input
              placeholder="Nhập số tiền"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Nạp Liucoin
          </Button>
          <Button type="default" onClick={handleBack}>
            Quay lại
          </Button>
        </Form>
      </Card>

      {/* Modal to show the QR code and payment details */}
      <Modal
        title="Nạp số dư trực tiếp bằng Momo Payment"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="custom-momo-modal" // Custom class for styling
      >
        <p>Số tiền: {amount}đ</p>
        <p>Phí giao dịch: {(parseFloat(amount) * 0.05).toFixed(0)}đ (5%)</p>
        <p>
          Tổng tiền:{" "}
          {(parseFloat(amount) + parseFloat(amount) * 0.05).toFixed(0)}đ
        </p>
        <div className="modal-qr-container">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=momo%3A%2F%2Fapp%3Faction%3DpayWithApp%26isScanQR%3Dtrue%26serviceType%3Dqr%26sid%3DTU9NT1hGUE4yMDE5MDUzMHxNTTIyMDg5MTc%26v%3D3.0"
            alt="QR Code"
            style={{ margin: "aotu", width: "200px", height: "200px" }}
          />
        </div>
        <Text strong>Thực hiện theo hướng dẫn sau để thanh toán:</Text>
        <ol>
          <li>Mở ứng dụng MoMo để thanh toán</li>
          <li>Chọn "Thanh Toán" và quét mã QR tại hướng dẫn này</li>
          <li>
            Hoàn thành các bước thanh toán theo hướng dẫn và đợi Divine Shop xử
            lý trong giây lát
          </li>
        </ol>
      </Modal>
    </div>
  );
};

export default PayMoMOForm;
