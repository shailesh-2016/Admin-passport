const { Schema, model } = require("mongoose");

const subCatSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  sub_category: {
    type: String,
    required: true,
    trim: true
  }
});

const SubCategory = model("SubCategory", subCatSchema);
module.exports = SubCategory;
