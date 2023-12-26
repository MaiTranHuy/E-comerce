import express from "express";
import userController from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.get('/current',verifyToken.verifyAccessToken,userController.getCurrentUserController)

router.put('/updateuser',verifyToken.verifyAccessToken,userController.updateCurrentUserController)

router.put('/address',verifyToken.verifyAccessToken,userController.updateUserAddressController)

router.put('/cart',verifyToken.verifyAccessToken,userController.updateCart)

router.delete('/:uid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],userController.deleteUserController)

router.put('/:uid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],userController.updateUserByAdminController)

router.get('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],userController.getAllUsersController)

export default router