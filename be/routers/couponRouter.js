import express from "express";
import couponController from "../controllers/couponController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/', [verifyToken.verifyAccessToken, verifyToken.isAdmin], couponController.createCouponController)

router.get('/', couponController.getAllCouponController)

router.put('/:cid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], couponController.updateCouponController)

router.delete('/:cid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], couponController.deleteCouponController)

export default router