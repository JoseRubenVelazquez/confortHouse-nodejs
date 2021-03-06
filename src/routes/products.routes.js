const express = require("express");
const router = express.Router();

// Controller
const {
  renderProductForm,
  createNewProduct,
  renderProducts,
  renderEditForm,
  updateProduct,
  deleteProduct
} = require("../controllers/products.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Product
router.get("/products/add", isAuthenticated, renderProductForm);

router.post("/products/new-product", isAuthenticated, createNewProduct);

// Get All Products
router.get("/products", isAuthenticated, renderProducts);

// Edit Products
router.get("/products/edit/:id", isAuthenticated, renderEditForm);

router.put("/products/edit-product/:id", isAuthenticated, updateProduct);

// Delete Products
router.delete("/products/delete/:id", isAuthenticated, deleteProduct);

module.exports = router;
