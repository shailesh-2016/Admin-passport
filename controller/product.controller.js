const Product = require("../model/product.model");

exports.store = async (req, res) => {
  const { category, sub_category, p_name, p_price } = req.body;
  await Product.create({
    category,
    sub_category,
    p_name,
    p_price,
    p_image: req?.file?.filename,
  });
  res.redirect("/viewProduct");
};
exports.trash = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('id: ', id);
    await Product.findByIdAndDelete({ _id: id });
    res.redirect("/viewProduct");
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id: ', id);

    const { category, sub_category, p_name, p_price } = req.body;
    await Product.findByIdAndUpdate({_id:id},{category,sub_category,p_name, p_price,p_image: req?.file?.filename,})
    res.redirect("/viewProduct")

  } catch (error) {
    console.log("error: ", error);
  }
};
