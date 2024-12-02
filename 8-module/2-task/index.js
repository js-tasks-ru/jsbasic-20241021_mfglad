import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#createGrid();
    this.updateFilter(this.filters);
  }

  #gridTemplate() {
    return `<div class="products-grid"><div class="products-grid__inner"></div></div>`
  }

  #createGrid() {
    this.elem = createElement(this.#gridTemplate());
  }

  #createCards(products) {
    return products.map(product => new ProductCard(product).elem);
  }

  updateFilter(filters) {
    const gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = '';
    for (const filter in filters) {
      this.filters[filter] = filters[filter];
    }
    let filteredProducts = this.products.filter(product => this.#isMatchFilters(product, this.filters));
    this.#createCards(filteredProducts).forEach(card => { gridInner.append(card) });
  }

  #isMatchFilters(product, filters) {
    return (filters.noNuts === undefined || filters.noNuts === false || filters.noNuts !== product.nuts)
      && (filters.vegeterianOnly === undefined || filters.vegeterianOnly === false || filters.vegeterianOnly === product.vegeterian)
      && (filters.maxSpiciness === undefined || filters.maxSpiciness >= product.spiciness)
      && (filters.category === undefined || filters.category === '' || filters.category === product.category)
  }
}