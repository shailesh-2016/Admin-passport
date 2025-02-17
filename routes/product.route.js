const router=require("express").Router()
const upload=require("../config/upload")
const product=require("../controller/product.controller")

router.post("/",upload.single("p_image"),product.store)
router.get("/delete/:id",product.trash)

module.exports=router
