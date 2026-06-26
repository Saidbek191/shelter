export function initBurger() {
	
	const burgerIcon = document.querySelector('.burger-icon');
	const burgerMenu = document.querySelector('.burger-menu');
	const overlay = document.querySelector('.overlay');
	const burgerLinks = document.querySelectorAll('.burger__link');
	
	if (!burgerIcon || !burgerMenu || !overlay) {
		return;
	}

	burgerIcon.addEventListener('click', () => {
		burgerIcon.classList.toggle('burger-icon--active');
		burgerMenu.classList.toggle('burger-menu--active');
		overlay.classList.toggle('overlay--active');
		document.body.classList.toggle('no-scroll');
	});
	
	burgerLinks.forEach(link => {
		link.addEventListener('click', () => {
			burgerIcon.classList.remove('burger-icon--active');
			burgerMenu.classList.remove('burger-menu--active');
			overlay.classList.remove('overlay--active');
			document.body.classList.remove('no-scroll');
		});
	});

	overlay.addEventListener('click', () => {
		burgerIcon.classList.remove('burger-icon--active');
		burgerMenu.classList.remove('burger-menu--active');
		overlay.classList.remove('overlay--active');
		document.body.classList.remove('no-scroll');
	});
}
