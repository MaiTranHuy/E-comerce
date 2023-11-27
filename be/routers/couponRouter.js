import express from "express";
import couponController from "../controllers/couponController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/',[verifyToken.verifyAccessToken,verifyToken.isAdmin],couponController.createCoupon)

router.get('/',couponController.getAllCoupon)

router.put('/:cid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],couponController.updateCoupon)

router.delete('/:cid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],couponController.deleteCoupon)

export default router