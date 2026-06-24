export function initSlider () {
	const slider = document.querySelector('.slider');
	const sliderItems = document.querySelectorAll('.slider__item');
	const sliderPrev = document.querySelector('.slider__prev');
	const sliderNext = document.querySelector('slider__next');

	if (!slider || !sliderItems || !sliderPrev || !sliderNext) return;

	let currentSlider = 1;
	const sliderLength = sliderItems.length;

	sliderNext.addEventListener('click', () => {
		sliderItems[currentSlider - 1].classList.remove('slider__item--active');
		currentSlider++;
		if (currentSlider > sliderLength) {
			currentSlider = 1;	
		}
		sliderItems[currentSlider - 1].classList.add('slider__item--active');
	});

	sliderPrev.addEventListener('click', () => {
		sliderItems[currentSlider - 1].classList.remove('slider__item--active');
		currentSlider--;
		if (currentSlider < 1) {
			currentSlider = sliderLength;
		}
		sliderItems[currentSlider - 1].classList.add('slider__item--active');
	});
}