const x_class = 'x';
const circle_class = 'circle';
const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,9],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
let circleTurn;

startGame()

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell=> {
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true}) //only be able to click once
})
    setBoardHoverClass()
    winningMessageElement.classList.remove('show');
}

function handleClick(e){
    console.log('clicked'); //check if it only registers one click
    const cell = e.target; //what i clicked on
    const currentClass  = circleTurn ? circle_class : x_class; // checks which turn it is 
    //place the mark per click
    placeMark(cell, currentClass);

    //check for win
    if(checkWin(currentClass)){
        console.log('winner');
        endGame(false);
    }
    //check for draw
    else if (isDraw()){
        endGame(true);
    }
    else {
    //switch turns
    swapTurns();
    setBoardHoverClass();
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if (circleTurn){
        board.classList.add(circle_class);
    }
    else {
        board.classList.add(x_class);
    }
}

function checkWin(currentClass){
    return winning_combinations.some(combination => {
        return combination.every(index => {
            //checks if every single cell for every single combination has the current class
            return cellElements[index].classList.contains(currentClass); 
        })
    })
}


function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = `Draw!`;
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show');
}