import express from "express";
import blogController from "../controllers/blogController.js";
import verifyToken from "../middlewares/verifyToken.js";
import uploadCloud from '../config/cloudinaryConfig.js'


const router = express.Router();

router.post('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],blogController.createBlog)

router.get('/',blogController.getAllBlog)

router.get('/one/:bid',blogController.getBlog)

router.put('/update/:bid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],blogController.updateBlog)

router.put('/uploadimage/:bid',verifyToken.verifyAccessToken,uploadCloud.single('image'),blogController.uploadImageBlog)


router.delete('/:bid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],blogController.deleteBlog)

router.put('/like/:bid',verifyToken.verifyAccessToken,blogController.likeBlog)

router.put('/dislike/:bid',verifyToken.verifyAccessToken,blogController.dislikeBlog)



export default router