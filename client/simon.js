// The four buttons are represented in an array, which allows
// us to think about them by their index position in the array.
const buttons = [
    document.getElementsByClassName("button1")[0],
    document.getElementsByClassName("button2")[0],
    document.getElementsByClassName("button3")[0],
    document.getElementsByClassName("button4")[0],
];

const start = document.getElementById("start");
start.addEventListener("click", startGame);

// Highlight a specific button for a fixed duration, then return
// to a normal state for a fixed duration.
// number - Refers to one of the buttons in the
//   range 0-3.
// onTime - Milliseconds to wait while the button is in the
//   highlighted state.
// offTime - Milliseconds to wait while the button is in the
//   normal state.
// callback - Callback function to signal when the highlight
//   cycle has completed.
function highlightButton(number, onTime, offTime, callback) {
    pressButton(number);
    setTimeout(() => {
        releaseButton(number);
        setTimeout(callback, offTime);
    }, onTime);
}

// Play a sequence of button highlights.
// sequence - Array of button indices to highlight.
function playSequence(sequence, callback) {
    // To play through a sequence, we need to play one item
    // in the sequence, wait for it to complete, then move to
    // the next item in the sequence.

    function playPosition() {
        // When we try to play an item that's not in the
        // sequence, we're done.
        if (currentPosition >= sequence.length) {
            callback();
            return;
        }

        // We play a single item in the sequence by highlighting
        // the button. When the highlight cycle completes, we
        // advance the sequence position and play the item in the
        // new sequence position.
        highlightButton(sequence[currentPosition], 500, 100, () => {
            currentPosition++;
            playPosition(currentPosition);
        });
    }

    // We always start with item 0 in the sequence.
    let currentPosition = 0;
    setTimeout(playPosition, 500);
}

// "Press" one of the buttons.
// number - Index value for the button we want to press.
function pressButton(number) {
    let button = buttons[number];
    console.log("Add highlight " + number);
    button.classList.add("highlight");
}

// "Release" one of the buttons.
// number - Index value for the button we want to release.
function releaseButton(number) {
    let button = buttons[number];
    console.log("Remove highlight " + number);
    button.classList.remove("highlight");
}

// We need to track mouse down and up events for each
// button.
let pressedButton = null;
let overButton = null;
buttons.forEach((button, number) => {
    button.addEventListener("mousedown", event => {
        pressedButton = number;
        pressButton(number);
    });
    button.addEventListener("mouseup", event => {
        if (overButton == number) {
            releaseButton(number);
            tryButton(number);
        }
        pressButton = null;
    });
    button.addEventListener("mouseenter", event => {
        overButton = number;
        if (pressedButton == number) {
            pressedButton(number);
        }
    });
    button.addEventListener("mouseleave", event => {
        if (overButton == number) {
            releaseButton(number);
        }
        overButton == null;
    });
});

let sequence = [];
let userSequence = [];

function startGame() {
    sequence = [];
    buttons.forEach(button => button.classList.remove("game-over"));
    nextStage();
}

function nextStage() {
    let nextButton = Math.floor(Math.random() * buttons.length);
    sequence.push(nextButton);
    playSequence(sequence, waitForUser);
}

function waitForUser() {
    userSequence = [];
}

function sequencesMatch() {
    for (let index = 0; index < userSequence.length; ++index) {
        if (userSequence[index] !== sequence[index]) {
            return false;
        }
    }
    return true;
}

function tryButton(number) {
    userSequence.push(number);

    console.log(sequence);
    console.log(userSequence);

    if (!sequencesMatch()) {
        endOfGame();
    } else {
        if (userSequence.length == sequence.length) {
            nextStage();
        }
    }
}

function endOfGame() {
    buttons.forEach(button => button.classList.add("game-over"));
}

endOfGame();
