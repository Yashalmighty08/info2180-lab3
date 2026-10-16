//Exercise 1: Layout the board
document.addEventListener('DOMContentLoaded', function(){
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    const statusDiv = document.getElementById('status');
    const newGameBtn = document.querySelector('.btn');
    const defaultMessage = statusDiv.textContent;

    //Game state: one entry per square (null, 'X' or 'O')
    let state = Array(9).fill(null);
    let currentPlayer = 'X';

    //Exercise 4 - Check for the winner and update the status
    let gameOver = false;

    const winningCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]];
    
    squares.forEach(function (square, index) {
        square.classList.add('square');

        //Exercise 2 - add X or O on click
        square.addEventListener('click', function(){
            state[index] = currentPlayer;
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

            //Exercise 4 - Check for the winner and update the status
            if (checkWinner(currentPlayer)) {
                statusDiv.textContent = 'Congratulations! ' + currentPlayer + ' is the Winner!';
                statusDiv.classList.add('you-won');
                gameOver = true;
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        });

        //Exercise 3 - Change the style when you move your mouse over a square
        square.addEventListener('mouseenter', function (){
            square.classList.add('hover');
        });
        square.addEventListener('mouseleave', function (){
            square.classList.remove('hover');
        });
    });

    //Exercise 4 - Check for the winner and update the status
    function checkWinner(player) {
        return winningCombos.some(function (combo){
            return combo.every(function (i){
                return state[i] === player;
            });
        });
    }

    //Exercise 5 - Restart the game
    newGameBtn.addEventListener('click', function (){
        state = Array(9).fill(null);
        currentPlayer = 'X';
        gameOver = false;
        squares.forEach(function (square){
            square.textContent = '';
            square.classList.remove('X','O', 'hover');
        });
        statusDiv.textContent = defaultMessage;
        statusDiv.classList.remove('you-won');
    });


});