const { storage } = require("../data/storage");
const { BadRequestError } = require("../utils/errors");

class Store {
  static TAX = 0.0875;

  static getProducts() {
    return storage.get("products");
  }

  static getPurchases() {
    return storage.get("purchases");
  }

  static getProductById(productId) {
    const index = this.getProducts().findIndex(({ id }) => productId.toString() === id.toString());
    if (index === -1)
      return null;
    return this.getProducts()[index];
  }

  static getOrderId() {
    return this.getPurchases().length + 1;
  }

  static validateShoppingCart(shoppingCart) {
    let purchasedProducts = [];
    shoppingCart.forEach((item, index) => {
      if (!(item && typeof item.itemId === "number" && typeof item.quantity === "number")) {
        throw new BadRequestError(`Badly formatted object at index ${index} of shoppingCart.`);
      } else if (!this.getProductById(item.itemId)) {
        throw new BadRequestError(`Product with ID ${item.itemId} does not exist.`);
      } else if (purchasedProducts.includes(item.itemId)) {
        throw new BadRequestError(`Duplicate product in shopping cart found at index ${index}.`);
      }
      purchasedProducts.push(item.itemId);
    });
  }

  static getOrderTotal(shoppingCart) {
    return shoppingCart.reduce((total, { itemId, quantity }) => (
      this.getProductById(itemId).price * quantity
    ), 0) * (1 + this.TAX);
  }

  static createPurchase(shoppingCart, user) {
    const purchase = {
      ...user,
      id: this.getOrderId(),
      order: shoppingCart,
      total: this.getOrderTotal(shoppingCart),
      createdAt: new Date().toISOString(),
      receipt: {
        userInfo: user,
        productRows: shoppingCart.map(({itemId, quantity}) => ({
          ...this.getProductById(itemId),
          quantity
        }))
      }
    };
    storage.add("purchases", purchase);
    return purchase;
  }
}

module.exports = Store;