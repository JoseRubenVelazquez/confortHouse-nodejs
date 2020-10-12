const productsCtrl = {};

// Models
const Product = require("../models/Product");

productsCtrl.renderProductForm = (req, res) => {
  res.render("products/new-product");
};

productsCtrl.createNewProduct = async (req, res) => {
  const { title, description, price } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Por favor ingresa nombre del producto" });
  }
  if (!description) {
    errors.push({ text: "Por favor ingresa una descripcion" });
  }
  if (errors.length > 0) {
    res.render("products/new-products", {
      errors,
      title,
      description,
      price
    });
  } else {
    const newProduct = new Product({ title, description, price });
    newProduct.user = req.user.id;
    await newProduct.save();
    req.flash("success_msg", "Producto agregado exitosamente");
    res.redirect("/products");
  }
};

productsCtrl.renderProducts = async (req, res) => {
  const products = await Product.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("products/all-products", { products });
};

productsCtrl.renderEditForm = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (product.user != req.user.id) {
    req.flash("error_msg", "No autorizado");
    return res.redirect("/products");
  }
  res.render("products/edit-product", { product });
};

productsCtrl.updateProduct = async (req, res) => {
  const { title, description, price } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { title, description, price });
  req.flash("success_msg", "Producto actualizado exitosamente");
  res.redirect("/products");
};

productsCtrl.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Producto eliminado exitosamente");
  res.redirect("/products");
};

module.exports = productsCtrl;
