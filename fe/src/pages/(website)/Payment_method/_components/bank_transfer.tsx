import React, { useState } from "react";
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

  const showQrCode = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <Card style={{ maxWidth: 900, margin: "20px auto", padding: "20px" }}>
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
          <Col key={bank.name}>
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

      <Button type="primary" style={{ marginTop: "20px" }} onClick={showQrCode}>
        Nạp tiền
      </Button>

      <Modal
        title="Mã QR để chuyển khoản"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <img
          src="" // Đường dẫn đến hình ảnh mã QR thật
          alt="QR Code"
          style={{ width: "100%" }}
        />
      </Modal>

      <Typography.Paragraph style={{ marginTop: "20px", color: "red" }}>
        <strong>Lưu ý:</strong> Hệ thống sẽ xử lý tự động cộng dồn số dư sau khi
        chuyển khoản 1-3 phút nếu bạn:
        <ul>
          <li>
            Ghi nội dung chuyển khoản <strong>Dùng nội dung bên trên</strong>.
          </li>
          <li>Sử dụng hình thức chuyển tiền nhanh 24/7.</li>
        </ul>
        Trong trường hợp gặp sự cố, liên hệ CSKH để được trợ giúp.
      </Typography.Paragraph>
    </Card>
  );
};

export default BankingPage;
