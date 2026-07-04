// ? 43.0 Здесь мы потренируемся работе с элементами DOM-дерева на языке TypeScript. Здесь у нас представлен функционал сбора данных из форм. Наша задача написать и типизировать таким образом, чтобы код был как можно более стабильным и безошибочным в работе.
// ? 43.1 В данном примере собираются данные из двух разных форм, чтобы сформировать единый объект "formData", чтобы затем отправить его на сервер.

const forms = document.querySelectorAll("form");
const emailInput = document.querySelector("#email") as HTMLInputElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const textarea = document.querySelector("#text") as HTMLTextAreaElement;
const checkbox = document.querySelector("#checkbox") as HTMLInputElement;

interface IFormData {
  email: string;
  title: string;
  text: string;
  checkbox: boolean;
}

const formData: IFormData = {
  email: "",
  title: "",
  text: "",
  checkbox: false,
};

// Последовательность действий:
// 1) Происходит submit любой из форм
// 2) Все данные из 4-х полей со страницы переходят в свойства объекта formData
// 3) Запускается функция validateFormData с этим объектом, возвращает true/false
// 4) Если на предыдущем этапе true, то запускается функция checkFormData с этим объектом

function validateFormData(data: IFormData) {
  // Если каждое из свойств объекта data правдиво...
  if (data.email && data.title && data.text && data.checkbox) {
    return true;
  } else {
    console.log("Please, complete all fields");
    return false;
  }
}

function checkFormData(data: IFormData) {
  const {email} = data;
  const emails = ["example@gmail.com", "example@ex.com", "admin@gmail.com"];

  // Если email совпадает хотя бы с одним из массива
  if (emails.includes(email)) {
    console.log("This email is already exist");
  } else {
    console.log(`Posting data: ${JSON.stringify(formData)}...`);
  }
}

forms.forEach((form) => {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // Можно и создавать другой объект для соблюдения иммутабельности, но пока не обязательно
    formData.email = emailInput?.value ?? "";
    formData.title = titleInput?.value ?? "";
    formData.text = textarea?.value ?? "";
    formData.checkbox = checkbox?.checked ?? false;

    if (validateFormData(formData)) checkFormData(formData);
  });
});