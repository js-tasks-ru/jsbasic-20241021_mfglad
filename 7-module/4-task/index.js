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
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');

    this.thumb.ondragstart = () => false;
    this.elem.addEventListener('pointerdown', this.#onDown);
    this.elem.addEventListener('click', (event) => {
      this.#moveThumb(event, 'click');
      this.#dispatchSliderChangeEvent();
    });
    this.thumb.style.left = `0%`;
    this.progress.style.width = `0%`;
  }

  #onDown = (event) => {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');
    this.#moveThumb(event, 'move');
    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp, { once: true });
  }

  #onMove = (event) => {
    event.preventDefault();
    this.#moveThumb(event, 'move');
  }

  #onUp = () => {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.#onMove);
    this.#dispatchSliderChangeEvent();
  }

  #dispatchSliderChangeEvent = () => {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }))
  }

  #moveThumb = (event, type) => {
    let leftPercents = 0;
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);

    const stepsSpans = this.elem.querySelectorAll('.slider__steps span');
    stepsSpans.forEach(span => span.classList.remove('slider__step-active'));
    stepsSpans[this.value].classList.add('slider__step-active');
    this.elem.querySelector('.slider__value').textContent = this.value;

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.thumb.ondragstart = () => false;

    if (type === 'move') {
      leftPercents = leftRelative * 100;
    } else if (type === 'click') {
      leftPercents = this.value / segments * 100;
    }

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
  }


}
