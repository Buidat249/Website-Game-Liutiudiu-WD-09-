import { Router } from "express";
import { addCart, getAllCarts, getCartDetail, removeCart, updateCart, updateGameQuantityInCart } from "../controllers/cart";


const router = Router();


router.get(`/carts`, getAllCarts);
router.get(`/carts/:id`, getCartDetail);
router.post(`/carts`, addCart);
router.put(`/carts/:id`, updateCart);
router.delete(`/carts/:id`, removeCart);
router.put("/carts/:cart_id/game/:game_id", updateGameQuantityInCart); 
export default router;
