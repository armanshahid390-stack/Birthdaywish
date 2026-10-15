const screens = [...document.querySelectorAll(".screen")];
const heartsLayer = document.getElementById("hearts");
const sparklesLayer = document.getElementById("sparkles");
const music = document.getElementById("birthdayMusic");
const musicToggle = document.getElementById("musicToggle");

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

document.getElementById("openLetter").addEventListener("click", () => {
  document.getElementById("letter").classList.remove("hidden");
  document.getElementById("openLetter").classList.add("hidden");
});

const candles = [...document.querySelectorAll(".candle")];
candles.forEach(candle => {
  candle.addEventListener("click", () => {
    candle.classList.remove("lit");
    if (candles.every(item => !item.classList.contains("lit"))) {
      document.getElementById("wishMessage").textContent = "Wish sent to the universe! ✨💗";
      burstHearts(24);
    }
  });
});

const giftMessages = {
  hug: "Incoming virtual hug! 🫂 Imagine the coziest, longest hug ever. No awkward letting go required.",
  poem: "For Dumbooo 🌷 — May moonlight find you when days feel long, may life surprise you with reasons to smile, and may you always remember how much good you deserve.",
  compliment: "Secret note 💌: You don't have to do something extraordinary to be worth celebrating. Just being here, being you, is already enough.",
  joke: "Why did the birthday cake go to therapy? 🎂 It had too many layers. I'm sorry. You deserve better jokes."
};
document.querySelectorAll("[data-gift]").forEach(button => {
  button.addEventListener("click", () => {
    const reveal = document.getElementById("giftReveal");
    reveal.textContent = giftMessages[button.dataset.gift];
    reveal.classList.remove("hidden");
    burstHearts(8);
  });
});

function makeSparkles() {
  const symbols = ["✦", "✧", "·", "♡", "✩"];
  for (let i = 0; i < 48; i++) {
    const item = document.createElement("span");
    item.className = "sparkle";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = Math.random() * 100 + "%";
    item.style.top = Math.random() * 100 + "%";
    item.style.fontSize = (8 + Math.random() * 12) + "px";
    item.style.animationDelay = Math.random() * 3 + "s";
    sparklesLayer.appendChild(item);
  }
}
function burstHearts(count = 12) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = ["♡", "♥", "✧", "💗"][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (14 + Math.random() * 22) + "px";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 6500);
  }
}
function confettiRain() {
  const bits = ["💗", "✨", "🌸", "♡", "🎀", "⭐"];
  for (let i = 0; i < 70; i++) {
    const bit = document.createElement("span");
    bit.className = "confetti";
    bit.textContent = bits[Math.floor(Math.random() * bits.length)];
    bit.style.left = Math.random() * 100 + "vw";
    bit.style.animationDelay = Math.random() * 1.8 + "s";
    bit.style.animationDuration = (2.5 + Math.random() * 2.5) + "s";
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 6000);
  }
}
document.getElementById("confettiButton").addEventListener("click", () => {
  confettiRain();
  burstHearts(45);
  document.getElementById("confettiButton").textContent = "Birthday wishes sent! 💗";
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "♫ Music: ON";
      musicToggle.setAttribute("aria-pressed", "true");
    } catch (error) {
      musicToggle.textContent = "♫ Add music.mp3";
    }
  } else {
    music.pause();
    musicToggle.textContent = "♫ Music: OFF";
    musicToggle.setAttribute("aria-pressed", "false");
  }
});

makeSparkles();
setInterval(() => {
  if (Math.random() > 0.35) burstHearts(1);
}, 1800);
