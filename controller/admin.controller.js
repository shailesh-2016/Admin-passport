const sendEmail = require("../config/mail");
const Admin = require("../model/admin.model");
const { forgotMailer } = require("../utils/mailFormate");
const { plainToHash, hashToPlain } = require("../utils/password");
const otpGenerator = require("otp-generator");

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      req.flash("info", "Passwords do not match!");
      return res.redirect("/register");
    } else {
      const existEmail = await Admin.findOne({ email: email })
        .countDocuments()
        .exec();

      if (existEmail > 0) {
        req.flash("info", "Email already exists");
        return res.redirect("/register");
      }

      const hash = await plainToHash(password);
      await Admin.create({ username, email, password: hash });

      req.flash("info", "Registration successful");
      res.redirect("/login");
    }
  } catch (err) {
    res.json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existEmail = await Admin.findOne({ email }).countDocuments().exec();
    if (existEmail > 0) {
      const existUser = await Admin.findOne({ email });
      await hashToPlain(password, existUser.password);
      // console.log(existUser.password)
      const match_pass = await hashToPlain(password, existUser.password);
      if (match_pass) {
        const payload = {
          username: existUser.username,
          email: existUser.email,
        };
        res.cookie("admin", payload, { httpOnly: true });
        res.redirect("/");
        // res.json("password match")
      } else {
        req.flash("info", "password not match");
        res.redirect("/login");
      }
    } else {
      req.flash("info", "email is not exist");
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { email, username } = req.body;
    const existemail = await Admin.findOne({ email }).countDocuments().exec();
    if (existemail > 0) {
      await Admin.updateOne(
        {
          email: email,
        },
        {
          username,
          admin_profile: req?.file?.filename,
        }
      );
      res.redirect("/myProfile");
    } else {
      res.json("email not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.changePass = async (req, res) => {
  console.log(req.body);
  const { email, password, new_pass, confirm_pass } = req.body;
  const existEmail = await Admin.findOne({ email }).countDocuments().exec();
  if (existEmail > 0) {
    const admin = await Admin.findOne({ email });
    const match = await hashToPlain(password, admin.password);

    if (match) {
      console.log(new_pass);
      console.log(confirm_pass);

      if (new_pass === confirm_pass) {
        const hash_pass = await plainToHash(new_pass);
        await Admin.updateOne({ email: email }, { password: hash_pass });
        res.redirect("/changePassword");
      } else {
        res.json("confirm password is not match");
      }
    } else {
      res.json("password does not match!");
    }
  } else {
    res.json("email not exist");
  }
};

exports.forgotPass = async (req, res) => {
  try {
    const { email } = req.body;
    const existEmail = await Admin.findOne({ email }).countDocuments().exec();
    if (existEmail > 0) {
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      await Admin.updateOne(
        { email: email },
        {
          token: otp,
        }
      );
      await sendEmail(email, "forgot-pass", forgotMailer(otp));

      req.flash("info", "Check your email for otp");
      res.redirect("/updatePass");
    } else {
      req.flash("info", "Email does not exist.");
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred, please try again later.");
    res.redirect("/updatePass");
  }
};

exports.updatePass = async (req, res) => {
  const { token, new_password, confirm_password } = req.body;

  const existToken = await Admin.findOne({ token }).countDocuments().exec();
  if (existToken) {
    if (new_password === confirm_password) {
      const hash = await plainToHash(new_password);

      const admin = await Admin.findOne({ token });

      await Admin.findByIdAndUpdate(
        { _id: admin._id },
        { password: hash, token: "" }
      );

      req.flash("info", "password updated");
      res.redirect("/login");
    } else {
      req.flash("info", "confirm password does not match");
      res.redirect("/updatePass");
    }
  } else {
    req.flash("info", "token incorrect");
    res.redirect("/updatePass");
  }
};
