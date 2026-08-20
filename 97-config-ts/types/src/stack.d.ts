declare class Stack<T> {
    private stack;
    private readonly limit;
    constructor(limit?: number);
    push(this: Stack<T>, value: T): void;
    pop(this: Stack<T>): T | undefined;
    length(this: Stack<T>): number;
    isEmpty(this: Stack<T>): boolean;
    top(this: Stack<T>): T | null | undefined;
}
export default Stack;
//# sourceMappingURL=stack.d.ts.map