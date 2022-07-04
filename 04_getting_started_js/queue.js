var queue = {
    contents: [],
    push (item) {
        this.contents.push(item);
    },
    pop () {
        return this.contents.shift();
    },
    isEmpty () {
        return !(this.contents.length);
    }
}

// checking functionality
queue.push(1)
queue.push(3)
console.log('contents:', queue.contents)
console.assert(1, queue.pop())
console.log('isEmpty():', queue.isEmpty())
console.assert(3, queue.pop())
console.log('contents:', queue.contents)
console.log('isEmpty():', queue.isEmpty())