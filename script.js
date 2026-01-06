let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newBtn = document.querySelector('#new-btn');
let msgCon = document.querySelector('.msg-con');
let msg = document.querySelector('#msg');
let turnText = document.querySelector('#turn');
let scoreO = document.querySelector('#score-o');
let scoreX = document.querySelector('#score-x');

let countO = 0;
let countX = 0;

let turnO = true;
let gameOver = false;

const wincombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    gameOver = false;
    enableBoxes();
    msgCon.classList.add('hidden');
    turnText.innerText = "Player O's Turn";
};

const newGame = () => {
    countO = 0;
    countX = 0;
    scoreO.innerText = countO;
    scoreX.innerText = countX;
    resetGame();
};

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (turnO === true){
            box.innerText = 'O';
            turnText.innerText = "Player X's Turn";
            turnO = false;
        } else{
            box.innerText = 'X';
            turnText.innerText = "Player O's Turn";
            turnO = true;
        }
        box.disabled = true;
        checkWin();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove('win');
    });
};


const showWin = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgCon.classList.remove('hidden');
    turnText.innerText = "";
    if (winner === 'O'){
        countO += 1;
        scoreO.innerText = countO;
    } else{
        countX += 1;
        scoreX.innerText = countX;
    }
    disableBoxes();
};

const checkWin = () => {
    for (let combo of wincombos){
        let box1 = boxes[combo[0]];
        let box2 = boxes[combo[1]];
        let box3 = boxes[combo[2]];

        let pos1 = box1.innerText;
        let pos2 = box2.innerText;
        let pos3 = box3.innerText;

        if (pos1 != "" && pos2 != "" && pos3 != ""){
            if (pos1 === pos2 && pos2 === pos3){
                gameOver = true;
                box1.classList.add('win');
                box2.classList.add('win');
                box3.classList.add('win');
                showWin(pos1);
                return
            };
        };
    };

    let isdraw = true;
    boxes.forEach(box => {
        if (box.innerText === ""){
            isdraw = false;
        } 
    });

    if (isdraw === true && gameOver === false){
        msg.innerText = `It's a Draw!`;
        msgCon.classList.remove('hidden');
        turnText.innerText = "";
        disableBoxes();
    };
};

newBtn.addEventListener('click', newGame);
resetBtn.addEventListener('click', resetGame);