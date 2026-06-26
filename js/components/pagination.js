import { pets } from '../data/pets.js';

export function initPagination () {
	const cardsContainer = document.querySelector('.pets-page__cards');

	const prevBtn = document.querySelector('.pagination__arrow-page-prev');
	const nextBtn = document.querySelector('.pagination__arrow-page-next');

	const firstBtn = document.querySelector('.pagination__double-arrow-page-prev');
	const lastBtn = document.querySelector('.pagination__double-arrow-page-next');

	const current = document.querySelector('.pets__pagination-current');

	if (
		!cardsContainer ||
		!prevBtn ||
		!nextBtn ||
		!firstBtn ||
		!lastBtn ||
		!current
	) return;

	function createPetsList () {
		const result = [];

		const copies = 6;

		for(let i = 0; i < copies; i++) {
			result.push(...pets);
		}

		const shuffled = [];

		while(result.length) {
			const index = Math.floor(Math.random() * result.length);

			const pet = result[index];

			const last = shuffled.at(-1);

			if(last && last.name === pet.name) {
				continue;
			}

			shuffled.push(pet);
			result.splice(index, 1);
		}
		return shuffled;
	}

	let page = 1;
	let resizeTimer;
	let isAnimating = false;
	const petsList = createPetsList();


	function getCardsPerPage() {
		if (window.innerWidth <= 768) return 3;

		if (window.innerWidth <= 1279) return 6;

		return 8;
	}

	function getTotalPages() {
		return Math.ceil(petsList.length / getCardsPerPage());
	}
	
	function render() {
		if(isAnimating) return;
		isAnimating = true;
		cardsContainer.classList.add('pets-page__cards--hidden');

		setTimeout (() => {
			const perPage = getCardsPerPage();
			
			
			if(page > getTotalPages()) {
				page = getTotalPages();
			}
			
			const start = (page - 1) * perPage;
			
			const cards = petsList.slice(start, start + perPage);
			
			cardsContainer.innerHTML = cards.map(pet => {
				return `
				<div class="pets__card card">
				
				<img
				class="card__img"
				src="${pet.img}"
				alt="${pet.name} the ${pet.type}"
				>
				
				<h3 class="card__title">
				${pet.name}
				</h3>
				
				<button
				data-id="${pet.id}"
				class="card__button button--secondary">
				Learn more
				</button>
				</div>
				`;
		}).join('');
		
		current.textContent = page;
		
		updateButtons();
		requestAnimationFrame(() => {
			cardsContainer.classList.remove('pets-page__cards--hidden');
			isAnimating = false;
		});
	}, 300);
	}

	cardsContainer.addEventListener('click', (e) => {
		const button = event.target.closest('.card__button');

		if(!button) return;

		const id = button.dataset.id;

		const pet = pets.find(pet => pet.id == id);

		if(!pet) return;
	});

	function updateButtons() {
		const total = getTotalPages();
		prevBtn.disabled = page === 1;
		firstBtn.disabled = page === 1;

		nextBtn.disabled = page === total;
		lastBtn.disabled = page === total;
	}

	nextBtn.addEventListener('click', () => {
		if(page < getTotalPages()) {
			page++;
			render();
		}
	});

	prevBtn.addEventListener('click', () => {
		if(page > 1) {
			page--;
			render();
		}
	});

	firstBtn.addEventListener('click',() => {
		page = 1;
		render();
	});

	lastBtn.addEventListener('click', () => {
		page = getTotalPages();
		render();
	});

	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);

		resizeTimer = setTimeout(() => {
			page = 1;
			render();
		}, 300);
	});

	render();
}