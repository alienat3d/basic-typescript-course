*[Модификаторы свойств ("Optional Property Modifiers") (28)]*

? 28.0 В этом и следующем уроках мы рассмотрим полезные синтаксические возможности TypeScript, который довольно часто используются в практике. Начнём с модификатора "optional". Когда мы создаём нотацию типов объекта, то мы бы хотели сказать TypeScript, что некоторые поля будут необязательными. Например, пользователи при заполнении формы регистрации могут не указывать некоторые необязательные для заполнения поля, вроде "профессия", "интересы" и т.п. И мы можем сообщить TypeScript, что эти свойства в объекте данных о пользователя будут опциональными (т.е. могут быть, а могут и не быть заполнены).

Перейдём к файлу с примерами: [28-optional-property-modifiers.ts]

|===:===:===:===>
**links**

* (EN TS Docs "Optional Property Modifiers"): https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#optional-properties
* (EN TS Docs "Optional Chaining"): https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Optional_chaining
* (RU Статья о модификаторах свойств в гайде): https://scriptdev.ru/guide/031/#optional-fields-parameters-and-methods