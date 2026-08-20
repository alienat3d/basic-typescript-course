interface Queue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined | null;
    isEmpty(): boolean;
    length(): number;
}
declare class ArrayQueue<T> implements Queue<T> {
    private queue;
    enqueue(this: ArrayQueue<T>, item: T): void;
    dequeue(this: ArrayQueue<T>): T;
    peek(this: ArrayQueue<T>): T | undefined;
    isEmpty(this: ArrayQueue<T>): boolean;
    length(this: ArrayQueue<T>): number;
}
export default ArrayQueue;
//# sourceMappingURL=queue.d.ts.map