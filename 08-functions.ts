const isBirthdayData: boolean = true;
const birthdayPersonData: string = "John";
const ageData: number = 40;

// 8.1.0 Создадим простую функцию "logBirthday" для вывода сообщения, которая примет 3 аргумента флажок "isBirthday", имя и возраст именинника. Для улучшения стабильности кода мы можем установить тип данных для каждого из аргументов, но если мы пока не хотим жёстко закреплять за аргументами тип данных, то мы можем поставить им "any" (хотя для стабильности кода это лучше поменять на конкретный тип данных).
// ? 8.1.1 Либо же, чтобы нас не беспокоили подобные ошибки, то в конфиге TS можно отключить данную проверку. Для этого нужно в "tsconfig.json" файле конфигурации TS проекта найти "noImplicitAny" — это настройка, которая отвечает за то, будет нам говорить об этих ошибках IDE или нет (трогать эти настройки в реальных проектах не рекомендуется, но хорошо знать где они для, например каких-то тестов).
// ? 8.2.0 Также в TS есть возможность указать, что именно будет возвращать функция. В нашем случае она ничего не возвращает, чем соответствует слово "void" (т.е. "пустота"). "void" в TS значит не только отсутствие возвращаемого функцией значения, но и его игнорирование. Это полезно при совмещении некоторых функций. Но если функция возвращает какой-то тип данных, то его конечно следует указать вместо "void".
// function logBirthday(isBirthday: any, birthDayPerson: any, age: any) {
function logBirthday(isBirthday: boolean, birthDayPerson: string, age: number): void {
  if (isBirthday) {
    console.log(`Congratulations for birthday, ${birthDayPerson}! Wow, your age is ${age + 1} already!`);
  }
  // ? 8.2.1 На самом деле в JS любая функция что-то возвращает, хотя бы undefined, поэтому если бы мы написали здесь это, то ошибки не будет (строчка ниже написана для теста и практического смысла в себе не несёт).
  // return undefined;
}

// logBirthDay(isBirthdayData, birthdayPersonData, ageData);
logBirthday(true, "Jim", 33);

// 8.3 Давайте перепишем функцию выше на строчную функцию, а также укажем, что она возвращает строчный тип данных (рекомендуется это делать со всеми функциями для наглядности). Однако, по условию "isBirthday" может находиться в позиции false и тогда функция вернёт не строчный тип, а undefined. Чтобы это исправить добавим в условие блок "else", который вернёт также строку.
const logBirthday2 = (isBirthday: boolean, birthDayPerson: string, age: number): string => {
  if (isBirthday) {
    return `Congratulations for birthday, ${birthDayPerson}! Wow, your age is ${age + 1} already!`;
  } else {
    return "Error";
  }
};

logBirthday2(isBirthdayData, birthdayPersonData, ageData);