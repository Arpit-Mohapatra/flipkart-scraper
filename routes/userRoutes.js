const express = require("express")
const {registerUser, authUser, allPosts} = require("../controllers/userControllers")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", registerUser)
router.post("/login", authUser)
router.get("/:id", protect, allPosts)

module.exports = router