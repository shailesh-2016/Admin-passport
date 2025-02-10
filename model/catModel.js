const { Schema, model } = require("mongoose");

const catSchema = new Schema(
  {
    cat_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model("category", catSchema);
module.exports = Category;
