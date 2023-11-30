import express from "express";
import brandController from "../controllers/brandController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/', [verifyToken.verifyAccessToken, verifyToken.isAdmin], brandController.createBrandController)

router.get('/', brandController.getAllBrandController)

router.put('/:bid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], brandController.updateBrandController)

router.delete('/:bid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], brandController.deleteBrandController)

export default router