// ? 49 В этом практическом занятии мы создадим собственные дженерик-типы и закрепим недавно пройденные темы о них.
// Создать Generic-интерфейс PlayerData, который подходил бы для создания таких объектов:

type NumberOrString = number | string;

interface PlayerData<Game extends NumberOrString, Hours> {
  game: Game;
  hours: Hours;
  server: string;
}

const player1: PlayerData<string, number> = {
  game: "CS:GO",
  hours: 300,
  server: "basic",
};

const player2: PlayerData<number, string> = {
  game: 2048,
  hours: "300 h.",
  server: "arcade",
};

// const player3: PlayerData<string, object> = { // можно было и так прописать, но мы пропишем его более подробно:
const player3: PlayerData<string, { total: number, inMenu: number }> = {
  game: "Chess",
  hours: {
    total: 500,
    inMenu: 50,
  },
  server: "chess",
};

// ================================================== //

// Массив данных с фигурами содержит объекты, у каждого из которых обязательно есть свойство "name".
// Каждый объект может еще содержать дополнительные свойства в случайном виде.
// Свойство "name" может иметь только 4 варианта.
// Функция "calculateAmountOfFigures" должна принимать массив с объектами, у которых обязательно должно быть свойство "name".
// Возвращает она объект-экземпляр "AmountOfFigures".
// Внутри себя подсчитывает сколько каких фигур было в массиве и записывает результаты в "AmountOfFigures".
// С текущими данными в консоль должно попадать: "{ squares: 3, circles: 2, triangles: 2, others: 1 }".

// Первое, что бросилось в глаза из условия, что здесь ограниченное кол-во фигур. Это значит мы можем использовать enum.
enum FigureNames {
  Rect = "rect",
  Triangle = "triangle",
  Line = "line",
  Circle = "circle",
}

// Также у нас в условии написано, что каждый объект должен содержать свойство "name", а остальные опционально. Когда мы проходили ограничение типов, то мы изучали, что мы можем TypeScript сказать, что в функции, куда аргументом приходит объект, нужно ограничить объекты определёнными свойствами, которые должны находиться внутри. Поэтому создадим новый интерфейс, в котором мы скажем, что должно находиться свойство "name". А значение этого свойства "name" должно ориентироваться на перечисление строк "FigureNames", т.к. только эти значения там могут быть.
interface Figure {
  name: FigureNames;
}

interface AmountOfFigures {
  rectangles: number;
  circles: number;
  triangles: number;
  others: number;
}

interface CustomFigure extends Figure {
  data?: object;
}

// Переходим к типизации функции. Пропишем, что эта функция будет принимать и как будет обрабатывать данные внутри. В условии сказано, что поступающие в "calculateAmountOfFigures" данные могут быть только массивом с объектами, которые все содержат свойство "name". И, сперва может показаться, что возможно просто указать типом "Figure[]". Но нет, TypeScript выдаст ошибку, т.к. помимо свойства "name" у нас во многих объектах ещё встречается свойство "data" с объектом внутри. Тогда давайте обратимся к дженерик-типам, где мы возьмём идентификатор "T" и ограничим его интерфейсом "Figure" с помощью ключ. слова "extends". И т.к. у нас в аргумент приходит массив объектов, то типом для аргумента будет "T[]", т.е. массив идентификаторов дженерика, ограниченных интерфейсом "Figure", который говорит, что свойство "name" должно быть во всех объектах, а остальные свойства — опциональны.
// function calculateAmountOfFigures(figure: Figure[]): AmountOfFigures { // — такой тип не подходит
function calculateAmountOfFigures<T extends Figure>(figure: T[]): AmountOfFigures {
  const amount: AmountOfFigures = {
    rectangles: 0,
    circles: 0,
    triangles: 0,
    others: 0,
  };
  figure.forEach(obj => {
    switch (obj.name) {
      case FigureNames.Rect:
        amount.rectangles += 1;
        break;
      case FigureNames.Circle:
        amount.circles += 1;
        break;
      case FigureNames.Triangle:
        amount.triangles += 1;
        break;
      default:
        amount.others += 1;
    }
  });

  return amount;
}

const data: CustomFigure[] = [
  {
    name: FigureNames.Rect,
    data: {a: 5, b: 10},
  },
  {
    name: FigureNames.Rect,
    data: {a: 6, b: 11},
  },
  {
    name: FigureNames.Triangle,
    data: {a: 5, b: 10, c: 14},
  },
  {
    name: FigureNames.Line,
    data: {l: 15},
  },
  {
    name: FigureNames.Circle,
    data: {r: 10},
  },
  {
    name: FigureNames.Circle,
    data: {r: 5},
  },
  {
    name: FigureNames.Rect,
    data: {a: 15, b: 7},
  },
  {
    name: FigureNames.Triangle,
  },
];

console.log(calculateAmountOfFigures(data));