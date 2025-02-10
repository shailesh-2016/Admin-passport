const express = require("express");
const app = express();
const PORT = 8000;

const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const session = require("express-session");
const router = require("./routes/cat_route");
const View = require("./routes/view.route");
const Admin = require("./routes/admin.route");
const subCategory=require("./routes/subCat.route")
const passport=require("passport")
const passportAuth=require("./config/passport")
passportAuth(passport)

app.set("view engine", "ejs");
require("./config/db").main();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use("/profile", express.static("uploads"));

app.use(cookieParser("test1"));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())

app.use("/api", router);
app.use("/", View);
app.use("/api/admin", Admin);
app.use("/api/subCategory", subCategory);

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
