enum TransferStatus {
  Pending = "pending",
  Rejected = "rejected",
  Completed = "completed",
}

enum ErrorMessages {
  NotFound = "Not found: 404",
  NotEnoughSpace = "Not enough space: 507",
  Forbidden = "Forbidden: 403",
}

interface ITransfer {
  path: string;
  data: string[];
  date?: Date | undefined;
  start: (p: string, d: string[]) => string;
  stop: (reason: string) => string;
}

interface TransferError {
  message: ErrorMessages;
}

// Получает случайным образом число от 1 до 3 и возвращает какую-то строку, в зависимости от того, какое число выпало.
const getRandomMessage = (enumType: string): string => {
  const randomNumber = Math.floor(Math.random() * 3);
  if (enumType === "status") {
    const enumValues = Object.values(TransferStatus);
    return `Статус отправки данных: "${enumValues[randomNumber]}".`;
  } else {
    const enumValues = Object.values(ErrorMessages);
    return `Отправка данных прервана из-за ошибки: "${enumValues[randomNumber]}".`;
  }
};

// Класс должен имплементировать ITransfer и TransferError
class SingleFileTransfer implements ITransfer, TransferError {
  path: string;
  data: string[];
  date?: Date | undefined;
  message: ErrorMessages;

  constructor(path: string, data: string[]) {
    this.path = path;
    this.data = data;
  }

  start = (path: string, data: string[]) => {
    return "";
  };

  // Необходимо создать метод checkTransferStatus, проверяющий состояние передачи данных
  // Можно вывести в консоль данные, можно вернуть строку
  checkTransferStatus = (status: string) => status;

  // Необходимо создать метод, который будет останавливать передачу данных
  // И возвращать строку с причиной и датой остановки (Дата в любом формате)
  stop = (reason: string) => {
    const formattedDate = new Date().toLocaleString("ru-RU", {
      dateStyle: "long",
      timeStyle: "medium",
    });

    return `Запись от ${formattedDate}: ${reason}`;
  };

  // Необходимо создать метод, который будет возвращать строку, содержащую
  // Статус передачи и любое сообщение об ошибке. На ваш выбор или отталкиваться от приходящего аргумента
  // Метод может показаться странным, но может использоваться для тестов, например
  makeError = (error: string) => {
    // При ошибке статус всегда "отклонено"
    return `Статус: "${TransferStatus.Rejected}"; Сообщение об ошибке: "${error}".`;
  };
}

const transfer = new SingleFileTransfer("pathToServer", ["some data", "more data"]);

console.log(transfer.checkTransferStatus(getRandomMessage("status")));
console.log(transfer.stop(getRandomMessage("error")));
console.log(transfer.makeError(getRandomMessage("error")));