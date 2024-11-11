import { Router } from "express";
import { Login, Register, getAllUsers, getUserDetail, removeUser, updateUser } from "../controllers/user";

const router = Router();

router.get(`/users`, getAllUsers);
router.get(`/users/:id`, getUserDetail);
router.post(`/register`, Register);
router.post(`/login`, Login);
router.put(`/users/:id`, updateUser);
router.delete(`/users/:id`, removeUser);
export default router;




