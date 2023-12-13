import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

const createProductService = asyncHandler(async (userData) => {
    const existingProduct = await Product.findOne({ title: userData.title });
    if (existingProduct)
        return {
            success: false,
            message: "Product already exist!",
        };
    const slug = slugify(userData.title);
    const newProduct = await Product.create({ ...userData, slug });
    if (!newProduct)
        return {
            success: false,
            message: "Create product error!",
        };
    return {
        success: true,
        data: newProduct,
    };
});

const getProductService = asyncHandler(async (userData) => {
    const product = await Product.findById(userData)
        .populate("category brand", "title")
        .populate("ratings.postedBy", "firstName lastName");
    if (!product)
        return {
            success: false,
            message: "Get product error!",
        };
    return {
        success: true,
        data: product,
    };
});

const getAllProductService = asyncHandler(async (userData) => {
    const { optionQuery, formatQueries } = userData
    if (formatQueries?.title)
        formatQueries.title = { $regex: `.*${formatQueries.title}.*`, $options: "i" };
    let queryCommand = Product.find(formatQueries).populate('category brand','title');
    if (optionQuery.sort) {
        const sortBy = optionQuery.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortBy);
    }
    if (optionQuery.fields) {
        const fields = optionQuery.fields.split(",").join(" ");
        queryCommand = queryCommand.select(fields);
    }
    const page = +optionQuery.page || 1;
    const limit = +optionQuery.limit || 5;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);
    const product = await queryCommand.exec();
    const counts = await Product.countDocuments(formatQueries);
    if (!product)
        return {
            success: false,
            message: "Get product error!",
        };
    return {
        success: true,
        data: { product, counts },
    };
});

const updateProductService = asyncHandler(async (userData) => {
    const existingProduct = await Product.findById(userData.pid);
    if (!existingProduct)
        return {
            success: false,
            message: "Not found product!",
        };
    if (userData.updateField.title)
        userData.updateField.slug = slugify(userData.updateField.title);
    const product = await Product.findByIdAndUpdate(
        userData.pid,
        userData.updateField,
        { new: true, })
        .populate("category brand", "title")
        .populate("ratings.postedBy", "firstName lastName");
    if (!product)
        return {
            success: false,
            message: "Update product error!",
        };
    return {
        success: true,
        data: product,
    };
});

const deleteProductService = asyncHandler(async (userData) => {
    const existingProduct = await Product.findById(userData);
    if (!existingProduct)
        return {
            success: false,
            message: "Not found product!",
        };
    const product = await Product.findByIdAndDelete(userData)
        .populate("category brand", "title")
        .populate("ratings.postedBy", "firstName lastName");
    if (!product)
        return {
            success: false,
            message: "Delete product error!",
        };
    return {
        success: true,
        data: product,
    };
});

const ratingProductService = asyncHandler(async (userData) => {
    const { _id, updateField } = userData;
    const ratingProduct = await Product.findById(updateField.pid);
    if (!ratingProduct)
        return {
            success: false,
            message: "Not found product!",
        };
    const alreadyRating = ratingProduct?.ratings?.find(
        (el) => el.postedBy.toString() === _id
    );
    if (alreadyRating) {
        await Product.updateOne(
            {
                ratings: { $elemMatch: alreadyRating },
            },
            {
                $set: { "ratings.$.star": updateField.star, "ratings.$.comment": updateField.comment },
            },
            { new: true }
        )
    } else {
        await Product.findByIdAndUpdate(
            updateField.pid,
            {
                $push: { ratings: { star: updateField.star, comment: updateField.comment, postedBy: _id } },
            },
            { new: true }
        )
    }
    const product = await Product.findById(updateField.pid)
        .populate("category brand", "title")
        .populate("ratings.postedBy", "firstName lastName");
    const ratingCount = product.ratings.length;
    const sumRatings = product.ratings.reduce(
        (sum, el) => sum + el.star,
        0
    );
    product.totalRatings =
        Math.round((sumRatings * 10) / ratingCount) / 10;
    await product.save();
    if (!product)
        return {
            success: false,
            message: "Update product error!",
        };
    return {
        success: true,
        data: product,
    };
});

const uploadImagesProductService = asyncHandler(async (userData) => {
    const existingProduct = await Product.findById(userData.pid);
    if (!existingProduct)
        return {
            success: false,
            message: "Not found product!",
        };
    const product = await Product.findByIdAndUpdate(userData.pid, {
        $push: { images: { $each: userData.updateField.map((el) => el.path) } },
    }, { new: true });
    if (!product)
        return {
            success: false,
            message: "Update product error!",
        };
    return {
        success: true,
        data: product,
    };
});

export default {
    createProductService,
    getProductService,
    getAllProductService,
    updateProductService,
    deleteProductService,
    ratingProductService,
    uploadImagesProductService,
};
