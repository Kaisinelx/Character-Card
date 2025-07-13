document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.card-container');

  container.addEventListener('click', toggleCard);
  container.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard.call(container);
    }
  });

  fetch('character.json')
    .then(res => res.json())
    .then(populateCard)
    .catch(err => console.error('Failed to load character data', err));
});

function populateCard(data) {
  document.getElementById('name').textContent = data.name;
  document.getElementById('class').textContent = data.class;
  document.getElementById('emoji').textContent = data.emoji;

  const order = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  order.forEach(key => {
    const stat = data.stats[key.charAt(0).toUpperCase() + key.slice(1)];
    const el = document.getElementById(`stat-${key}`);
    if (el && stat) {
      el.textContent = `${stat.value} `;
      const span = document.createElement('span');
      span.className = 'modifier';
      span.textContent = `[${stat.mod >= 0 ? '+' : ''}${stat.mod}]`;
      el.appendChild(span);
    }
  });

  document.getElementById('hp').textContent = data.hp;
  document.getElementById('ac').textContent = data.ac;
  document.getElementById('quote-front').textContent = data.quoteFront;
  document.getElementById('about-title').textContent = `About ${data.name.split(' ')[0]}`;
  document.getElementById('about-text').textContent = data.about;
  const inv = document.getElementById('inventory');
  inv.innerHTML = data.inventory.map(item => `<li>${item}</li>`).join('');
  document.getElementById('quote-back').innerHTML = `<i>${data.quoteBack}</i>`;
}

function toggleCard() {
  this.classList.toggle('flipped');
  this.setAttribute('aria-pressed', this.classList.contains('flipped'));
}
