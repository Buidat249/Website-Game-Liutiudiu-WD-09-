import { Router } from "express";
import { 
    addCommentToGame, 
    getAllCommentsByGame, 
    getCommentDetailByGame, 
    removeCommentByGame, 
    updateCommentByGame 
} from "../controllers/comment";

const router = Router();

// Lấy tất cả bình luận của một game
router.get(`/games/:gameId/comments`, getAllCommentsByGame);

// Lấy chi tiết một bình luận cụ thể
router.get(`/games/:gameId/comments/:commentId`, getCommentDetailByGame);

// Thêm bình luận cho một game
router.post(`/games/:gameId/comments`, addCommentToGame);

// Cập nhật bình luận của một game
router.put(`/games/:gameId/comments/:commentId`, updateCommentByGame);

// Xóa bình luận của một game
router.delete(`/games/:gameId/comments/:commentId`, removeCommentByGame);

export default router;
