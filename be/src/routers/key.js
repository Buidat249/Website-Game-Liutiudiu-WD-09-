import { Router } from "express";
import { addKeys, assignKeysToGame, getAllKeys, getKeyDetail, removeKey, updateKey } from "../controllers/key";



const router = Router();

router.get(`/keys`, getAllKeys);
router.get(`/keys/:game_id`, getKeyDetail);
router.post(`/keys`, addKeys);
router.put(`/keys/:id`, updateKey);
router.delete(`/keys/:id`, removeKey);
router.put(`/keys/assign`, assignKeysToGame);
export default router;
