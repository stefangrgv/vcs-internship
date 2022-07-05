const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const pixelSize = 20;

let level = 1;


function Board (level) {
    let _width = 35;
    let _height = 35;
    let _borders = [];
    let _apples = [];
    
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
        });
    }

    function generateBorders () {
        switch (level) {
            case 1:
                /*
                level 1 : the border coincides with the limits of the <canvas>
                */
                let topBorder = new Array(_width).fill([0, 0]).map((el, ind) => [el[0] + ind, el[1]]);
                let botBorder = new Array(_width).fill([0, _height - 1]).map((el, ind) => [el[0] + ind, el[1]]);
                let lefBorder = new Array(_height).fill([0, 0]).map((el, ind) => [el[0], el[1] + ind]);
                let rigBorder = new Array(_width).fill([_width - 1, 0]).map((el, ind) => [el[0], el[1] + ind]);
                _borders = [...topBorder, ...botBorder, ...lefBorder, ...rigBorder];
                break;
        }
    }

    function getBorders () {
        return _borders;
    }
 
    function addApple (apple) {
        _apples.push(apple);
    }

    function removeApple (apple) {
        _apples = _apples.filter((el) => el !== apple);
    }

    function getApplePositions () {
        if (_apples.length > 0) {
            return _apples.reduce((result, ap) => {
                result.push(ap.getPosition());
                return result;
            }, []);
        }
        return [];
    }

    function drawApples () {
        _apples.forEach((ap) => ap.draw());
    }

    function getNumberApples () {
        return _apples.length;
    }

    return {draw: draw,
            getH: getH,
            getW: getW,
            getBorders: getBorders,
            addApple: addApple,
            removeApple: removeApple,
            getApplePositions: getApplePositions,
            drawApples: drawApples,
            getNumberApples: getNumberApples
        };
}

function Snake (board) {
    let _tail = [];
    let _speed = 1;
    let _direction;
    let _directionChanged = false;
    let _observers = [];

    spawn();
    setDirection('r');

    function spawn () {
        _tail = [
            [Math.floor(board.getW() / 2) - 1, Math.floor(board.getH() / 2)],
            [Math.floor(board.getW() / 2), Math.floor(board.getH() / 2)],
        ];
    }

    function setDirection (d) {
        if (!_directionChanged) {
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
    
    function draw () {
        _tail.forEach((el) => {
            ctx.fillStyle = 'rgb(0, 200, 50)';
            ctx.fillRect(el[0] * pixelSize, el[1] * pixelSize, pixelSize, pixelSize);
        });
    }

    function getHead () {
        return _tail.at(-1);
    }

    function getTail () {
        return _tail.slice(0, -1);
    }

    function subscribe (fn) {
        _observers.push(fn);
    }

    function unsubscribe (fn) {
        _observers = _observers.filter(o => o !== fn);
    }

    function notify () {
        let self = this;
        _observers.forEach(o => o(self.getHead()));
    }

    return {directionChanged: _directionChanged,
            draw: draw,
            move: move,
            getHead: getHead,
            getTail: getTail,
            setDirection: setDirection,
            getDirection: getDirection,
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            notify: notify};
}

function Apple (board, snake) {
    let _appleType = _generateType();
    let _position  = _generatePosition();

    draw();

    function draw () {
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(_position[0] * pixelSize, _position[1] * pixelSize, pixelSize, pixelSize);
    }

    function _generateType () {
        /*
        randomly generate the type of apple
            0 : speed  +
            1 : speed  -
            2 : length +
            3 : length -
        */
        switch (Math.floor(Math.random())) {
            case 0:
                return 's+';
            case 1:
                return 's-';
            case 2:
                return 'l+';
            case 3:
                return 'l-';
        }
    }

    function _getTakenPostitions () {
        return JSON.stringify([...board.getBorders(), ...board.getApplePositions(), ...snake.getTail(), ...snake.getHead()]);
    }

    function _generatePosition () {
        let x = Math.floor(Math.random() * board.getW());
        let y = Math.floor(Math.random() * board.getH());

        // check if the position is occupied
        if (!_getTakenPostitions().includes(JSON.stringify([x, y]))) {
            return [x, y];
        }
        return _generatePosition();
    }

    function getPosition () {
        return _position;
    }

    return {
        draw: draw,
        getPosition: getPosition,
    };
}

function Checks (b, s) {
    function checkBorders () {
        b.getBorders().forEach(function (el) {
            if ((s.getHead()[0] === el[0]) && (s.getHead()[1] === el[1])) {
                alert('W A S T E D');
            }
        });
    }

    function checkSnake () {
        s.getTail().forEach(function (el) {
            if ((s.getHead()[0] === el[0]) && (s.getHead()[1] === el[1])) {
                alert('All we had to do was follow the damn train, CJ');
            }
        });
    }

    return {
        checkBorders: checkBorders,
        checkSnake: checkSnake,
    };
}

let board = Board(level);
board.draw();

let snake = Snake(board);
let checks = Checks(board, snake);
snake.subscribe(checks.checkBorders);
snake.subscribe(checks.checkSnake);

snake.draw();
function tick () {
    snake.move();

    board.draw();
    snake.draw();

    if ((board.getNumberApples() < 3) && (Math.floor(Math.random() * 10) > 8)) {
        board.addApple(new Apple(board, snake));
    }

    board.drawApples();

    snake.notify();
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