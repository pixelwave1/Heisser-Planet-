let score = 0;
let current = 0;
let timer;
let timeLeft = 10;
let activeQuestions = [];

const questions = {
    leicht: [
        { q: "Der Klimawandel bedroht Menschenrechte.", a: true },
        { q: "Sauberes Wasser ist ein Menschenrecht.", a: true },
        { q: "Der Klimawandel hat nichts mit Menschen zu tun.", a: false }
    ],

    mittel: [
        { q: "Hitze kann Krankheiten verschlimmern.", a: true },
        { q: "Der Klimawandel betrifft nur Tiere.", a: false },
        { q: "Überschwemmungen können Häuser zerstören.", a: true },
        { q: "Saubere Luft gehört zu einem gesunden Leben.", a: true },
        { q: "Klimawandel passiert nur in warmen Ländern.", a: false }
    ],

    schwer: [
        { q: "Klimawandel kann Menschen zur Flucht zwingen.", a: true },
        { q: "Extreme Hitze betrifft besonders ältere Menschen.", a: true },
        { q: "Menschenrechte haben nichts mit Umwelt zu tun.", a: false },
        { q: "Dürren können zu Wassermangel führen.", a: true },
        { q: "Der Klimawandel kann soziale Ungleichheit verstärken.", a: true },
        { q: "Europa ist nicht vom Klimawandel betroffen.", a: false },
        { q: "Der Schutz der Umwelt kann Menschenrechte stärken.", a: true }
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
