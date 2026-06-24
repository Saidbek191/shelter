export function initPopup () {
	const popup = document.querySelector('.popup');
	const popupClose = document.querySelector('.popup__close');
	const popupImg = document.querySelector('.popup__img');
	const popupTitle = document.querySelector('.popup__title');
	const popupText = document.querySelector('.popup__text');
	const learnMoreButtons = document.querySelectorAll('.card__button');

	if (!popup || !popupClose || !popupImg || !popupTitle || !popupText) {
		return;
	}

	learnMoreButtons.forEach(button => {
		
		button.addEventListener('click', () => {
			const card = button.closest('.card');

			if(!card) return;

			const cardImg = card.querySelector('.card__img');
			const cardTitle = card.querySelector('.card__title');

			if(!cardImg || !cardTitle) return;
			
			popupImg.src = cardImg.src;
			popupTitle.textContent = cardTitle.textContent;
			
			popup.classList.add('popup--active');
		});
	});

	popupClose.addEventListener('click', () => {
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