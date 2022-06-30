const { storage } = require("../data/storage");

class Store {
  static TAX = 0.0875;

  static getProducts() {
    return storage.get("products");
  }

  static getPurchases() {
    return storage.get("purchases");
  }

  static getProductById(productId) {
    const index = this.getProducts().findIndex(({ id }) => productId === id);
    if (index === -1)
      return null;
    return this.getProducts()[index];
  }

  static getOrderId() {
    return this.getPurchases().length + 1;
  }

  static getOrderTotal(shoppingCart) {
    return shoppingCart.reduce((total, { itemId, quantity }) => {
      const product = this.getProductById(itemId);
      if (!product)
        return 0;
      return product.price;
    }, 0) * (1 + this.TAX);
  }

  static createPurchase(shoppingCart, user) {
    const purchase = {
      ...user,
      id: this.getOrderId(),
      order: shoppingCart,
      total: this.getOrderTotal(shoppingCart),
      createdAt: new Date().toISOString()
    };
    storage.add("purchases", purchase);
    return purchase;
  }
}

module.exports = Store;