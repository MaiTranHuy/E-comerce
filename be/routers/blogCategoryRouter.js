import express from "express";
import blogCategoryController from "../controllers/blogCategoryController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],blogCategoryController.createBlogCategory)

router.get('/',blogCategoryController.getAllBlogCategory)

router.put('/:bcid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],blogCategoryController.updateBlogCategory)

router.delete('/:bcid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],blogCategoryController.deleteBlogCategory)

export default router