import { Router } from "express";
import { addRole, getAllRoles, getRoleDetail, removeRole, updateRole } from "../controllers/role";


const router = Router();

router.get(`/roles`, getAllRoles);
router.get(`/roles/:id`, getRoleDetail);
router.post(`/roles`, addRole);
router.put(`/roles/:id`, updateRole);
router.delete(`/roles/:id`, removeRole);
export default router;
