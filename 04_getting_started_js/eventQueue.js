var queue = {
    _eventQueue: {},
    
    on (eventName, callback) {
        if (!this._eventQueue.hasOwnProperty(eventName)) {
            this._eventQueue[eventName] = [];
        }
        //this._eventQueue[eventName] = [...this._eventQueue[eventName], callback] // using spread operator
        this._eventQueue[eventName].push(callback) // using .push
    },

    remove (eventName) {
        delete this._eventQueue[eventName];
    },

    trigger (eventName) {
        this._eventQueue[eventName].forEach(fn => fn());
    }
}

// checking functionality
queue.on('PANIC_EVENT', function () {
    console.log('PANIC_EVENT HAPPENED!')
});

queue.on('PANIC_EVENT', function () {
    console.log('PANIC_EVENT HAPPENED AGAIN!');
});

queue.on('NOT_A_PANIC_EVENT', function () {
    console.log('ABSOLUTELY NO PANIC!!!');
});

queue.trigger('PANIC_EVENT')
queue.remove('PANIC_EVENT')
queue.trigger('NOT_A_PANIC_EVENT')