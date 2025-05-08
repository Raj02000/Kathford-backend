const Product = require("../model/ProductModel");
const Category = require("../model/CategoryModel");

exports.addProduct = async (req, res) => {
  try {
    let product = new Product({
      product_name: req.body.product_name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      image: req.body.image,
      category: req.body.category,
    });
    product = await product.save();
    if (!product) {
      return res.status(400).json({ message: "Invalid product data" });
    }
    return res.send(product);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, detail: "Product not added" });
  }
};
exports.getProduct = async (req, res) => {
  try {
    let product = await Product.find().populate("category", "category_name");
    if (!product) {
      return res.status(404).json({ message: "no product found" });
    }
    return res.status(200).json({ product, mess: "sadsa" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, detail: "Product not added" });
  }
};
exports.getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).populate(
      "category",
      "category_name"
    );
    if (!product) {
      return res.status(404).json({ message: "no product found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, detail: "Product not added" });
  }
};
exports.getProductByCategoryId = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    let product = await Product.find({ category: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found in Category" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ err: err.message, detail: "Category Not found " });
  }
};
exports.deleteProduct = async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  if (!product) return res.status(404).json({ error: "Product not found" });
  return res.status(200).json({ product, success: "Product deleted" });
};
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        product_name: req.body.product_name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        image: req.body.image,
        category: req.body.category,
      },
      { new: true }
    ).populate("category", "category_name");
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product is not available to update" });
    }
    return res
      .status(200)
      .json({ product, success: "Product updated successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
