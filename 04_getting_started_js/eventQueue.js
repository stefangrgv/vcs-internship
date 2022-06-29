var queue = {
    _tasks: [],
    
    on (eventName, callback) {
        let newTask = {};
        newTask[String(eventName)] = callback;
        this._tasks.push(newTask);
    },
    
    remove (eventName) {
        this._tasks = this._tasks.filter( (el) => String(Object.keys(el)) !== eventName);
    },

    trigger (eventName) {
        this._tasks.forEach(el => {
            if (String(Object.keys(el)) === eventName) {
                el[eventName]();
            }
        });
        this.remove(eventName);
    },
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

queue.remove('PANIC_EVENT')
queue.trigger('NOT_A_PANIC_EVENT')