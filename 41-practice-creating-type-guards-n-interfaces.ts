// ? 41.1 Одна из встречающихся на собеседованиях задач это типизация псевдокода при работе с сервером. Представим, что мы создаём сервис по подбору животного из питомника.

type AnimalTypes = "cat" | "dog" | "bird" | "rodent" | "amphibian";

// Можно и не создавать перечисление, но вдруг в будущем статусов будет больше?
enum AnimalStatus {
  Available = "available",
  NotAvailable = "not available",
}

interface AnimalRequest {
  animal: AnimalTypes,
  breed: string,
  sterilized?: boolean
}

// ? 41.2 А также у нас есть два варианта ответа сервера: положительный и отрицательный.

// Чтобы не повторять код используем возможность расширения интерфейсов при помощи "extends".
interface AnimalAvailableData extends AnimalRequest {
  location: string,
  age?: number
}

interface AnimalNotAvailableData {
  message: string,
  nextUpdateIn: Date
}

// Интерфейсы стоит разделить, так как оба ответа будут иметь поле data
// И только по статусу будет сложно определить данные

interface AnimalAvailableResponse {
	status: AnimalStatus.Available;
	data: AnimalAvailableData;
}

const positiveResponse: Response = {
  status: AnimalStatus.Available,
  data: {
    animal: "bird",
    breed: "Dodo",
    sterilized: false,
    location: "Mauritius island",
    age: 10,
  },
};

const negativeResponse: Response = {
  status: AnimalStatus.NotAvailable,
  data: {
    message: "We are very sorry, but the animal you requested is currently not available in our animal shelters.",
    nextUpdateIn: new Date(180000),
  },
};

// Создадим интерфейс с дженериком для ответа от сервера
interface NetworkResponse<Status, Data> {
  status: Status;
  data: Data;
}

// 3. Combine them into your specific Response union
type Response =
  | NetworkResponse<AnimalStatus.Available, AnimalAvailableData>
  | NetworkResponse<AnimalStatus.NotAvailable, AnimalNotAvailableData>;

// Напишем "type guard" функцию для проверки доступности запрашиваемого животного
function isAvailable(response: Response): response is AnimalAvailableResponse {
	return response.status === AnimalStatus.Available;
}

// ? 41.3 Помимо формирования правильных интерфейсов принимаемых объектов, нужно также подготовить эту функцию к работе с ними, включая "type guards".
function checkAnimalData(animal: Response): AnimalAvailableData | string {
  if (isAvailable(animal)) {
    console.log(animal.data);
    return animal.data;
  } else {
    console.log(`${animal.data.message} You can try to contact us again in ${animal.data.nextUpdateIn.getMinutes()} minutes.`);
    return `${animal.data.message} You can try to contact us again in ${animal.data.nextUpdateIn.getMinutes()} minutes.`;
  }
}

checkAnimalData(positiveResponse);
checkAnimalData(negativeResponse);