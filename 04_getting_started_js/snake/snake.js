const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const pixelSize = 25;

let level = 1;


function Board (level) {
    let _width = 35;
    let _height = 35;
    let _borders = [];
    let _apples = [];
    
    // textures
    let grass = new Image();
    grass.src = 'img/grass.png';
    let wall = new Image();
    wall.src = 'img/wall.png';

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
        ctx.drawImage(grass, 0, 0, _height * pixelSize, _width * pixelSize);

        // draw the borders
        _borders.map((el) => {       
            ctx.drawImage(wall, el[0] * pixelSize, el[1] * pixelSize, pixelSize, pixelSize);
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

    function getApples (apple) {
        return _apples;
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

    function check (snake) {
        let snakeHead = snake.getHead();
        getBorders().forEach(function (el) {
            if ((snakeHead[0] === el[0]) && (snakeHead[1] === el[1])) {
                alert('W A S T E D');
            }
        })
    }

    return {draw: draw,
            getH: getH,
            getW: getW,
            getBorders: getBorders,
            addApple: addApple,
            removeApple: removeApple,
            getApplePositions: getApplePositions,
            drawApples: drawApples,
            getApples: getApples,
            check: check
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

    function unsubscribe (toRemove) {
        _observers = _observers.filter(obs => {
            if (obs !== toRemove) {
                return obs;
            }
        });
    }

    function notify (snake) {
        _observers.forEach(obs => obs.check(snake));
    }

    function getSubs () {
        return _observers;
    }

    function check (snake) {
        let snakeHead = snake.getHead();
        getTail().forEach(function (el) {
            if ((snakeHead[0] === el[0]) && (snakeHead[1] === el[1])) {
                alert('All we had to do was follow the damn train, CJ');
            }
        });
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
            notify: notify,
            getSubs: getSubs,
            check: check};
}

function Apple (board, snake) {
    let _appleType = _generateType();
    let _position  = _generatePosition();

    // textures
    redApple = new Image();
    redApple.src = 'img/jabolko(red)-128.png';//'img/redApple.png';

    draw();

    function draw () {
        ctx.drawImage(redApple, _position[0] * pixelSize, _position[1] * pixelSize, pixelSize, pixelSize);
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

    function check (snake) {
        let snakeHead = snake.getHead();
        if ((snakeHead[0] === getPosition()[0]) && (snakeHead[1] === getPosition()[1])) {
            snake.unsubscribe(this);
            board.removeApple(this);
            alert('eaten apple logic goes here!');
        }
    }

    return {
        draw: draw,
        getPosition: getPosition,
        check: check
    };
}

let board = Board(level);
let snake = Snake(board);
snake.subscribe(board);
snake.subscribe(snake);

function tick () {
    snake.move();

    if ((board.getApples().length < 3) && (Math.floor(Math.random() * 10) > 5)) {
        let apple = new Apple(board, snake);
        board.addApple(apple);
        snake.subscribe(apple);
    }

    board.draw();
    board.drawApples();
    snake.draw();

    snake.notify(snake);
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

board.draw();
snake.draw();
setInterval(tick, 250);