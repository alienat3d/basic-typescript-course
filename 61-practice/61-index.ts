// ? 61.0 Здесь мы попрактикуемся на нескольких упражнениях формированию новых типов, используя знания, полученные на предыдущих уроках, где мы изучили две важные и взаимосвязанные темы — дженерик-типы и манипуляции с типами. И, если с первыми, кажется, что всё понятно — они используются для создания шаблонов, то тема манипуляций с типами без соответствующей практики вначале может даже казаться излишней.
// ? 61.1 Понемножку нужно формировать такое мышление, что при помощи этих манипуляций с типами становится проще аннотировать наш код и сущности в нём. Ведь конечная цель формирования типов — это описание сущностей в JavaScript: объектов, массивов, функций, переменных, аргументов и т.д. И когда становится очевидно, что сложную структуру нужно как-то описать, то стоит задать себе вопросы: "Зависит ли от чего-то эта структура?" "Могу ли я сформировать её как-то проще, чтобы не копировать код?" И, вспоминая все темы с прошлых уроков, отвечать себе на эти вопросы. Это нормально, что вначале вы будете держать постоянно открытыми документацию и\или конспекты этого курса, но, со временем, это станет второй натурой.

// ? 61.2 Здесь у нас будет три задачи, разбитых по разным файлом, начиная с этого [61-practice/index.ts], где нужно типизировать большой объект.

// Необходимо типизировать этот большой объект
// Свойство futureClasses должно быть в зависимости от classes по типу
// Свойства exClients и futureClients тоже должны быть в зависимости от currClients
// ИЛИ все три зависят от общего родителя

// Простыми словами: при добавлении свойства в целевой объект они должны быть
// автоматически добавлены в зависимые (сразу подсказка от TS)

// 61.3.0 Создаём интерфейс для объекта поля "classes" в общем объекте "fitnessClubCenter".
interface IFitnessClass {
  name: string;
  startsAt: string;
  duration: number;
}

// 61.3.1 Затем для объекта следующего поля "futureClasses" мы экстендимся от предыдущего интерфейса "IFitnessClass", при этом используя обёртку "Omit" мы убираем поле "startsAt" и пропишем внутрь новое "willStartsAt".
interface IFutureClass extends Omit<IFitnessClass, "startsAt"> {
  willStartsAt: string;
}

// 61.4.0 Создаём новый интерфейс для поля клиентов "currClients".
interface IClient {
  name: string;
  age: string | number;
  gender: "male" | "female";
  timeLeft: string;
  makeCallFor: Date;
}

// 61.4.1 Затем, для поля "exClients" нам нужно убрать поле "makeCallFor" при помощи обёртки "Omit".
type CurrClient = Omit<IClient, "makeCallFor">;

// 61.4.2 Для поля "exClients" мы уберём поле "timeLeft".
type ExClient = Omit<IClient, "timeLeft">;

// 61.4.3 А для поля "futureClients" вытащим в тип только поля "name" и "makeCallFor".
type FutureClient = Pick<IClient, "name" | "makeCallFor">;

// 61.5 Ну, и соответственно добавим их всех в качестве массивов, которыми они являются в интерфейс главного объекта.
// (Go to [/61-practice/61 - slider.ts])
interface IFitnessClub {
  clubName: string;
  location: string;
  classes: IFitnessClass[];
  futureClasses: IFutureClass[];
  currClients: CurrClient[];
  exClients: ExClient[];
  futureClients: FutureClient[];
}

const fitnessClubCenter: IFitnessClub = {
  clubName: "Fitness club Center",
  location: "central ave. 45, 5th floor",
  classes: [
    {
      name: "yoga",
      startsAt: "8:00 AM",
      duration: 60,
    },
    {
      name: "trx",
      startsAt: "11:00 AM",
      duration: 45,
    },
    {
      name: "swimming",
      startsAt: "3:00 PM",
      duration: 70,
    },
  ],
  futureClasses: [
    {
      name: "boxing",
      willStartsAt: "6:00 PM",
      duration: 40,
    },
    {
      name: "breath training",
      willStartsAt: "8:00 PM",
      duration: 30,
    },
  ],
  currClients: [
    {
      name: "John Smith",
      age: "-",
      gender: "male",
      timeLeft: "1 month",
    },
    {
      name: "Alice Smith",
      age: 35,
      gender: "female",
      timeLeft: "3 months",
    },
    {
      name: "Ann Sonne",
      age: 24,
      gender: "female",
      timeLeft: "5 months",
    },
  ],
  exClients: [
    {
      name: "Tom Smooth",
      age: 50,
      gender: "male",
      makeCallFor: new Date("2023-08-12"),
    },
  ],
  futureClients: [
    {
      name: "Maria",
      makeCallFor: new Date("2023-07-10"),
    },
  ],
};
