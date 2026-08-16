import "reflect-metadata";

const limitMetadataKey = Symbol("limit");

interface ICar {
	fuel: string;
	open: boolean;
	freeSeats: number;
}

@ChangeDoorStatus(false)
@ChangeAmountOfFuel(95)
class myCar implements ICar {
	fuel: string = "50%";
	open: boolean = true;
	test: any;

  // ? 94.2.1 А ещё, в документации сказано, что декораторы параметров могут являться конструктором. Ведь конструктор это по сути обычный метод, у которого есть параметры и их мы можем декорировать.
	constructor(@Limit() test: number) {
		this.test = test;
	}

	@CheckNumberOfSeats(4)
	freeSeats: number;

	@CheckAmountOfFuel()
	isOpen(value: string) {
		return this.open ? "open" : `close ${value}`;
	}

	@Validate()
	startTravel(@Limit() passengers: number) {
		console.log(`Started with ${passengers} passengers`);
	}
}

// ? 94.1 Итак, рассмотрим порядок выполнения декораторов на уже привычном примере класса автомобиля с различными декораторами, привязанными к нему. Мы добавили сюда выводы в консоль, чтобы точно увидеть, когда каждый декоратор инициализируется, а когда выполняется. Однако, тут нужно уточнить, что здесь можно было бы добавить ещё несколько вещей в это логирование, а именно декораторы статичных свойств (которые, кстати, инициализируются и вызываются после обычных свойств и методов класса) или методов класса, а ещё декораторы аксессоров.
/* ? 94.2.0 Итак, нажмём выполнения кода и рассмотрим что же происходит в действительности с выполнением декораторов:
* Init: Property Decorator // сначала инициализируется декоратор свойств ("CheckNumberOfSeats") и т.к. у него нет цепочки, связанной с запуском других декораторов, то он сразу идёт в работу — "Call" на след. строчке
* Call: Property Decorator
* Init: Method Decorator // далее идёт инициализация декоратора метода ("Validate")
* Init: Parameter Decorator // сразу за декоратором метода идёт инициализация декоратора параметров этого же метода, по цепочке
* Call: Parameter Decorator // затем идёт вызов сначала декоратора параметров...
* Call: Method Decorator // ...а за ним уже декоратора метода (вспоминаем принцип вызова функции внутри другой функции, где инициализация функций идёт снаружи внутрь, а запуск наоборот изнутри наружу)
* Init: Class Decorator Door // обратите внимание, что здесь идёт инициализация сразу двух декораторов класса и первым идёт верхний декоратор (т.е. который будет первым считан интерпретатором кода)
* Init: Class Decorator Fuel
* Init: Parameter Decorator // затем идёт инициализация декоратора параметра внутри конструктора...
* Call: Parameter Decorator // ...а затем сразу его вызов
* Call: Class Decorator Fuel // ну, и в самом конце, вызываются декораторы класса, начиная с самого внутреннего (иди нижнего в коде)...
* Call: Class Decorator Door // ...и заканчивая самым внешним (самым верхним в коде)
↑ */
function Limit() {
	console.log("Init: Parameter Decorator");
	return (
		target: Object,
		propertyKey: string | symbol,
		parameterIndex: number
	) => {
		console.log("Call: Parameter Decorator");
		let limitedParameters: number[] =
			Reflect.getOwnMetadata(limitMetadataKey, target, propertyKey) || [];
		limitedParameters.push(parameterIndex);
		Reflect.defineMetadata(
			limitMetadataKey,
			limitedParameters,
			target,
			propertyKey
		);
	};
}

function Validate() {
	console.log("Init: Method Decorator");
	return (
		target: Object,
		propertyKey: string | symbol,
		descriptor: PropertyDescriptor
	) => {
		console.log("Call: Method Decorator");
		let method = descriptor.value;

		descriptor.value = function (...args: any) {
			let limitedParameters: number[] = Reflect.getOwnMetadata(
				limitMetadataKey,
				target,
				propertyKey
			);

			if (limitedParameters) {
				for (let index of limitedParameters) {
					if (args[index] > 4) {
						throw new Error("Нельзя больше 4х пассажиров");
					}
				}
			}
			return method?.apply(this, args);
		};
	};
}

function CheckNumberOfSeats(limit: number) {
	console.log("Init: Property Decorator");
	return function (target: Object, propertyKey: string | symbol) {
		console.log("Call: Property Decorator");
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

function CheckAmountOfFuel() {
	console.log("Init: Method Decorator");
	return (
		target: Object,
		propertyKey: string | symbol,
		descriptor: PropertyDescriptor
	): PropertyDescriptor | void => {
		console.log("Call: Method Decorator");
		const oldValue = descriptor.value;
		descriptor.value = function (this: any, ...args: any[]) {
			console.log(this.fuel);
			return oldValue.apply(this, args);
		};
	};
}

function ChangeDoorStatus(status: boolean) {
	console.log("Init: Class Decorator Door");
	return <T extends { new (...args: any[]): {} }>(constructor: T) => {
		console.log("Call: Class Decorator Door");
		return class extends constructor {
			open = status;
		};
	};
}

function ChangeAmountOfFuel(amount: number) {
	console.log("Init: Class Decorator Fuel");
	return <T extends { new (...args: any[]): {} }>(constructor: T) => {
		console.log("Call: Class Decorator Fuel");
		return class extends constructor {
			fuel = `${amount}%`;
		};
	};
}

const car = new myCar(3);
car.startTravel(3);