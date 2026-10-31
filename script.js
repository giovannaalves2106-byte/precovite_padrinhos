document.documentElement.classList.add('site-ready');

const openButton = document.getElementById('openInvite');
const content = document.getElementById('inviteContent');

// Mantenha o arquivo de música em audio/musica.mp4.
const music = new Audio('audio/musica.mp4');
music.loop = true;
music.volume = 0.35;
music.preload = 'auto';

function revealSections() {
  const sections = document.querySelectorAll('.section-fade');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(section => section.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach(section => observer.observe(section));
}

function startTypewriter() {
  const typewriterTarget = document.getElementById('typedText');
  if (!typewriterTarget || typewriterTarget.dataset.started === 'true') return;
  typewriterTarget.dataset.started = 'true';
  const openingText = 'Vamos nos casar...';
  let characterIndex = 0;
  const typeNextCharacter = () => {
    if (characterIndex < openingText.length) {
      typewriterTarget.textContent += openingText.charAt(characterIndex);
      characterIndex += 1;
      window.setTimeout(typeNextCharacter, 150);
    }
  };
  window.setTimeout(typeNextCharacter, 900);
}

if (openButton && content) {
  openButton.addEventListener('click', () => {
    content.hidden = false;
    document.body.classList.add('opened');
    music.play().catch(error => console.log('Não foi possível iniciar a música:', error));
    revealSections();
    startTypewriter();
    window.setTimeout(() => content.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    openButton.disabled = true;
    openButton.innerHTML = 'Pré-convite aberto <span aria-hidden="true">♥</span>';
  });
}

// Contagem regressiva para 17/07/2027 às 15h30, horário de Brasília.
const weddingDate = new Date('2027-07-17T15:30:00-03:00').getTime();
const daysElement = document.getElementById('countDays');
const hoursElement = document.getElementById('countHours');
const minutesElement = document.getElementById('countMinutes');
const secondsElement = document.getElementById('countSeconds');
const countdownElement = document.getElementById('countdown');
function updateCountdown() {
  if (!countdownElement) return;
  const distance = weddingDate - Date.now();
  if (distance <= 0) {
    countdownElement.innerHTML = '<p class="countdown-caption">Chegou o grande dia!</p>';
    return;
  }
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance / 3600000) % 24);
  const minutes = Math.floor((distance / 60000) % 60);
  const seconds = Math.floor((distance / 1000) % 60);
  if (daysElement) daysElement.textContent = String(days).padStart(3, '0');
  if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
  if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
  if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
const countdownInterval = window.setInterval(() => {
  updateCountdown();
  if (Date.now() >= weddingDate) window.clearInterval(countdownInterval);
}, 1000);

// Troque pelo WhatsApp correto: 55 + DDD + número, sem espaços.
const whatsappNumber = '5511962225160';
function createWhatsAppLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
const acceptButton = document.getElementById('acceptButton');
const declineButton = document.getElementById('declineButton');
if (acceptButton) {
  acceptButton.href = createWhatsAppLink(`Olá, Gi e Gui!\n\nAceitamos com muita alegria o convite para sermos padrinhos do casamento de vocês! Será uma honra fazer parte desse momento tão especial. Contem conosco!`);
}
if (declineButton) {
  declineButton.href = createWhatsAppLink(`Olá, Gi e Gui!\n\nMuito obrigado pelo convite e por lembrarem de nós com tanto carinho. Infelizmente, não poderemos aceitar, mas desejamos que o casamento de vocês seja lindo e muito abençoado por Deus.`);
}
