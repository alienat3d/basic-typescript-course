*[Декораторы методов и работа с «this» (86)]*

? 86.0 Разберём следующий вариант декораторов «декоратор методов класса». Иногда нам нужно изменить поведение какого-то метода класса

Рассмотрим тему в файле с примерами: [86-method-decorators-n-working-with-function-context.ts]

|===:===:===:===>
**links**

* (EN TS Docs "Method Decorators"): https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators
* (EN MDN "defineProperty"): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
* (EN Статья "Objects writable configurable enumerable"): https://medium.com/@ayusharma.in/objects-writable-configurable-enumerable-365cdff6a408
* (EN Вопрос на StackOverflow "How to use a typescript method decorator and retain normal this scope?"): https://stackoverflow.com/questions/56189503/how-to-use-a-typescript-method-decorator-and-retain-normal-this-scope
* (EN Вопрос на StackOverflow "Typescript method decorator this with noimplicitthis enabled"): https://stackoverflow.com/questions/53837323/typescript-method-decorator-this-with-noimplicitthis-enabled
* (Library "Class Validator"): https://github.com/typestack/class-validator/tree/master