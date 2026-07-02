// 38.4.1 Но, прежде чем создавать "switch...case" конструкцию поможем сами себе добавлением в интерфейсы также названия для каждого, т.е. свойство "name" с литеральным типом. ↓
interface Car {
  name: "car";
  engine: string;
  wheels: number;
}

interface Ship {
  name: "ship";
  engine: string;
  sail: string;
}

interface Airplane {
  name: "airplane";
  engine: string;
  wings: string;
}

// 38.4.3 И вот, представим, что нам дали задачу спустя какое-то длинное время добавить сюда ещё один интерфейс для, скажем, "super airplane". ↓
interface SuperJet {
  name: "superjet";
  engine: string;
  wings: string;
}

// 38.3.1 Для того, чтобы избежать повторений, вынесем все эти типы в псевдоним типов "Vehicle". ↓
// 38.4.4 Мы также добавим его в список интерфейсов сюда. ↓
type Vehicle = Car | Ship | Airplane | SuperJet;

function isCar(car: Vehicle): car is Car {
  return "wheels" in car;
}

function isShip(ship: Vehicle): ship is Ship {
  return "sail" in ship;
}

// 38.3.0 Вернёмся к примеру с функцией "repairVehicle". Здесь у нас всего два варианта в аргументе "vehicle". Но, может так случиться, что спустя время нам нужно дополнить эту функцию, чтобы она также могла работать, например с новым интерфейсом "Airplane". ↑
/*function repairVehicle(vehicle: Car | Ship): void {
  if (isCar(vehicle)) {
    vehicle.wheels;
  } else if (isShip(vehicle)) {
    vehicle.sail;
  } else {
    // 38.1 Итак, начнём с того, что вспомним функцию из примера на прошлом уроке, где мы уже сказали, что последнее условие даст нам тип "never", т.к. на самом деле, до этого блока никогда не дойдёт, ведь у нас здесь есть лишь две опции на выбор "Car" или "Ship". И т.к. мы уже сказали, что в тип "never" можно поместить только что-то с таким же типом "never", то можно провести следующий эксперимент. Мы создадим переменную с типом "never" и поместим туда "vehicle". Ошибки не будет, т.к. в этом блоке "vehicle" становится типом "never".
    const someVar: never = vehicle;
  }
}*/

// 38.2 Вспомним также ещё одну функцию из более ранних уроков этого курса, где мы создавали т.н. "исчерпывающую проверку". Здесь, при вызове функции "createError" также ничего не возвращалось, т.е. у сущности также тип "never". Ок, это было небольшое отступление, чтобы вспомнить, как мы уже использовали тип "never" раньше. ↑
/*function logBdayMsg(
  isBday: boolean,
  name: string,
  age: number,
): string {
  if (isBday) {
    return `Congratulations, name! Today is your birthday and you turned ${age}. Wow! 🎂`;
  } else {
    return "No birthday for today."
  }
  return createError("Some error occurred");
}*/

// 38.4.0 Но по мере разрастания всех опций структур объекта, которые может принимать аргумент "vehicle" станет логично заменить систему условного ветвления на конструкцию "switch...case", что больше подходит для определения нужного интерфейса объекта среди многих. К слову, эту конструкцию "switch...case" тоже можно назвать типом "type guard", т.к. здесь идёт сужение типов до определённого интерфейса приходящего в функцию объекта. ↑
// 38.4.5 При этом мы, к примеру, совсем забыли добавить кейс для нового интерфейса в эту функцию. И, к сожалению, TypeScript не увидел в этом ошибки... ↓
function repairVehicle(vehicle: Vehicle) {
  // 38.4.2 Итак, зададим, что "switch...case" будет проверять свойство "name" и при совпадении выводить их свойства в консоль. ↑
	switch (vehicle.name) {
		case "car":
			console.log(vehicle.wheels);
			break;
		case "ship":
			console.log(vehicle.sail);
			break;
		case "airplane":
			console.log(vehicle.wings);
			break;
      // 38.4.8 Добавим этот кейс и TS-ошибка исчезнет.
      case "superjet":
			console.log(vehicle.wings);
			break;
    default:
      // 38.4.7 И, чтобы предупредить подобные проблемы, мы можем использовать тип "never" в этом блоке. Создадим переменную типа "never" и поместим аргумент "vehicle" внутрь неё. Теперь TypeScript сразу предупредит нас, что интерфейс "SuperJet" нельзя помещать внутрь переменной с типом "never" и это будет подсказкой, что вообще-то мы забыли указать последний кейс на проверку объекта соответствия структуре интерфейса "SuperJet".
			const smth: never = vehicle;
      // 38.4.6 ..., т.к. TypeScript думает, что к интерфейсу "SuperJet" относится последний блок "default". И ошибки появятся только на этапе "runtime", либо мы получим неправильное поведение приложения. ↑
			// console.log(vehicle);
			console.log("Oops!");
	}
}
