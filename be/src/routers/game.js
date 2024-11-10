import { Router } from "express";
import { addGame, getAllGames, getGameDetail, removeGame, updateGame } from "../controllers/game";

const router = Router();


router.get(`/games`, getAllGames);
router.get(`/games/:id`, getGameDetail);
router.post(`/games`, addGame);
router.put(`/games/:id`, updateGame);
router.delete(`/games/:id`, removeGame);
export default router;
