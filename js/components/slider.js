import { pets } from '../data/pets.js';
export function initSlider () {
	const cardsContainer = document.querySelector('.pets__cards');
	const prevBtn = document.querySelector('.pets__arrow--prev');
	const nextBtn = document.querySelector('.pets__arrow--next');

	if (!cardsContainer || !prevBtn || !nextBtn) return;

	let startIndex = 0;
	let isAnimating = false;
	let direction = null;

	function getCardsPerView () {
		if (window.innerWidth <= 768) return 1;
		if (window.innerWidth <= 1279) return 2;
		return 3;
	}

	
	function renderCards () {
		const visible = getCardsPerView();
		
		cardsContainer.innerHTML = '';
		for (let i = 0; i < visible; i++) {
			const pet = pets[(startIndex + i) % pets.length];

			cardsContainer.insertAdjacentHTML('beforeend', 
				`<article class="pets__card card">
				<img class="card__img" src="${pet.img}" alt="${pet.name} the ${pet.type}" />
				<h3 class="card__title">${pet.name}</h3>
				<button data-id="${pet.id}" class="card__button button--secondary">Learn more</button>
				</article>
				`);
		}
			}
			
			function move(dir) {
				if (isAnimating) return;
				isAnimating = true;
				direction = dir;

				cardsContainer.classList.add(dir === 'next'
					 ? 'pets__cards--left' 
					 : 'pets__cards--right'
					);
			}
			nextBtn.addEventListener('click', () => move('next'));
			prevBtn.addEventListener('click', () => move('prev'));

			cardsContainer.addEventListener('transitionend', (e) => {
				if (!isAnimating) return;

				if (e.propertyName !== 'transform') return;

					if (direction === 'next') {
		startIndex = (startIndex + 1) % pets.length;
	}
	if (direction === 'prev') {
		startIndex = (startIndex - 1 + pets.length) % pets.length;
	}
	renderCards();

	requestAnimationFrame(() => {
					cardsContainer.classList.remove('pets__cards--left');
					cardsContainer.classList.remove('pets__cards--right');

					isAnimating = false;
					direction = null;
				});
			});
}