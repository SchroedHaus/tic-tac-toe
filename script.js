const X_SubmitBtn = document.querySelector('.submitButtonX');
const O_SubmitBtn = document.querySelector('.submitButtonO');
const startGroup = document.querySelector('.startGroup');
const playerXNameInput = document.querySelector('.playerXNameInput');
const playerONameInput = document.querySelector('.playerONameInput');

playerXNameInput.focus();

let playerX = {};
let playerO = {};

const gameContainer = document.querySelector('.gameContainer')
const gameboard = document.querySelector('.gameboard');

let moves = {
    row1: { col1: "", col2: "", col3: "" },
    row2: { col1: "", col2: "", col3: "" },
    row3: { col1: "", col2: "", col3: "" },
};

let players = [];

X_SubmitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    input = document.querySelector('.playerXNameInput').value;

    if(!input) {
        document.querySelector('.alert').textContent = 'Enter a name first!';
    }
    else {
        playerX.name = input;
        playerX.marker = 'X';

        players.push(playerX);

        const playerXForm = document.querySelector('.playerXForm');
        const playerOForm = document.querySelector('.playerOForm');

        playerXForm.classList.add('slide-out');
        playerOForm.classList.add('slide-in');
        

        setTimeout(() => {
            playerXForm.style.display = 'none';
                    }, 300);

        setTimeout(() => {
            playerOForm.style.display = 'grid';

            setTimeout(() => {
                playerONameInput.focus();
            }, 500);

        }, 300);

        
    } 
})



O_SubmitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    input = document.querySelector('.playerONameInput').value;

    if(!input) {
        document.querySelector('.alert').textContent = 'Enter a name first!';
    }
    else {
        playerO.name = input;
        playerO.marker = 'O';

        players.push(playerO);

        const playerOForm = document.querySelector('.playerOForm');
        const startGroup = document.querySelector('.startGroup');

        playerOForm.classList.remove('slide-in');
        playerOForm.classList.add('slide-out');
        startGroup.classList.add('slide-in');

        setTimeout(() => {
            playerOForm.style.display = 'none';
        }, 300);

        setTimeout(() => {
            startGroup.style.display = 'grid';
        }, 300);

        document.querySelector('.players').innerHTML = `Player X is ${playerX.name}<br>
        Player O is ${playerO.name}`;

        const startBtn = document.querySelector('.startButton');

        startBtn.addEventListener('click', handleStart);
        document.addEventListener('keydown', function(event) {
            if(event.key === 'Enter') {
                handleStart(event);
            }
        });
    }
})

function handleStart(event) {
    event.preventDefault();

    document.removeEventListener('keydown', handleStart);

    startGroup.classList.remove('slide-in');
    startGroup.classList.add('slide-out');
    gameContainer.classList.add('slide-in');


    setTimeout(() => {
        startGroup.style.display = 'none';
    }, 300);

    setTimeout(() => {
        gameContainer.style.display = 'block';
    }, 300);

    game();
};

function game() {
    let currentPlayer = playerX;
    let inactivePlayer = playerO;
    let placeholder = "";
    const turn = document.querySelector('.turn');

    turn.textContent = `${currentPlayer.name}`;

    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.addEventListener('click', squareClickHandler);
        square.addEventListener('mouseover', squareMouseOverHandler);
        square.addEventListener('mouseout', squareMouseOutHandler);
    })

    function squareClickHandler(event) {
        let row = event.target.classList[1];
        let col = event.target.classList[2];

        moves[row][col] = currentPlayer.marker;

        event.target.textContent = moves[row][col];

        event.target.classList.add('disabled');

        event.target.removeEventListener('click', squareClickHandler);
        event.target.removeEventListener('mouseover', squareMouseOverHandler);
        event.target.removeEventListener('mouseout', squareMouseOutHandler);

        if (checkWinner(currentPlayer)) {
            turn.innerHTML = `${currentPlayer.name} wins!<br>
            <button class='reset'>NEW GAME</button>`;
            const resetBtn = document.querySelector('.reset');
            disableSquares();
            resetBtn.addEventListener('click', reset);
            return
        }
        else if (isTie()) {
            turn.innerHTML = `Tie Game!<br>
            <button class='reset'>NEW GAME</button>`;
            const resetBtn = document.querySelector('.reset');
            disableSquares();
            resetBtn.addEventListener('click', reset);
            return
        }

        placeholder = currentPlayer;
        currentPlayer = inactivePlayer; 
        inactivePlayer = placeholder;

        turn.textContent = `${currentPlayer.name}`;
        
    }

    function squareMouseOverHandler(event) {
        event.target.textContent = currentPlayer.marker;
    }

    function squareMouseOutHandler(event) {
        event.target.textContent = "";
    }

    function disableSquares() {
        document.querySelectorAll('.square').forEach(square => {
            square.removeEventListener('click', squareClickHandler);
            square.removeEventListener('mouseover', squareMouseOverHandler);
            square.removeEventListener('mouseout', squareMouseOutHandler);

        })
    }
};

function checkWinner(player) {
    const rows = ['row1', 'row2', 'row3'];
    const cols = ['col1', 'col2', 'col3'];

    // Check if there are any completed rows
    for (const row of rows) {
        if (cols.every(col => moves[row][col] === player.marker)) {
            markWinningSquares(row);
            return true;
        }
    }

    // Check if there are any completed columns
    for (const col of cols) {
        if (rows.every(row => moves[row][col] === player.marker)) {
            markWinningSquares(col);
            return true;
        }
    }

    // Check if there are completed diagonals
    if (cols.every((col, index) => moves[rows[index]][col] === player.marker)) {
        markWinningSquares('LRDiagnol');
        return true;
    }

    if (cols.every((col, index) => moves[rows[rows.length - 1 - index]][col] === player.marker)) {
        markWinningSquares('RLDiagnol');
        return true;
    }

    return false;
}

function isTie() {
    return Object.values(moves).every(row => Object.values(row).every(cell => cell !== ""));
}

function markWinningSquares(winningSquares) {
    const line = document.querySelector('.line');

    line.style.display = 'grid';

    line.classList.add(winningSquares);

    console.log(winningSquares);
}

function reset() {
    moves = {
        row1: { col1: "", col2: "", col3: "" },
        row2: { col1: "", col2: "", col3: "" },
        row3: { col1: "", col2: "", col3: "" },
    };

    document.querySelector('.line').style.display = 'none';
    document.querySelector('.line').classList = ['line'];
    document.querySelectorAll('.square').forEach(square => {
        square.textContent = "";
        square.classList.remove('disabled');
    });

    game();
}

