// 100.3.1 Теперь интерфейс был перемещён сюда. Добавим ему ключевое слово "export" для экспортирования.
// (Go to [100-build/src/index.ts])
export interface IQueue<T> {
  enqueue(item: T): void; // поставить в очередь
  dequeue(): T | undefined; // исключить из очереди
  peek(): T | undefined | null; // посмотреть первый элемент
  isEmpty(): boolean; // проверка на "пустоту" сущности
  length(): number; // проверка на длину
}

export const loremIpsum = "Lorem Ipsum";