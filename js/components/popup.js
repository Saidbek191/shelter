import { pets } from '../data/pets.js';
export function initPopup () {
	const popup = document.querySelector('.popup');
	const overlay = document.querySelector('.popup__overlay');
	const popupClose = document.querySelector('.popup__close');
	const popupImg = document.querySelector('.popup__img');
	const popupTitle = document.querySelector('.popup__title');
	const popupSubtitle = document.querySelector('.popup__subtitle');
	const popupText = document.querySelector('.popup__text');
	const learnMoreButtons = document.querySelectorAll('.card__button');

	const popupAge = document.querySelector('.popup__age');
	const popupInoc = document.querySelector('.popup__inoculations');
	const popupDiseases = document.querySelector('.popup__diseases');
	const popupParasites = document.querySelector('.popup__parasites');
	const cardsContainer = document.querySelector('.pets__cards');

	if (!popup || !popupClose || !popupImg || !popupTitle || !popupText) {
		return;
	}

	// learnMoreButtons.forEach(button => {	
		
	// 	button.addEventListener('click', () => {
			
	// 		const id = Number(button.dataset.id);
	// 		const pet = pets.find(p => p.id === id);

	// 		if(!pet) return;

	// 	});
	// });
	
	if (cardsContainer) {
		cardsContainer.addEventListener('click', (e) => {
			const button = e.target.closest('.card__button');
			
			if (!button) return;
			
			const id = Number(button.dataset.id);
			const pet = pets.find(p => p.id === id);
			
			if (!pet) return;
			
					popupImg.src = pet.img;
					popupTitle.textContent = pet.name;
					popupSubtitle.textContent = pet.type;
					popupText.textContent = pet.text;
					popupAge.innerHTML = `<strong class = "dark-font">Age:</strong> <span class = "slim-font">${pet.age}</span>`;
					popupInoc.innerHTML = `<strong class = "dark-font">Inoculations:</strong> <span class = "slim-font">${pet.inoculations.join(', ')}</span>`;
					popupDiseases.innerHTML = `<strong class = "dark-font">Diseases:</strong> <span class = "slim-font">${pet.diseases.join(', ')}</span>`;
					popupParasites.innerHTML = `<strong class = "dark-font">Parasites:</strong> <span class = "slim-font">${pet.parasites.join(',')}</span>`;
					
					popup.classList.add('popup--active');
		});
	}

	popupClose.addEventListener('click', () => {
		popup.classList.remove('popup--active');
	});

	overlay.addEventListener('click', () => {
		popup.classList.remove('popup--active');
	});

	popup.addEventListener('click', (e) => {
		if (e.target === popup) {
			popup.classList.remove('popup--active');

		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			popup.classList.remove('popup--active');
		}
	});
} 