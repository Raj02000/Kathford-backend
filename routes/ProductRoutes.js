const express = require("express");
const {
  addProduct,
  getProduct,
  getProductById,
  getProductByCategoryId,
  deleteProduct,
  updateProduct,
} = require("../controller/ProductController");
const router = express.Router();

router.post("/addproduct", addProduct);
router.get("/", getProduct);
router.get("/:id", getProductById);
router.get("/category/:id", getProductByCategoryId);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/productupdatebyid/:id", updateProduct);

module.exports = router;
