import { Router } from "express";
import { addCart, getAllCarts, getCartDetail, removeCart, removeGameFromCart, updateCart, updateGameQuantityInCart, createPayQrVnPay } from "../controllers/cart";


const router = Router();


router.get(`/carts`, getAllCarts);
router.get(`/carts/:id`, getCartDetail);
router.post(`/carts`, addCart);
router.put(`/carts/:id`, updateCart);
router.delete(`/carts/:id`, removeCart);
router.put(`/carts/:cart_id/game/:game_id`, updateGameQuantityInCart); 
router.delete(`/carts/:cart_id/game/:game_id`, removeGameFromCart);
router.get(`/carts/create-pay/vnpay`, createPayQrVnPay);
export default router;
