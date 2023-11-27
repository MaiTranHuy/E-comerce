import express from "express";
import productCategoryController from "../controllers/productCategoryController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],productCategoryController.createProductCategory)

router.get('/',productCategoryController.getAllProductCategory)

router.put('/:pcid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],productCategoryController.updateProductCategory)

router.delete('/:pcid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],productCategoryController.deleteProductCategory)

export default router