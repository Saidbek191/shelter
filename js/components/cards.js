export function initCards () {
	const cards = document.querySelectorAll('.card');
	if (!cards) return;
	
	cards.forEach(card => {
		card.addEventListener('click', () => {
			card.classList.toggle('card--active');
		});
	});
}