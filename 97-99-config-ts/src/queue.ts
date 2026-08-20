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

  // ? 99.13.1 Итак, здесь, если бы у нас в типах на результат стоял "T | null", а не "T | undefined", то благодаря этой опции у нас тут была бы TS-ошибка, т.к. при отсутствии свойства "return this.queue[0]" вернул бы undefined, а не null, что может привести к поломке.
  // (Go to [./styles.ts])
  // peek(this: ArrayQueue<T>): T | null {
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