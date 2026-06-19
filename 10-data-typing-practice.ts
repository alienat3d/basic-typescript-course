// 10.0 Здесь мы просто практикуемся базовой типизации TypeScript, пройденной на прошлых уроках. Представим, что здесь у нас в переменной "currRate" находится данные из JSON, полученные от API свежего курса валют.
const currencyRate = "73.18";

// 10.1 Запрос на сервер совершает функция "fetchCurrency", у которой есть аргумент "response" (ответ от сервера), затем его мы передаём в метод "parse", чтобы получить объект.
const fetchCurrency = (response: string): number => {
  const data: number = JSON.parse(response);
  return data;
};

// 10.2 Следующая функция "transferUsdToRur" уже будет переводить доллары в рубли. У этой функции три аргумента: 1) булево значение (available), которые используется в условии; 2) количество денег (amount); 3) комиссия банка за конвертацию валют (commission). Итак, внутри этой функции получается текущий курс с сервера и парсится из строки JSON в нужные данные, а потом перемножается с другими аргументами.
function transferUsdToRur(available: boolean, amount: number, commission: number): string {
  if (available) {
    let result: string = (fetchCurrency(currencyRate) * amount * commission).toString();
    console.log(result);
    return result;
    // Или запись в элемент на странице вместо консоли
  } else {
    console.log("Сейчас обмен недоступен");
    return "Сейчас обмен недоступен";
  }
}

transferUsdToRur(false, 500, 1.05);
