let gameboard = {
    row1: { col1: "", col2: "", col3: "" },
    row2: { col1: "", col2: "", col3: "" },
    row3: { col1: "", col2: "", col3: "" },
};

const playerOne = {
    name: "Player X",
    marker: "X",
    status: "active"
};

const playerTwo = {
    name: "Player O",
    marker: "O",
    status: "inactive"
};

function displayBoard() {
    console.log(gameboard.row1);
    console.log(gameboard.row2);
    console.log(gameboard.row3);
}

function checkWinner(player) {
    const rows = ['row1', 'row2', 'row3'];
    const cols = ['col1', 'col2', 'col3'];

    // Check if there are any completed rows
    for (const row of rows) {
        if (cols.every(col => gameboard[row][col] === player.marker)) {
            return true;
        }
    }

    // Check if there are any completed columns
    for (const col of cols) {
        if (rows.every(row => gameboard[row][col] === player.marker)) {
            return true;
        }
    }

    // Check if there are completed diagonals
    if (cols.every((col, index) => gameboard[rows[index]][col] === player.marker)) {
        return true;
    }

    if (cols.every((col, index) => gameboard[rows[rows.length - 1 - index]][col] === player.marker)) {
        return true;
    }

    return false;
}

function isTie() {
    return Object.values(gameboard).every(row => Object.values(row).every(cell => cell !== ""));
}

function game() {

    let currentPlayer = playerOne.status === "active" ? playerOne : playerTwo;

    document.querySelector('.player-heading').innerHTML = currentPlayer.name;

    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {square.addEventListener('click', markIt)});
};

function markIt(event) {
    let currentPlayer = playerOne.status === "active" ? playerOne : playerTwo;

    event.target.innerHTML = currentPlayer.marker;
    event.target.removeEventListener('click', markIt);

    let row = event.target.className;
    row = row.split(' ');
    row = row[1];

    let col = event.target.className;
    col = col.split(' ');
    col = col[2];

    console.log(row, col);

    gameboard[row][col] = currentPlayer.marker;

    displayBoard();

    if (checkWinner(currentPlayer)) {
        removeListeners();
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.result').innerHTML = `Winner is ${currentPlayer.name}!`;
        document.querySelector('.newGameButton').addEventListener('click', reset);
        return
    }
    else if (isTie()) {
        removeListeners();
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.result').innerHTML = 'Tie Game!';
        return
    };
    
    playerOne.status = playerOne.status === "active" ? "inactive" : "active";
    playerTwo.status = playerTwo.status === "active" ? "inactive" : "active";

    currentPlayer = playerOne.status === "active" ? playerOne : playerTwo;
    
    document.querySelector('.player-heading').innerHTML = currentPlayer.name;
}

function reset() {
    document.querySelector('.overlay').style.display = 'none';
    playerOne.status = 'active';
    playerTwo.status = 'inactive'; 

    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {square.innerHTML = ""});

    gameboard = {
    row1: { col1: "", col2: "", col3: "" },
    row2: { col1: "", col2: "", col3: "" },
    row3: { col1: "", col2: "", col3: "" },
    };

    game();
}

function removeListeners() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {square.removeEventListener('click', markIt)});
}

const resetButton = document.querySelector('.resetButton');

resetButton.addEventListener('click', reset);

game();
