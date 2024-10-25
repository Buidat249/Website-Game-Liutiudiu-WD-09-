import { Router } from "express";
import { addCart, getAllCarts, getCartDetail, removeCart, updateCart } from "../controllers/cart";


const router = Router();


router.get(`/carts`, getAllCarts);
router.get(`/carts/:id`, getCartDetail);
router.post(`/carts`, addCart);
router.put(`/carts/:id`, updateCart);
router.delete(`/carts/:id`, removeCart);
export default router;
