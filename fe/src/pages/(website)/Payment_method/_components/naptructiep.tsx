import React from "react";
import { Card, Typography, Button } from "antd";

const { Title, Text, Link } = Typography;

const NapTrucTiepForm: React.FC = () => {
  const handleBack = () => {
    // Xử lý logic quay lại, ví dụ: điều hướng hoặc cập nhật giao diện
    window.history.back(); // Điều hướng về trang trước
  };

  return (
    <div className="bg-gray-100 p-6 mx-auto w-[1048px]">
      <Card>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <img
            src="https://cdn.divineshop.vn/image/catalog/Logo-bank/GDTT.png?hash=1604888771"
            alt="Giao dịch trực tiếp"
            style={{ marginRight: 15 }}
            width={40}
          />
          <Title level={4}>Giao dịch trực tiếp</Title>
        </div>
        <Text>
          Mua hàng tại các đại lý của LIUTUIDIU Shop trên khắp cả nước
        </Text>
        <div style={{ marginTop: 20 }}>
          <Text>
            Đại lý chỉ mua sản phẩm, không nhận nạp số dư vào tài khoản Divine
            Shop.
          </Text>
          <br />
          <Text>
            Hiện LIUTUIDIU Shop đã có hơn 60 điểm đại lý giao dịch trên toàn
            quốc. Các bạn có thể đến đưa tiền trực tiếp và được nhận key game
            ngay lập tức qua email.
          </Text>
          <br />
          <Text>
            Các bạn có thể xem chi tiết các địa điểm Giao dịch trực tiếp tại
            đây:
            <Link
              href="https://www.google.com/maps/@20.9747968,105.791488,11z?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              style={{ color: "red" }}
            >
              &nbsp;"Đại lý LIUTUIDIU Shop"
            </Link>
          </Text>
        </div>
        <div style={{ marginTop: 20, textAlign: "right" }}>
          <Button type="default" onClick={handleBack}>
            Quay lại
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NapTrucTiepForm;
