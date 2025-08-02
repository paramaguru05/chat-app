const express = require("express")
const multer = require("multer")

const {productRoute} = require("../middlewares/auth.middleware")
const {getUsers,getMessages,sendMessage} = require("../controllers/message.controller")

const upload = multer({dest:"uploads/"})
const router = express.Router()

router.route("/users").get(productRoute,getUsers)
router.route("/:id").get(productRoute,getMessages)
router.route("/send/:id").post(productRoute, upload.single("image") , sendMessage)


module.exports = router