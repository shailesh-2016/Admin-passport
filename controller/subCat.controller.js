const SubCategory = require("../model/subCat.model");
const subCategory = require("../model/subCat.model");

exports.store = async (req, res) => {
  try {
    const { category, sub_category } = req.body;
    await subCategory.create({ category, sub_category });
    res.redirect("/viewSubCategory")

    // res.json("category added");
  } catch (error) {
    console.log(error);
  }
};
exports.index = async (req, res) => {
  try {
    const subCategory = await subCategory.find().populate("category");
    res.json(subCategory);
  } catch (error) {
    console.log(error);
  }
};

exports.trash = async (req, res) => {
  const { id } = req.params;
  await subCategory.findByIdAndDelete(id)
  res.redirect("/viewSubCategory")
// res.json("deleted")
};

exports.update=async(req,res)=>{
  try {
    const {id}=req.params
    const{category,sub_category}=req.body
    await SubCategory.findByIdAndUpdate({_id:id},{category,sub_category})
    res.redirect("/viewSubCategory")
  } catch (error) {
    console.log(error)
  }
}


