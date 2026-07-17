*[Условные типы — «Conditional types and infer» (57)]*

? 57.0 Здесь мы рассмотрим ещё один интересный механизм работы с типами «условные типы», который вполне может быть найден в каких-то проектах со средней и крупной архитектурой. Да и в целом, подход позволит заменить сразу несколько других приёмов и сделать код чуть элегантнее.

Рассмотрим тему в файле с примерами: [57-conditional-types-and-infer.ts]

|===:===:===:===>
**links**

* (EN TS Docs "Conditional types"): https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
* (RU Статья об "условных алиасах" в гайде): https://scriptdev.ru/guide/043/
* (StackOverflow): https://stackoverflow.com/questions/58845084/typescript-conditional-return-errors
* (Github): https://github.com/microsoft/TypeScript/issues/22735