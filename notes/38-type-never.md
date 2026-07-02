*[Тип «never» (38)]*

? 38.0 Здесь мы рассмотрим интересное применение специального типа "never" на основании механизмов из прошлого урока. Тип "never" это такой специальный тип, значение которого никогда не будет возвращено из функции и он совместим только с другими сущности с типами "never". Т.о. в тип "never" можно поместить только сущности с таким же типом "never".

Рассмотрим тему в файле с примерами: [38-type-never.ts]

|===:===:===:===>
**links**

* (EN TS Docs "type «never»"): https://www.typescriptlang.org/docs/handbook/type-compatibility.html#any-unknown-object-void-undefined-null-and-never-assignability