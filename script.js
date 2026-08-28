// ============================================
// ASHLYN BIRTHDAY EXPERIENCE
// ============================================

// ============================================
// ELEMENTS
// ============================================

const music =
document.getElementById("daylight-music");

const musicButton =
document.getElementById("music-button");

const openingScreen =
document.getElementById("opening-screen");

const photoScreen =
document.getElementById("photo-screen");

const messageScreen =
document.getElementById("message-screen");

const finaleScreen =
document.getElementById("finale-screen");

const endingScreen =
document.getElementById("ending-screen");

const memoryImage =
document.getElementById("memory-image");

const photoCounter =
document.getElementById("photo-counter");

const memoryCaption =
document.getElementById("memory-caption");

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
// PHOTO CAPTIONS
// ============================================

const captions = [


"A little moment worth remembering.",

"Some memories deserve to stay.",

"A moment captured in time.",

"Here's to the little things.",

"A memory that is special for you.",

"This and all of the many pictures",

"you had throughout your life.",

"A memory captured of who we see right now."


];

// ============================================
// CURRENT PHOTO
// ============================================

let currentPhoto = 0;

// ============================================
// MUSIC
// ============================================

function startMusic() {


music.volume = 0.5;

music.play()
    .then(() => {

        musicButton.textContent = "♫";

    })
    .catch((error) => {

        console.error(
            "Music failed to start:",
            error
        );

    });


}

function toggleMusic() {


if (music.paused) {

    music.play()
        .then(() => {

            musicButton.textContent = "♫";

        })
        .catch((error) => {

            console.error(
                "Music failed:",
                error
            );

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


// Start Daylight
startMusic();


// Fade out opening screen
openingScreen.style.opacity = "0";

openingScreen.style.transform =
    "translateY(-25px)";


// Show photos after transition
setTimeout(() => {

    openingScreen.style.display = "none";

    showPhotoScreen();

}, 900);


}

// ============================================
// SHOW PHOTO SCREEN
// ============================================

function showPhotoScreen() {


photoScreen.classList.add("active");

loadPhoto();


}

// ============================================
// LOAD CURRENT PHOTO
// ============================================

function loadPhoto() {


// Hide old photo
memoryImage.classList.remove("visible");

memoryImage.classList.remove(
    "photo-changing"
);


// Set new image
memoryImage.src =
    photos[currentPhoto];


// Counter
const number =
    String(currentPhoto + 1)
        .padStart(2, "0");

const total =
    String(photos.length)
        .padStart(2, "0");

photoCounter.textContent =
    `${number} / ${total}`;


// Caption
memoryCaption.textContent =
    captions[currentPhoto];


// Wait for image to load
memoryImage.onload = () => {

    memoryImage.classList.add(
        "photo-changing"
    );

    memoryImage.classList.add(
        "visible"
    );

};


// Detect missing image
memoryImage.onerror = () => {

    console.error(
        "Could not load image:",
        photos[currentPhoto]
    );

};


}

// ============================================
// NEXT PHOTO
// ============================================

function nextPhoto() {


if (
    currentPhoto <
    photos.length - 1
) {

    currentPhoto++;

    loadPhoto();

    return;

}


// Last photo reached
showMessage();


}

// ============================================
// SHOW MESSAGE
// ============================================

function showMessage() {


photoScreen.classList.remove(
    "active"
);


setTimeout(() => {

    messageScreen.classList.add(
        "active"
    );

}, 500);


}

// ============================================
// SHOW FINALE
// ============================================

function showFinale() {


messageScreen.classList.remove(
    "active"
);


setTimeout(() => {

    finaleScreen.classList.add(
        "active"
    );


    // Show final tiny message
    setTimeout(() => {

        endingScreen.classList.add(
            "active"
        );

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
(event) => {


    touchStartX =
        event.changedTouches[0].screenX;

},
{
    passive: true
}


);

photoScreen.addEventListener(
"touchend",
(event) => {


    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

},
{
    passive: true
}


);

function handleSwipe() {


const distance =
    touchEndX - touchStartX;


// Swipe left
if (distance < -50) {

    nextPhoto();

}


}

// ============================================
// KEYBOARD SUPPORT
// ============================================

document.addEventListener(
"keydown",
(event) => {


    // Only work while photos are visible
    if (
        !photoScreen.classList.contains(
            "active"
        )
    ) {

        return;

    }


    // Right arrow or space
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
// DEBUG MESSAGE
// ============================================

console.log(
"Ashlyn birthday experience loaded successfully."
);
