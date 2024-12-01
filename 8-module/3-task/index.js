export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;
    let cartItem = this.cartItems.find(cartItem => cartItem.product.id === product.id);
    if (cartItem) {
      cartItem.count += 1;
      this.onProductUpdate(cartItem);
      return;
    }
    cartItem = { product: product, count: 1 };
    this.cartItems.push(cartItem);
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItemIndex = this.cartItems.findIndex(cartItem => cartItem.product.id === productId);
    if (cartItemIndex !== -1) {
      let cartItem = this.cartItems[cartItemIndex];
      cartItem.count += amount;
      if (cartItem.count === 0) {
        this.cartItems.splice(cartItemIndex, 1);
        return;
      }
      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, cartItem) => totalCount + cartItem.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.product.price * cartItem.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

