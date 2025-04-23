const express = require("express");
const {
  addProduct,
  getProduct,
  getProductById,
  getProductByCategoryId,
  deleteProduct,
} = require("../controller/ProductController");
const router = express.Router();

router.post("/addproduct", addProduct);
router.get("/", getProduct);
router.get("/:id", getProductById);
router.get("/category/:id", getProductByCategoryId);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
