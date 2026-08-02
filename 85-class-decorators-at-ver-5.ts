// ? 85.1.0 Итак, возьмём уже известный по предыдущим урокам пример класса машины с декораторами и рассмотрим на нём какие изменения появились в синтаксисе начиная с 5-й версии TypeScript. Разработчики TypeScript в этой версии отходят от экспериментального синтаксиса декораторов, который был на протяжении многих лет до этого и приходят к тому, какое сейчас поведение на этапе "proposal" (см. в ссылках "Proposal decorators" и "Подробно про изменения в декораторах").
// ? 85.1.1 Теперь декораторы содержат два основных аргумента: "target" (к чему можно применять декоратор) & "context" (объект, который содержит дополнительную информацию, состоящую из списка конкретных свойств, описывающих то, к чему мы применяем этот декоратор). В нативном JavaScript (см. ссылку "Proposal decorators") собственно аналогичный синтаксис с двумя аргументами и теми же свойствами внутри объекта "context".
// ? 85.1.2 Важный момент, что теперь существует два способа создания декораторов и настройка "experimentalDecorators" внутри файла TS-конфига [tsconfig.json] отвечает за это, т.е. переключая булево значение мы либо включаем старый стиль написания декораторов, либо новый.
// 85.2.0 Ок, давайте рассмотрим, что же нам следует переделать в нашем классе и его декораторах, чтобы они работали без ошибок в более новых версиях TypeScript. ↓
interface ICar {
	fuel: string;
	open: boolean;
	freeSeats: number;
}

@changeDoorStatus(true)
@changeAmountOfFuel(95)
class myCar implements ICar {
	fuel: string = "50%";
	open: boolean = true;
	freeSeats: number;
	isOpen() {
		console.log(this.fuel);
		return this.open ? "open" : "close";
	}
}

// 85.2.1 Закомментируем старый синтаксис декораторов, чтобы сравнить с новым. ↓
// function changeDoorStatus(status: boolean) {
// 	console.log("door init");
// 	return <T extends { new (...args: any[]): {} }>(constructor: T) => {
// 		console.log("door changed");
// 		return class extends constructor {
// 			open = status;
// 		};
// 	};
// }

/*function changeAmountOfFuel(amount: number) {
  console.log("fuel init");
// 85.2.3 Как можно заметить, в изначальной версии у декоратора лишь 1 аргумент "constructor". ↓
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    console.log("fuel changed");
    return class extends constructor {
      fuel = `${amount}%`;
    };
  };
}*/

// 85.2.2.0 Напомним, что "changeDoorStatus" — это фабрика декораторов, а сам декоратор внутри неё возвращается первым/внешним "return".
function changeDoorStatus(status: boolean) {
	console.log("door init");
  // 85.2.2.1 декоратор ↑
  // 85.2.4 Но в новой редакции TypeScript будет на это ругаться, поэтому, согласно новому синтаксису заменим "constructor" на два аргумента "target" (то, к чему применяется декоратор: класс, метод, аксессор) & "context" (этот объект должен быть типизирован, как специальный интерфейс "ClassDecoratorContext", который будет давать детали о том, к чему применяется этот декоратор и для каждого декоратора он будет отличаться). ↓
	return <T extends { new (...args: any[]): {} }>(
		target: T,
		context: ClassDecoratorContext<T>
	) => {
		console.log("door changed");
		return class extends target {
			open = status;
		};
	};
}

function changeAmountOfFuel(amount: number) {
	console.log("fuel init");
  // 85.2.5 То же мы сделаем и для второго декоратора, добавив ему такие же аргументы.
	return <T extends { new (...args: any[]): {} }>(
		target: T,
		context: ClassDecoratorContext<T>
	) => {
		console.log("fuel changed");
		return class extends target {
			fuel = `${amount}%`;
		};
	};
}

const car = new myCar();
console.log(car.isOpen());