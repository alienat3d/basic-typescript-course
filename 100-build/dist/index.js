/* ? 100.2.0 Прежде, чем начинать работу нужно определиться с тремя составляющими этого урока:
* 1) среда выполнения — фронтенд, где код интерпретируется браузером пользователя и бэкенд, запускаемый, к примеру, Node.js, как в терминале;
* 2) тип модульности — есть несколько видов: "commonjs", "amd", "umd", "system", "es6/ es2015", "es2020", "es2022", "esnext", "node16", "nodenext" (сейчас чаще всего встречаются либо "es6", либо "commonjs");
* 3) сборка — как собирается, зависит от того, нужен ли нам один файл по итогу или можно оставить в виде множества разрозненных файлов. */
// ? 100.2.1 К этому уроку есть шпаргалка, которая напомнить информацию (см. [notes/files/100 - Cheatsheet-Modules.jpg]).
// 100.3.0 Ну, и, для примера, попробуем этот маленький проект в виде одного файла разделить на несколько, хотя вынести интерфейс в отдельный файл. И всё то, что существует в TypeScript — алиасы типов, интерфейсы и т.п. можно экспортировать и импортировать, однако с небольшой оговоркой, их нельзя экспортировать по умолчанию.
// (Go to [100-build/src/queue.ts])
// 100.3.2 А дальше мы импортируем интерфейс сюда при помощи ключевого слова "import", всё, в общем, как и в обычном модульном JavaScript. Но при том есть три разных вида записи импорта, они равнозначны, хотя и два последних более понятно описывает, что импортируется именно тип:
// import {IQueue} from "./queue"; // №1
// import type {IQueue} from "./queue"; // №2
import { loremIpsum } from "./queue.js"; // №3
// (Go to [100-build/tsconfig.json])
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
            throw new Error(loremIpsum);
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
const arrTest1 = new ArrayQueue();
arrTest1.enqueue(5);
arrTest1.enqueue(10);
console.log(arrTest1.peek());
console.log(arrTest1.dequeue());
console.log(arrTest1.length());
const arrTest2 = new ArrayQueue();
arrTest2.enqueue("5");
arrTest2.enqueue("10");
console.log(arrTest2.peek());
console.log(arrTest2.dequeue());
console.log(arrTest2.length());
