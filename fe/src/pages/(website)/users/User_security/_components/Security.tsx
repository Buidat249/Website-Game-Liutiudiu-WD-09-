import React, { useState } from "react";

const Security = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paymentVerification, setPaymentVerification] =
    useState("Áp dụng với mọi IP");
  const [loginVerification, setLoginVerification] =
    useState("Không sử dụng OTP");
  const [authMethod, setAuthMethod] = useState("Bảo mật bằng Email");

  const handlePasswordChange = (e:any) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e:any) => setConfirmPassword(e.target.value);
  const handleSubmitPassword = () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
    } else {
      alert("Mật khẩu đã được thay đổi thành công!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Mật khẩu & Bảo mật</h2>
      <p className="text-gray-600 mb-8">
        Vì sự an toàn, Liutiudiu Shop khuyến khích khách hàng sử dụng mật khẩu mạnh
        và bảo mật hai lớp
      </p>

      {/* Đổi mật khẩu */}
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

      {/* Bảo mật hai lớp */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold mb-4">Bảo mật hai lớp</h3>
        <p className="text-gray-600 mb-6">
          Sử dụng xác thực hai lớp giúp tài khoản của bạn an toàn hơn, tránh
          được các giao dịch được thực hiện trái phép
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Xác thực khi thanh toán
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={paymentVerification}
              onChange={(e) => setPaymentVerification(e.target.value)}
            >
              <option>Áp dụng với mọi IP</option>
              <option>Chỉ áp dụng với IP đã lưu</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Xác thực khi đăng nhập
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={loginVerification}
              onChange={(e) => setLoginVerification(e.target.value)}
            >
              <option>Không sử dụng OTP</option>
              <option>Sử dụng OTP qua Email</option>
              <option>Sử dụng OTP qua SMS</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Phương thức xác thực
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={authMethod}
              onChange={(e) => setAuthMethod(e.target.value)}
            >
              <option>Bảo mật bằng Email</option>
              <option>Bảo mật bằng Google Authenticator</option>
            </select>
          </div>
        </div>

        <button className="mt-6 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600">
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default Security;
