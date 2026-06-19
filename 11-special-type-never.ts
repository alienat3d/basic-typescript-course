const isBirthdayData: boolean = true;
const birthdayPersonData: string = "John";
const ageData: number = 40;

// 11.1 И вот давайте здесь создадим пример такой функции "createError". Эта функция у нас будет создавать ошибки.
// ? 11.3.0 Но какое же значение вернёт эта функция? Оператор "throw" выбрасывает ошибку и заканчивает выполнение функции "createError".
const createError = (msg: string): never => {
  throw new Error(msg);
  // ? 11.3.1 И если мы добавим сюда ещё команду, например console.log(), то это будет считаться недоступным кодом. И даже если мы напишем "return undefined;" это всё равно будет "unreachable code". Получается, что эта функция ничего не возвращает. И вот это как раз случай, когда у нас результатом будет тип "never", что значит, функция заканчивает работу без всякого возвращения значения в принципе. В отличие от типа "void", где функция не возвращает данных, но доходит до "return undefined;".
  // console.log(1);
};

// ? 11.3.2 Кстати, если мы помести выбрасывание ошибки в условие, то тип "never" уже не подходит, т.к. TypeScript не может заранее знать по какой ветке условия код пройдёт. Здесь уже будет тип "void". ↓
const createError2 = (msg: string): void => {
  if (msg) throw new Error(msg);
};

const logBirthday = (
  isBirthday: boolean,
  birthDayPerson: string,
  age: number): string => {
  // 11.5.0 Рассмотрим ещё один пример, и для него мы немного расширим условие функции "logBirthday". Первое условие у нас будет теперь выполнятся, если isBirthday в значении true, а другое соответственно в false.
  if (isBirthday === true) {
    return `Congratulations for birthday, ${birthDayPerson}! Wow, your age is ${age + 1} already!`;
  } else if (isBirthday === false) {
    // 11.2 Теперь здесь, где раньше возвращалась строка "Error" вернём выполнение функции "createError". ↑
    // return createError("Error");
    // 11.5.1 Здесь мы теперь снова возвращаем строку.
    return "Too bad, no birthday party for today!";
  }
  // 11.5.2 И вот, чтобы TS не ругался, что у нас нет финального блока "else", мы вернём вне условия ошибку. Т.о. мы избегаем возвращения undefined функцией, если ни одно из двух условий выше не подошло. Т.к. у функции "createError" тип "never". В документации такая конструкция называется "исчерпывающая проверка".
  return createError("Error");
};

logBirthday(isBirthdayData, birthdayPersonData, ageData);

// 11.4 Ещё один пример применения типа "never" — это запуск синхронного кода, который никогда не может завершиться (infinite loop). Например, если поместить в неё цикл "while". (Эта функция написана исключительно в тестовых целях и в реальной жизни не применяется.) Кстати, то же касается и рекурсии, которая никогда не заканчивается. ↑
const neverendingFunction = (): never => {
  while (true) {
  }
};