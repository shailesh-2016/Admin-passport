const router = require("express").Router();
const Admin = require("../model/admin.model");
const Category = require("../model/catModel");
const catModel = require("../model/catModel");
const subCategory = require("../model/subCat.model");
const { matchLogin } = require("../utils/loginMiddleware");

router.get("/", matchLogin, (req, res) => {
  try {
    res.render("pages/index");
  } catch (error) {
    console.log(error);
  }
});
// router.get("/",(req,res)=>{
//   console.log(req.cookies)
// res.render('pages/index')
// })

router.get("/addCategory", matchLogin, (req, res) => {
  res.render("pages/addCategory");
});

router.get("/viewCategory", matchLogin, async (req, res) => {
  try {
    const category = await catModel.find();
    res.render("pages/viewCategory", { category });
    // res.redirect("pages/viewCategory",{category})
  } catch (error) {
    console.log(error);
  }
});

router.get("/updateCategory", matchLogin, async (req, res) => {
  const { id } = req.query;
  const category = await catModel.findById(id);
  res.render("pages/updateCategory", { category });
});

router.get("/register", (req, res) => {
  res.render("pages/register", { message: req.flash("info") });
});

router.get("/login", (req, res) => {
  res.render("pages/login", { message: req.flash("info") });
});
router.get("/logout", (req, res) => {
  // res.clearCookie("admin")
  // res.redirect("/login")
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
router.get("/myProfile", matchLogin, async (req, res) => {
  // const admin = req.cookies.admin;
  // res.render("pages/myProfile", { admin });

  // const cookieData = req.cookies.admin;
  const email = req?.user?.email;
  const singleAdmin = await Admin.findOne({ email });
  res.render("pages/myProfile", { admin: singleAdmin });
});

router.get("/changePassword", matchLogin, async (req, res) => {
  const email = req?.user?.email;
  res.render("pages/changePassword", { email });
});
router.get("/updatePass", matchLogin, (req, res) => {
  res.render("pages/forgotPass", { message: req.flash("info") });
});

router.get("/addSubCategory", async (req, res) => {
  const categories = await Category.find();
  res.render("pages/addSubCategory", { categories });
});
router.get("/viewSubCategory", async (req, res) => {
  try {
    const Subcategories = await subCategory.find().populate("category");
    console.log(Subcategories)
    res.render("pages/viewSubcategory", { Subcategories });
  } catch (error) {
    console.log(error);
  }
});

router.get("/updateSubCategory",async(req,res)=>{
  const {id}=req.query
  const categories=await Category.find()
const Subcategories=await subCategory.findById(id).populate("category")
res.render("pages/updateSubCat",{categories,Subcategories})
})

module.exports = router;
