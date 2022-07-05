const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const pixelSize = 20;

let level = 1;


function Board (level) {
    let _width = 35;
    let _height = 35;
    let _borders = [];
    
    canvas.setAttribute('width', `${_width * pixelSize}px`);
    canvas.setAttribute('height', `${_height * pixelSize}px`);
    
    function getW () {
        return _width;
    }

    function getH () {
        return _height;
    }

    function draw () {
        ctx.clearRect(0, 0, _height * pixelSize, _width * pixelSize);

        ctx.fillStyle = 'rgba(0, 0, 100, 0.25)';
        ctx.fillRect(0, 0, _height * pixelSize, _width * pixelSize);
    }

    function generateBorders () {
        switch (level) {
            case 1:
                break;
        }
    }

    return {draw: draw, getH: getH, getW: getW};
}

function Snake (board) {
    let _tail = [];
    let _speed = 1;
    let _direction;

    spawn();
    setDirection('r');

    function spawn () {
        _tail = [
            [Math.floor(board.getW() / 2) - 1, Math.floor(board.getH() / 2)],
            [Math.floor(board.getW() / 2), Math.floor(board.getH() / 2)],
        ];
    }

    function setDirection (d) {
        _direction = d;
    }

    function move () {
        switch (_direction) {
            case 'r':
                _tail.push(JSON.parse(JSON.stringify(_tail.at(-1))));
                _tail[_tail.length - 1][0] += 1;
            default:
                _tail.shift();
                debug_alertTail();
                break;
        }
    }

    function debug_alertTail () {
        console.log(_tail);
    }
    function getLength () {
        return _tail.length();
    }

    function draw () {
        _tail.forEach((el) => {
            ctx.fillStyle = 'rgb(0, 200, 50)';
            ctx.fillRect(el[0] * pixelSize, el[1] * pixelSize, pixelSize, pixelSize);
        });
    }

    return {draw: draw, move: move, debug_alertTail: debug_alertTail};
}

let board = Board(level);
board.draw();

let snake = Snake(board);
snake.debug_alertTail();
snake.draw();

function tick () {
    snake.move();

    board.draw();
    snake.draw();
}

setInterval(tick, 250);