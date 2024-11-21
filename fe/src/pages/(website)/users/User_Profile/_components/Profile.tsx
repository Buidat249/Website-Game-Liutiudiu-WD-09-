import React, { useState, useEffect } from "react";
import { FaRegAddressCard } from "react-icons/fa";

const Profile = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    role_id: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    money: "",
    address: "",
    avatar: "",
    fullname: "",
    idCard: "",
    gender: "",
    city: "",
    district: "",
    ward: "",
    displayName: true,
  });

  // Lấy user_id từ localStorage
  const userId = localStorage.getItem("user_id");
  console.log(userId);

  useEffect(() => {
    if (userId) {
      // Gửi yêu cầu đến backend để lấy dữ liệu người dùng
      fetch(`http://localhost:8080/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data?.data);
          // Cập nhật formData với dữ liệu trả về từ API
          setFormData({
            user_id: data?.data.user_id || "",
            role_id: data?.data.role_id || "",
            password: data?.data.password || "",
            email: data?.data.email || "",
            money: data?.data.money || "",
            address: data?.data.address || "",
            avatar: data?.data.avatar || "",
            fullname: data?.data.fullname || "",
            phone: data?.data.phone || "",
            username: data?.data.username || "",
            idCard: data?.data.idCard || "",
            gender: data?.data.gender || "",
            city: data?.data.city || "",
            district: data?.data.district || "",
            ward: data?.data.ward || "",
            displayName: data?.data.displayName ?? true, // Mặc định là true nếu không có
          });
          
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  console.log('tt', formData);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Thông tin đã cập nhật:", formData);
    localStorage.setItem("user", JSON.stringify(formData));

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("Không tìm thấy user_id. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // In ra lỗi chi tiết từ backend
        const errorData = await response.json();
        console.error("Cập nhật thất bại:", errorData);
        alert("Cập nhật thất bại!");
      } else {
        const data = await response.json();
        console.log("Thông tin đã cập nhật thành công:", data);
        alert("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi PUT request:", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  };



  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mr-0 ml-auto my-6  w-[800px] ">
      {/* Phần tổng quan */}
      <h2 className="text-xl font-bold mb-4">Tổng quan</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div>
          <p className="text-gray-600">Tên đăng nhập</p>
          <p className="font-semibold">{formData.username || "Chưa có tên đăng nhập"}</p>
        </div>
        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-semibold">{formData.email || "Chưa có email"}</p>
        </div>
        <div>
          <p className="text-gray-600">Họ và tên</p>
          <p className="font-semibold">{formData.fullname}</p>
        </div>
        <div>
          <p className="text-gray-600">Số điện thoại</p>
          <p className="font-semibold">{formData.phone || "Chưa có số điện thoại"}</p>
        </div>
        <div>
          <p className="text-gray-600">Số dư</p>
          <p className="font-semibold"> {formData.money ? Number(formData.money).toLocaleString('vi-VN') : "0"}đ</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày tham gia</p>
          <p className="font-semibold">2024-11-09 01:18:29</p>
        </div>
      </div>

      {/* Phần cập nhật ảnh đại diện */}
      <div className="flex items-center mb-8">
        <img
          src="https://i.imgur.com/6VBx3io.png"
          alt="Avatar"
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Sửa ảnh đại diện
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Vui lòng chọn ảnh nhỏ hơn 5MB
            <br />
            Chọn hình ảnh phù hợp, không phản cảm
          </p>
        </div>
      </div>

      {/* Phần thông tin cá nhân */}
      <h2 className="text-xl font-bold mb-4">Cá nhân</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Tên đăng nhập"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Họ và tên</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Số điện thoại"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Chứng minh nhân dân</label>
            <input
              type="text"
              name="idCard"
              value={formData.idCard}
              onChange={handleChange}
              placeholder="Chứng minh nhân dân"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Giới tính</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">-</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600">Tỉnh / Thành phố</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Tỉnh / Thành phố"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Quận / Huyện</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Quận / Huyện"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Xã / Phường</label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              placeholder="Xã / Phường"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Số nhà / Đường</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Số nhà / Đường"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="displayName"
              checked={formData.displayName}
              onChange={handleChange}
              className="mr-2"
            />
            Cho phép hiển thị tên của bạn trên các hoạt động
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6 hover:bg-blue-600"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default Profile;
