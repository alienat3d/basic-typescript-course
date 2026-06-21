/* const isBirthdayData: boolean = true;
const birthdayPersonData: string = "John";
const ageData: number = 40; */

// 14.1 Представим, что эти данные, использующиеся в функции теперь приходят к нам в виде объекта, а не отдельных переменных, как раньше.
// ? 14.3 Кроме этого можно заметить, что если в объекте есть другие поля, то это никак не будет мешать вызову функции "logBirthday", т.к. она их не использует. Или, говоря более профессиональным языком, можно передать объект шире, чем в аннотации (и, кстати, это не во всех языках программирования возможно).
// 14.5.0 Мы можем пойти дальше и деструктурировать также вложенные объекты. Например, у нас также есть вложенное поле "messages" с сообщением ошибке, которое мы хотим использовать потом в функции. ↓
const userData = {
  isBirthdayData: true,
  birthdayPersonData: "John",
  ageData: 40,
  isMarried: false,
  occupation: "Web Developer",
  messages: {
    error: "Error",
  },
};

const createError = (msg: string): never => {
  throw new Error(msg);
};

// 14.2.0 В аргументах к функции у нас уже будет "data", а типом этому аргументу укажем объект. Т.е. теперь у нас один аргумент, который является объектом и мы указываем его структуру, т.е. какие в нём должны быть поля и каких типов данных. По сути мы здесь типизировали объект на этапе его использования в функции "logBirthday". (Важное замечание, что такой способ типизации объектов применяется скорее редко, а чаще используются т.н. "interface", которые мы обсудим в последующих уроках.)
/*const logBirthday = (data: {
  isBirthdayData: boolean,
  birthdayPersonData: string
  ageData: number
}): string => {
  if (data.isBirthdayData) {
    return `Congratulations for birthday, ${data.birthdayPersonData}! Wow, your age is ${data.ageData + 1} already!`;
  } else {
    return createError("Error");
  }
};*/

// 14.4.0 Однако, когда объекты у нас комплексные и вложенные, то хочется как-то такой код оптимизировать. Сделать это можно при помощи деструктуризации, чтобы не повторять написание слово "data", при использовании полей этого объекта.
// 14.4.1 Итак, чтобы деструктурировать объект "data", нам нужно вытащить из него 3 свойства. ↑
// 14.5.1 И теперь, чтобы его использовать, то мы должны вытащить деструктурированием также поле "messages" и тогда мы ещё раз на вложенном уровне проведём ещё одну деструктуризацию и вытащим из него поле "error". Но теперь, чтобы не было ошибок нам также необходимо добавить и аннотацию для поля "messages", где мы говорим, что внутри будет объект с полем "error" в котором будет находиться тип данных string.
const logBirthday = ({
                       isBirthdayData,
                       birthdayPersonData,
                       ageData,
                       messages: {error}, // Сокр. синтаксис, то же самое, что и "messages: {error: error}"
                     }: {
  isBirthdayData: boolean,
  birthdayPersonData: string
  ageData: number,
  messages: { error: string },
}): string => {
  if (isBirthdayData) {
    return `Congratulations for birthday, ${birthdayPersonData}! Wow, your age is ${ageData + 1} already!`;
  } else {
    return createError(error);
  }
};

// 14.2.1 Теперь при вызове этой функции у нас чётко видно, что требуется сюда передать, если навести на название вызова функции. И если произойдёт отклонение от схемы объекта, то TS сразу же оповестит об этом (например, если внутри объекта какое-то из свойств написано с опечаткой или имеет иной тип данных, чем в описанной схеме). ↑
console.log(logBirthday(userData));