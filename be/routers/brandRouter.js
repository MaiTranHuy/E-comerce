import express from "express";
import brandController from "../controllers/brandController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],brandController.createBrand)

router.get('/',brandController.getAllBrand)

router.put('/:bid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],brandController.updateBrand)

router.delete('/:bid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],brandController.deleteBrand)

export default router