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
    
    generateBorders();

    function getW () {
        return _width;
    }

    function getH () {
        return _height;
    }

    function draw () {
        // draw the background
        ctx.clearRect(0, 0, _height * pixelSize, _width * pixelSize);

        ctx.fillStyle = 'rgba(0, 0, 100, 0.25)';
        ctx.fillRect(0, 0, _height * pixelSize, _width * pixelSize);

        // draw the borders
        _borders.map((el) => {
            ctx.fillStyle = 'rgb(120, 0, 100)';
            ctx.fillRect(el[0] * pixelSize, el[1] * pixelSize, pixelSize, pixelSize);            
        })
    }

    function generateBorders () {
        switch (level) {
            case 1:
                /*
                level 1 : the border coincides with the limits of the <canvas>
                */
                let top_border = new Array(_width).fill([0, 0]).map((el, ind) => [el[0] + ind, el[1]]);
                let bot_border = new Array(_width).fill([0, _height - 1]).map((el, ind) => [el[0] + ind, el[1]]);
                let lef_border = new Array(_height).fill([0, 0]).map((el, ind) => [el[0], el[1] + ind]);
                let rig_border = new Array(_width).fill([_width - 1, 0]).map((el, ind) => [el[0], el[1] + ind]);
                _borders = [...top_border, ...bot_border, ...lef_border, ...rig_border]
                break;
        }
    }

    return {draw: draw, getH: getH, getW: getW};
}

function Snake (board) {
    let _tail = [];
    let _speed = 1;
    let _direction;
    let _directionChanged = false;

    spawn();
    setDirection('r');

    function spawn () {
        _tail = [
            [Math.floor(board.getW() / 2) - 1, Math.floor(board.getH() / 2)],
            [Math.floor(board.getW() / 2), Math.floor(board.getH() / 2)],
        ];
    }

    function setDirection (d) {
        if (!_directionChanged){
            _direction = d;
            _directionChanged = true;
       }
    }

    function getDirection () {
        return _direction;
    }

    function move () {
        _tail.push(JSON.parse(JSON.stringify(_tail.at(-1))));
        switch (_direction) {
            case 'd':
                _tail[_tail.length - 1][1] += 1;
                break;
            case 'u':
                _tail[_tail.length - 1][1] -= 1;
                break;
            case 'l':
                _tail[_tail.length - 1][0] -= 1;
                break;                
            case 'r':
                _tail[_tail.length - 1][0] += 1;
                break;
        }
        _tail.shift();
        _directionChanged = false;
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

    return {draw: draw, move: move, setDirection: setDirection, getDirection: getDirection, directionChanged: _directionChanged, debug_alertTail: debug_alertTail};
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

document.addEventListener('keydown', (event) => {
    let code = event.code;
    switch (code) {
        case 'ArrowUp':
            if (snake.getDirection() != 'd') {
                snake.setDirection('u');
            }
            break;
        case 'ArrowDown':
            if (snake.getDirection() != 'u') {
                snake.setDirection('d');
            }
            break;
        case 'ArrowLeft':
            if (snake.getDirection() != 'r') {
                snake.setDirection('l');
            }
            break;
        case 'ArrowRight':
            if (snake.getDirection() != 'l') {
                snake.setDirection('r');
            }
            break;
    }
  }, false);

setInterval(tick, 250);