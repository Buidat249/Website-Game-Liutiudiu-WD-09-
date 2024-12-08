import React from "react";
import { List, Typography, Card, Divider, Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";

const paymentMethods = [
  {
    title: "Chuyển Khoản Ngân Hàng 24/7",
    description: "Chuyển khoản ngân hàng online hoặc tại quầy giao dịch",
    icon: "https://cdn.divineshop.vn/image/catalog/Logo-bank/bank.png?hash=1604888771", // Đường dẫn đến hình ảnh icon thực tế
    route: "/banhking24h",
  },
  {
    title: "Thanh toán VNPAY-QR",
    description:
      "Quét mã QR PAY trên ứng dụng Mobile Banking, phí giao dịch 2%",
    icon: "https://cdn.divineshop.vn/image/catalog/icon/Image%202022-06-24-1656046250-88939.png?hash=1656046385",
    route: "/VnPhayauto",
  },
  {
    title: "Nạp số dư tự động bằng thẻ ngân hàng",
    description: "Phí 0.9% + 900đ",
    icon: "https://cdn.divineshop.vn/image/catalog/Logo-bank/Atm.png?hash=1604888771",
    route: "/NapTienTuDongForm",
  },
  {
    title: "Thanh toán bằng thẻ Master/Visa/JCB",
    description: "Phí 2.36% + 2,660 đ",
    icon: "https://cdn.divineshop.vn/image/catalog/Logo-bank/visa-master.png?hash=1604888771",
    route: "/CardBank",
  },
  {
    title: "Nạp tiền qua thẻ cào Viettel",
    description: "Nạp tiền qua thẻ cào Viettel, phí giao dịch 30%",
    icon: "https://cdn.divineshop.vn/image/catalog/Logo-bank/Viettel.png?hash=1604888771",
    route: "/napthecao",
  },
  {
    title: "Nạp số dư trực tiếp bằng Momo Payment",
    description:
      "Nạp Dcoin tự động liên kết với Momo, hoàn thành tức thì. Phí 5%",
    icon: "https://cdn.divineshop.vn/image/catalog/Logo-bank/Momo.png?hash=1604888771",
    route: "/PayMoMOAuto",
  },
  {
    title: "Giao dịch trực tiếp",
    description: "Mua hàng tại các đại lý của Divine Shop trên khắp cả nước",
    icon: "https://cdn.divineshop.vn/image/catalog/Logo-bank/GDTT.png?hash=1604888771",
    route: "/naptructiep",
  },
];

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();

  const handleItemClick = (route: string | undefined) => {
    if (route) {
      navigate(route); // Điều hướng đến đường dẫn khi nhấp vào mục
    }
  }

  return (
    <div className="bg-gray-100  mx-auto w-[1048px]">
      <Card>
        <Typography.Title level={3}>Nạp tiền vào tài khoản</Typography.Title>
        <Typography.Paragraph>
          Bạn có thể chọn các phương thức thanh toán khả dụng bên dưới owr
        </Typography.Paragraph>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={paymentMethods}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleItemClick(item.route)}
              style={{ cursor: item.route ? "pointer" : "default" }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.icon} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
      
    </div>
  );
};

export default PaymentPage;
