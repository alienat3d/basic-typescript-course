*[Типы «null» & «undefined» (12)]*

? 12.0 Типы "null" & "undefined" явно уже знакомы по-нативному JavaScript. Всё же напомним, что это два неопределённых типа данных в JavaScript, которые всё же имеют различия: "null" — отсутствие чего-либо (например несуществующая переменная), в то время как "undefined" — означает, что какая-то сущность есть, но её значение пока не определено.
Например, если мы попытаемся вывести в консоль необъявленную переменную "var1", то это будет "null". А если мы создадим переменную "var2", но не присвоим ей значение, при этом всё равно попытаемся вывести её значение в консоль, то это уже будет "undefined".
<script>
console.log(var1);

let var2;
console.log(var2);
</script>

Рассмотрим на примере: [12-types-null-n-undefined.ts]

|===:===:===:===>
**links**

* (EN TS Docs "«null» & «undefined» types"): https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined
* (EN TS Docs "Таблицы совместимостей"): https://www.typescriptlang.org/docs/handbook/type-compatibility.html#subtype-vs-assignment
* (RU Статья про "типы «null» & «undefined»" в гайде): https://scriptdev.ru/guide/014/#null-null