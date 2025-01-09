let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let replaybtn = document.querySelector("#replay");
let message = document.querySelector(".msg");
let Announce = document.querySelector("#annonce");

let turnO = true; // 'true' indicates Player O's turn, 'false' indicates Player X's turn.

const winpattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const replayGame = () => {
    turnO = true;
    enabledBoxes();
    message.classList.add("hide");
    Announce.innerText = ""; // Clear the announcement message.
};

const disabledBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enabledBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = ""; // Clear all box content.
    });
};

const showWinner = (winner) => {
    Announce.innerText = `Congratulations! Winner is ${winner}`;
    message.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for (let pattern of winpattern) {
        let [pos1, pos2, pos3] = pattern;
        let pos1Val = boxes[pos1].innerText;
        let pos2Val = boxes[pos2].innerText;
        let pos3Val = boxes[pos3].innerText;

        // Check if all three positions have the same non-empty value
        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("Winner:", pos1Val);
            showWinner(pos1Val);
            return; // Exit once a winner is found.
        }
    }

    // Check for a draw (if all boxes are filled and no winner)
    let allFilled = Array.from(boxes).every((box) => box.innerText !== "");
    if (allFilled) {
        Announce.innerText = "It's a draw!";
        message.classList.remove("hide");
    }
};

// Add click event to each box
boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
        if (turnO) {
            e.target.innerText = "O"; // Player O's turn
            turnO = false;
        } else {
            e.target.innerText = "X"; // Player X's turn
            turnO = true;
        }
        e.target.disabled = true; // Disable clicked box
        checkWinner(); // Check for a winner after each turn
    });
});

// Attach event listeners for Replay and Reset buttons
replaybtn.addEventListener("click", replayGame);
resetbtn.addEventListener("click", replayGame);
