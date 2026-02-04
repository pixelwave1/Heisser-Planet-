let score = 0;
let current = 0;
let timer;
let timeLeft = 10;
let activeQuestions = [];

const questions = {
    leicht: [
        { q: "Der Klimawandel bedroht Menschenrechte.", a: true },
        { q: "Sauberes Wasser ist kein Menschenrecht.", a: false }
    ],
    mittel: [
        { q: "Hitze kann Krankheiten verstärken.", a: true },
        { q: "Der Klimawandel betrifft nur Tiere.", a: false }
    ],
    schwer: [
        { q: "Klimawandel kann Flucht auslösen.", a: true },
        { q: "Menschenrechte haben nichts mit Umwelt zu tun.", a: false }
    ]
};

// Theme
function setTheme(color) {
    const colors = {
        blue: "#2196f3",
        green: "#4caf50",
        red: "#f44336"
    };
    document.documentElement.style.setProperty("--primary", colors[color]);
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Spiel starten
function startGame() {
    score = 0;
    current = 0;
    document.getElementById("score").textContent = score;
    const level = document.getElementById("levelSelect").value;
    activeQuestions = [...questions[level]];
    nextQuestion();
}

function nextQuestion() {
    if (current >= activeQuestions.length) {
        alert("Runde beendet! Punkte: " + score);
        return;
    }
    document.getElementById("question").textContent =
        activeQuestions[current].q;
    startTimer();
}

function answer(choice) {
    clearInterval(timer);
    if (choice === activeQuestions[current].a) {
        score++;
    }
    document.getElementById("score").textContent = score;
    current++;
    nextQuestion();
}

// Timer
function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            current++;
            nextQuestion();
        }
    }, 1000);
}

// QR-Code
document.getElementById("qr").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(window.location.href);
// Drei-Punkte-Menü öffnen/schließen
function toggleMenu() {
    document.getElementById("menu").classList.toggle("hidden");
}

// Menü schließen, wenn man woanders klickt
document.addEventListener("click", (e) => {
    const menu = document.getElementById("menu");
    const button = document.querySelector(".menu-btn");

    if (!menu.contains(e.target) && !button.contains(e.target)) {
        menu.classList.add("hidden");
    }
});
