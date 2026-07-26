let poppedCount = 0;
let revealedWords = ["", "", "", ""];
let currentPage = 1;
const totalPages = 3;

// --- START AUTOMATIC COUNTDOWN ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    // Listen for any tap/click on the page to unlock audio if browser blocked it
    document.addEventListener('click', unlockAudioOnInteraction, { once: true });
    document.addEventListener('touchstart', unlockAudioOnInteraction, { once: true });

    startExperience();
});

// Unlocks background audio as soon as the user touches the screen anywhere
function unlockAudioOnInteraction() {
    const bgAudio = document.getElementById('bgMusic');
    if (bgAudio) {
        bgAudio.loop = true;
        bgAudio.play().catch(err => console.log("Audio unlock failed:", err));
    }
}

function startExperience() {
    // Hide start overlay if present, reveal countdown UI directly
    const startOverlay = document.getElementById('startOverlay');
    if (startOverlay) startOverlay.classList.add('hidden');
    
    const countdownContent = document.getElementById('countdownContent');
    if (countdownContent) countdownContent.classList.remove('hidden');

    // Configure background music loop
    const bgAudio = document.getElementById('bgMusic');
    if (bgAudio) {
        bgAudio.loop = true;
    }

    // Play countdown audio
    const countdownAudio = document.getElementById('countdownMusic');
    if (countdownAudio) {
        countdownAudio.play().catch(err => console.log("Countdown audio blocked:", err));
    }

    // Run the 3-second countdown
    let count = 3;
    const countdownEl = document.getElementById("countdown");
    const loadingTextEl = document.getElementById("loadingText");

    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            if (countdownEl) countdownEl.innerText = count;
        } else {
            clearInterval(timer);
            
            // Hide countdown number and reveal loading text
            if (countdownEl) countdownEl.classList.add("hidden");
            if (loadingTextEl) loadingTextEl.classList.remove("hidden");
            
            // Transition to Scene 1 after 1.5 seconds
            setTimeout(() => {
                // Pause countdown music
                if (countdownAudio) {
                    countdownAudio.pause();
                    countdownAudio.currentTime = 0;
                }
                
                // Go to Scene 1 and attempt playing background music
                goToScene('scene1');
            }, 1500);
        }
    }, 1000);
}

// Helper function to safely play background music
function playBgMusic() {
    const bgAudio = document.getElementById('bgMusic');
    if (bgAudio) {
        bgAudio.loop = true; // Loop 30-sec track continuously
        if (bgAudio.paused) {
            bgAudio.play().catch(err => {
                console.log("Audio waiting for first user tap/click on screen.");
            });
        }
    }
}

// Scene Navigation
function goToScene(sceneId) {
    document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active'));
    
    const targetScene = document.getElementById(sceneId);
    if (targetScene) {
        targetScene.classList.add('active');
    }
    
    playBgMusic();
}

// Cake Decorate & Candle Functions
function decorateCake() {
    playBgMusic(); // Ensures music plays on interaction
    document.getElementById('decorationBanner').classList.remove('hidden');
    document.getElementById('decorateBtn').classList.add('hidden');
    document.getElementById('candleBtn').classList.remove('hidden');
    confetti({ particleCount: 50, spread: 60 });
}

function lightCandle() {
    playBgMusic();
    document.getElementById('candle').classList.remove('hidden');
    document.getElementById('candleBtn').classList.add('hidden');
    document.getElementById('nextToBalloons').classList.remove('hidden');
    confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
}

// Balloon Pop
function popBalloon(element, word) {
    playBgMusic();
    element.style.visibility = 'hidden';
    poppedCount++;
    
    const messageContainer = document.getElementById('revealedMessage');
    if (messageContainer) {
        messageContainer.innerText += " " + word;
    }

    if (poppedCount === 4) {
        document.getElementById('nextToCards').classList.remove('hidden');
        confetti({ particleCount: 80 });
    }
}

// Card Swipe Effect
function nextCard(cardEl) {
    playBgMusic();
    cardEl.style.transform = "translateX(200px) rotate(20deg)";
    cardEl.style.opacity = "0";
    setTimeout(() => {
        cardEl.parentElement.prepend(cardEl);
        cardEl.style.transform = "none";
        cardEl.style.opacity = "1";
    }, 400);
}

// Envelope & Message Pages ("Read My Heart")
function openEnvelope() {
    playBgMusic();
    document.getElementById('cardCover').classList.add('hidden');
    document.getElementById('cardInside').classList.remove('hidden');
    confetti({ particleCount: 40, spread: 50 });
}

function changePage(direction) {
    playBgMusic();
    document.getElementById(`page${currentPage}`).classList.remove('page-active');
    currentPage += direction;
    document.getElementById(`page${currentPage}`).classList.add('page-active');
    document.getElementById('pageTracker').innerText = `Page ${currentPage} of ${totalPages}`;

    document.getElementById('prevPageBtn').disabled = (currentPage === 1);
    document.getElementById('nextPageBtn').disabled = (currentPage === totalPages);

    if (currentPage === totalPages) {
        document.getElementById('nextToGiftBtn').classList.remove('hidden');
    }
}

// Function triggered when she taps the Gift Box
function openGift() {
    playBgMusic();
    document.getElementById('giftContainer').classList.add('hidden');
    document.getElementById('giftHeading').classList.add('hidden');
    document.getElementById('finalPopup').classList.remove('hidden');

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });
}

// Function to restart the surprise from the beginning
function restartSurprise() {
    location.reload();
}