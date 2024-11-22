import { Router } from "express";
import { addTintuc, getAllTintucs, getTintucDetail, removeTinTuc, updateTintuc } from "../controllers/tintuc";

const router = Router();


router.get(`/tintucs`, getAllTintucs);
router.get(`/tintucs/:id`, getTintucDetail);
router.post(`/tintucs`, addTintuc);
router.put(`/tintucs/:id`, updateTintuc);
router.delete(`/tintucs/:id`, removeTinTuc);
export default router;
