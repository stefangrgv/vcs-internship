const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const pixelSize = 40;

function Board () {
    let _width = 15;
    let _height = 15;
    let _borders = [];
    let _apples = [];
    
    // textures
    let bg = new Image();
    bg.src = 'img/ground.jpg';
    let wall = new Image();
    wall.src = 'img/wall.png';

    canvas.setAttribute('width', `${_width * pixelSize}px`);
    canvas.setAttribute('height', `${_height * pixelSize}px`);
    
    _generateBorders();

    function getW () {
        return _width;
    }

    function getH () {
        return _height;
    }

    function draw () {
        // draw the background
        ctx.clearRect(0, 0, _height * pixelSize, _width * pixelSize);
        ctx.drawImage(bg, 0, 0, _height * pixelSize, _width * pixelSize);

        // draw the borders
        _borders.map((el) => {       
            ctx.drawImage(wall, el[0] * pixelSize, el[1] * pixelSize, pixelSize, pixelSize);
        });
    }

    function _generateBorders () {
        let topBorder = new Array(_width).fill([0, 0]).map((el, ind) => [el[0] + ind, el[1]]);
        let botBorder = new Array(_width).fill([0, _height - 1]).map((el, ind) => [el[0] + ind, el[1]]);
        let lefBorder = new Array(_height).fill([0, 0]).map((el, ind) => [el[0], el[1] + ind]);
        let rigBorder = new Array(_width).fill([_width - 1, 0]).map((el, ind) => [el[0], el[1] + ind]);
        _borders = [...topBorder, ...botBorder, ...lefBorder, ...rigBorder];
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

    function getApples () {
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
            if ((snakeHead[0] === el[0]) && (snakeHead[1] === el[1]) && snake.isAlive()) {
                snake.kill();
            }
        });
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
    let _ate = 0;
    let _alive = true;
    let _spriteSheet = new Image();
    _spriteSheet.src = 'img/snakeSprite.png';

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

    function getSpeed () {
        return _speed;
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
        _ate > 0 ? _ate-- : _tail.shift(); // make the snake grow
        _directionChanged = false;
    }

    function isAlive () {
        return _alive;
    }

    function kill () {
        _alive = false;
    }

    function _getTailAdjacent (ind, towards) {
        // locate where the next part of the tail is (towards 'head' or 'tail')
        // this is needed to know which sprite to use and how to rotate it when drawing
        let next;
        (towards === 'head') ? next = ind + 1 : next = ind - 1;
        let dx = _tail[ind][0] - _tail[next][0];
        let dy = _tail[ind][1] - _tail[next][1];
        
        if (dx === 0) {
            if (dy === 1) {
                return 'above';
            }
            return 'below';
        }

        if (dx === 1) {
            return 'left';
        }

        if (dx === -1) {
            return 'right';
        }
    }

    function draw () {
        _tail.forEach((el, ind) => {
            let spritex = 0; // the location of the sprite in the .png
            let spritey = 0; // the location of the sprite in the .png
            let rotAngle = 0; // angle at which to rotate the sprite depending on where the snake is going
            let shiftx = 0; // ctx.rotate displaces the image, this is used to account for it
            let shifty = 0; // ctx.rotate displaces the image, this is used to account for it

            ctx.save();
            if (ind === _tail.length - 1) { // draw the head
                switch (_direction) {
                    case 'l':
                        rotAngle = 90;
                        shiftx = 1;
                        break;
                    case 'r':
                        rotAngle = 270;
                        shifty = 1;
                        break;
                    case 'u':
                        rotAngle = 180;
                        shiftx = 1;
                        shifty = 1;
                        break;
                }
            } else if (ind === 0) { // draw the end of the tail
                switch (_getTailAdjacent(ind, 'head')) {
                    case 'left':
                        rotAngle = -90;
                        shifty = 1;
                        break;
                    case 'right':
                        rotAngle = 90;
                        shiftx = 1;
                        break;
                    case 'below':
                        rotAngle = 180;
                        shiftx = 1;
                        shifty = 1;
                        break;
                }
                spritex = 44;
                spritey = 84;
            } else { // middle of the tail
                let toTail = _getTailAdjacent(ind, 'tail');
                let toHead = _getTailAdjacent(ind, 'head');
                if ((toTail === 'left' || toTail === 'right') && (toHead === 'left' || toHead === 'right')) {
                    spritex = 84;
                    spritey = 84;
                    rotAngle = 90;
                    shiftx = 1;
                } else if ((toTail === 'above' || toTail === 'below') && (toHead === 'above' || toHead === 'below')) {
                    spritex = 84;
                    spritey = 84;
                } else if ((toTail === 'above' && toHead === 'left') || (toTail === 'left' && toHead === 'above')) {
                    spritex = 85;
                    spritey = 42;
                } else if ((toTail === 'below' && toHead === 'left') || (toTail === 'left' && toHead === 'below')) {
                    spritex = 85;
                    spritey = 42;
                    rotAngle = -90;
                    shifty = 1;
                } else if ((toTail === 'above' && toHead === 'right') || (toTail === 'right' && toHead === 'above')) {
                    spritex = 85;
                    spritey = 42;
                    rotAngle = 90;
                    shiftx = 1;
                } else if ((toTail === 'below' && toHead === 'right') || (toTail === 'right' && toHead === 'below')) {
                    spritex = 85;
                    spritey = 42;
                    rotAngle = 180;
                    shiftx = 1;
                    shifty = 1;
                }
            }
            ctx.translate((el[0] + shiftx) * pixelSize, (el[1] + shifty) * pixelSize);
            ctx.rotate(rotAngle * Math.PI / 180);
            ctx.drawImage(_spriteSheet, spritex, spritey, 40, 40, 0, 0, pixelSize, pixelSize);
        ctx.restore();
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

    function grow () {
        _ate += 1;
    }

    function shrink () {
        Array(5).fill(0).map(() => {
            _tail.shift();
            if (_tail.length == 0) {
                kill();
            }
        });
    }

    function accelerate () {
        _speed += 1;
    }

    function decelerate () {
        (_speed > 1) ? _speed -= 1 : _speed *= 0.5;
    }

    function check (snake) {
        let snakeHead = snake.getHead();
        getTail().forEach(function (el) {
            if ((snakeHead[0] === el[0]) && (snakeHead[1] === el[1])) {
                snake.kill();
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
            getSpeed: getSpeed,
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            notify: notify,
            getSubs: getSubs,
            grow: grow,
            shrink: shrink,
            accelerate: accelerate,
            decelerate: decelerate,
            isAlive: isAlive,
            kill: kill,
            check: check};
}

function Apple (board, snake) {
    let _texture = new Image();
    let _appleType = _generateType();
    let _position  = _generatePosition();
    let _timeBorn = Date.now();

    draw();


    function draw () {
        ctx.drawImage(_texture, _position[0] * pixelSize, _position[1] * pixelSize, pixelSize, pixelSize);
    }

    function _generateType () {
        /*
        randomly generate the type of apple
            s+ : speed  +
            s- : speed  -
            l+ : length +
            l- : length -
        */
        let random = Math.floor(Math.random() * 10);
        if (random < 7) {
            _texture.src = 'img/redApple.png';
            return 'l+';
        }
        if (random == 8) {
            _texture.src = 'img/coffee.png';
            return 's+';
        }
        if (random == 9) {
            _texture.src = 'img/blueApple.png';
            return 's-';
        }
        _texture.src = 'img/pinkMushroom.png';
        return 'l-';
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
        let snakeHead = snake.getHead(); // may be undefined if you ate an l- apple and the tail shrank to 0 length
        if ((snakeHead !== undefined) && (snakeHead[0] === getPosition()[0]) && (snakeHead[1] === getPosition()[1])) {
            snake.unsubscribe(this);
            board.removeApple(this);
            
            switch (_appleType) {
                case 'l+':
                    snake.grow();
                    break;
                case 'l-':
                    snake.shrink();
                    break;
                case 's+':
                    snake.accelerate();
                    break;
                case 's-':
                    snake.decelerate();
                    break;
            }
        }

        if (_isDeadApple()) {
            snake.unsubscribe(this);
            board.removeApple(this);
        }
    }

    function _isDeadApple () {
        return ((Date.now() - _timeBorn) >= 7000); // apples die every 7 seconds
    }

    return {
        draw: draw,
        getPosition: getPosition,
        check: check
    };
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

let board = Board();
let snake = Snake(board);
snake.subscribe(board);
snake.subscribe(snake);

board.draw();
snake.draw();

let apple = new Apple(board, snake);
board.addApple(apple);
snake.subscribe(apple);

function tick () {
    snake.move();

    if ((board.getApples().length < 3) && (Math.floor(Math.random() * 10) > 8)) {
        apple = new Apple(board, snake);
        board.addApple(apple);
        snake.subscribe(apple);
    }

    board.draw();
    board.drawApples();
    snake.draw();

    snake.notify(snake);

    if (snake.isAlive()) {
        setTimeout(tick, 200 / snake.getSpeed());
    } else {
        $('#gameOverModal').modal('show');
    }
}

tick();