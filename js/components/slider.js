import { pets } from '../data/pets.js';

export function initSlider() {
	const cardsContainer = document.querySelector('.pets__cards');
	const prevBtn = document.querySelector('.pets__arrow--prev');
	const nextBtn = document.querySelector('.pets__arrow--next');

	if (!cardsContainer || !prevBtn || !nextBtn) return;
	if (!cardsContainer.closest('.pets__slider')) return;

	let isAnimating = false;

	let currentGroup = [];
	let previousGroup = [];

	function getCardsPerView() {
		if (window.innerWidth <= 768) return 1;
		if (window.innerWidth <= 1279) return 2;
		return 3;
	}

	function shuffle(array) {
		return [...array].sort(() => Math.random() - 0.5);
	}

	function generateGroup() {
		const count = getCardsPerView();

		let pool = pets.filter(
			pet => !currentGroup.includes(pet)
		);

		if (pool.length < count) {
			pool = [...pets];
		}

		const shuffled = shuffle(pool);

		return shuffled.slice(0, count);
	}


	function render(group) {
		cardsContainer.innerHTML = group.map(pet => `
			<article class="pets__card card">
				<img class="card__img" src="${pet.img}" alt="${pet.name} the ${pet.type}" />
				<h3 class="card__title">${pet.name}</h3>
				<button data-id="${pet.id}" class="card__button button--secondary">
					Learn more
				</button>
			</article>
		`).join('');
	}

	function move(direction) {
		if (isAnimating) return;
		isAnimating = true;

		cardsContainer.classList.add(
			direction === 'next'
				? 'pets__cards--left'
				: 'pets__cards--right'
		);

		const nextGroup = generateGroup();

		cardsContainer.addEventListener('transitionend', function handler(e) {
			if (e.propertyName !== 'transform') return;

			previousGroup = currentGroup;
			currentGroup = nextGroup;

			render(currentGroup);

			requestAnimationFrame(() => {
				cardsContainer.classList.remove('pets__cards--left');
				cardsContainer.classList.remove('pets__cards--right');

				isAnimating = false;
			});

			cardsContainer.removeEventListener('transitionend', handler);
		});
	}

	nextBtn.addEventListener('click', () => move('next'));
	prevBtn.addEventListener('click', () => move('prev'));

	currentGroup = generateGroup();
	render(currentGroup);

	window.addEventListener('resize', () => {
		currentGroup = generateGroup();
		render(currentGroup);
	});
}