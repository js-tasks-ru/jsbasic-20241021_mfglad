import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.#render();
  }

  #template() {
    return `
<div class="modal">
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
          </h3>
        </div>
  
        <div class="modal__body">
        </div>
      </div>
    </div>`
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');
  }

  setTitle(modalTitle) {
    this.modal.querySelector('.modal__title').textContent = modalTitle;
  }

  setBody(modalBody) {
    this.modal.querySelector('.modal__body').innerHTML = modalBody.outerHTML;
  }

  close = () => {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.#onKeyDown);
  }

  #render() {
    this.modal = createElement(this.#template());
    this.modal.querySelector('.modal__close').addEventListener('click', () => this.close(), {once: true});
    document.addEventListener('keydown', this.#onKeyDown);
  }

  #onKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
