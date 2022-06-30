const express = require("express");
const Store = require("../models/store");
const { BadRequestError, NotFoundError } = require("../utils/errors");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ products: Store.getProducts() });
});

router.get("/:productId", (req, res, next) => {
  const { productId } = req.params;
  if (!productId)
    next(new BadRequestError("Please provide a valid product ID."));
  const product = Store.getProductById(productId);
  if (!product)
    next(new NotFoundError("No product found with that ID."));
  res.status(200).json({ product });
});

router.post("/", (req, res, next) => {
  if (!req.body)
    next(new BadRequestError("Please provide user and shoppingCart in request body."));
  const { user, shoppingCart } = req.body;
  if (!(user && typeof user.name === "string" && typeof user.email === "string"))
    next(new BadRequestError("Invalid user provided. Must be an object with `name` and `email` string parameters."));
  if (!(shoppingCart && Array.isArray(shoppingCart) && shoppingCart.length > 0)) {
    next(new BadRequestError("Invalid shoppingCart provided. Must be an array with at least one element."));
  }
  try {
    Store.validateShoppingCart(shoppingCart);
    const purchase = Store.createPurchase(shoppingCart, user);
    res.status(201).json({ purchase });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
