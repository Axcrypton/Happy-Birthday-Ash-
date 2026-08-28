// ============================================
// ASHLYN BIRTHDAY EXPERIENCE
// ============================================


// ============================================
// ELEMENTS
// ============================================

const music = document.getElementById("daylight-music");
const musicButton = document.getElementById("music-button");

const openingScreen = document.getElementById("opening-screen");
const photoScreen = document.getElementById("photo-screen");
const messageScreen = document.getElementById("message-screen");
const finaleScreen = document.getElementById("finale-screen");
const endingScreen = document.getElementById("ending-screen");

const memoryImage = document.getElementById("memory-image");
const photoCounter = document.getElementById("photo-counter");
const memoryCaption = document.getElementById("memory-caption");

const nextPhotoButton = document.getElementById("next-photo");


// ============================================
// PHOTOS
// ============================================

const photos = [
    "ashlyn01.png",
    "ashlyn02.png",
    "ashlyn03.png",
    "ashlyn04.png",
    "ashlyn05.png",
    "ashlyn06.jpeg",
    "ashlyn07.jpeg",
    "ashlyn08.jpeg"
];


// ============================================
// CAPTIONS
// ============================================

const captions = [
    "A little moment worth remembering.",
    "Some memories deserve to stay.",
    "A moment captured in time.",
    "Here's to the little things.",
    "A memory that is special for you.",
    "This and all of the many pictures",
    "you had throughout your life",
    "is a memory captured of who we see right now."
];


// ============================================
// PHOTO STATE
// ============================================

let currentPhoto = 0;


// ============================================
// MUSIC
// ============================================

function startMusic() {

    music.volume = 0.5;

    const playPromise = music.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicButton.textContent = "♫";

            })
            .catch((error) => {

                console.error("Music failed:", error);

            });

    }

}


// ============================================
// MUSIC TOGGLE
// ============================================

function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {

                musicButton.textContent = "♫";

            })
            .catch((error) => {

                console.error("Music failed:", error);

            });

    } else {

        music.pause();

        musicButton.textContent = "♪";

    }

}


// ============================================
// BEGIN EXPERIENCE
// ============================================

function beginExperience() {

    console.log("Begin button clicked.");

    startMusic();

    openingScreen.style.opacity = "0";
    openingScreen.style.transform = "translateY(-25px)";

    setTimeout(() => {

        openingScreen.style.display = "none";

        showPhotoScreen();

    }, 900);

}


// ============================================
// SHOW PHOTO SCREEN
// ============================================

function showPhotoScreen() {

    console.log("Showing photo screen.");

    photoScreen.classList.add("active");

    loadPhoto();

}


// ============================================
// LOAD PHOTO
// ============================================

function loadPhoto() {

    console.log("Loading photo:", photos[currentPhoto]);

    memoryImage.classList.remove("visible");
    memoryImage.classList.remove("photo-changing");

    const photoPath = photos[currentPhoto];

    memoryImage.onload = function () {

        memoryImage.classList.add("photo-changing");
        memoryImage.classList.add("visible");

    };

    memoryImage.onerror = function () {

        console.error(
            "Could not load image:",
            photoPath
        );

        memoryCaption.textContent =
            "This memory could not be loaded.";

    };

    memoryImage.src = photoPath;

    const number =
        String(currentPhoto + 1).padStart(2, "0");

    const total =
        String(photos.length).padStart(2, "0");

    photoCounter.textContent =
        `${number} / ${total}`;

    memoryCaption.textContent =
        captions[currentPhoto];

}


// ============================================
// NEXT PHOTO
// ============================================

function nextPhoto() {

    console.log("Next photo clicked.");

    if (currentPhoto < photos.length - 1) {

        currentPhoto++;

        loadPhoto();

    } else {

        showMessage();

    }

}


// ============================================
// SHOW MESSAGE
// ============================================

function showMessage() {

    console.log("Showing message.");

    photoScreen.classList.remove("active");

    setTimeout(() => {

        messageScreen.classList.add("active");

    }, 500);

}


// ============================================
// SHOW FINALE
// ============================================

function showFinale() {

    console.log("Showing finale.");

    messageScreen.classList.remove("active");

    setTimeout(() => {

        finaleScreen.classList.add("active");

        setTimeout(() => {

            endingScreen.classList.add("active");

        }, 3500);

    }, 700);

}


// ============================================
// SWIPE SUPPORT
// ============================================

let touchStartX = 0;
let touchEndX = 0;


photoScreen.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


photoScreen.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;

    if (distance < -50) {

        nextPhoto();

    }

}


// ============================================
// KEYBOARD SUPPORT
// ============================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !photoScreen.classList.contains("active")
        ) {

            return;

        }

        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            event.preventDefault();

            nextPhoto();

        }

    }
);


// ============================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ============================================

window.beginExperience = beginExperience;
window.toggleMusic = toggleMusic;
window.nextPhoto = nextPhoto;
window.showFinale = showFinale;


// ============================================
// READY
// ============================================

console.log(
    "Ashlyn Birthday Experience loaded successfully."
);
