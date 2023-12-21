import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: [
      {
        type: Array,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: Array,
      },
    ],
    color: [
      {
        type: String,
        enum: ["Black", "Red", "Green", "Yellow", "Gray", "Pink"],
      },
    ],
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
        updatedAt: {type: Date},
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
