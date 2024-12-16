import User from "../models/user";
import Game from "../models/game";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Comment from "../models/comment"; // Đường dẫn tới model Comment

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
    const user = await User.findOne({ user_id: userId }, "-password");
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
    body.password = await bcryptjs.hash(body.password, 6);

    // Lấy user_id cuối cùng để tạo user_id tự động tăng
    const lastUser = await User.findOne({}, {}, { sort: { user_id: -1 } });
    const newUserId = lastUser ? lastUser.user_id + 1 : 1;

    // Thêm user_id và role mặc định là "member"
    const userData = {
      user_id: newUserId,
      role: "member", // Gán quyền mặc định là "member"
      money: 0, // Thiết lập giá trị mặc định cho money
      fullname: body.fullname || "", // Gán chuỗi rỗng nếu fullname không được điền
      idCard: body.idCard || "", // Gán chuỗi rỗng nếu idCard không được điền
      gender: body.gender || "", // Gán chuỗi rỗng nếu gender không được điền
      city: body.city || "", // Gán chuỗi rỗng nếu city không được điền
      district: body.district || "", // Gán chuỗi rỗng nếu district không được điền
      ward: body.ward || "", // Gán chuỗi rỗng nếu ward không được điền
      avatar:
        body.avatar ||
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8RDhAQEA8PEhAQEA0PDRAPEA8QDQ0PFREWFxYRExQYHSggGBolGxUVITEhJSkrLi4uGB8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAgMH/8QAMhABAAEBBAgEBQQDAAAAAAAAAAECAwQRIQUSMUFRYXGRMoGhsSJCwdHwIzNy8VJigv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKt6vcU5RnV6R1Z9pa1VeKZn27A1pt6I+anvBF4o/wA6e8MYBuROOzPolh0VzGcTMdFuxv8AMeKMecZSDRHFla01RjTOPvDsAAAAAAAAAAAAAAAAAAAAB43q21Kcd85U9XF4vlNOUZz6R5s+3t6q5jHDLZEbIB5zIAAAAAJormJxiZieS/dr9E5V5Tx3T14M8BujLut7mnKc6fWno06aomMYzidgJAAAAAAAAAAAAAAAAUr/AHnD4KdvzTw5LldWETPCJliVVYzMztmcZBAAAAAAAAAACzcbxqzqz4Z9J4qwDdHjdbTWoid+yesPYAAAAAAAAAAAAAAHje5/Tq6Mhs3inGiqOUsYAAAAAAAAAAAAGpo+P045zVPrh9Fl43OMLOnpj3nF7AAAAAAAAAAAAAAAMW3s9WqY4Tl03NpT0jY4xrRuynoDOAAAAAAAAAAQl3YUa1URzjsDYs6cIiOERHo6AAAAAAAAAAAAAAABVvV7imdXVxy+LPCMJ3LTJv37lXl7QDxriMctm7ogQCQAAAAIACfzYALmj6qInOfiqyiOSm9LvTjXTH+0emYNkAAAAAAAAAAAAAAABn6Ss84q45T1aDwvtONnVyz7AyBKABICEJAD7CQQAAs6NztOkTP53Vl7RdOdU8ojv/QNAAAAAAAAAAAAAAAABFUYxMcYmJSAybW6VU0zM8YjLhx9ng2rajWpmOMZddzFAAAAAAAAB3YUa1URxnPpva9lZU0xhTH3lQ0bRjVM8I9Z/JaQAAAAAAAAAAAAAAAAAADJv1lq1zwqzj6tZ4Xyx1qecZx9gZIhIAAAAALmjrKJmap+XDCOfEFq6WOrRhO2c5+z3AAAAAAAAAAAAAAAAAAAAkcV2tMbaojzzBiQkAAAAAF7Rc+KP4z7qKzcLSKapxnCJjDzxgGoOaa4nZMT0nF0AAAAAAAAAAAAAAAAAACrpGrCjrMR9foy17SdWdMcIme/9KQAAAAAAAADbs6saYnjET6MRqXCvGzjlMx+dwWQAAAAAAAAAAAAAARVVEbZiOs4AkVrW+0Rs+KeWzuo296qqynKOEbPMHN5tNauZ8o6Q8wAAAAAAAAAW9HWuFU0zsq2dYVAG6MeyvNdOycuE5wt2ekI+aJjnGcAujiztaavDMT79nYAAAAAAAAAKF8vfy0+c/SAdXq+4fDTt3zujooVVTM4zMzPNAAAAAAAAAAAAAAAAABErl3v0xlXnHHfHXipgNymqJjGJxid6WPd7eaJy2b43S1qK4mImNkg6AAAAABxb+Cr+NXsxEgAAAAAAAAAAAAAAAAAAAADVuH7cf8AXuALAAAAP//Z",
      ...body, // Các trường khác từ frontend
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
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        money: user.money,
        favouriteGames: user.favouriteGames,
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

    // Lấy dữ liệu từ request
    const { currentPassword, password, ...otherUpdates } = req.body;

    // Tìm người dùng
    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }

    // Nếu yêu cầu cập nhật mật khẩu
    if (password) {
      // Kiểm tra nếu mật khẩu hiện tại được cung cấp
      if (!currentPassword) {
        return res.status(400).json({
          message: "Vui lòng cung cấp mật khẩu hiện tại để đổi mật khẩu",
        });
      }

      // Xác minh mật khẩu hiện tại
      const isMatch = await bcryptjs.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Mật khẩu hiện tại không đúng",
        });
      }

      // Băm mật khẩu mới
      const hashedPassword = await bcryptjs.hash(password, 6);
      user.password = hashedPassword;
    }

    // Cập nhật các thông tin khác (ngoại trừ password đã xử lý ở trên)
    Object.assign(user, otherUpdates);

    // Lưu thay đổi vào database
    await user.save();

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

export const toggleFavourite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { game_id, favourite } = req.body;

    if (typeof favourite !== "boolean") {
      return res
        .status(400)
        .json({ message: "Favourite must be a boolean value." });
    }

    if (!game_id || typeof game_id !== "number") {
      return res
        .status(400)
        .json({ message: "game_id is required and must be a valid number." });
    }

    const user = await User.findOne({ user_id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingGameIndex = user.favouriteGames.findIndex(
      (game) => game.game_id === game_id
    );

    if (existingGameIndex !== -1) {
      if (favourite === false) {
        // Xóa game khỏi danh sách yêu thích
        user.favouriteGames.splice(existingGameIndex, 1);
      } else {
        // Cập nhật trạng thái yêu thích
        user.favouriteGames[existingGameIndex].favourite = true;
      }
    } else if (favourite === true) {
      // Nếu game chưa có trong mảng, thêm mới vào mảng
      user.favouriteGames.push({ game_id, favourite });
    }

    await user.save(); // Lưu lại thay đổi

    return res.status(200).json({
      message: "Favourite updated successfully",
      data: user.favouriteGames,
    });
  } catch (error) {
    console.error("Error updating favourite:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET /users/:userId/favourite
export const getFavouriteGames = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Tìm người dùng theo userId
    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Trả về danh sách các game yêu thích của người dùng
    return res.status(200).json({
      message: "Favourite games fetched successfully",
      data: user.favouriteGames,
    });
  } catch (error) {
    console.error("Error fetching favourite games:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCommentsByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID người dùng không hợp lệ" });
    }

    // Lấy danh sách bình luận của người dùng
    const comments = await Comment.find({ user_id: userId }).sort({
      created_at: -1,
    });

    if (!comments.length) {
      return res.status(404).json({
        message: "Người dùng chưa có bình luận nào",
      });
    }

    return res.status(200).json({
      message: "Lấy danh sách bình luận thành công",
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
