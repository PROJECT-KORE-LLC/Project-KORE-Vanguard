let heartbeatInterval;

// FORCE VIBRATION TEST: Tap anywhere to see if the motor even wakes up
document.addEventListener('click', function() {
    if ("vibrate" in navigator) {
        // A short "I'm alive" buzz
        navigator.vibrate(100);
        console.log("Hardware: Vibration Handshake Sent");
    }
});

window.onload = function() {
    // We removed the auto-start for this test to focus on the TAP
    console.log("Ready. Tap the desk to engage sanctuary.");
};

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    if (layer) {
        layer.classList.add('active');
        startHeartbeat();
    }
}

function startHeartbeat() {
    if ("vibrate" in navigator) {
        clearInterval(heartbeatInterval);
        // Standard 60BPM pulse
        heartbeatInterval = setInterval(() => {
            navigator.vibrate(150); 
        }, 1000);
    }
}

function dismissHijack(event) {
    if (event) event.stopPropagation(); 
    const layer = document.getElementById('somatic-layer');
    if (layer) {
        layer.classList.remove('active');
        stopHeartbeat();
    }
}

function stopHeartbeat() {
    clearInterval(heartbeatInterval);
    if ("vibrate" in navigator) navigator.vibrate(0);
}

function triggerSomaticHijack() {
    engageSanctuary();
}
