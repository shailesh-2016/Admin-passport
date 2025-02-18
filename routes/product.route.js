const router=require("express").Router()
const upload=require("../config/upload")
const product=require("../controller/product.controller")

router.post("/",upload.single("p_image"),product.store)
router.get("/delete/:id",product.trash)
router.post("/update/:id",upload.single("p_image"),product.update)

module.exports=router
