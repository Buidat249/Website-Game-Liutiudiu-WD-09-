import Comment from "../models/comment";
import Game from "../models/game";

// GET /games/:gameId/comments - Lấy tất cả bình luận của một game
export const getAllCommentsByGame = async (req, res) => {
  try {
    const gameId = req.params.gameId; // `gameId` từ params là string

    // Chuyển `gameId` thành Number
    const gameIdNumber = Number(gameId);

    if (isNaN(gameIdNumber)) {
      return res.status(400).json({ message: "Invalid gameId" });
    }

    // Kiểm tra xem Game có tồn tại không
    const game = await Game.findOne({ game_id: gameIdNumber });
    if (!game) {
      return res.status(404).json({
        message: "Game Not Found",
      });
    }

    // Lấy tất cả bình luận của game
    const comments = await Comment.find({ game_id: gameIdNumber });
    return res.status(200).json({
      message: "Get All Comments By Game Done",
      data: comments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

// GET /games/:gameId/comments/:commentId - Lấy chi tiết bình luận
export const getCommentDetailByGame = async (req, res) => {
  try {
    const { gameId, commentId } = req.params;

    // Kiểm tra xem Game có tồn tại không
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({
        message: "Game Not Found",
      });
    }

    // Lấy chi tiết bình luận
    const comment = await Comment.findOne({ _id: commentId, game_id: gameId });
    if (!comment) {
      return res.status(404).json({
        message: "Comment Not Found",
      });
    }

    return res.status(200).json({
      message: "Get Comment Detail By Game Done",
      data: comment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

// POST /games/:gameId/comments - Tạo bình luận cho một game
export const addCommentToGame = async (req, res) => {
  try {
    const { gameId } = req.params; // `gameId` từ params là string
    const { user_id, content, rating } = req.body; // `user_id` cũng là string

    // Chuyển `gameId` và `user_id` thành Number
    const gameIdNumber = Number(gameId);
    const userIdNumber = Number(user_id);

    if (isNaN(gameIdNumber)) {
      return res.status(400).json({ message: "Invalid gameId" });
    }

    if (isNaN(userIdNumber)) {
      return res.status(400).json({ message: "Invalid user_id" });
    }

    // Kiểm tra xem Game có tồn tại không
    const game = await Game.findOne({ game_id: gameIdNumber });
    if (!game) {
      return res.status(404).json({
        message: "Game Not Found",
      });
    }

    // Tạo bình luận mới
    const newComment = new Comment({
      game_id: gameIdNumber, // Sử dụng `game_id` kiểu Number
      user_id: userIdNumber, // Sử dụng `user_id` kiểu Number
      content,
      rating,
    });

    await newComment.save();

    // Thêm bình luận vào mảng comments của game
    game.comments.push(newComment._id);
    await game.save();

    return res.status(201).json({
      message: "Create Comment Done",
      data: newComment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

// PUT /games/:gameId/comments/:commentId - Cập nhật bình luận
export const updateCommentByGame = async (req, res) => {
  try {
    const { gameId, commentId } = req.params;
    const { content, rating } = req.body;

    // Kiểm tra xem Game và Comment có tồn tại không
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({
        message: "Game Not Found",
      });
    }

    const comment = await Comment.findOne({ _id: commentId, game_id: gameId });
    if (!comment) {
      return res.status(404).json({
        message: "Comment Not Found",
      });
    }

    // Cập nhật bình luận
    comment.content = content || comment.content;
    comment.rating = rating || comment.rating;
    await comment.save();

    return res.status(200).json({
      message: "Update Comment Done",
      data: comment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

// DELETE /games/:gameId/comments/:commentId - Xoá bình luận
export const removeCommentByGame = async (req, res) => {
  try {
    const { gameId, commentId } = req.params;

    // Kiểm tra xem Game có tồn tại không
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({
        message: "Game Not Found",
      });
    }

    // Tìm và xóa bình luận
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      game_id: gameId,
    });
    if (!comment) {
      return res.status(404).json({
        message: "Comment Not Found",
      });
    }

    // Xoá bình luận khỏi mảng comments của game (nếu cần thiết)
    game.comments.pull(comment._id);
    await game.save();

    return res.status(200).json({
      message: "Delete Comment Done",
      data: comment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};
