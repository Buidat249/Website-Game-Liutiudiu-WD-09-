import { Router } from "express";
import { addDescriptionDetail, getAllDescriptionDetails, getDescriptionDetailDetail, removeDescriptionDetail, updateDescriptionDetail } from "../controllers/descriptions_detail";




const router = Router();

router.get(`/descriptiondetails`, getAllDescriptionDetails);
router.get(`/descriptiondetails/:id`, getDescriptionDetailDetail);
router.post(`/descriptiondetails`, addDescriptionDetail);
router.put(`/descriptiondetails/:id`, updateDescriptionDetail);
router.delete(`/descriptiondetails/:id`, removeDescriptionDetail);
export default router;
