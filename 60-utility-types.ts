// 60.1.0 Начнём с типа "Omit" — он становится полезен, когда нам нужно исключить какие-то свойства из другого типа. Допустим, у нас задача создать список валют без одной из стран.
type Currencies = {
  usa: "USD",
  europe: "EUR",
  britain: "GBP",
  australia: "AUD",
  japan: "JPY",
  russia: "RUB",
  china: "CNY",
}

// 60.1 Создадим новый алиас типов "CurrenciesWithoutAustralia". И вот, чтобы создать копию "Currencies", но без ключа "australia" мы используем дженерик-обёртку "Omit". Внутрь помещают два аргумента, где первый — оригинальный тип, а второй — тот ключ (или union type список ключей), который требуется из нового алиаса типов исключить. Этот ключ можно указывать в виде строки, числа или символа.
type CurrenciesWithoutAustralia = Omit<Currencies, "australia">;

// 60.2 Ещё один utility type — "Pick", который помогает фильтровать типы по заданным свойствам. Например, мы можем создать список валют только для двух стран. Сюда также, как и в "Omit" первым аргументом будет приходить оригинальный алиас типа или интерфейс, а вторым мы запишем через union type список тех свойств, которые нам нужны в создаваемом алиасе типов или интерфейсе.
type CurrencyAsiaOnly = Pick<Currencies, "china" | "japan">;

// 60.3.0 Следующий utility type — "Exclude" помогает убирать из union type те типы, которые соответствуют прописанному условию (т.е. переданы вторым аргументом).
type MyAnimation = "fade" | "zoom";

type FadeType = Exclude<MyAnimation, "zoom">; // "fade"

// 60.3.1 Также можно комбинировать "Exclude" для других задач, например, если нужно получить union type среди всех стран в "Currencies", но без какой-то определённой. Первым аргументом в дженерик-обёртку нужно передать то, из чего мы будем исключать, т.е. какой-то union type. Но для начала надо его здесь сформировать с помощью оператора "keyof", получив из интерфейса.
type CountriesWithoutUS = Exclude<keyof Currencies, "usa">;

// 60.4.0 Другой utility type — это "Extract" и он, можно сказать, выполняет противоположное "Exclude" действие. Он выбирает подходящие типы по условию. Рассмотрим на примере той же анимации. Создадим алиас типов "ZoomType", где в обёртку "Extract" первым аргументом будет передан алиас типов с union type и выбран нужный тип — "zoom" вторым аргументом.
// 60.4.1 Кстати, первым аргументом мы могли бы написать и список типов в виде union type.
type ZoomType = Extract<MyAnimation, "zoom">; // "zoom"

// 60.5.0 Ещё один utility type с названием "Record" позволяет сконструировать другой тип в формате "ключ — значение". Представим, что нам нужно для игры создать новый тип объекта, где ключами будут имена игроков, а значениями будут страны с их произвольными названиями валют.
type PlayersNames = "al" | "ketio";

// 60.5.1 Итак в дженерик-обёртку "Record" первым аргументом помещаем то, что у нас будет ключами объекта, а вторым то, что будет в качестве значений этих ключей.
type CreateCustomCurrencies<T> = {
  [P in keyof T]: string;
}

type CustomCurrencies = CreateCustomCurrencies<Currencies>;

type GameDataCurrency = Record<PlayersNames, CustomCurrencies>;

// 60.5.2 Ну, и для примера создадим также подходящий под новый тип объект.
const gameData: GameDataCurrency = {
  al: {
    usa: "USD",
    europe: "EUR",
    britain: "GBP",
    australia: "AUD",
    japan: "JPY",
    russia: "RUB",
    china: "CNY",
  },
  ketio: {
    usa: "USD",
    europe: "EUR",
    britain: "GBP",
    australia: "AUD",
    japan: "JPY",
    russia: "RUB",
    china: "CNY",
  },
};