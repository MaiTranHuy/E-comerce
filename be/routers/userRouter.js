import express from "express";
import userController from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.get('/current',verifyToken.verifyAccessToken,userController.getCurrent)

router.post('/refreshToken',userController.refreshAccessToken)

router.post('/logout',userController.logout)

router.get('/forgotPassword',userController.forgotPassword)

router.put('/resetPassword',userController.resetPassword)

router.put('/updateUser',verifyToken.verifyAccessToken,userController.updateUser)

router.delete('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],userController.deleteCurrent)

router.put('/:uid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],userController.updateUserByAdmin)


router.get('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],userController.getUsers)


export default router