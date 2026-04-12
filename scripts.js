// Wait for the page to load, wire the button
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', initializeEngine);
        console.log("✅ Button securely wired.");
    }
});

let heartbeatInterval;
let recognition; 
let isSanctuaryActive = false;

function initializeEngine() {
    console.log("🚀 KORE Engine Initializing...");

    // 1. ANNIHILATE THE INVISIBLE WALL
    const intro = document.getElementById('intro-screen');
    if (intro) {
        intro.classList.remove('active');
        setTimeout(() => {
            intro.style.display = 'none'; 
            console.log("✅ Glass wall removed. Wayshrine active.");
        }, 1000);
    }

    // 2. UNLOCK HAPTICS & AUDIO
    if ("vibrate" in navigator) navigator.vibrate(50); 
    
    const audio = document.getElementById('sanctuary-audio');
    if (audio) {
        audio.load(); // Force the browser to preload the new audio
        console.log("✅ Audio pipeline primed.");
    }

    // 3. THE DIAGNOSTIC VOCAL TETHER
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false; 
        recognition.interimResults = true;
        
        // Tells us when the mic actually turns on
        recognition.onstart = function() {
            console.log("🎙️ PAX IS LISTENING...");
        };

        // Captures what the mic hears and prints it
        recognition.onresult = function(event) {
            let transcript = Array.from(event.results).map(r => r[0].transcript).join('').toLowerCase();
            
            // THIS IS CRITICAL: Watch the console to see what the browser thinks you said!
            console.log("🧠 Mic heard: ", transcript); 
            
            // Expanded Dictionary to catch misspellings of PAX
            if (transcript.includes("pax") || 
                transcript.includes("packs") || 
                transcript.includes("pass") || 
                transcript.includes("safe") || 
                transcript.includes("stop")) {
                
                console.log("🛑 VOCAL TETHER CONFIRMED! Shutting down.");
                dismissHijack(); 
            }
        };

        // Tells us if the browser brutally blocked the mic
        recognition.onerror = function(event) {
            console.error("❌ MIC ERROR: ", event.error);
            if (event.error === 'not-allowed') {
                console.warn("⚠️ BROWSER BLOCKED MIC: You must click 'Allow' or you are not on a secure HTTPS server.");
            }
        };

        recognition.onend = function() {
            if (isSanctuaryActive && recognition) {
                try { recognition.start(); } catch(e) {}
            }
        };
    } else {
        console.error("❌ Web Speech API NOT supported on this browser.");
    }
}

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    const audio = document.getElementById('sanctuary-audio');
    
    if (layer && !layer.classList.contains('active')) {
        isSanctuaryActive = true;
        layer.classList.add('active');
        startHeartbeat();
        
        if (audio) {
            audio.volume = 0.5;
            let playPromise = audio.play();
            // Catch audio errors if the browser still blocks it
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("❌ AUDIO BLOCKED BY BROWSER: ", error);
                });
            }
        } 
        
        if (recognition) { 
            try { recognition.start(); } catch(e) {} 
        }
    }
}

function dismissHijack(event) {
    if (event) event.stopPropagation(); 
    const layer = document.getElementById('somatic-layer');
    const audio = document.getElementById('sanctuary-audio');
    
    if (layer) {
        isSanctuaryActive = false;
        layer.classList.remove('active');
        stopHeartbeat();
        
        if (audio) {
            audio.pause(); 
            audio.currentTime = 0; 
        }
        if (recognition) {
            try { recognition.stop(); console.log("🔇 PAX stopped listening."); } catch(e) {}
        }
    }
}

function startHeartbeat() {
    if ("vibrate" in navigator) {
        clearInterval(heartbeatInterval);
        navigator.vibrate(100);
        heartbeatInterval = setInterval(() => navigator.vibrate(150), 1000);
    }
}

function stopHeartbeat() {
    clearInterval(heartbeatInterval);
    if ("vibrate" in navigator) navigator.vibrate(0);
}

function triggerSomaticHijack() {
    if (!isSanctuaryActive) engageSanctuary();
}
