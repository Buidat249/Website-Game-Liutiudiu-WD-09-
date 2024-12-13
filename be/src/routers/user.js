import { Router } from "express";
import { Login, Register, getAllUsers, getFavouriteGames, getUserDetail, removeUser, toggleFavourite, updateUser } from "../controllers/user";

const router = Router();

router.get(`/users`, getAllUsers);
router.get(`/users/:id`, getUserDetail);
router.get(`/users/:userId/favourite`, getFavouriteGames);
router.post(`/register`, Register);
router.post(`/users/:userId/favourite`, toggleFavourite);
router.post(`/login`, Login);
router.put(`/users/:id`, updateUser);
router.delete(`/users/:id`, removeUser);
export default router;




