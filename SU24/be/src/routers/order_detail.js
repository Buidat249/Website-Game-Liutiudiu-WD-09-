import { Router } from "express";
import { addOrder_Detail, getAllOrder_Details, getOrder_DetailDetail, removeOrder_Detail, updateOrder_Detail } from "../controllers/order_detail";




const router = Router();

router.get(`/order_details`, getAllOrder_Details);
router.get(`/order_details/:id`, getOrder_DetailDetail);
router.post(`/order_details`, addOrder_Detail);
router.put(`/order_details/:id`, updateOrder_Detail);
router.delete(`/order_details/:id`, removeOrder_Detail);

export default router;
