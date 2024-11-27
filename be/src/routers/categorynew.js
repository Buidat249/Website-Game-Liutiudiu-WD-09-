import { Router } from "express";
import { addCategoryNews, getAllCategoriesNews, getCategoryDetailNews, removeCategoryNews, updateCategoryNews } from "../controllers/categotynews";



const router = Router();

router.get(`/categorynews`, getAllCategoriesNews);
router.get(`/categorynews/:id`, getCategoryDetailNews);
router.post(`/categorynews`, addCategoryNews);
router.put(`/categorynews/:id`, updateCategoryNews);
router.delete(`/categorynews/:id`, removeCategoryNews);

export default router;
