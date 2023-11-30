import express from "express";
import blogController from "../controllers/blogController.js";
import verifyToken from "../middlewares/verifyToken.js";
import uploadCloud from '../config/cloudinaryConfig.js'


const router = express.Router();

router.post('/', [verifyToken.verifyAccessToken, verifyToken.isAdmin], blogController.createBlogController)

router.get('/', blogController.getAllBlogController)

router.get('/one/:bid', blogController.getBlogController)

router.put('/update/:bid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], blogController.updateBlogController)

router.put('/uploadimage/:bid', verifyToken.verifyAccessToken, uploadCloud.single('image'), blogController.uploadImageBlogController)

router.delete('/:bid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], blogController.deleteBlogController)

router.put('/like/:bid', verifyToken.verifyAccessToken, blogController.likeBlogController)

router.put('/dislike/:bid', verifyToken.verifyAccessToken, blogController.dislikeBlogController)



export default router