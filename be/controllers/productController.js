import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, brand, category } = req.body;
  if (!title || !description || !price || !brand || !category) {
    throw new Error("Missing input");
  }
  const existingProduct = await Product.findOne({ title });
  if (existingProduct) throw new Error("Product already exists");
  const slug = slugify(req.body.title);
  const newProduct = await Product.create({ ...req.body, slug });
  const populatedProduct = await Product.findById(newProduct._id).populate(
    "category brand",
    "title"
  );
  return res.status(200).json({
    success: populatedProduct ? true : false,
    message: populatedProduct ? populatedProduct : "Create product failed!",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid)
    .populate("category brand", "title")
    .populate("ratings.postedBy", "firstName lastName");
  return res.status(200).json({
    success: product ? true : false,
    message: product ? product : "Get product failed!",
  });
});

const getAllProduct = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatQueries = JSON.parse(queryString);
  if (queries?.title)
    formatQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Product.find(formatQueries);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.sort(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 2;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  const response = await queryCommand.exec();
  const counts = await Product.countDocuments(formatQueries);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Get product failed!",
    counts,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input!");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  })
    .populate("category brand", "title")
    .populate("ratings.postedBy", "firstName lastName");
  return res.status(200).json({
    success: updatedProduct ? true : false,
    message: updatedProduct ? updatedProduct : "Update product failed!",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid)
    .populate("category brand", "title")
    .populate("ratings.postedBy", "firstName lastName");
  return res.status(200).json({
    success: deletedProduct ? true : false,
    message: deletedProduct ? deletedProduct : "Delete product failed!",
  });
});

const ratingProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("Missing input!");
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  if (alreadyRating) {
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    )
      .populate("category brand", "title")
      .populate("ratings.postedBy", "firstName lastName");
  } else {
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true }
    )
      .populate("category brand", "title")
      .populate("ratings.postedBy", "firstName lastName");
  }
  const updatedProduct = await Product.findById(pid)
    .populate("category brand", "title")
    .populate("ratings.postedBy", "firstName lastName");
  const ratingCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => sum + el.star,
    0
  );
  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingCount) / 10;

  await updatedProduct.save();

  return res.status(200).json({
    success: true,
    message: updatedProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing input!");
  const uploadFiles = await Product.findByIdAndUpdate(pid, {
    $push: { images: { $each: req.files.map((el) => el.path) } },
  },{new: true});
  return res.status(200).json({
    success: uploadFiles ? true : false,
    message: uploadFiles ? uploadFiles : "Cannot upload images product",
  });
});

export default {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  ratingProduct,
  uploadImagesProduct,
};
