import {Router} from "express";
const router:Router = Router();


import {getAllCars,createCars,updateCars, deleteCars,getMyCars} from '../controllers/carController';
import {validateToken} from '../middleware/isAuthenticated';

router.get("/", getAllCars);
router.get("/getCar", validateToken, getMyCars)
router.post("/", validateToken, createCars);
router.put("/:id", validateToken, updateCars)
router.delete("/:id", validateToken, deleteCars);

export default router;


// export default (router :express.Router)=>{
//     console.log("inside controller 2")
//     router.get('/', getAllCars);
//     // router.post('/',createCars);
    
// };