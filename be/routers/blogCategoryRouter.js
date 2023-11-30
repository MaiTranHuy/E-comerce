import express from "express";
import blogCategoryController from "../controllers/blogCategoryController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/', [verifyToken.verifyAccessToken, verifyToken.isAdmin], blogCategoryController.createBlogCategoryController)

router.get('/', blogCategoryController.getAllBlogCategoryController)

router.put('/:bcid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], blogCategoryController.updateBlogCategoryController)

router.delete('/:bcid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], blogCategoryController.deleteBlogCategoryController)

export default router