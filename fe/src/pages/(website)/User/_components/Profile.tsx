import React, { useState } from "react";
import { FaRegAddressCard } from "react-icons/fa";

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "Ngô Tiến Đạt (FPL HN)",
    phone: "",
    idCard: "",
    gender: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    displayName: true,
  });

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Thông tin đã cập nhật:", formData);
    alert("Cập nhật thông tin thành công!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-6">
      {/* Phần tổng quan */}
      <h2 className="text-xl font-bold mb-4">Tổng quan</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div>
          <p className="text-gray-600">Tên đăng nhập</p>
          <p className="text-red-500 font-semibold">Chưa có tên đăng nhập</p>
        </div>
        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-semibold">datntph34171@fpt.edu.vn</p>
        </div>
        <div>
          <p className="text-gray-600">Họ và tên</p>
          <p className="font-semibold">{formData.fullname}</p>
        </div>
        <div>
          <p className="text-gray-600">Số dư</p>
          <p className="font-semibold">0đ</p>
        </div>
        <div>
          <p className="text-gray-600">Đã tích lũy</p>
          <p className="font-semibold">0đ</p>
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
