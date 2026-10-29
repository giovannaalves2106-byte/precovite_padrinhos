
document.documentElement.classList.add('site-ready');

const openButton = document.getElementById('openInvite');
const content = document.getElementById('inviteContent');
const typedText = document.getElementById('typedText');

// Música escolhida para o pré-convite
const music = new Audio('audio/musica.mp4');
music.loop = true;
music.volume = 0.35;
music.preload = 'auto';

function startGentleMusic() {
  music.play().catch((error) => {
    console.log('Não foi possível iniciar a música:', error);
  });
}

function typeMessage(message, speed = 105) {
  let i = 0;
  typedText.textContent = '';

  const type = () => {
    if (i < message.length) {
      typedText.textContent += message.charAt(i++);
      window.setTimeout(type, speed);
    } else {
      const cursor = document.querySelector('.cursor');
      if (cursor) cursor.style.display = 'none';

      window.setTimeout(() => {
        const question = document.getElementById('padrinhosQuestion');
        if (question) question.classList.add('question-visible');
      }, 350);
    }
  };

  type();
}

function revealSections() {
  const sections = document.querySelectorAll('.section-fade');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );

    sections.forEach(section => observer.observe(section));
  } else {
    sections.forEach(section => section.classList.add('visible'));
  }
}

openButton.addEventListener('click', () => {
  content.hidden = false;
  document.body.classList.add('opened');

  startGentleMusic();
  revealSections();

  window.setTimeout(() => {
    typeMessage('Vamos nos casar!');
  }, 500);

  window.setTimeout(() => {
    content.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 120);

  openButton.disabled = true;
  openButton.innerHTML =
    'Pré-convite aberto <span aria-hidden="true">♥</span>';
});


/* ==============================
   CONTAGEM REGRESSIVA DO CASAMENTO
================================ */

// Data e horário de São Paulo: 17/07/2027 às 15h30
const weddingDate = new Date('2027-07-17T15:30:00-03:00').getTime();

const daysElement = document.getElementById('countDays');
const hoursElement = document.getElementById('countHours');
const minutesElement = document.getElementById('countMinutes');
const secondsElement = document.getElementById('countSeconds');
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
  if (!countdownElement) return;

  const now = Date.now();
  const distance = weddingDate - now;

  if (distance <= 0) {
    countdownElement.innerHTML = `
      <p class="countdown-note">
        Hoje começa um dos capítulos mais especiais das nossas vidas. ✧
      </p>
    `;
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysElement.textContent = String(days).padStart(3, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
const countdownInterval = window.setInterval(() => {
  updateCountdown();

  if (Date.now() >= weddingDate) {
    window.clearInterval(countdownInterval);
  }
}, 1000);


/* ==============================
   RESPOSTAS DOS PADRINHOS
================================ */

// SUBSTITUA PELO SEU NÚMERO COM DDD E CÓDIGO DO BRASIL
const whatsappNumber = '5511999999999';

const acceptButton = document.getElementById('acceptButton');
const declineButton = document.getElementById('declineButton');

function createWhatsAppLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

if (acceptButton) {
  const acceptanceMessage =
    'Olá, Gi e Gui! ❤️\n\n' +
    'Aceitamos com muita alegria o convite para sermos padrinhos do casamento de vocês!\n\n' +
    'Ficamos super felizes por fazer parte de um momento tão especial da vida de vocês. ' +
    'Será uma honra estar ao lado de vocês nesse dia, celebrando esse amor e essa nova etapa que Deus está preparando.\n\n' +
    'Obrigado por lembrarem de nós com tanto carinho. Contem conosco! 💙';

  acceptButton.href = createWhatsAppLink(acceptanceMessage);
}

if (declineButton) {
  const declineMessage =
    'Olá, Gi e Gui! ❤️\n\n' +
    'Muito obrigado pelo convite e por lembrarem de nós para um momento tão especial.\n\n' +
    'Ficamos muito felizes e honrados pelo carinho, mas, infelizmente, não poderemos aceitar o convite para sermos padrinhos.\n\n' +
    'Desejamos que o casamento de vocês seja lindo, abençoado por Deus e cheio de amor. ' +
    'Agradecemos de coração por terem pensado em nós. 💙';

  declineButton.href = createWhatsAppLink(declineMessage);
}