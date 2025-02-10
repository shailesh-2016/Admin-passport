const router = require("express").Router();
const passport = require("passport");
const Admin = require("../controller/admin.controller");
const upload = require("../middleware/upload");

router.post("/register", Admin.register);
// router.post("/login", Admin.login);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err); 
      }
      return res.redirect("/"); 
    });
  })(req, res, next);
});

router.post(
  "/updateProfile",
  upload.single("admin_profile"),
  Admin.updateProfile
);
router.post("/changePassword", Admin.changePass);
router.post("/forgot-pass", Admin.forgotPass);
router.post("/updatePass", Admin.updatePass);
// router.get("/send-mail",(req,res)=>{
//     sendEmail('rnwfsd@gmail.com',"helllooo gmail")
// })

module.exports = router;
