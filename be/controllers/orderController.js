import Order from "../models/Order.js";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
import asyncHandler from "express-async-handler";

const createOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {coupon} = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product','title price')
    const products = userCart?.cart?.map(el => ({
      product: el.product._id,
      count: el.quantity,
      color: el.color
    }))

    let total = userCart?.cart?.reduce((sum,el)=>el.product.price * el.quantity + sum,0);
    if(coupon){
      const trueCoupon = await Coupon.findOne({name:coupon})
      const discount = total*(1-trueCoupon.discount/100)
      total = discount
    }
    const orderData = {
      products,
      total,
      orderBy: _id,
      ...(coupon._id && { coupon })
    };
    const newOrder = await Order.create(orderData);
    return res.status(200).json({
      success: newOrder ? true : false,
      message: newOrder ? newOrder : "Create order failed!",
    });
  });

    const updateStatus = asyncHandler(async (req, res) => {
      const {oid} = req.params
      const {status} = req.body
      if(!status) throw new Error('Missing input')
     const order = await Order.findByIdAndUpdate(oid,{status},{new:true})
     return res.status(200).json({
       success: order ? true : false,
       message: order ? order : "Get update failed!",
     });
   });

   const getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const response = await Order.find({orderBy:_id});
    return res.status(200).json({
      success: response ? true : false,
      message: response ? response : "get order failed!",
    });
  });
 
  const getAllOrder = asyncHandler(async (req, res) => {
    const response = await Order.find();
    return res.status(200).json({
      success: response ? true : false,
      message: response ? response : "get all order failed!",
    });
  });
  export default {createOrder,updateStatus,getUserOrder,getAllOrder};