import { Router } from "express";
import { addCategory, getAllCategories, getCategoryDetail, removeCategory, updateCategory } from "../controllers/category";



const router = Router();

router.get(`/categories`, getAllCategories);
router.get(`/categories/:id`, getCategoryDetail);
router.post(`/categories`, addCategory);
router.put(`/categories/:id`, updateCategory);
router.delete(`/categories/:id`, removeCategory);
export default router;
