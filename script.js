document.querySelector('.card-container')
  .addEventListener('click', toggleCard);
document.querySelector('.card-container')
  .addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard.call(this);
    }
  });

function toggleCard() {
  this.classList.toggle('flipped');
}