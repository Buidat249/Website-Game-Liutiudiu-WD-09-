import { Router } from "express";
import { addDescription, getAllDescripions, getDescriptionDetail, removeDescription, updateDescription } from "../controllers/description";



const router = Router();

router.get(`/descriptions`, getAllDescripions);
router.get(`/descriptions/:id`, getDescriptionDetail);
router.post(`/descriptions`, addDescription);
router.put(`/descriptions/:id`, updateDescription);
router.delete(`/descriptions/:id`, removeDescription);
export default router;
