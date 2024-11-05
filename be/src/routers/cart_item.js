import { Router } from "express";
import { addCart_Item, getAllCart_Items, getCart_ItemDetail, removeCart_Item, updateCart_Item } from "../controllers/cart_item";


const router = Router();


router.get(`/cart_items`, getAllCart_Items);
router.get(`/cart_items/:id`, getCart_ItemDetail);
router.post(`/cart_items`, addCart_Item);
router.put(`/cart_items/:id`, updateCart_Item);
router.delete(`/cart_items/:id`, removeCart_Item);
export default router;
