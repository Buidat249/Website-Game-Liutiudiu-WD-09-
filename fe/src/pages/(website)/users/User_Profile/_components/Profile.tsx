import { PlusOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imageUrl, setImageUrl] = useState<string>("");


  const userId = localStorage.getItem("user_id");
  const user = localStorage.getItem("user");


  // Cloudinary credentials
  const CLOUD_NAME = "dlcxulvmu"; // Thay bằng cloud name của bạn
  const UPLOAD_PRESET = "DATNWD-09"; // Thay bằng upload preset của bạn

  useEffect(() => {
    if (!userId) {
      setFormData({
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
      return;
    }

    fetch(`http://localhost:8080/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          ...data?.data,
          displayName: data?.data?.displayName ?? true,
        });
        const money = data?.data?.money || 0;
        localStorage.setItem("money", money.toString());
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Tên đăng nhập không được để trống.";
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (formData.phone && !/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ.";
    }

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Họ và tên không được để trống.";
    }

    if (formData.idCard && !/^\d{9,12}$/.test(formData.idCard)) {
      newErrors.idCard = "Chứng minh nhân dân không hợp lệ.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Tỉnh/Thành phố không được để trống.";
    }

    if (!formData.district.trim()) {
      newErrors.district = "Quận/Huyện không được để trống.";
    }

    if (!formData.ward.trim()) {
      newErrors.ward = "Xã/Phường không được để trống.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Cloudinary avatar upload handler
  const handleAvatarChange = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
        setImageUrl(data.secure_url);
        toast.success("Cập nhật ảnh đại diện thành công!");
      } else {
        toast.error("Tải ảnh lên thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({});
    if (!validateInputs()) return;

    if (!userId) {
      toast.error("Vui lòng đăng nhập để xem thông tin cá nhân!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Cập nhật thông tin thành công!");
        setTimeout(() => window.location.reload(), 1500); // Reload sau 1.5 giây
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi PUT request:", error);
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
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
          <p className="font-semibold">{formData.fullname || "Chưa có họ và tên"}</p>
        </div>
        <div>
          <p className="text-gray-600">Số điện thoại</p>
          <p className="font-semibold">{formData.phone || "Chưa có số điện thoại"}</p>
        </div>
        <div>
          <p className="text-gray-600">Số dư</p>
          <p className="font-semibold">{formData.money ? Number(formData.money).toLocaleString('vi-VN') : "0"}đ</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày tham gia</p>
          <p className="font-semibold">2024-11-09 01:18:29</p>
        </div>
      </div>

      {/* Phần cập nhật ảnh đại diện */}
      <div className="flex items-center mb-8">
        <img
          src={formData.avatar || imageUrl || "https://i.imgur.com/6VBx3io.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <Upload
            name="file"
            beforeUpload={handleAvatarChange}
            showUploadList={false}
          >
            <Button icon={<PlusOutlined />}>Sửa ảnh đại diện</Button>
          </Upload>
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
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">Họ và tên</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Họ và tên"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
            )}
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
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
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
            {errors.idCard && (
              <p className="text-red-500 text-sm mt-1">{errors.idCard}</p>
            )}
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
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
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
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district}</p>
            )}
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
            {errors.ward && (
              <p className="text-red-500 text-sm mt-1">{errors.ward}</p>
            )}
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
      <ToastContainer />
    </div>
  );

};

export default Profile;
