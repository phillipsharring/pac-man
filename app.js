document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');

    let score = 0;

    const scoreDisplay = document.getElementById('score');

    const width = 28;

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];

    let squares = [];

    // 0 dot
    // 1 wall
    // 2 ghost lair
    // 3 power pellet
    // 4 empty

    // draw the grid and render it
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            // add layout to the board
            if (0 === layout[i]) {
                squares[i].classList.add('pac-dot');
            } else if (1 === layout[i]) {
                squares[i].classList.add('wall');
            } else if (2 === layout[i]) {
                squares[i].classList.add('ghost-lair');
            } else if (3 === layout[i]) {
                squares[i].classList.add('power-pellet');
            }
        }
    }

    createBoard();

    let pacmanCurrentIndex = 490;

    squares[pacmanCurrentIndex].classList.add('pac-man');

    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove('pac-man');

        switch(e.keyCode) {
            case 37:
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall') && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex -= 1;
                }

                // check if pacman is in the left tunnel
                if ((pacmanCurrentIndex - 1) === 363) {
                    pacmanCurrentIndex = 391;
                }
                break;
            case 38:
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex -= width;
                }
                break;
            case 39:
                if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex += 1;
                }

                // check if pacman is in the left tunnel
                if ((pacmanCurrentIndex + 1) === 392) {
                    pacmanCurrentIndex = 364;
                }
                break;
            case 40:
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex += width;
                }
                break;
        }

        squares[pacmanCurrentIndex].classList.add('pac-man');

        pacDotEaten();
        powerPelletEaten();
        checkForGameOver();
        checkForWin();
    }

    document.addEventListener('keyup', movePacman);

    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            score++;
            scoreDisplay.innerHTML = score;
            squares[pacmanCurrentIndex].classList.remove('pac-dot')
        }
    }

    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unscareGhosts, 10000);
            squares[pacmanCurrentIndex].classList.remove('power-pellet');
            score += 10;
            scoreDisplay.innerHTML = score;
        }
    }

    function unscareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
            this.isScared = false;
        }
    }

    const ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500),
    ];

    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    });

    ghosts.forEach(ghost => moveGhost(ghost));

    function moveGhost(ghost) {
        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];
        ghost.timerId = setInterval(function () {
            if (!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className);
                squares[ghost.currentIndex].classList.add('ghost');
            } else {
                direction = directions[Math.floor(Math.random() * directions.length)];
            }

            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost');
            }

            if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.isScared = false;
                ghost.currentIndex = ghost.startIndex;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                score += 100;
                scoreDisplay.innerHTML = score;
            }

            checkForGameOver();
        }, ghost.speed);
    }

    function checkForGameOver() {
        if (
            squares[pacmanCurrentIndex].classList.contains('ghost')
            && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function() { alert('Game Over!')}, 500);

        }
    }

    function checkForWin() {
        let anyPelletsLeft = false;

        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('pac-dot')) {
                anyPelletsLeft = true;
                break;
            }
        }

        if (!anyPelletsLeft) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function() { alert('YOU WON!')}, 500);
        }
    }
});
