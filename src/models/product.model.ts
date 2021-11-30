import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, unique: true },
    desc: String,
    img: String,
    categories: Array,
    size: String,
    color: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
