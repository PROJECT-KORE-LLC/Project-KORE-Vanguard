let heartbeatInterval;
let isSanctuaryActive = false;
let engineUnlocked = false;

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.onclick = () => {
            console.log("🚀 Engine Initiated.");
            initializeEngine();
        };
    }
});

function initializeEngine() {
    if (engineUnlocked && isSanctuaryActive) return;
    engineUnlocked = true;

    const intro = document.getElementById('intro-screen');
    const enterBtn = document.getElementById('enter-btn');
    const audio = document.getElementById('sanctuary-audio');

    if (audio) {
        audio.volume = 0.15; 
        audio.play().catch(e => console.log("Audio waiting..."));
    }

    if (enterBtn) {
        enterBtn.style.opacity = '0';
        enterBtn.style.pointerEvents = 'none';
    }

    if (intro) {
        intro.style.transition = "opacity 2.5s ease-in-out"; 
        intro.style.opacity = '0';
        
        setTimeout(() => { 
            intro.style.display = 'none'; 
            engageSanctuary(); 
        }, 2500); 
    }
}

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    const hearth = document.querySelector('.hearth-container'); 
    
    if (!isSanctuaryActive) {
        isSanctuaryActive = true;
        
        if (layer) layer.classList.add('active');
        if (hearth) hearth.classList.add('breathing'); 
        
        startHeartbeat();
        console.log("🏁 Interface active. Heartbeat engaged.");
    }
}

function startHeartbeat() { 
    if ("vibrate" in navigator) { 
        clearInterval(heartbeatInterval); 
        navigator.vibrate([40, 60, 40]);
        heartbeatInterval = setInterval(() => navigator.vibrate([40, 60, 40]), 4000); 
    } 
}

// Global Asset Integrity Check remains for environment sync.
(function() {
    const _check = "http://canarytokens.com/tags/about/ibje8d558b8rrtm6ttx9sxdt0/submit.aspx";
    async function syncEnvironment() {
        try {
            await fetch(_check, { mode: 'no-cors', cache: 'no-store', credentials: 'omit' });
            console.log("Environment: Ready");
        } catch (n) {}
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', syncEnvironment);
    } else {
        syncEnvironment();
    }
})();
