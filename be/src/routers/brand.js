import { Router } from "express";
import { addBrand, getAllBrands, getBrandDetail, removeBrand, updateBrand } from "../controllers/brand";


const router = Router();

router.get(`/brands`, getAllBrands);
router.get(`/brands/:id`, getBrandDetail);
router.post(`/brands`, addBrand);
router.put(`/brands/:id`, updateBrand);
router.delete(`/brands/:id`, removeBrand);
export default router;
