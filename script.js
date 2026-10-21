
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
