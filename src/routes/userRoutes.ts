import { Router } from "express";
const router: Router = Router();

import { validateToken } from "../middleware/isAuthenticated";
import { loginUser, registerUser, currentUser } from "../controllers/userController";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/current", validateToken, currentUser);

export default router;