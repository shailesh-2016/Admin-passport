const router = require("express").Router();
const Admin = require("../model/admin.model");
const Category = require("../model/catModel");
const Product = require("../model/product.model");
const SubCategory = require("../model/subCat.model");
const { matchLogin } = require("../utils/loginMiddleware");

router.get("/", matchLogin, (req, res) => {
  try {
    res.render("pages/index");
  } catch (error) {
    console.log(error);
  }
});

router.get("/addCategory", matchLogin, (req, res) => {
  res.render("pages/addCategory");
});

router.get("/viewCategory", matchLogin, async (req, res) => {
  try {
    const category = await Category.find();
    res.render("pages/viewCategory", { category });
  } catch (error) {
    console.log(error);
  }
});

router.get("/updateCategory", matchLogin, async (req, res) => {
  try {
    const { id } = req.query;
    const category = await Category.findById(id);
    res.render("pages/updateCategory", { category });
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", (req, res) => {
  res.render("pages/register", { message: req.flash("info") });
});

router.get("/login", (req, res) => {
  res.render("pages/login", { message: req.flash("info") });
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

router.get("/myProfile", matchLogin, async (req, res) => {
  try {
    const email = req?.user?.email;
    const singleAdmin = await Admin.findOne({ email });
    res.render("pages/myProfile", { admin: singleAdmin });
  } catch (error) {
    console.log(error);
  }
});

router.get("/changePassword", matchLogin, async (req, res) => {
  try {
    const email = req?.user?.email;
    res.render("pages/changePassword", { email });
  } catch (error) {
    console.log(error);
  }
});

router.get("/updatePass", matchLogin, (req, res) => {
  res.render("pages/forgotPass", { message: req.flash("info") });
});

router.get("/addSubCategory", async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("pages/addSubCategory", { categories });
  } catch (error) {
    console.log(error);
  }
});

router.get("/viewSubCategory", async (req, res) => {
  try {
    const Subcategories = await SubCategory.find().populate("category");
    res.render("pages/viewSubcategory", { Subcategories });
  } catch (error) {
    console.log(error);
  }
});

router.get("/updateSubCategory", async (req, res) => {
  try {
    const { id } = req.query;
    const categories = await Category.find();
    const Subcategories = await SubCategory.findById(id).populate("category");
    res.render("pages/updateSubCat", { categories, Subcategories });
  } catch (error) {
    console.log(error);
  }
});

router.get("/addProduct", async (req, res) => {
  try {
    const categories = await Category.find();
    var Subcategories;
    var { cat_id } = req?.query;
    const selectedCat = req?.query.cat_id || "";
    if (cat_id) {
      Subcategories = await SubCategory.find({ category: cat_id });
      // console.log(Subcategories)
    }
    res.render("pages/addProduct", { categories, Subcategories, selectedCat });
  } catch (error) {
    console.log(error);
  }
});

router.get("/viewProduct", async (req, res) => {
  const product = await Product.find()
    .populate("category")
    .populate("sub_category");
  res.render("pages/viewProduct", { product });
});

router.get("/updateProduct", async (req, res) => {
  const {id,cat_id}=req.query
  const categories = await Category.find();
  var Subcategories;
  const product=await Product.findById(id).populate("category").populate("sub_category")


  if (cat_id) {
    Subcategories = await SubCategory.find({ category:cat_id });
  }else{
    Subcategories = await SubCategory.find({ category:product.category._id });
  }
  // console.log(Subcategories)
  // console.log(product)
  const selectedCat= cat_id || product.category._id
  // console.log('selectedCat: ', selectedCat);


  res.render("pages/updateProduct",{product,categories, Subcategories, selectedCat})
 });

module.exports = router;


