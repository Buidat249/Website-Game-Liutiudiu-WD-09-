import User from "../models/user";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// GET / users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Get All Users Done",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /users/ : id
export const getUserDetail = async (req, res) => {
  try {
    // Chuyển đổi user_id sang kiểu số
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID người dùng không hợp lệ" });
    }

    // Tìm người dùng theo user_id
    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      message: "Get User Detail Done",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST / register
export const Register = async (req, res) => {
  try {
    const body = req.body;

    // Băm mật khẩu trước khi lưu

    // Hash password trước khi lưu

    // Băm mật khẩu trước khi lưu

    body.password = await bcryptjs.hash(body.password, 6);

    // Lấy user_id cuối cùng để tạo user_id tự động tăng
    const lastUser = await User.findOne({}, {}, { sort: { user_id: -1 } });
    const newUserId = lastUser ? lastUser.user_id + 1 : 1;

    // Thêm user_id và role mặc định là "member"
    const userData = {
      user_id: newUserId,
      role: "member", // Gán quyền mặc định là "member"
      ...req.body, // Các trường khác từ frontend
    };

    const userModel = new User(userData);
    const user = await userModel.save();

    res.status(201).send({ user: user, message: "Đăng ký thành công" });
  } catch (error) {
    console.error("Error creating user:", error); // Ghi log lỗi
    res.status(500).send({ message: "Đăng ký thất bại: " + error.message });
  }
};

// POST / login
export const Login = async (req, res) => {
  try {
    const body = req.body;

    // Tìm người dùng theo username
    const user = await User.findOne({
      username: body.username,
    });

    if (!user) {
      return res.status(404).send({ message: "Không tìm thấy người dùng" });
    }

    // Kiểm tra mật khẩu
    const verify = await bcryptjs.compare(body.password, user.password);
    if (verify) {
      // Kiểm tra và gán quyền mặc định "member" nếu chưa có role
      if (!user.role) {
        user.role = "member"; // Gán quyền mặc định nếu không có
        await user.save();
      }

      // Tạo token với quyền truy cập và role_id
      const token = await jwt.sign(
        { id: user.user_id, role: user.role, role_id: user.role_id }, // Thêm role_id vào token
        process.env.JWT_SECRET || "123456", // Tốt nhất nên sử dụng biến môi trường cho JWT_SECRET
        { expiresIn: "1h" }
      );

      res.send({
        status: true,
        message: "Đăng nhập thành công",
        token: token,

        username: user.username,
        email: user.email,

        email: user.email,

        username: user.username,
        email: user.email,

        role_id: user.role_id, // Trả về role_id của người dùng
      });
    } else {
      res.status(401).send({ status: false, message: "Sai mật khẩu" });
    }
  } catch (error) {
    res.status(500).send({ message: "Đăng nhập thất bại: " + error.message });
  }
};

// PUT / users / :id

export const updateUser = async (req, res) => {
  try {
    // Chuyển đổi user_id sang kiểu số

    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID người dùng không hợp lệ" });
    }

    // Kiểm tra nếu mật khẩu được cập nhật trong yêu cầu
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 6); // Băm mật khẩu mới
    }

    // Cập nhật thông tin người dùng
    const user = await User.findOneAndUpdate({ user_id: userId }, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      message: "Cập nhật người dùng thành công",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// DELETE / users / :id

export const removeUser = async (req, res) => {
  try {
    // Chuyển đổi user_id sang kiểu số
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID người dùng không hợp lệ" });
    }

    // Xóa người dùng
    const user = await User.findOneAndDelete({ user_id: userId });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      message: "Delete User Done",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
