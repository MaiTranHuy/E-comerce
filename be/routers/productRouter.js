import express from "express";
import productController from "../controllers/productController.js";
import verifyToken from "../middlewares/verifyToken.js";

import uploadCloud from '../config/cloudinaryConfig.js'

const router = express.Router();

router.post('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],productController.createProduct)

router.get('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],productController.getAllProduct)

router.put('/ratings',verifyToken.verifyAccessToken,productController.ratingProduct)

router.put('/uploadimage/:pid',verifyToken.verifyAccessToken,uploadCloud.array('images',10),productController.uploadImagesProduct)

router.put('/:pid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],productController.updateProduct)

router.delete('/:pid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],productController.deleteProduct)

router.get('/:pid',productController.getProduct)


export default router