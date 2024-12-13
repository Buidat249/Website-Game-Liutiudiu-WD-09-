import { Router } from "express";
import { getReviewsByGameId ,addReview, getAllReviews, getReviewDetail, removeReview, updateReview } from "../controllers/review";


const router = Router();


router.get(`/reviews`, getAllReviews);
router.get(`/reviews/:id`, getReviewDetail);
router.post(`/reviews`, addReview);
router.put(`/reviews/:id`, updateReview);
router.delete(`/reviews/:id`, removeReview);
router.get(`/reviews/:game_id/game/:game_id`, getReviewsByGameId);
export default router;
