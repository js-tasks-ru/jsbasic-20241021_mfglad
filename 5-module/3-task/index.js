function initCarousel() {
  let arrowRightButton = document.querySelector(".carousel__arrow_right");
  let arrowLeftButton = document.querySelector(".carousel__arrow_left");
  let carousel = document.querySelector(".carousel");
  let carouselInner = document.querySelector(".carousel__inner");
  let carouselWidth = carouselInner.offsetWidth;
  let currentSlide = 0;
  const SLIDES_COUNT = 4;

  function showArrows() {
    arrowRightButton.style.display = currentSlide === SLIDES_COUNT - 1 ? "none" : "";
    arrowLeftButton.style.display = currentSlide < 1 ? "none" : "";
  }

  showArrows();

  carousel.addEventListener("click", (event) => {
    let arrowButton = event.target.closest('.carousel__arrow');
    if (!arrowButton) return;
    currentSlide = arrowButton == arrowRightButton ? currentSlide + 1 : currentSlide - 1;
    carouselInner.style.transform = `translateX(-${carouselWidth * currentSlide}px)`;
    showArrows();
  });
}
