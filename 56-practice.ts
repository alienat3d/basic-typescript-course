interface IPhone {
  company: string;
  number: number;
}

// "IMobilePhone" должен наследоваться от IPhone, тип свойства companyPartner зависит от свойства "company"

interface IMobilePhone extends IPhone {
  size: string;
  companyPartner: IPhone["company"];
  manufactured: Date;
}

// Типизировать объект phones

const phones: IMobilePhone[] = [
  {
    company: "Nokia",
    number: 1285637,
    size: "5.5",
    companyPartner: "MobileNokia",
    manufactured: new Date("2022-09-01"),
  },
  {
    company: "Samsung",
    number: 4356637,
    size: "5.0",
    companyPartner: "SamMobile",
    manufactured: new Date("2021-11-05"),
  },
  {
    company: "Apple",
    number: 4552833,
    size: "5.7",
    companyPartner: "no data",
    manufactured: new Date("2022-05-24T12:00:00"),
  },
  {
    company: "Blackview",
    number: 2353455,
    size: "6.67",
    companyPartner: "no data",
    manufactured: new Date("2023-08-21"),
  },
];

interface IPhonesManufacturedAfterDate extends IMobilePhone {
  initialDate: string;
}

// Функция должна отфильтровать массив данных и вернуть новый массив с телефонами, выпущенными после даты в третьем аргументе

// Дженерик здесь не подходит, т.к. нужна большая специфичность для типизации аргументов функции.
function filterPhonesByDate(
  phones: IMobilePhone[],
  key: keyof IMobilePhone,
  initial: string,
): IPhonesManufacturedAfterDate[] {
  return phones.filter(phone => {
    const manufactured = phone[key];
    if (manufactured instanceof Date && manufactured.getTime() > new Date(initial).getTime()) {
      return phone;
    }
  })
    .map(phone => {
      return {...phone, initialDate: initial};
    });
}

// Второй аргумент при вызове функции должен быть связан с первым, а значит мы получим подсказки - свойства этого объекта

console.log(filterPhonesByDate(phones, "manufactured", "2022-01-01"));

// В принципе задача решена верно, но ради практики можно ещё подумать о том, как всё-таки её решить дженериком? Итак, что же мы можем сделать, чтобы убрать TS-ошибку, при этом использовать дженерик-типы? К примеру, мы можем сделать опциональными все свойства объектов внутри массива "IPhonesManufacturedAfterDate" с помощью Partial.
// Однако, в этом случае, повышая гибкость снизилась стабильность и предсказуемость кода. Теперь мы сможем передавать в функцию объекты шире, но не уже интерфейса. Мы, кстати, можем также дописать "extends IMobilePhone", ограничивая всё-таки тип.
// ? Если же нам потребуется работать с любыми объектами, даже если они уже своего интерфейса, то можно использовать стандартный дженерик без ограничения. Тогда в принципе должно и так нормально работать, если, к примеру, в одном из объектов не будет найдено поле "initialDate". Просто метод "filter" пропустит это поле и перейдёт к следующем.
function filterPhonesByDate2<T extends IMobilePhone>(
  phones: T[],
  key: keyof T,
  initial: string,
): Partial<IPhonesManufacturedAfterDate>[] {
  return phones.filter(phone => {
    const manufactured = phone[key];
    if (manufactured instanceof Date && manufactured.getTime() > new Date(initial).getTime()) {
      return phone;
    }
  })
    .map(phone => {
      return {...phone, initialDate: initial};
    });
}

console.log(filterPhonesByDate2(phones, "manufactured", "2022-01-01"));