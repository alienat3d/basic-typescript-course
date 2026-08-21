*[Модули и сборка (100)]*

? 100.0 Этот финальный урок курса будет дополнительным и здесь мы рассмотрим темы сборки проекта и модулей в общих чертах. Почему только в общих? Да потому, что в каждом отдельном проекте настройки, инструменты и структура будут отличаться и проговорить все возможные варианты будет если и неневозможно, то крайне затруднительно. Но здесь мы разберём важнейшие концепции для лучшего ориентира в дальнейшем.

? 100.1 Наверняка вы помните, что модульная структура, это когда мы разделяем скрипт проекта на множество логических кусочков, которые между собой связаны при помощи импортов и экспортов. Так становится намного средние и крупные проекты разрабатывать, редактировать и расширять, чем всё бы лежало лишь в одном файле.

Рассмотрим тему в папке пустого TS-проекта, подготовленного для примера, где довольно пустой package.json, простая структура папок и базовый tsconfig, а также скрипт одного из прошлых уроков: [100-build/src/index.ts]

|===:===:===:===>
**files**
[./notes/files/100 - Cheatsheet-Modules.jpg]

**links**

* (EN TS Docs "TS Config - Module"): https://www.typescriptlang.org/tsconfig#module
* (EN TS Docs "Handbook - Modules"): https://www.typescriptlang.org/docs/handbook/modules.html
* (EN Article "Bundle Node.js backend - Good practice or bad practice?"): https://stackoverflow.com/questions/44766304/bundle-node-js-backend-good-practice-or-bad-practice
* (EN Docs Webpack & TypeScript): https://webpack.js.org/guides/typescript/