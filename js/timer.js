// Data de início fixa
const startDate = new Date("2025-07-15T11:25:00");

// Elementos do HTML
const timeElement = document.querySelector('.time');
const rankNameElement = document.querySelector('.rank-name');

// Lista de níveis de amizade
const friendshipLevels = [
  { seconds: 0, name: "Nível 1: Acabamos de nos conhecer 😊" },
  { seconds: 60, name: "Nível 2: Primeira conversa divertida 💬" },
  { seconds: 3600, name: "Nível 3: Já rindo das histórias 📷" },
  { seconds: 86400, name: "Nível 4: Um dia cheio de aventuras 🌸" },
  { seconds: 604800, name: "Nível 5: Uma semana de bons momentos 📸" },
  { seconds: 2592000, name: "Nível 6: 1 mês de amizade incrível 🎉" },
  { seconds: 5184000, name: "Nível 7: 2 meses de muitas risadas 😆" },
  { seconds: 7776000, name: "Nível 8: 3 meses de histórias compartilhadas 📖" },
  { seconds: 10368000, name: "Nível 9: 4 meses de conversas animadas ☕" },
  { seconds: 12960000, name: "Nível 10: 5 meses de diversão constante 🗓️" },
  { seconds: 15552000, name: "Nível 11: 6 meses de boas memórias 🏆" },
  { seconds: 18144000, name: "Nível 12: 7 meses de cada dia mais divertido ⏳" },
  { seconds: 20736000, name: "Nível 13: 8 meses de aventuras juntos 🌟" },
  { seconds: 23328000, name: "Nível 14: 9 meses que passamos juntos 📡" },
  { seconds: 25920000, name: "Nível 15: 10 meses de amizade sólida 💪" },
  { seconds: 28512000, name: "Nível 16: 11 meses de momentos inesquecíveis 💫" },
  { seconds: 31536000, name: "Nível 17: 1 ANO de amizade! 🎆" }
];

function showFireworks() {
  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js";
  script.onload = () => {
    const duration = 6 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };
  document.body.appendChild(script);
}

function updateTimer() {
  const now = new Date();
  const diffSeconds = Math.floor((now - startDate) / 1000);

  // Atualiza segundos
  timeElement.textContent = diffSeconds.toLocaleString();

  // Atualiza nível de amizade
  let currentLevel = friendshipLevels[0].name;
  for (let i = friendshipLevels.length - 1; i >= 0; i--) {
    if (diffSeconds >= friendshipLevels[i].seconds) {
      currentLevel = friendshipLevels[i].name;
      break;
    }
  }
  rankNameElement.textContent = currentLevel;

  // Ativa fogos a partir de 1 mês
  if (diffSeconds >= 2592000 && !window.fireworksShown) {
    window.fireworksShown = true;
    showFireworks();
    setTimeout(() => window.fireworksShown = false, 2000);
  }
}

// Atualiza a cada segundo
setInterval(updateTimer, 1000);
updateTimer();
