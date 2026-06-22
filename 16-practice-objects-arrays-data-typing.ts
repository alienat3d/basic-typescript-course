// 16.0 Продолжаем практику типизации в TypeScript. Время поработать с объектами и массивами. Задача здесь у нас будет по типизации функционала по вычислению стоимости услуг за электроэнергию и воду, а также выставление счёта.
// 16.1 Итак, у нас тут объекты данных по электричеству и по воде.
// электричество: 8 руб. кВт/ч
// вода: 66,87 руб./м³
const electricityUserData = {
  readings: 95,
  units: "kWt",
  mode: "double",
};

const waterUserData = {
  readings: 3,
  units: "m³",
};

// 16.2 Также у нас тут перечислена стоимость электричества и воды за единицу ("rate").
const elRate: number = 0.45;
const wRate: number = 2;

// 16.3 Эта переменная, куда в виде массива будут записываться результаты вычислений стоимости, на основе введённых данных.
const monthPayments: number[] = [0, 0]; // [electricity, water]

// 16.4 А эта функция вычисляет сколько в итоге нужно заплатить пользователю за электричество и воду.
const calculatePayments = (
  {readings, mode}: { readings: number; mode: string; },
  wData: { readings: number; },
  elRate: number, wRate: number,
): void => {
  if (mode === "double" && readings < 50) {
    monthPayments[0] = readings * elRate * 0.7;
  } else {
    monthPayments[0] = readings * elRate;
  }

  monthPayments[1] = wData.readings * wRate;
};

calculatePayments(electricityUserData, waterUserData, elRate, wRate);

// 16.5 Ну, а дальше эта функция отправит отчёт пользователю о стоимости, согласно введённых им данных.
const sendInvoice = (
  [el, water]: number[],
  electricityUserData: { readings: number; units: string; },
  waterUserData: { readings: number; units: string; }): string => {
  return `    Hello!
    This month you used ${electricityUserData.readings} ${electricityUserData.units} of electricity
    It will cost: ${el}€
    
    This month you used ${waterUserData.readings} ${waterUserData.units} of water
    It will cost: ${water}€
    
    Total costs: ${el && water ? el + water : ''}€`;
};

const invoice = sendInvoice(monthPayments, electricityUserData, waterUserData);
console.log(invoice);