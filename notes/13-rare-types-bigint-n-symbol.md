*[(д) Редкие примитивные типы «bigint» & «symbol» (13)]*

? 13.0 Здесь мы рассмотрим два редких типа, которые есть в TypeScript. Оба они из более новой версии JS. Один из них — это "symbol" (тип данных, который используется для создания уникальных идентификаторов, в том числе и скрытые при обычном доступе свойства объекта (не показываются при переборе объекта)). Конечно же и в TypeScript бывают случаи, когда нужно создавать "символы" и для этого нужен тип "symbol". Поведение "символов" в TypeScript такое же, как и в JavaScript. 

Рассмотрим на примере: [13-types-bigint-n-symbol.ts]

|===:===:===:===>
**links**

* (EN TS Docs "«bigint» type"): https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#bigint
* (EN TS Docs "«symbol» type"): https://www.typescriptlang.org/docs/handbook/symbols.html
* (EN TS Docs "Конфигурация стандарта"): https://www.typescriptlang.org/tsconfig#target
* (EN TS Docs "Таблицы совместимостей"): https://www.typescriptlang.org/docs/handbook/type-compatibility.html#subtype-vs-assignment
* (Статья про тип "symbol" в гайде): https://scriptdev.ru/guide/013/#symbol