const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    sub_category: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    p_name: {
      type: String,
      required: true,
    },
    p_price: {
      type: Number,
      required: true,
    },
    p_image: String,
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);
module.exports = Product;
