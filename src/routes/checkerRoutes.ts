import {Router} from "express";
const router:Router = Router();

// import { validateToken } from "../middleware/isAuthenticated";
import { authorize } from "../middleware/authorize";
import { approveCars,approveCarsList } from "../controllers/checkerController";

router.get("/approve-list",authorize(['admin']),approveCarsList);
router.put("/approve-cars/:id",authorize(['admin']),approveCars);

export default router;