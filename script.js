// ========================================
// MUSIC
// ========================================

const music =
    document.getElementById("daylight-music");

const musicButton =
    document.getElementById("music-button");


// Keep track of whether music is playing.

let musicPlaying = false;


// ========================================
// BEGIN EXPERIENCE
// ========================================

function beginExperience() {

    // ------------------------------------
    // Start the music
    // ------------------------------------

    music.volume = 0.5;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.textContent = "♫";

        })
        .catch(() => {

            console.log(
                "The browser blocked the music."
            );

            musicPlaying = false;

            musicButton.textContent = "♪";
        });


    // ------------------------------------
    // Get the opening screen
    // ------------------------------------

    const opening =
        document.querySelector(
            ".opening-screen"
        );


    // ------------------------------------
    // Fade the opening away
    // ------------------------------------

    opening.style.opacity = "0";

    opening.style.transform =
        "translateY(-20px)";


    // ------------------------------------
    // Show the next screen
    // ------------------------------------

    setTimeout(() => {

        opening.style.display = "none";


        const intro =
            document.getElementById(
                "intro-screen"
            );


        intro.classList.add("active");

    }, 800);
}


// ========================================
// TOGGLE MUSIC
// ========================================

function toggleMusic() {

    // ------------------------------------
    // If music is currently playing
    // ------------------------------------

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.textContent = "♪";

        return;
    }


    // ------------------------------------
    // Otherwise start music
    // ------------------------------------

    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.textContent = "♫";

        })
        .catch(() => {

            console.log(
                "Music could not be played."
            );

        });
