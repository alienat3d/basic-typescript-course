// 70.1.0 В современном JavaScript появилась удобная возможность "поля классов" ("public class fields"). И именно эта возможность дала нам возможность создать все поля вне конструктора. В более старых редакция JavaScript все поля приходилось создавать внутри конструктора.
class Container {
  // 70.1.1 Теперь можно сразу указывать значение полю и убрать его из конструктора. ↓
  width: number = 235;
  height: number;
  volume: number | undefined;
  _content: string | undefined;

  constructor(height: number, volume?: number, content?: string) {
    this.height = height;
    this.volume = volume;
    this._content = content;
  }

  calculateVolume(): number {
    if (!this.volume) {
      this.volume = this.width * this.height;
      return this.volume;
    } else {
      return this.volume;
    }
  }

  checkIfFits(shipVolume: number): string;
  checkIfFits(shipVolumesArray: number[]): string;
  checkIfFits(shipVolume: number | number[]): string {
    if (typeof shipVolume === "number") {
      return shipVolume >= this.width ? "Container fits." : "Container doesn't fit.";
    } else {
      return shipVolume.some(volume => volume >= this.width) ? "Container fits." : "Container doesn't fit.";
    }
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = `Date: ${new Date().toTimeString()}; Content: ${value}`;
  }
}

const newContainer = new Container(270);

// ? 70.2.0 Переходим к ещё одной возможности, которую называют "индексные сигнатуры" ("index signatures"). Эту возможность мы уже встречали в интерфейсах объекта. Проще говоря, это когда мы точно не знаем сколько будет свойств у объекта, но знаем их типы.
// 70.2.1 Рассмотрим на отдельном примере класса. Внутри класса пропишем, что название полей будут строками и значения у них также будут строки.
class Styles {
  // [s: string]: string;
  // 70.2.5 Тут, чтобы избавиться от TS-ошибки мы должны здесь изменить тип "string" на union type c описанной функцией "string | ((value: string) => boolean)". Но, как мы можем тут заметить это не совсем удобный способ работы с классами, хотя наверняка изредка могут встретиться примеры для его использования и знать о нём не помешает.
  [s: string]: string | ((value: string) => boolean);

  // 70.2.4 Но у такой записи есть и свои нюансы, к примеру, если нам будет нужно создать метод в такой классе, то придётся немного модифицировать код. Если просто добавить, как обычно, сюда метод, то будет TS-ошибка, которая гласит, что метод не подходит под сигнатуру, т.к. он типа "() => void" и это не согласуется с типом string. ↑
  method() {
    // ...some code...
  };
}

// 70.2.2 Далее мы создадим экземпляр объекта стилей из класса "Styles".
const style = new Styles();

// 70.2.3 Дальше можно заполнять этот объект новыми свойствами. И соответственно, значениями здесь могут быть лишь строки, т.к. мы указали в классе выше, что все значения у нас строки. ↑
style.color = "green";
style.fontFamily = "Roboto";