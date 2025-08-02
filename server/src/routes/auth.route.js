const express = require("express")
const multer = require("multer")

const {signup,login,logout,updateProfile,authCheck} = require("../controllers/auth.controller")
const {productRoute} = require("../middlewares/auth.middleware")

const router = express.Router()
const uploads = multer({dest:"uploads/"})

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/check").get(productRoute,authCheck)
router.route("/update-profile").patch(productRoute, uploads.single("image") , updateProfile)


module.exports = router