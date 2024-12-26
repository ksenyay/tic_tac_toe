
function gameBoard() {
    const board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];

    function createGrid() {

        const gridContainer = document.querySelector('#container');
        gridContainer.style.width = '500px';
        gridContainer.style.height = '500px';

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                gridElement = document.createElement('div');
                gridElement.className = 'element';
                gridElement.textContent = cell;
    
                gridElement.gridRow = rowIndex + 1;
                gridElement.gridColumn = columnIndex + 1;
    
                gridContainer.appendChild(gridElement);
            })
        })
    }

    function makeMove(mark) {
        gridElement.addEventListener('click', function() {
            this.textContent = mark;
        })
    }

    function showBoard() {
        board.forEach(row => console.log(row));
    };

    function checkGameOver() {
        let isGameOver = false;
        let winningPlayer = '';
        // Check rows
        if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] !== ' ') {
            isGameOver = true;
            winningPlayer = board[0][0];
        } else if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== ' ') {
            isGameOver = true;
            winningPlayer = board[1][0];
        } else if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== ' ') {
            isGameOver = true;
            winningPlayer = board[2][0];
        }
        // Check columns
        else if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== ' ') {
            isGameOver = true;
            winningPlayer = board[0][0];
        } else if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== ' ') {
            isGameOver = true;
            winningPlayer = board[0][1];
        } else if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== ' ') {
            isGameOver = true;
            winningPlayer = board[0][2];
        }
        // Check diagonals
        else if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
            isGameOver = true;
            winningPlayer = board[0][0];
        } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
            isGameOver = true;
            winningPlayer = board[0][2];
        }

        // Checks for tie
        let filledCells = 0;
        for (let row of board) {
            for (let cell of row) {
                if (cell !== ' ') {
                    filledCells++
                }
            }
        }
        if (filledCells === 9) {
            isGameOver = true;
        }

        if (isGameOver) {
            return {isGameOver, winningPlayer}
        }

        return {isGameOver: false, winningPlayer: ''}
    };

    return { showBoard, makeMove, checkGameOver, createGrid}
};

function createPlayer(name, mark) {
    return {
        name,
        mark
    }
}

function playGame() {

    let playerOne = '';
    let playerTwo = '';
    
    const game = gameBoard();
    game.createGrid();
    function getInfo(playerOneName, playerTwoName) {
        playerOne = createPlayer(playerOneName, 'X');
        playerTwo = createPlayer(playerTwoName, '0');
    }

    let currentPlayer = playerOne;
    console.log(playerOne, playerTwo)
    game.makeMove(currentPlayer.mark);


    
    console.log(`It is ${currentPlayer.name}'s turn`)
    const { isGameOver, winningPlayer } = game.checkGameOver();
    if (isGameOver) {
        game.showBoard();
        if (winningPlayer) {
            console.log(`The winning player is ${currentPlayer.name}`)
        } else {
            console.log(`It's a tie`)
        }

    }
    if (currentPlayer == playerOne) {
        currentPlayer = playerTwo;
    } else if (currentPlayer == playerTwo) {
        currentPlayer = playerOne;
    }

    return { getInfo }
}


(function getInputs() {
    // Accessing DOM Elements
    const startButton = document.querySelector('#start-button');
    const confirmButton = document.querySelector('#confirm');
    const dialog = document.querySelector('dialog');
    const playerOneInput = document.querySelector('#player-one');
    const playerTwoInput = document.querySelector('#player-two');
    let playerOneName = document.querySelector('#player-one-name');
    let playerTwoName = document.querySelector('#player-two-name');

    // Initiate the game
    startButton.addEventListener('click', () => {
        dialog.showModal();
    });

    // Send name inputs to the game
    confirmButton.addEventListener('click', (event) => {
        event.preventDefault();
        dialog.close();

        let playerOne = playerOneInput.value;
        let playerTwo = playerTwoInput.value;

        playerOneName.textContent = playerOne;
        playerTwoName.textContent = playerTwo;

        //Game.start();
    
        playGame();
    });
})();

