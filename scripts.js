let heartbeatInterval;

window.onload = function() {
    console.log("Observer active. Tap screen to authorize haptics.");
};

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    if (layer && !layer.classList.contains('active')) {
        layer.classList.add('active'); // CSS handles the glow animation automatically now
        startHeartbeat();
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

function startHeartbeat() {
    if ("vibrate" in navigator) {
        clearInterval(heartbeatInterval);
        navigator.vibrate(100);
        heartbeatInterval = setInterval(() => {
            navigator.vibrate(150); 
        }, 1000);
    }
}

function stopHeartbeat() {
    clearInterval(heartbeatInterval);
    if ("vibrate" in navigator) navigator.vibrate(0);
}

function triggerSomaticHijack() {
    const layer = document.getElementById('somatic-layer');
    if (layer && !layer.classList.contains('active')) {
        engageSanctuary();
    }
}
