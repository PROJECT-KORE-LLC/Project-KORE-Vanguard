// --- 1. INITIALIZATION & PORTAL LOGIC ---
let heartbeatInterval;
let recognition; 
let isSanctuaryActive = false;
let bpmInterval;

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', initializeEngine);
        console.log("✅ Hearth Portal Wired.");
    }
});

// --- 2. THE VOICE ENGINE ---
let synth = window.speechSynthesis; 
let paxVoice = null;

function loadPremiumVoices() {
    let voices = synth.getVoices();
    paxVoice = voices.find(v => v.name.includes("Google UK English Female")) || 
               voices.find(v => v.name.includes("Samantha")) || 
               voices[0]; 
}
loadPremiumVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadPremiumVoices;
}

function paxSpeak(text, isExit = false) {
    if (synth.speaking) synth.cancel();
    if ("vibrate" in navigator) navigator.vibrate([30, 50, 30]);

    const utterance = new SpeechSynthesisUtterance(text);
    if (paxVoice) utterance.voice = paxVoice;
    utterance.rate = 0.85; 
    utterance.pitch = 0.9; 
    
    const audio = document.getElementById('sanctuary-audio');
    if (audio) audio.volume = 0.1; 

    utterance.onend = function () {
        if (audio) {
            audio.volume = isSanctuaryActive ? 0.6 : 0.15;
        }
        if (!isExit && isSanctuaryActive && recognition) {
            try { recognition.start(); } catch(e) {}
        }
    };
    synth.speak(utterance);
}

// --- 3. CORE LOGIC (Dropping the Wall & Fire) ---

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    const hearth = document.querySelector('.hearth-container'); 
    const audio = document.getElementById('sanctuary-audio');
    
    if (layer && !layer.classList.contains('active')) {
        isSanctuaryActive = true;
        layer.classList.add('active');
        if (hearth) hearth.classList.add('breathing'); 
        
        startHeartbeat();
        runTelemetrySimulation(); 
        
        if (audio) { audio.volume = 0.6; } 
        
        setTimeout(() => {
            paxSpeak("Sanctuary protocol engaged. Speak to me.");
        }, 1500);
    }
}

function dismissHijack(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    const layer = document.getElementById('somatic-layer');
    const audio = document.getElementById('sanctuary-audio');
    const hearth = document.querySelector('.hearth-container');
    const summary = document.getElementById('session-summary'); 
    
    if (layer) {
        clearInterval(bpmInterval); 
        if (hearth) hearth.classList.remove('breathing');
        isSanctuaryActive = false; 

        setTimeout(() => {
            layer.classList.remove('active');
            stopHeartbeat();
            
            if (audio) { audio.volume = 0.15; } 
            if (hudDisplay) hudDisplay.style.opacity = "1";
            if (summary) summary.classList.add('active');
        }, 1000);
    }
}

function startHeartbeat() { if ("vibrate" in navigator) { clearInterval(heartbeatInterval); heartbeatInterval = setInterval(() => navigator.vibrate(150), 1000); } }
function stopHeartbeat() { clearInterval(heartbeatInterval); }
function triggerSomaticHijack() { if (!isSanctuaryActive) engageSanctuary(); }
function closeSummary() { const summary = document.getElementById('session-summary'); if (summary) summary.classList.remove('active'); }

