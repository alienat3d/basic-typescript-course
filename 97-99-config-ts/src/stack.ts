class Stack<T> {
  private stack: T[] = [];
  private readonly limit: number;

  constructor(limit: number = Number.MAX_VALUE) {
    this.limit = limit;
  }

  push(this: Stack<T>, value: T) {
    if (this.length() + 1 > this.limit) throw new Error("Ошибка: Стек переполнен.");

    this.stack.push(value);
  }

  pop(this: Stack<T>): T | undefined {
    if (this.isEmpty()) throw new Error("Ошибка: Стек пуст.");

    return this.stack.pop();
  }

  length(this: Stack<T>): number {
    return this.stack.length;
  }

  isEmpty(this: Stack<T>): boolean {
    return this.stack.length === 0;
  }

  top(this: Stack<T>): T | null | undefined {
    if (this.isEmpty()) return null;

    return this.stack[length - 1];
  }
}

export default Stack;