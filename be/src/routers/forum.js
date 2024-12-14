import { Router } from "express";
import { getConversition, createMessage } from "../controllers/forum";

const router = Router();

router.get(`/forum-conversition`, getConversition);
router.post(`/forum-conversition`, createMessage);

export default router;
