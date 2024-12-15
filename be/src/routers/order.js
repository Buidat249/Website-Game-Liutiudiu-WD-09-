import { Router } from "express";
import { addOrder, getAllOrders, getOrderDetail, getOrderStatus, removeOrder, updateOrder, confirmVnPay, cancelOrder } from "../controllers/order";


const router = Router();



router.get(`/orders`, getAllOrders);
router.get(`/orders/:userId`, getOrderDetail); // Sửa route thành :userId thay vì :id
router.get(`/orders/status/:id`, getOrderStatus);
router.post(`/orders`, addOrder);
router.post(`/orders/cancel`, cancelOrder);
router.put(`/orders/:id`, updateOrder);
router.delete(`/orders/:id`, removeOrder);
router.get(`/orders/confirm/vnpay`, confirmVnPay);
export default router;
