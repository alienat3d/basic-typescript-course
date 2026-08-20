"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(item) {
        this.queue.push(item);
    }
    ;
    dequeue() {
        if (this.isEmpty())
            throw new Error("Ошибка: Очередь пуста.");
        return this.queue.shift();
    }
    ;
    peek() {
        if (!this.isEmpty())
            return this.queue[0];
    }
    ;
    isEmpty() {
        return this.length() === 0;
    }
    ;
    length() {
        return this.queue.length;
    }
    ;
}
exports.default = ArrayQueue;
//# sourceMappingURL=queue.js.map