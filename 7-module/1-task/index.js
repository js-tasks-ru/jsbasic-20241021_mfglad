import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  elem = null;
  slides = null;

  get elem() {
    return this.elem;
  }

  constructor(categories) {
    this.categories = categories;
    this.#render();
  }

  #template() {
    return `
<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
          ${this.categories.map(category => `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`).join('\n')} 
    </nav>
    
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`
  }

  #render() {
    this.elem = createElement(this.#template());

    this.scrollRight = this.elem.querySelector('.ribbon__arrow_right');
    this.scrollLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    const links = this.elem.querySelectorAll('a');


    this.scrollLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });


    this.scrollRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      this.#showButtons();
    });

    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.elem.querySelectorAll('.ribbon__item_active').forEach(e => { e.classList.remove('ribbon__item_active') });
        link.classList.add('ribbon__item_active');
        this.elem.dispatchEvent(
          new CustomEvent('ribbon-select', {
            detail: link.dataset.id,
            bubbles: true
          }))
      });
    });
  }

  #showButtons() {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft == 0) {
      this.scrollLeft.classList.remove('ribbon__arrow_visible')
    }
    if (scrollLeft > 1) {
      this.scrollLeft.classList.add('ribbon__arrow_visible')
    }
    if (scrollRight < 1) {
      this.scrollRight.classList.remove('ribbon__arrow_visible')
    }
    if (scrollRight > 1) {
      this.scrollRight.classList.add('ribbon__arrow_visible')
    }
  }
}