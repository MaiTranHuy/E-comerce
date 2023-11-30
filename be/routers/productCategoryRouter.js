import express from "express";
import productCategoryController from "../controllers/productCategoryController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/', [verifyToken.verifyAccessToken, verifyToken.isAdmin], productCategoryController.createProductCategoryController)

router.get('/', productCategoryController.getAllProductCategoryController)

router.put('/:pcid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], productCategoryController.updateProductCategoryController)

router.delete('/:pcid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], productCategoryController.deleteProductCategoryController)

export default router