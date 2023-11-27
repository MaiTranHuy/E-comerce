import express from "express";
import orderController from "../controllers/orderController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/',verifyToken.verifyAccessToken,orderController.createOrder)

router.put('/status/:oid',[verifyToken.verifyAccessToken,verifyToken.isAdmin],orderController.updateStatus)

router.get('/',verifyToken.verifyAccessToken,orderController.getAllOrder)

router.get('/current',[verifyToken.verifyAccessToken,verifyToken.isAdmin],orderController.getUserOrder)




export default router