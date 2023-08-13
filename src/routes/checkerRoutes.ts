import { Router } from "express";
const router: Router = Router();

import { approveCars, approveCarsList } from "../controllers/checkerController";
import { validateToken } from "../middleware/isAuthenticated";
import { checkAuth } from "../middleware/roleAccess";

router.get("/approve-list", validateToken, checkAuth(['checker']), approveCarsList);
router.put("/approve-cars/:id", validateToken, checkAuth(['checker']), approveCars);

export default router;