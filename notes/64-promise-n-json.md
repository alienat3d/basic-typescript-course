*[Работа с запросами на сервер Promise и JSON (64)]*

? 64.0 Здесь мы рассмотрим тему, которая часто волнует новичков TypeScript: "Как работать с операциями, на результат которых мы не можем повлиять?". Речь о промисах, запросами на сервер и обработке JSON-файлов. 

Рассмотрим тему в файле с примерами: [64-promise-n-json.ts]

|===:===:===:===>
**links**

* (EN TS Docs "Utility types - constructor parameters type"): https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype
* (EN GitHub "TypeScript - Promise"): https://github.com/microsoft/TypeScript/blob/main/src/lib/es2015.promise.d.ts
* (EN Article "Type safe data fetching with unknown"): https://www.carlrippon.com/type-safe-data-fetching-with-unknown/
* (EN Article "Keep your promises in TypeScript using async await"): https://blog.bitsrc.io/keep-your-promises-in-typescript-using-async-await-7bdc57041308
* (EN StackOverflow "How to parse JSON string in TypeScript"): https://stackoverflow.com/questions/38688822/how-to-parse-json-string-in-typescript/62438143#62438143 // Пример, как не нужно чрезмерно увлекаться и усложнять проект подобными type guard'ами.
* (Library "JSONplaceholder"): https://jsonplaceholder.typicode.com/