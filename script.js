let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "yellow", "blue"];

let start = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game only when clicking outside buttons
document.addEventListener("click", function (e) {
    // Ignore button clicks for starting the game
    if (e.target.classList.contains("btn")) return;

    if (!start) {
        start = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randbtn);
}

function btnPress() {
    if (!start) return; // Don't allow input if game hasn't started

    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    check(userSeq.length - 1);
}

function check(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
         if (navigator.vibrate) {
            navigator.vibrate(300); // vibrate for 300ms
        }
        h2.innerHTML = `Game Over! Your Score: <b>${level - 1}</b><br>Click anywhere (Not a tile) to restart.`;

        reset();
    }
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
