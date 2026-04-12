let heartbeatInterval;

// 1. The "Observer" Logic
window.onload = function() {
    console.log("Companion is observing... initiating sanctuary in 3 seconds.");
    
    setTimeout(() => {
        const layer = document.getElementById('somatic-layer');
        if (layer) {
            layer.classList.add('active');
            startHeartbeat(); // Start the vibration
            console.log("Somatic Hijack: Engaged. Heartbeat Active.");
        }
    }, 3000); 
};

// 2. The Vagal Heartbeat (60 BPM)
function startHeartbeat() {
    // Only trigger if the device supports vibration
    if ("vibrate" in navigator) {
        // Pulse for 200ms, pause for 800ms
        heartbeatInterval = setInterval(() => {
            navigator.vibrate(200); 
        }, 1000);
    }
}

// 3. The "Agency" Logic
function dismissHijack(event) {
    if (event) event.stopPropagation(); 
    
    const layer = document.getElementById('somatic-layer');
    if (layer) {
        layer.classList.remove('active');
        
        // Stop the heartbeat immediately
        clearInterval(heartbeatInterval);
        if ("vibrate" in navigator) navigator.vibrate(0);
        
        console.log("Agency exercised. Heartbeat silenced.");
    }
}

// 4. Manual Toggle
function triggerSomaticHijack() {
    const layer = document.getElementById('somatic-layer');
    if (layer) {
        if (layer.classList.contains('active')) {
            dismissHijack();
        } else {
            layer.classList.add('active');
            startHeartbeat();
        }
    }
}
