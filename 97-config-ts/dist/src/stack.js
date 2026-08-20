"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    constructor(limit = Number.MAX_VALUE) {
        this.stack = [];
        this.limit = limit;
    }
    push(value) {
        if (this.length() + 1 > this.limit)
            throw new Error("Ошибка: Стек переполнен.");
        this.stack.push(value);
    }
    pop() {
        if (this.isEmpty())
            throw new Error("Ошибка: Стек пуст.");
        return this.stack.pop();
    }
    length() {
        return this.stack.length;
    }
    isEmpty() {
        return this.stack.length === 0;
    }
    top() {
        if (this.isEmpty())
            return null;
        return this.stack[length - 1];
    }
}
exports.default = Stack;
//# sourceMappingURL=stack.js.map