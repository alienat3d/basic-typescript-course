// 5.3.3 Рассмотрим на пример маленького кусочка кода TypeScript с ошибкой в нём, которая гласит, что нельзя помещать в "anExampleVariable" строчный тип данных, т.к. там указан тип "number":
// const anExampleVariable:number = "Hello World";

// 5.3.4 Заменим тип данных на "string" и ошибка исчезнет.
const anExampleVariable:string = "Hello World";

console.log(anExampleVariable);