import { Router } from "express";
import { addPlatform, getAllPlatforms, getPlatformDetail, removePlatform, updatePlatform } from "../controllers/platform";


const router = Router();

router.get(`/platforms`, getAllPlatforms);
router.get(`/platforms/:id`, getPlatformDetail);
router.post(`/platforms`, addPlatform);
router.put(`/platforms/:id`, updatePlatform);
router.delete(`/platforms/:id`, removePlatform);
export default router;
