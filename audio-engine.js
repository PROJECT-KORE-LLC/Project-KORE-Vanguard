// audio-engine.js: The multi-layered atmosphere manager
let activeSoundscapes = {};

const soundLibrary = [
    { id: "rain", name: "🌧️ Gentle Rain", url: "rain.mp3" },
    { id: "thunder", name: "🌩️ Thunderstorm", url: "thunder.mp3" },
    { id: "winterwind", name: "🌬️ Winter Wind", url: "winterwind.mp3" },
    { id: "waves", name: "🌊 Ocean Waves", url: "waves.mp3" },
    { id: "owls", name: "🦉 Midnight Owls", url: "owls.mp3" },
    { id: "raven", name: "🐦‍⬛ Raven Calls", url: "raven.mp3" },
    { id: "frogs", name: "🐸 Swamp Frogs", url: "frogs.mp3" },
    { id: "crickets", name: "🦗 Night Crickets", url: "crickets.mp3" },
    { id: "fire", name: "🔥 Hearth Fire", url: "fire.mp3" },
    { id: "simmering", name: "🍲 Simmering Pot", url: "simmeringpot.mp3" },
    { id: "teacup", name: "☕ Teacup Clinks", url: "teacup.mp3" },
    { id: "clock", name: "🕰️ Ticking Clock", url: "clock.mp3" },
    { id: "cat", name: "🐾 Purring Cat", url: "cat.mp3" },
    { id: "windchimes", name: "🎐 Wind Chimes", url: "windchimes.mp3" },
    { id: "musicbox1", name: "🎶 Music Box I", url: "musicbox1.mp3" },
    { id: "musicbox2", name: "🎶 Music Box II", url: "musicbox2.mp3" },
    { id: "musicbox3", name: "🎶 Music Box III", url: "musicbox3.mp3" },
    { id: "xmas1", name: "🎄 Yule Box I", url: "xmasmusicbox1.mp3" },
    { id: "xmas2", name: "🎄 Yule Box II", url: "xmasmusicbox2.mp3" },
    { id: "xmas3", name: "🎄 Yule Box III", url: "xmasmusicbox3.mp3" },
    { id: "darkmusic", name: "🖤 Dark Atmosphere", url: "darkmusic1.mp3" },
    { id: "binary", name: "🎵 Binary Box", url: "binarymusicbox.mp3" }
];

function buildMixerUI() {
    const list = document.getElementById('mixer-list');
    if (!list) return;
    list.innerHTML = ''; 

    list.style.maxHeight = "350px";
    list.style.overflowY = "auto";
    list.style.paddingRight = "10px";

    soundLibrary.forEach(track => {
        const isActive = activeSoundscapes[track.id] ? 'active' : '';
        const currentVol = activeSoundscapes[track.id] ? activeSoundscapes[track.id].volume : 0.5;
        
        list.innerHTML += `
            <div class="sound-card ${isActive}">
                <button class="sound-btn ${isActive}" onclick="toggleTrack('${track.id}', '${track.url}')">${track.name}</button>
                <input type="range" class="volume-slider" min="0" max="1" step="0.05" value="${currentVol}" 
                       oninput="changeVolume('${track.id}', this.value)">
            </div>`;
    });
}

window.toggleTrack = function(id, url) {
    if (activeSoundscapes[id]) {
        activeSoundscapes[id].pause();
        activeSoundscapes[id].currentTime = 0;
        delete activeSoundscapes[id];
        buildMixerUI();
    } 
    else {
        const audio = new Audio(url);
        audio.loop = true;
        audio.volume = 0.5;
        
        let playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                activeSoundscapes[id] = audio;
                buildMixerUI();
            }).catch(error => {
                console.error("Playback blocked. Please click the screen once first!", error);
            });
        }
    }
};

window.changeVolume = function(id, vol) {
    if (activeSoundscapes[id]) {
        activeSoundscapes[id].volume = vol;
    }
};

window.stopAll = function() {
    for (let id in activeSoundscapes) {
        activeSoundscapes[id].pause();
        activeSoundscapes[id].currentTime = 0;
    }
    activeSoundscapes = {};
    buildMixerUI();
};

document.addEventListener('DOMContentLoaded', buildMixerUI);
