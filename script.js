let gameboard = {
    row1: { col1: "", col2: "", col3: "" },
    row2: { col1: "", col2: "", col3: "" },
    row3: { col1: "", col2: "", col3: "" },
};

const playerOne = {
    marker: "X",
    status: "active"
};

const playerTwo = {
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

    for (const row of rows) {
        if (cols.every(col => gameboard[row][col] === player.marker)) {
            return true;
        }
    }

    for (const col of cols) {
        if (rows.every(row => gameboard[row][col] === player.marker)) {
            return true;
        }
    }

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
    displayBoard();

    const currentPlayer = playerOne.status === "active" ? playerOne : playerTwo;

    let isValidMove = false;

    while (!isValidMove) {
        const rChoice = prompt(`${currentPlayer.marker}, enter a row (1-3): `);
        const cChoice = prompt(`${currentPlayer.marker}, enter a column (1-3): `);

        if (
            rChoice >= 1 &&
            rChoice <= 3 &&
            cChoice >= 1 &&
            cChoice <= 3 &&
            gameboard[`row${rChoice}`][`col${cChoice}`] === ""
        ) {
            gameboard[`row${rChoice}`][`col${cChoice}`] = currentPlayer.marker;
            isValidMove = true;
        } else {
            alert("Invalid move. Try again.");
        }
    }

    if (checkWinner(currentPlayer)) {
        console.log(`Winner is ${currentPlayer.marker}!`);
        return currentPlayer.marker;
    } else if (isTie()) {
        console.log("Tie Game!");
        return "Tie";
    }

    playerOne.status = playerOne.status === "active" ? "inactive" : "active";
    playerTwo.status = playerTwo.status === "active" ? "inactive" : "active";

    return null;
}

let winner;

while (!winner) {
    winner = game();
}

console.log("Game over!");
