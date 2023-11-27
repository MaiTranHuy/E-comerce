import ProductCategory from "../models/ProductCategory.js";
import asyncHandler from "express-async-handler";

const createProductCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
    const newCategory = await ProductCategory.create(req.body)
    return res.status(200).json({
      success: newCategory ? true : false,
      message: newCategory ? newCategory : "Create category failed!",
    });
  });

    const getAllProductCategory = asyncHandler(async (req, res) => {
     const product = await ProductCategory.find().select('title');
     return res.status(200).json({
       success: product ? true : false,
       message: product ? product : "Get all category failed!",
     });
   });

   const updateProductCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const updatedProductCategory = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: updatedProductCategory ? true : false,
      message: updatedProductCategory ? updatedProductCategory : "Update product category failed!",
    });
  });

  const deleteProductCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const deletedProductCategory = await ProductCategory.findByIdAndDelete(pcid);
    return res.status(200).json({
      success: deletedProductCategory ? true : false,
      message: deletedProductCategory ? deletedProductCategory : "Delete product category failed!",
    });
  });
  export default {createProductCategory,getAllProductCategory,updateProductCategory,deleteProductCategory};