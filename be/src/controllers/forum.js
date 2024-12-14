import Forum from "../models/forum";
import User from "../models/user";
import moment from "moment-timezone";

export const getConversition = async (req, res) => {
  try {
    const room_code = req.query.room_code;
    const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
    const limit = parseInt(req.query.limit) || 10; // Số tin nhắn mỗi trang (mặc định là 10)
    const skip = (page - 1) * limit; // Số lượng tin nhắn cần bỏ qua

    if (!room_code) {
      return res.status(400).json({
        message: "room_code is required",
      });
    }

    // Tổng số tin nhắn trong room_code
    const totalMessages = await Forum.countDocuments({ room_code });

    // Nếu không có tin nhắn nào
    if (totalMessages === 0) {
      return res.status(404).json({
        message: "No messages found for the specified room_code",
        data: [],
      });
    }

    // Lấy tin nhắn và thông tin user
    const messages = await Forum.find({ room_code })
      .sort({ createdAt: 1 }) // Sắp xếp theo thời gian
      .skip(skip) // Bỏ qua số lượng tin nhắn dựa trên trang
      .limit(limit) // Giới hạn số lượng tin nhắn
      .populate("user_id");

    return res.status(200).json({
      message: "Messages retrieved successfully",
      data: messages,
      pagination: {
        totalMessages,
        totalPages: Math.ceil(totalMessages / limit),
        currentPage: page,
        pageSize: messages.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const createMessage = async (req, res) => {
  try {
    const { room_code, user_id, content } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!room_code || !user_id || !content) {
      return res.status(400).json({
        message: "room_code, user_id, and content are required",
      });
    }

    // Lấy thông tin người dùng
    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Tạo tin nhắn mới với thời gian hiện tại (UTC)
    const newMessage = new Forum({
      room_code,
      user_id: user._id,
      content,
      createdAt: moment().toISOString(), // Lưu thời gian hiện tại theo định dạng UTC
    });

    // Lưu tin nhắn vào cơ sở dữ liệu
    const savedMessage = await newMessage.save();

    // Lấy tin nhắn và popoulate thông tin người dùng
    const populatedMessage = await Forum.findById(savedMessage._id).populate(
      "user_id"
    );

    // Lấy múi giờ của client
    const clientTimezone = moment.tz.guess();
    
    // Chuyển thời gian UTC sang múi giờ của client
    populatedMessage.createdAt = moment(populatedMessage.createdAt)
      .tz(clientTimezone) // Chuyển từ UTC sang múi giờ của client
      .format("YYYY-MM-DD HH:mm:ss");

    global._io.emit("new_message", populatedMessage);

    return res.status(201).json({
      message: "Message created successfully",
      data: populatedMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};