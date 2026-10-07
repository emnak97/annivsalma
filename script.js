const envelope = document.getElementById("envelope");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const music = document.getElementById("music");

let opened = false;

function openExperience() {
  if (opened) return;
  opened = true;
  envelope.classList.add("open");

  // Le clic est une interaction utilisateur : on peut alors lancer la musique avec le son.
  if (music) {
    music.muted = false;
    music.volume = 0.72;
    music.play().catch(() => {});
  }

  setTimeout(() => {
    intro.classList.add("gone");
    main.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 700);
}

envelope.addEventListener("click", openExperience);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openExperience();
  }
});

// Apparition cinématique des photos.
const photos = document.querySelectorAll(".photo");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

photos.forEach(photo => observer.observe(photo));

// Si un fichier est absent, on affiche un emplacement discret plutôt qu'une icône cassée.
photos.forEach((figure, index) => {
  const img = figure.querySelector("img");
  img.addEventListener("error", () => {
    img.removeAttribute("src");
    img.alt = `Ajoute image${index + 1}.jpeg ici`;
    img.style.background = "linear-gradient(135deg,#25222a,#17161b)";
  });
});
