const express = require("express");
const {
  addcategory,
  getcategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/CategoryController");
const router = express.Router();

router.post("/categoryadd", addcategory);
router.get("/", getcategory);
router.get("/:id", getCategoryById);
router.put("/updatecategory/:id", updateCategory);
router.delete("/deletecategory/:id", deleteCategory);

module.exports = router;
