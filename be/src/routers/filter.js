import { Router } from "express";
import { addFilter, getAllFilters, getFilterDetail, removeFilter, updateFilter } from "../controllers/filter";


const router = Router();

router.get(`/filters`, getAllFilters);
router.get(`/filters/:id`, getFilterDetail);
router.post(`/filters`, addFilter);
router.put(`/filters/:id`, updateFilter);
router.delete(`/filters/:id`, removeFilter);
export default router;