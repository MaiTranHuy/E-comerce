import express from "express";
import orderController from "../controllers/orderController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/', verifyToken.verifyAccessToken, orderController.createOrderController)

router.put('/status/:oid', [verifyToken.verifyAccessToken, verifyToken.isAdmin], orderController.updateStatusController)

router.get('/', verifyToken.verifyAccessToken, orderController.getAllOrderController)

router.delete('/:oid', verifyToken.verifyAccessToken, orderController.deleteOrderController)

router.get('/current', [verifyToken.verifyAccessToken, verifyToken.isAdmin], orderController.getUserOrderController)

router.get('/:oid',orderController.getOrderController)


export default router