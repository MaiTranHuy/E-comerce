import { orderService } from "../services/indexService.js";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
const createOrderController = asyncHandler(async (req, res) => {
  const { _id } = req.user
  if (!_id)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const data = req.body
  const userData = { _id, data };
  const order = await orderService.createOrderService(userData);
  if (!order.success)
    return res.status(400).json({
      status: "ERROR",
      message: order.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Create order successfully!",
    data: order.data
  });
});

const updateStatusController = asyncHandler(async (req, res) => {
  const { oid } = req.params
  const { status } = req.body
  if (!status || !oid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const userData = { oid, status };
  const order = await orderService.updateStatusService(userData);
  if (!order.success)
    return res.status(400).json({
      status: "ERROR",
      message: order.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Update status order successfully!",
    data: order.data
  });
});

const deleteOrderController = asyncHandler(async (req, res) => {
  const { oid } = req.params
  if (!oid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const order = await orderService.deleteOrderService(oid);
  if (!order.success)
    return res.status(400).json({
      status: "ERROR",
      message: order.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Delete order successfully!",
    data: order.data
  });
});

const getUserOrderController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const order = await orderService.getUserOrderService(_id);
  if (!order.success)
    return res.status(400).json({
      status: "ERROR",
      message: order.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Get user order successfully!",
    data: order.data
  });
});

const getOrderController = asyncHandler(async (req, res) => {
  const { oid } = req.params
  if (oid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const order = await orderService.getOrderService(oid);
  if (!order.success)
    return res.status(400).json({
      status: "ERROR",
      message: order.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Get order successfully!",
    data: order.data
  });
});

const getAllOrderController = asyncHandler(async (req, res) => {
  const order = await orderService.getAllOrderService();
  if (!order.success)
    return res.status(400).json({
      status: "ERROR",
      message: order.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Get all order successfully!",
    data: order.data
  });
});

export default {
  createOrderController,
  updateStatusController,
  getUserOrderController,
  getAllOrderController,
  deleteOrderController,
  getOrderController
};