interface ICar {
	fuel: string;
	open: boolean;
	freeSeats: number;
}

@changeDoorStatus(false)
@changeAmountOfFuel(95)
class myCar implements ICar {
	fuel: string = "50%";
	open: boolean = true;
	errors: any;

	@checkNumberOfSeats(4)
	freeSeats: number = 3;

	@checkAmountOfFuel
	isOpen(value: string) {
		return this.open ? "open" : `close ${value}`;
	}
}

// 89.1.0 Итак, как мы уже делали до этого с другими декораторами в прошлых уроках, рассмотрим новый синтаксис, появившийся с версии TypeScript 5+. И, как уже говорилось, в любом декораторе нового синтаксиса будет два параметра: "target" & "context". И вот, когда мы прописываем декоратор свойств класса, то "target" будет типизирован, как "undefined", а второй параметр "context" типизируем специальным интерфейсом "ClassFieldDecoratorContext".
// 89.1.1 И, если в старом синтаксисе у нас тут был дескриптор, к которому мы обращались, чтобы поменять аксессоры, а ещё был целевой объект в параметре "target", то теперь нет ни того, ни другого. Поэтому и метод "defineProperty" мы уже применить не сможем. Из этого следует, что и сами дескрипторы, вроде "enumerable", "writable" и др. мы уже здесь у этого свойства изменить не сможем. Поэтому очень много внутреннего функционала мы должны здесь убрать, например аксессоры убираются, а также вызов метода "defineProperty" тоже.
// ? 89.2.1 И вот, мы приходим к тому выводу, что такие декораторы, как здесь срабатывают только на этапе установки начального значения свойства. Но после создания объекта валидации при помощи декоратора не будет. И это логично, ведь здесь мы просто возвращаем функцию, а не вмешивались в "get" & "set", которые этим занимались на этапе экспериментальных декораторов. Здесь нет даже возможности поработать с "get" & "set", т.к. нет "propertyDescriptor". Однако и тут есть решение, если заглянуть внутрь интерфейса "ClassFieldDecoratorContext", то и там обнаружится свойство "access", а внутри него "get" & "set", которые можно использовать, чтобы изменить эти дескрипторы.
// ? 89.2.2 На момент выхода урока аналогичного функционала динамической проверки было написать не возможно. Но вероятно с тех пор это уже исправили, т.ч. можно обратиться к документации или поискать в интернете.
function checkNumberOfSeats(limit: number) {
	return function (target: undefined, context: ClassFieldDecoratorContext) {
    // 89.1.1 Здесь мы просто вернём функцию-декоратор с контекстом и параметром "newAmount" для проверки верхнего лимита свободных сидений в машине. ↓
		return function (this: any, newAmount: number) {
			if (newAmount >= 1 && newAmount < limit) {
				return newAmount;
			} else {
				throw Error(`Свободных мест должно быть не меньше 1, но и не больше ${limit}.`);
			}
		};
	};
}

function checkAmountOfFuel<T, A extends any[], R>(
	target: (this: T, ...args: A) => R,
	context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
) {
	return function (this: T, ...args: A): R {
		// console.log(this.fuel);
		console.log(`${String(context.name)} был запущен`);
		return target.apply(this, args);
	};
}

function changeDoorStatus(status: boolean) {
	console.log("door init");
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
// 89.2.0 Теперь проведём эксперимент и присвоим здесь свойству "freeSeats" значение "-1". В итоге получаем в консоль, что валидация у нас не сработала. ↑
car.freeSeats = -1;
console.log(car);