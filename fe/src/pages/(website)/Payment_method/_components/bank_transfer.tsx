import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  Avatar,
  Row,
  Col,
  Table,
  Button,
  Modal,
} from "antd";

const bankLogos = [
  {
    name: "MB Bank",
    logo: "https://cdn.divineshop.vn/image/catalog/Logo-bank/logo-mbbank-33428.png?hash=1703148927",
  },
];

const transferInfo = [
  { key: "1", label: "Nội dung chuyển khoản", value: "CK username" },
  { key: "2", label: "Tên ngân hàng", value: "MB Bank" },
  { key: "3", label: "Số tài khoản", value: "25111807200416" },
  { key: "4", label: "Tên tài khoản", value: "Trần Văn Nhật" },
  { key: "5", label: "Chi nhánh", value: "Hà Nội" },
];

const columns = [
  {
    title: "Thông tin nạp tiền",
    dataIndex: "label",
    key: "label",
  },
  {
    title: "",
    dataIndex: "value",
    key: "value",
  },
];

const BankingPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(60); // 1 minute countdown

  const showQrCode = () => {
    setIsModalVisible(true);
    setCountdown(60); // Reset countdown when modal is opened
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Clear the timer when component is unmounted or countdown reaches 0
  }, [countdown]);

  return (
    <div className="bg-gray-100 p-6 mx-auto w-[1048px]">
      <Card>
        <Typography.Title level={3}>Nạp tiền vào tài khoản</Typography.Title>
        <Typography.Paragraph>
          Bạn có thể chọn các phương thức thanh toán khả dụng bên dưới
        </Typography.Paragraph>
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              title: "Chuyển Khoản Ngân Hàng 24/7",
              description:
                "Chuyển khoản ngân hàng online hoặc tại quầy giao dịch",
              icon: "https://cdn.divineshop.vn/image/catalog/Logo-bank/bank.png?hash=1604888771",
            },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.icon} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <Typography.Title level={4} style={{ marginTop: "20px" }}>
          Danh sách ngân hàng
        </Typography.Title>
        <Row gutter={[16, 16]} justify="start">
          {bankLogos.map((bank) => (
            <Col key={bank.name} xs={24} sm={12} md={8}>
              <Avatar src={bank.logo} size={64} />
            </Col>
          ))}
        </Row>
        <Typography.Title level={4} style={{ marginTop: "20px" }}>
          Thông tin nạp tiền
        </Typography.Title>
        <Table
          columns={columns}
          dataSource={transferInfo}
          pagination={false}
          bordered
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Button type="primary" onClick={showQrCode}>
            Nạp tiền
          </Button>
          <Button type="default" onClick={handleBack}>
            Quay lại
          </Button>
        </div>

        <Modal
          title="Mã QR để chuyển khoản"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Đóng
            </Button>,
          ]}
        >
          <img
            src="https://cdn.pixabay.com/photo/2023/02/28/01/51/qr-code-7819654_640.jpg"
            alt="QR Code"
            style={{
              width: "150px",
              height: "auto",
              marginBottom: "20px",
              margin: "auto",
            }}
          />
          <Typography.Text>Thời gian còn lại: {countdown} giây</Typography.Text>
        </Modal>
      </Card>
    </div>
  );
};

export default BankingPage;
