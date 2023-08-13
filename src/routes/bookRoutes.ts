import { Router } from "express";
const router: Router = Router();

import { validateToken } from '../middleware/isAuthenticated';
import { bookCar, bookedCarList, myCarIsBooked, deleteBookedCars } from '../controllers/bookController';


router.post("/:id", validateToken, bookCar);
router.get("/mybook/:id", validateToken, bookedCarList);
router.get("/check/:id", validateToken, myCarIsBooked);
router.delete("/:id", validateToken, deleteBookedCars);

export default router;