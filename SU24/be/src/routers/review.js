import { Router } from "express";
import { addReview, getAllReviews, getReviewDetail, removeReview, updateReview } from "../controllers/review";


const router = Router();


router.get(`/reviews`, getAllReviews);
router.get(`/reviews/:id`, getReviewDetail);
router.post(`/reviews`, addReview);
router.put(`/reviews/:id`, updateReview);
router.delete(`/reviews/:id`, removeReview);
export default router;
