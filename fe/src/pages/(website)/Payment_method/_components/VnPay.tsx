import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Card, Modal, Collapse } from "antd";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const VnPay_autoForm: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(1800); // Countdown set to 30 minutes (1800 seconds)

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isModalVisible) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setCountdown(1800); // Reset the timer when closing the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCountdown(1800); // Reset the timer when closing the modal
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    showModal(); // Show the modal on successful form submission
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
            src="https://cdn.divineshop.vn/image/catalog/icon/Image%202022-06-24-1656046250-88939.png"
            alt="QR code"
            style={{ marginRight: 15 }}
            width={35}
          />
          <div>
            <Text strong>Thanh toán VNPAY-QR</Text>
            <br />
            <Text type="secondary">
              Quét mã QR PAY trên ứng dụng Mobile Banking, phí giao dịch 2%
            </Text>
          </div>
        </div>
        <Text>
          Mở App ngân hàng trên điện thoại, chọn phần QR Pay và nhập số tiền bạn
          muốn nạp vào khung bên dưới.
        </Text>
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

      <Modal
        title="VNPAY QR"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="https://cdn.pixabay.com/photo/2023/02/28/01/51/qr-code-7819654_640.jpg" // Path to the uploaded image or replace with your hosted QR code URL
            alt="VNPAY QR"
            style={{ margin:"auto", maxWidth: 150,}}
          />
          <Button type="link" href="/path-to-qr-code" download>
            Lưu mã QR
          </Button>
          <br />
          <Button type="link">Hướng dẫn thanh toán QR</Button>
          <Text strong style={{ display: "block", marginTop: 10 }}>
            Giao dịch kết thúc sau{" "}
            <Text type="danger">{formatTime(countdown)}</Text>
          </Text>
          <div style={{ marginTop: 10, color: "red" }}>
            <Text type="danger" style={{ fontWeight: "bold" }}>
              Lưu ý:
            </Text>{" "}
            Quý khách vui lòng <Text strong>không đóng trình duyệt</Text> tới
            khi hệ thống chuyển sang bước kết quả thanh toán.
          </div>
        </div>
        {/* <Collapse style={{ marginTop: 20 }}>
          <Panel
            header="Danh sách ngân hàng / Ví điện tử liên kết thanh toán"
            key="1"
          >

          </Panel>
        </Collapse> */}
      </Modal>
    </div>
  );
};

export default VnPay_autoForm;
