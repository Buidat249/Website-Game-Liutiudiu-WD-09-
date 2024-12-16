import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentPassword(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại.";
    }

    if (password.length < 6) {
      newErrors.password = "Mật khẩu mới phải từ 6 ký tự trở lên.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitPassword = async () => {
    setErrors({});
    if (!validateInputs()) return;

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.user_id;

      if (!userId) {
        setErrors({ currentPassword: "Bạn cần đăng nhập để thực hiện thao tác này." });
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/users/${userId}`,
        { currentPassword, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Hiển thị thông báo thành công
        toast.success("Mật khẩu đã được thay đổi thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setErrors({ currentPassword: "Mật khẩu hiện tại không đúng!" });
      } else {
        toast.error("Đã xảy ra lỗi khi cập nhật mật khẩu.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Mật khẩu & Bảo mật</h2>
      <p className="text-gray-600 mb-8">
        Vì sự an toàn, Liutiudiu Shop khuyến khích khách hàng sử dụng mật khẩu mạnh
        và bảo mật hai lớp.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          {/* Nhập mật khẩu hiện tại */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          {/* Nhập mật khẩu mới */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Nhập lại mật khẩu mới */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Nút lưu */}
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
            <li>Phải từ 6 ký tự trở lên</li>
            <li>Nên có ít nhất 1 số hoặc 1 ký tự đặc biệt</li>
            <li>Không nên giống với mật khẩu được sử dụng gần đây</li>
          </ul>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Security;
