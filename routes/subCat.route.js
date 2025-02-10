const subCategory = require("../controller/subCat.controller");
const router = require("express").Router();

router.post("/", subCategory.store);
router.get("/", subCategory.index);
router.get("/:id",subCategory.trash)
router.post("/:id",subCategory.update)

module.exports=router
