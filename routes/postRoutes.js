const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const { scraped } = require("../controllers/postControllers")

const router = express.Router()

router.post("/scrape-data", protect, scraped)

module.exports = router