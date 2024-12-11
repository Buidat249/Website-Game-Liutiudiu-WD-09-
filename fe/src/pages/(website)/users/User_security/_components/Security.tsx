import React, { useState } from "react";
import axios from "axios";

const Security = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const handleSubmitPassword = async () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.user_id;

      if (!userId) {
        alert("Bạn cần đăng nhập để thực hiện thao tác này.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/users/${userId}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Mật khẩu đã được thay đổi thành công!");
      }
    } catch (error: any) {
      console.error("Cập nhật mật khẩu thất bại:", error.message);
      alert("Đã xảy ra lỗi khi cập nhật mật khẩu.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Mật khẩu & Bảo mật</h2>
      <p className="text-gray-600 mb-8">
        Vì sự an toàn, Liutiudiu Shop khuyến khích khách hàng sử dụng mật khẩu mạnh
        và bảo mật hai lớp
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button
            className="mt-4 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
            onClick={handleSubmitPassword}
          >
            Lưu thay đổi
          </button>
        </div>
        <div className="text-gray-600">
          <h3 className="font-semibold">Mật khẩu của bạn</h3>
          <ul className="list-disc ml-5 mt-2">
            <li>Phải từ 8 ký tự trở lên</li>
            <li>Nên có ít nhất 1 số hoặc 1 ký tự đặc biệt</li>
            <li>Không nên giống với mật khẩu được sử dụng gần đây</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Security;
