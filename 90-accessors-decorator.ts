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
  // 90.1.0 В принципе, «декоратор аксессоров» работает всё по тому же принципу, что и, например, «декоратор метода» и синтаксис у них одинаков. Итак, для нашего примера сперва создадим новое свойство "_weight" (условно "вес автомобиля").
	_weight: number = 1000;

  // 90.1.1 Дальше мы создаём аксессоры геттер и сеттер. В сеттере у нас будет параметр "num", куда будет приходить некое число, которое мы будем прибавлять к имеющемуся весу автомобиля. Представим, что это будет добавочный вес, при увеличении числа пассажиров, едущих в машине и\или груза. ↓
  // 90.1.7 Теперь применим декоратор сеттера на сеттер (причём не важно, к какому из двух аксессоров мы применяем декоратор аксессоров). ↓
	@log
	set weight(num: number) {
		this._weight = this._weight + num;
	}

	get weight() {
		return this._weight;
	}

	@checkNumberOfSeats(4)
	freeSeats: number;

	@checkAmountOfFuel
	isOpen(value: string) {
		return this.open ? "open" : `close ${value}`;
	}
}

// 90.1.2 Далее мы создадим функцию-декоратор для аксессоров, который пример 3 параметра, но из них нам пригодится здесь лишь только 1 — дескриптор.
function log(
  /* ? 90.1.3 Иногда, когда какие-то параметры не используются, то можно увидеть их в синтаксисе как нижние подчёркивания. Это вроде заглушки для тех стандартных параметров, которые, однако не будут использоваться в данной функции. Но совсем не обязательно следовать этому стилю кода, если он кажется ненужным и неочевидным:
  _: Object,
  __: string | symbol, */
	target: Object,
	propertyKey: string | symbol,
	descriptor: PropertyDescriptor
): PropertyDescriptor | void {
  // 90.1.4 Мы будем модифицировать поведение аксессоров, а значит нам нужно получить старые значения аксессоров в переменные "oldSet" и "oldGet". Вспомним, что в дескрипторе находятся все дескрипторы, включая геттеры и сеттеры.
	const oldSet = descriptor.set;
	const oldGet = descriptor.get;
	descriptor.set = function (this: any, ...args: any) {
    // 90.1.6 Раз уже декоратор называется "log", то давайте выведем в консоль, что мы изменяем значение на то значение, которое передадим в сеттер. ↑
		console.log(`Изменяем значение на ${[...args]}`);
    // 90.1.5 Когда у нас предыдущее значение сохранено, можно вызвать оригинальный метод. И это действительно нам необходимо, т.к. значение сета мы обычно дополняем. Нам не нужно изменять сам функционал перезаписи значения. Не забудем указать оператор опциональности, т.к. "oldSet" может отсутствовать, т.е. быть в значении "undefined". ↑
		return oldSet?.apply(this, args);
	};
  // 90.2.0 Вернёмся к декоратору и также дополним функционал геттера. Здесь уже обойдёмся без аргументов, ведь геттер только получает значение.
	descriptor.get = function () {
    // 90.2.1 Внутри тела функции мы также будем производить логирование строки, а также вернём "oldGet", т.е. предыдущее значение геттера с методом "apply" в котором контекст вызова, как мы делали в сеттере чуть выше. ↓
		console.log(`Получено значение из геттера`);
		return oldGet?.apply(this);
	};
}

function checkNumberOfSeats(limit: number) {
	return function (target: Object, propertyKey: string | symbol) {
		let symbol = Symbol();

		const getter = function (this: any) {
			return this[symbol];
		};

		const setter = function (this: any, newAmount: number) {
			if (newAmount >= 1 && newAmount < limit) {
				this[symbol] = newAmount + 1;
			} else {
				// console.log(`Больше ${limit} сидений быть не может`);
				Object.defineProperty(target, "errors", {
					value: `Больше ${limit} сидений быть не может`,
				});
			}
		};

		Object.defineProperty(target, propertyKey, {
			get: getter,
			set: setter,
		});
	};
}

function checkAmountOfFuel(
	target: Object,
	propertyKey: string | symbol,
	descriptor: PropertyDescriptor
): PropertyDescriptor | void {
	const oldValue = descriptor.value;
	descriptor.value = function (this: any, ...args: any[]) {
		console.log(this.fuel);
		return oldValue.apply(this, args);
	};
}

function changeDoorStatus(status: boolean) {
	return <T extends { new (...args: any[]): {} }>(constructor: T) => {
		return class extends constructor {
			open = status;
		};
	};
}

function changeAmountOfFuel(amount: number) {
	return <T extends { new (...args: any[]): {} }>(constructor: T) => {
		return class extends constructor {
			fuel = `${amount}%`;
		};
	};
}

const car = new myCar();

// 90.1.8 Протестируем работает ли наш декоратор сеттера. Мы видим в консоли, что вес машины изменился на 3 и выводится в консоль сообщение, что значение было изменено, а значит декоратор работает, как ожидалось. ↑
// 90.2.2 Ещё один тест: отлично, значение геттера получается и строка выводится в консоль, а значит декоратор работает на оба аксессора.
car.weight = 3;

console.log(car.weight);