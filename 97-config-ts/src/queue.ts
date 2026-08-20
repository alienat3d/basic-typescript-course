interface Queue<T> {
  enqueue(item: T): void; // поставить в очередь
  dequeue(): T | undefined; // исключить из очереди
  peek(): T | undefined | null; // посмотреть первый элемент
  isEmpty(): boolean; // проверка на "пустоту" сущности
  length(): number; // проверка на длину
}

class ArrayQueue<T> implements Queue<T> {
  private queue: T[] = [];

  enqueue(this: ArrayQueue<T>, item: T): void {
    this.queue.push(item);
  };

  dequeue(this: ArrayQueue<T>): T {
    if (this.isEmpty()) throw new Error("Ошибка: Очередь пуста.");

    return this.queue.shift() as T;
  };

  peek(this: ArrayQueue<T>): T | undefined {
    if (!this.isEmpty()) return this.queue[0];
  };

  isEmpty(this: ArrayQueue<T>): boolean {
    return this.length() === 0;
  };

  length(this: ArrayQueue<T>): number {
    return this.queue.length;
  };
}

export default ArrayQueue;