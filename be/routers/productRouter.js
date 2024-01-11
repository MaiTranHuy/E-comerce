import express from "express";
import productController from "../controllers/productController.js";
import verifyToken from "../middlewares/verifyToken.js";

import uploadCloud from '../config/cloudinaryConfig.js'

const router = express.Router();

router.post('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],uploadCloud.array('images',10),productController.createProductController)

router.get('/',productController.getAllProductController)

router.put('/ratings',verifyToken.verifyAccessToken,productController.ratingProductController)

router.put('/uploadimage/:pid',verifyToken.verifyAccessToken,uploadCloud.array('images',10),productController.uploadImagesProductController)

router.put('/:pid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],productController.updateProductController)

router.delete('/:pid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],productController.deleteProductController)

router.get('/:pid',productController.getProductController)


export default router