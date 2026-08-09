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
  _weight: number = 1000;

  // 91.1.2 Здесь мы применяем функцию-декоратор сеттера "logOnSet" собственно к сеттеру. ↓
  @logOnSet
  set weight(num: number) {
    this._weight = this._weight + num;
  }

  @logOnGet
  get weight() {
    return this._weight;
  }

  @checkNumberOfSeats(4)
  freeSeats: number = 3;

  @checkAmountOfFuel
  isOpen(value: string) {
    return this.open ? "open" : `close ${value}`;
  }
}

// 91.1.0 Итак, здесь мы будем создавать функцию-декоратор отдельно для сеттера и для геттера. Начнём с сеттера, назовём декоратор "logOnSet". Аннотация этого метода будет различной, в зависимости от того создаём ли мы узконаправленный декоратор аксессоров или более общий. Давайте разберём здесь оба варианта, начиная с узконаправленного. Сначала заменим параметры: "target" у нас останется, но это будет типом-прописанной функцией, где аргументом будет число, а результатом будет "void". Вторым параметром будет "context", где типом установим специальный интерфейс "ClassSetterDecoratorContext". Тип возвращаемого значения нам здесь уже не нужен.
/*function logOnSet(
  target: (value: number) => void,
  context: ClassSetterDecoratorContext,
) {
  // 91.1.1 Здесь уже нет "PropertyDescriptor", как в старом контексте, поэтому мы не сохраним предыдущее значение аксессоров. А ещё мы будем разделять сеттер и геттер на разные функции, потому, что нет дескриптора и мы не сможем их комбинировать, получая и то и другое в одной функции. В новом синтаксисе ES-декоратора сеттера мы просто возвращаем функцию, которая будет декорировать\модифицировать сеттер (на самом деле этот декоратор будет очень похож на декоратор метода класса). В новом синтаксисе нам не нужно "лезть под капот" и изменять методы аксессоров, а мы просто возвращаем нужную функцию. ↑
  return function (this: any, ...args: any) {
    console.log(`Изменяем значение на ${[...args]}`);
    return target.apply(this, args);
  };
}*/

// 91.3.0 Также стоит помнить, что мы можем сделать декораторы более стабильными по типам при помощи дженериков.  ↓
function logOnSet<T, R>(
	target: (this: T, value: number) => R,
	context: ClassSetterDecoratorContext<T, number>
) {
	return function (this: T, ...args: any): R {
		console.log(`Изменяем значение на ${[...args]}`);
		return target.apply(this, args);
	};
}

// 91.2 Переходим к созданию декоратора геттера. И в целом, здесь всё то же самое, что и с сеттером. Только для описания функции для "target" возвращать будем уже число, а не "void" (ведь геттер должен возвращать какое-то значение). И аргументов у этой функции не будет. А также типом у "context" будет соответственно "ClassGetterDecoratorContext". ↑
/*function logOnGet(
  target: () => number,
  context: ClassGetterDecoratorContext,
) {
  return function (this: any) {
    console.log(`Test`);
    return target.apply(this);
  };
}*/

// 91.3.1 Сделаем декоратор геттера тоже дженериком:
function logOnGet<T, R>(
	target: (this: T) => R,
	context: ClassGetterDecoratorContext<T, number>
) {
	return function (this: T): R {
		console.log(`Test`);
		return target.apply(this);
	};
}

function checkNumberOfSeats(limit: number) {
  return function (target: undefined, context: ClassFieldDecoratorContext) {
    return function (this: any, newAmount: number) {
      if (newAmount >= 1 && newAmount < limit) {
        return newAmount;
      } else {
        throw Error(`Больше ${limit} сидений быть не может, меньше 1 тоже`);
      }
    };
  };
}

function checkAmountOfFuel<T, A extends any[], R>(
  target: (this: T, ...args: A) => R,
  context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>,
) {
  return function (this: T, ...args: A): R {
    // console.log(this.fuel);
    console.log(`${String(context.name)} был запущен`);
    return target.apply(this, args);
  };
}

function changeDoorStatus(status: boolean) {
  console.log("door init");
  return <T extends { new(...args: any[]): {} }>(
    target: T,
    context: ClassDecoratorContext<T>,
  ) => {
    console.log("door changed");
    return class extends target {
      open = status;
    };
  };
}

function changeAmountOfFuel(amount: number) {
  console.log("fuel init");
  return <T extends { new(...args: any[]): {} }>(
    target: T,
    context: ClassDecoratorContext<T>,
  ) => {
    console.log("fuel changed");
    return class extends target {
      fuel = `${amount}%`;
    };
  };
}

const car = new myCar();

car.weight = 3;

console.log(car.weight);