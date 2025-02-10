const router = require("express").Router();

const Category = require("../controller/cat_controller");

router.post("/addCategory/", Category.store);
router.get("/delete/:id", Category.trash);
router.post("/category/:id", Category.update);
module.exports = router;
