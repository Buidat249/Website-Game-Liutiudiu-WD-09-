import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Card, Modal, Collapse } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const VnPay_autoForm: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(1800); // 30 phút (1800 giây)
  const [form] = Form.useForm(); // Tạo instance của form



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
    setCountdown(1800); // Reset lại khi đóng modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCountdown(1800); // Reset lại khi đóng modal
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    showModal(); // Hiển thị modal sau khi form được submit thành công
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleBack = () => {
    // Xử lý logic quay lại
    window.history.back(); // Điều hướng về trang trước
  };

  const handleRedirect = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    const amount = form.getFieldValue("soTien"); // Lấy giá trị số tiền từ form
    if (amount) {
      const url = `http://localhost:8080/carts/create-pay/vnpay?amount=${amount}&ref=naptienthucong_${user.user_id}_${(new Date()).getTime()}`;
      window.location.href = url; // Redirect sang URL
    } else {
      console.error("Vui lòng nhập số tiền trước khi nạp.");
    }
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
          form={form} // Gán form instance
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
            <Button type="primary" onClick={handleRedirect}>
              Nạp Liucoin
            </Button>
            <Button type="default" onClick={handleBack}>
              Quay lại
            </Button>
          </div>
        </Form>
      </Card>

      <Modal
        title="VNPAY QR"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="https://cdn.pixabay.com/photo/2023/02/28/01/51/qr-code-7819654_640.jpg" // Link mã QR
            alt="VNPAY QR"
            style={{
              margin: "auto",
              maxWidth: 150,
              display: "block",
            }}
          />
          <Button
            type="link"
            href="https://cdn.pixabay.com/photo/2023/02/28/01/51/qr-code-7819654_640.jpg"
            download
          >
            Lưu mã QR
          </Button>
          <br />
          <Button type="link">Hướng dẫn thanh toán QR</Button>
          <Text strong style={{ display: "block", marginTop: 10 }}>
            <ClockCircleOutlined /> Giao dịch kết thúc sau{" "}
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
        <Collapse style={{ marginTop: 20 }}>
          <Panel
            header="Danh sách ngân hàng / Ví điện tử liên kết thanh toán"
            key="1"
          >
            <ul>
              <li>Ngân hàng Vietcombank</li>
              <li>Ngân hàng BIDV</li>
              <li>Ví Momo</li>
              <li>Ví ZaloPay</li>
            </ul>
          </Panel>
        </Collapse>
      </Modal>
    </div>
  );
};

export default VnPay_autoForm;
