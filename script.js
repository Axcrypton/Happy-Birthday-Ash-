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
// MUSIC
// ============================================

const music =
    document.getElementById("daylight-music");

const musicButton =
    document.getElementById("music-button");


// ============================================
// BEGIN MUSIC
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

    "A memory that is special for you",

    "This and all of the many pictures",

    "You had throughout your life",

    "Is a memory captured of who we see right now"

];


// ============================================
// CURRENT PHOTO
// ============================================

let currentPhoto = 0;


// ============================================
// BEGIN EXPERIENCE
// ============================================

function beginExperience() {


    startMusic();


    // Fade opening

    openingScreen.style.opacity = "0";

    openingScreen.style.transform =
        "translateY(-25px)";


    // Wait for transition

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
// LOAD PHOTO
// ============================================

function loadPhoto() {


    // Remove old animation

    memoryImage.classList.remove("visible");

    memoryImage.classList.remove(
        "photo-changing"
    );


    // Update image

    memoryImage.src =
        photos[currentPhoto];


    // Update counter

    const number =
        String(currentPhoto + 1)
            .padStart(2, "0");


    photoCounter.textContent =
        `${number} / ${String(photos.length).padStart(2, "0")}`;


    // Update caption

    memoryCaption.textContent =
        captions[currentPhoto];


    // Wait for image

    memoryImage.onload = () => {

        memoryImage.classList.add(
            "photo-changing"
        );

        memoryImage.classList.add(
            "visible"
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


    // Last photo

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
    { passive: true }
);


photoScreen.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
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


        if (
            !photoScreen.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            nextPhoto();

        }

    }
);
