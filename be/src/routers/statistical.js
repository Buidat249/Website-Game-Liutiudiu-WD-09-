import { Router } from "express";
import { chartData, bestSellingGame, highestGrossingGame } from "../controllers/statistical";


const router = Router();

router.get(`/chart-data`, chartData);
router.get(`/best-selling-game`, bestSellingGame);
router.get(`/highest-grossing-game`, highestGrossingGame);

export default router;
