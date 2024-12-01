import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modalBody = createElement('<div></div>');
    this.cartItems.forEach(cartItem => this.modalBody.append(this.renderProduct(cartItem.product, cartItem.count)));
    this.modalBody.append(this.renderOrderForm());
    this.modal.setBody(this.modalBody);
    this.modal.open();

    this.modal.modal.querySelectorAll('.cart-counter__button').forEach(button => {
      button.addEventListener("click", () => {
        let amount = button.classList.contains('cart-counter__button_plus') ? 1 : -1;
        let productId = button.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, amount)
      });
    })

    this.modal.modal.querySelector('.cart-form').addEventListener("submit", (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (!document.body.classList.contains('is-modal-open')) return;
    let productId = cartItem.product.id;
    let productCount = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);
    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit(event) {
    event.preventDefault();
    let form = event.target;
    const formData = new FormData(form);
    form.querySelector('[type="submit"]').classList.add('is-loading');
    
    const fetchPromise = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST'
    });

    fetchPromise.then(() => {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`));
    })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

