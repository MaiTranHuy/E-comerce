import express from "express";
import userController from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.get('/current',verifyToken.verifyAccessToken,userController.getCurrent)

router.put('/updateuser',verifyToken.verifyAccessToken,userController.updateUser)

router.put('/address',verifyToken.verifyAccessToken,userController.updateUserAddress)

router.put('/cart',verifyToken.verifyAccessToken,userController.updateCart)

router.delete('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],userController.deleteCurrent)

router.put('/:uid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],userController.updateUserByAdmin)

router.get('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],userController.getUsers)

export default router