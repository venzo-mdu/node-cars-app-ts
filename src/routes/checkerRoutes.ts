import { Router } from "express";
const router: Router = Router();

import { approveCars, approveCarsList, denyCars } from "../controllers/checkerController";
import { validateToken } from "../middleware/isAuthenticated";
import { checkAuth } from "../middleware/roleAccess";

router.get("/approve-list", validateToken, checkAuth(['checker']), approveCarsList);
router.put("/approve-cars/:id", validateToken, checkAuth(['checker']), approveCars);
router.delete("/deny-cars/:id",validateToken, checkAuth(['checker']), denyCars);

export default router;