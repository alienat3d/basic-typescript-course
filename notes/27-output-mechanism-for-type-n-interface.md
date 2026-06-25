*[Механизм вывода типов Type Inference (27)]*

? 27.0 Здесь мы разберём один из внутренних механизмов TypeScript, который, вроде бы, очевиден, но может быть не до конца понятно как он работает и как им пользоваться. Называется он "вывод типов".

Перейдём к файлу TypeScript для обсуждения темы с примерами: [27-output-mechanism-for-type-n-interface.ts]

|===:===:===:===>
**links**

* (EN TS Docs "Type inference"): https://www.typescriptlang.org/docs/handbook/type-inference.html#handbook-content
* (RU Статья о механизме вывода типов в гайде): https://scriptdev.ru/guide/037/