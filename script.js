// =========================
// LOVEFLIX BIRTHDAY SPECIAL
// =========================

// =========================
// CONFIG
// =========================

const CORRECT_PIN = "1709";

let heartsCollected = 0;
const totalHearts = 5;

let achievements = {
    login: false,
    letter: false,
    quiz: false,
    memory: false,
    hearts: false,
    secret: false
};

let completedAchievements = 0;


// =========================
// LOADING SCREEN
// =========================

window.addEventListener("load", () => {

    setTimeout(() => {

        const loadingScreen =
            document.getElementById("loadingScreen");

        const pinScreen =
            document.getElementById("pinScreen");

        if (loadingScreen) {
            loadingScreen.classList.add("hidden");
        }

        if (pinScreen) {
            pinScreen.classList.remove("hidden");
        }

    }, 2500);

});


// =========================
// PIN LOGIN
// =========================

function checkPin() {

    const pinInput =
        document.getElementById("pinInput");

    const error =
        document.getElementById("pinError");

    if (!pinInput || !error) return;

    if (pinInput.value === CORRECT_PIN) {

        document
            .getElementById("pinScreen")
            .classList.add("hidden");

        document
            .getElementById("profileScreen")
            .classList.remove("hidden");

        error.innerHTML = "";

        unlockAchievement(
            "login",
            "🏆 First Login"
        );

    } else {

        error.innerHTML =
            "Wrong PIN 😭";

        pinInput.value = "";

        pinInput.focus();

    }

}


// =========================
// ENTER LOVEFLIX
// =========================

function enterLoveflix() {

    const profileScreen =
        document.getElementById("profileScreen");

    const mainApp =
        document.getElementById("mainApp");

    if (profileScreen) {
        profileScreen.classList.add("hidden");
    }

    if (mainApp) {
        mainApp.classList.remove("hidden");
    }

    const music =
        document.getElementById("bgMusic");

    if (music) {

        music.volume = 0.7;

        music.play().catch(() => {
            // Browser may block autoplay.
            // Music will start after user interaction.
        });

    }

}


// =========================
// SCROLL HELPER
// =========================

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================
// ACHIEVEMENT SYSTEM
// =========================

function unlockAchievement(key, title) {

    if (!achievements.hasOwnProperty(key)) {
        return;
    }

    if (achievements[key]) {
        return;
    }

    achievements[key] = true;

    completedAchievements++;

    showAchievementPopup(title);

    updateAchievementUI();

    updateProgress();

}


// =========================
// UPDATE ACHIEVEMENT UI
// =========================

function updateAchievementUI() {

    const achievementData = {

        login: {
            id: "ach1",
            text: "✅ First Login"
        },

        letter: {
            id: "ach2",
            text: "✅ Read The Birthday Letter"
        },

        quiz: {
            id: "ach3",
            text: "✅ Quiz Master"
        },

        memory: {
            id: "ach4",
            text: "✅ Memory Hunter"
        },

        hearts: {
            id: "ach5",
            text: "✅ Hidden Heart Finder"
        },

        secret: {
            id: "ach6",
            text: "✅ Birthday Surprise"
        }

    };


    Object.keys(achievementData).forEach(key => {

        if (achievements[key]) {

            const achievement =
                document.getElementById(
                    achievementData[key].id
                );

            if (!achievement) return;

            achievement.classList.add("done");

            achievement.innerHTML =
                achievementData[key].text;

        }

    });

}


// =========================
// ACHIEVEMENT POPUP
// =========================

function showAchievementPopup(text) {

    const popup =
        document.getElementById(
            "achievementPopup"
        );

    if (!popup) return;

    popup.innerHTML =
        "🏆 " + text;

    popup.classList.add("show");

    setTimeout(() => {

        popup.classList.remove("show");

    }, 2500);

}


// =========================
// PROGRESS BAR
// =========================

function updateProgress() {

    const progress =
        document.getElementById(
            "seasonProgress"
        );

    const progressText =
        document.getElementById(
            "progressText"
        );

    const seasonBadge =
        document.getElementById(
            "seasonBadge"
        );

    const percent =
        (completedAchievements / 6) * 100;


    if (progress) {

        progress.style.width =
            percent + "%";

    }


    if (progressText) {

        progressText.innerHTML =
            completedAchievements +
            " / 6 Achievements Completed";

    }


    if (
        completedAchievements >= 6 &&
        seasonBadge
    ) {

        seasonBadge.innerHTML =
            "🏆 Birthday Special Completed ❤️";

        setTimeout(() => {

            const unlocked =
                document.getElementById(
                    "seasonUnlocked"
                );

            if (unlocked) {

                unlocked.classList.remove(
                    "hidden"
                );

            }

        }, 1000);

    }

}


// =========================
// LETTER DETECTION
// =========================

window.addEventListener("scroll", () => {

    const letter =
        document.getElementById("letter");

    if (!letter) return;

    const position =
        letter.getBoundingClientRect().top;

    if (position < 250) {

        unlockAchievement(
            "letter",
            "💌 Birthday Letter Read"
        );

    }

});


// =========================
// HIDDEN HEARTS SYSTEM
// =========================

function collectHeart(element) {

    if (!element) return;

    if (
        element.classList.contains("found")
    ) {
        return;
    }

    element.classList.add("found");

    element.style.opacity = "0.3";
    element.style.pointerEvents = "none";

    heartsCollected++;

    createConfetti();


    if (heartsCollected >= totalHearts) {

        unlockAchievement(
            "hearts",
            "❤️ Hidden Heart Finder"
        );

        const unlockBtn =
            document.getElementById(
                "unlockBtn"
            );

        if (unlockBtn) {

            unlockBtn.disabled = false;

            unlockBtn.classList.add("active");

            unlockBtn.innerHTML =
                "Unlock Birthday Surprise 🎁";

        }

    }

}


// =========================
// SECRET EPISODE
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const unlockBtn =
            document.getElementById(
                "unlockBtn"
            );

        if (!unlockBtn) return;


        unlockBtn.addEventListener(
            "click",
            () => {

                if (
                    heartsCollected <
                    totalHearts
                ) {

                    return;

                }


                const secretContent =
                    document.getElementById(
                        "secretContent"
                    );

                if (secretContent) {

                    secretContent.classList.remove(
                        "hidden"
                    );

                }


                unlockAchievement(
                    "secret",
                    "🎁 Birthday Surprise"
                );

                createConfetti();


                const secretEpisode =
                    document.getElementById(
                        "secretEpisode"
                    );

                if (secretEpisode) {

                    secretEpisode.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }
);


// =========================
// QUIZ SYSTEM
// =========================

function correctAnswer() {

    const result =
        document.getElementById(
            "quizResult"
        );

    if (!result) return;


    result.innerHTML =
        "Correct! Today is all about you 🎂❤️";

    result.style.color =
        "#4ade80";


    unlockAchievement(
        "quiz",
        "❓ Birthday Boy Quiz Master"
    );

    createConfetti();

}


function wrongAnswer() {

    const result =
        document.getElementById(
            "quizResult"
        );

    if (!result) return;


    result.innerHTML =
        "Nope 😭 Try again!";

    result.style.color =
        "#ff4d4d";

}


// =========================
// CONFETTI EFFECT
// =========================

function createConfetti() {

    const container =
        document.getElementById(
            "confettiContainer"
        );

    if (!container) return;


    const icons = [
        "🎂",
        "🎁",
        "😻",
        "❤️",
        "🎉",
        "✨",
        "🎊",
        "💖"
    ];


    for (let i = 0; i < 30; i++) {

        const confetti =
            document.createElement("span");

        confetti.classList.add(
            "confetti"
        );

        confetti.innerHTML =
            icons[
                Math.floor(
                    Math.random() *
                    icons.length
                )
            ];


        confetti.style.left =
            Math.random() * 100 + "%";


        confetti.style.animationDuration =
            (
                Math.random() * 2 + 2
            ) + "s";


        confetti.style.animationDelay =
            (
                Math.random() * 0.5
            ) + "s";


        container.appendChild(
            confetti
        );


        setTimeout(() => {

            confetti.remove();

        }, 4500);

    }

}


// =========================
// NEXT CHAPTER
// =========================

function renewSeason() {

    const renewMessage =
        document.getElementById(
            "renewMessage"
        );

    if (!renewMessage) return;


    renewMessage.innerHTML =
        "Next Birthday Chapter Coming Soon... 🎂❤️";

    createConfetti();

}


// =========================
// CLOSE COMPLETED POPUP
// =========================

function closeSeasonUnlocked() {

    const popup =
        document.getElementById(
            "seasonUnlocked"
        );

    if (!popup) return;

    popup.classList.add("hidden");

}


// =========================
// AUTO CONFETTI
// =========================

setTimeout(() => {

    createConfetti();

}, 5000);


// =========================
// MEMORY MATCH GAME
// =========================

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;


// Get all memory cards

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );


// Total pairs is automatically
// calculated from unique data-card values.

const memoryTypes =
    new Set(
        Array.from(memoryCards).map(
            card => card.dataset.card
        )
    );

const totalPairs =
    memoryTypes.size;


// Add click event

memoryCards.forEach(card => {

    card.addEventListener(
        "click",
        flipCard
    );

});


// =========================
// FLIP CARD
// =========================

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (
        this.classList.contains("matched")
    ) {
        return;
    }


    this.classList.add("flip");


    if (!firstCard) {

        firstCard = this;

        return;

    }


    secondCard = this;

    checkMatch();

}


// =========================
// CHECK MATCH
// =========================

function checkMatch() {

    const isMatch =
        firstCard.dataset.card ===
        secondCard.dataset.card;


    if (isMatch) {

        disableCards();

    } else {

        unflipCards();

    }

}


// =========================
// DISABLE MATCHED CARDS
// =========================

function disableCards() {

    firstCard.removeEventListener(
        "click",
        flipCard
    );

    secondCard.removeEventListener(
        "click",
        flipCard
    );


    firstCard.classList.add(
        "matched"
    );

    secondCard.classList.add(
        "matched"
    );


    matchedPairs++;

    resetBoard();


    if (
        matchedPairs >= totalPairs
    ) {

        const memoryResult =
            document.getElementById(
                "memoryResult"
            );


        if (memoryResult) {

            memoryResult.innerHTML =
                "🎂🎁😻 Birthday Memory Master Unlocked! ❤️";

        }


        unlockAchievement(
            "memory",
            "🧩 Memory Hunter"
        );


        createConfetti();

    }

}


// =========================
// UNFLIP CARDS
// =========================

function unflipCards() {

    lockBoard = true;


    setTimeout(() => {

        if (firstCard) {

            firstCard.classList.remove(
                "flip"
            );

        }


        if (secondCard) {

            secondCard.classList.remove(
                "flip"
            );

        }


        resetBoard();

    }, 900);

}


// =========================
// RESET BOARD
// =========================

function resetBoard() {

    [firstCard, secondCard] =
        [null, null];

    lockBoard = false;

}


// =========================
// SHUFFLE MEMORY CARDS
// =========================

(function shuffleCards() {

    const cards =
        Array.from(
            document.querySelectorAll(
                ".memory-card"
            )
        );


    cards.forEach(card => {

        card.style.order =
            Math.floor(
                Math.random() * cards.length
            );

    });

})();


// =========================
// NETFLIX ENTRANCE EFFECT
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const sections =
            document.querySelectorAll(
                ".section"
            );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        sections.forEach(section => {

            section.style.opacity = "0";

            section.style.transform =
                "translateY(50px)";

            section.style.transition =
                "0.8s ease";

            observer.observe(section);

        });

    }
);


// =========================
// HERO PLAY BUTTON
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const playButton =
            document.querySelector(
                ".play-btn"
            );


        if (!playButton) return;


        playButton.addEventListener(
            "click",
            () => {

                const music =
                    document.getElementById(
                        "bgMusic"
                    );


                if (music) {

                    music.play().catch(
                        () => {}
                    );

                }


                createConfetti();


                const continueSection =
                    document.getElementById(
                        "continue"
                    );


                if (continueSection) {

                    continueSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }
);


// =========================
// AUTO BIRTHDAY BADGE
// =========================

setInterval(() => {

    if (
        completedAchievements >= 6
    ) {

        const badge =
            document.getElementById(
                "seasonBadge"
            );


        if (badge) {

            badge.innerHTML =
                "🏆 Birthday Special Completed ❤️";

        }

    }

}, 1000);


// =========================
// FLOATING HERO TITLE
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const heroTitle =
            document.querySelector(
                ".hero-content h1"
            );


        if (!heroTitle) return;


        setInterval(() => {

            heroTitle.style.transform =
                "translateY(-3px)";


            setTimeout(() => {

                heroTitle.style.transform =
                    "translateY(0)";

            }, 600);

        }, 2000);

    }
);


// =========================
// ENTER KEY FOR PIN
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const pinInput =
            document.getElementById(
                "pinInput"
            );


        if (!pinInput) return;


        pinInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    checkPin();

                }

            }
        );

    }
);


// =========================
// INITIAL PROGRESS
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateAchievementUI();
        updateProgress();

    }
);


// =========================
// END
// LOVEFLIX BIRTHDAY SPECIAL
// KIAA ❤️ ZAHRAN
// =========================
