import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#render();
  }

  #template() {
    return `
<div class="slider">

  <div class="slider__thumb">
    <span class="slider__value">${this.value}</span>
  </div>

  <div class="slider__progress"></div>

  <div class="slider__steps">
  ${new Array(this.steps).fill('<span></span>').join('\n')}
  </div>
</div>`
  }

  #render() {
    this.elem = createElement(this.#template());
    this.elem.querySelectorAll('.slider__steps span')[this.value].classList.add('slider__step-active');

    this.elem.addEventListener('click', (event) => {

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      let valuePercents = this.value / segments * 100;

      const stepsSpans = this.elem.querySelectorAll('.slider__steps span');
      stepsSpans.forEach(span => span.classList.remove('slider__step-active'));
      stepsSpans[this.value].classList.add('slider__step-active');
      this.elem.querySelector('.slider__value').textContent = this.value;

      const thumb = this.elem.querySelector('.slider__thumb');
      const progress = this.elem.querySelector('.slider__progress');
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      this.elem.dispatchEvent(
        new CustomEvent('slider-change', { 
          detail: this.value,
          bubbles: true
        }))
    });
  }
}
