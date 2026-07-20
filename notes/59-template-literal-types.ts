// 59.1.0 Рассмотрим базовый синтаксис «Template literal types». Для примера создадим простейший алиас типов со строковым значением, представим, что это будет название какой-то анимации.
type MyAnimation = "fade";

// 59.1.1 А второй алиас типов мы создадим при помощи «Template literal types», на основе первого. И всё по тому же принципу, как мы делали в JavaScript с интерполяцией, мы используем `${variableName}`.
type MyNewAnimation = `${MyAnimation}-in`; // "fade-in"

// 59.2.0 Приём очень простой, но с некоторыми нюансами. Давайте рассмотрим вариант с использованием "union types".
type CoolAnimation = "fade" | "zoom";

// 59.2.1 А также добавим ещё алиас типов, который будет сообщать о текущем направлении анимации.
type DirectionAnimation = "in" | "out";

// 59.2.2 И вот, мы уже получили в "MyCoolAnimation" union-type из четырёх строк всех возможных комбинаций.
type MyCoolAnimation = `${CoolAnimation}-${DirectionAnimation}`; // "fade-in" | "fade-out" | "zoom-in" | "zoom-out"

// ? 59.3.0 А ещё в TypeScript есть специальные дженерики для работы с типами внутри «Template literal types» (это, например "Uppercase", "Lowercase", "Capitalize" & "Uncapitalize).
// 59.3.1 Представим, что после написания функционала мы вспомнили названия анимации и её направления у нас пишутся слитно в "camelCase", давайте это исправим при помощи дженерика. И для этого мы просто обернём алиас типов "DirectionAnimation" в дженерик-обёртку "Capitalize". Естественно, что для правильной работы мы должны работать только со строками.
type MyCoolAnimationFixed = `${CoolAnimation}${Capitalize<DirectionAnimation>}`; // "fadeIn" | "fadeOut" | "zoomIn" | "zoomOut"

// 59.4.0 А теперь вернёмся к примеру из прошлого урока и рассмотрим работу «Template literal types» с «Mapped types». Теперь у нас будет задача не просто скопировать, но и модифицировать ключи из "Currencies".
type Currencies = {
  usa: "USD",
  europe: "EUR",
  britain: "GBP",
  australia: "AUD",
  japan: "JPY",
  russia: "RUB",
  china: "CNY",
}

// 59.4.1 Для этого мы добавим оператор "as". Теперь у нас ключи будут называться "fade" и "zoom". Мы, по сути, взяли union type из "CoolAnimation" и поместили в «mapped types». Такое, конечно, редко можно увидеть, но стоит знать о такой возможности, что вместо передаваемых свойств мы т.о. можем взять только те, что нас больше интересуют.
type CreateCustomCurrencies<T> = {
  [P in keyof T as CoolAnimation]: string;
}

type CustomCurrencies = CreateCustomCurrencies<Currencies>;

// 59.5.0 Но перейдём к применению «Template literal types» в «mapped types». Но, после того, как мы укажем в дженерик-обёртке "Capitalize" идентификатор "P", TypeScript выдаст ошибку. Чтобы её исправить нам нужно здесь применить оператор пересечения типов (или "intersection type") — это успокоит TypeScript, удостоверив его, что там действительно будет строка.
type CreateCustomCurrencies2<T> = {
  [P in keyof T as `custom${Capitalize<string & P>}`]: string;
}

// 59.5.1 В итоге у нас получились все ключи написаны в формате "camelCase", чего мы и добивались.
type CustomCurrencies2 = CreateCustomCurrencies2<Currencies>;