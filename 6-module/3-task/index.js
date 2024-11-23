import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  slides = null;

  get elem() {
    return this.elem;
  }

  constructor(slides) {
    this.slides = slides;
    this.#renderCarousel();
    this.#initCarousel();
  }

  #template() {
    return `
  <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">
      ${this.slides.map(slide => `
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `).join('\n')}
    </div>
  </div>`
  }

  #renderCarousel() {
    this.elem = createElement(this.#template());

    this.elem.querySelectorAll('.carousel__button').forEach(button => {
      button.addEventListener('click', (event) => {
        this.elem.dispatchEvent(
          new CustomEvent("product-add", {
            detail: event.target.closest('.carousel__slide').dataset.id,
            bubbles: true
          })
        )
      });
    })
  }

  #showCarouselArrows() {
    this.arrowRightButton.style.display = this.currentSlide === this.slides.length - 1 ? "none" : "";
    this.arrowLeftButton.style.display = this.currentSlide < 1 ? "none" : "";
  }

  #initCarousel() {
    this.arrowRightButton = this.elem.querySelector(".carousel__arrow_right");
    this.arrowLeftButton = this.elem.querySelector(".carousel__arrow_left");
    this.carouselInner = this.elem.querySelector(".carousel__inner");
    this.currentSlide = 0;

    this.#showCarouselArrows();

    this.elem.addEventListener("click", (event) => {
      let arrowButton = event.target.closest('.carousel__arrow');
      if (!arrowButton) return;
      this.currentSlide = arrowButton == this.arrowRightButton ? this.currentSlide + 1 : this.currentSlide - 1;
      this.carouselInner.style.transform = `translateX(-${this.carouselInner.offsetWidth * this.currentSlide}px)`;
      this.#showCarouselArrows();
    });
  }
}