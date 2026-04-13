let recognition;
let isSanctuaryActive = false;

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    enterBtn.addEventListener('click', () => {
        document.getElementById('intro-screen').classList.add('hidden');
        document.getElementById('sanctuary-audio').play();
        initSpeech();
    });
});

function initSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.onresult = (event) => {
            const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
            if (text.includes("pax") || text.includes("help")) triggerSomaticHijack();
            if (text.includes("stop") || text.includes("safe")) dismissHijack();
        };
        try { recognition.start(); } catch(e) {}
    }
}

function paxSpeak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    // Try to get a luxury UK voice
    utterance.voice = voices.find(v => v.name.includes("Google UK English Female")) || voices[0];
    utterance.rate = 0.85;
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
}

function triggerSomaticHijack() {
    if (isSanctuaryActive) return;
    isSanctuaryActive = true;
    document.getElementById('somatic-layer').classList.add('active');
    paxSpeak("Sanctuary protocol engaged. I am listening.");
}

function dismissHijack(e) {
    if(e) e.stopPropagation();
    isSanctuaryActive = false;
    document.getElementById('somatic-layer').classList.remove('active');
}

function triggerInvestorTour() {
    paxSpeak("The recovery industry has spent 50 years perfecting the Maintenance of Sickness rather than the Architecture of Sovereignty. They use circle-of-chairs tactics to fight neurological warfare.");
    setTimeout(() => {
        paxSpeak("To look at this Hearth and say no is a public admission that you prefer the profit of a funeral over the intervention of mercy. We don't have a cure, but we have a sanctuary. Who is joining the Guild?");
    }, 12000);
}

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'h') triggerSomaticHijack();
    if (e.key.toLowerCase() === 's') dismissHijack();
    if (e.key.toLowerCase() === 'e') {
        paxSpeak("The Sovereign Vow is sealed.");
        setTimeout(() => location.reload(), 2000);
    }
});

function triggerLore(e) {
    e.stopPropagation();
    document.getElementById('lore-banner').classList.add('active');
    paxSpeak("I am the Architect because I survived the fiery pits. If we save one person from the abyss, this operation is a Profound Success.");
    setTimeout(() => document.getElementById('lore-banner').classList.remove('active'), 5000);
}
