// 24.6.1 Мы изменим здесь название переменных, чтобы IDE не давал ошибок. А также уберём типизацию этих двух объектов, представив, что они приходят к нам в код из-вне (иначе правильнее было бы всё-таки оставили типизацию этих объектов). ↓
const serverTestConfig = {
  protocol: "https",
  port: 3001,
  role: "admin",
};

const backupTestConfig = {
  protocol: "http",
  port: 3000,
};

// 24.6.3 Итак, давайте опишем этот объект "config" для TypeScript с помощью интерфейса.
interface BasicConfig {
  protocol: string;
  port: number;
}

// 24.6.2 Здесь эта функция, вместо того, чтобы принимать кучу аргументов, примет лишь один объект "config".
// 24.6.4 А дальше мы указываем для аргумента "config", что он должен соответствовать объекту с конкретной структурой описанной в интерфейсе "BasicConfig". При помощи такого интерфейса, который указан типом в аргументе функции мы можем фильтровать объекты, приходящие в эту функцию по их структуре.
const startTestServer = (config: BasicConfig): "Server started" => {
  console.log(`Server started on ${config.protocol}://server:${config.port}`);

  return "Server started";
};

startTestServer(serverTestConfig);
startTestServer(backupTestConfig);