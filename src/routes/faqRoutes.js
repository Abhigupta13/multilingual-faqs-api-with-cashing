const express = require("express");
const { getFAQs, createFAQ, deleteFAQ, updateFAQ, getFAQById } = require("../controllers/faqController");

const router = express.Router();

router.get("/", getFAQs);
router.post("/", createFAQ);
router.delete("/:id", deleteFAQ);
router.patch("/:id", updateFAQ); 
router.get("/:id", getFAQById);


module.exports = router;
