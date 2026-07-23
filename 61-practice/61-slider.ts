interface ISlider {
  container?: string;
  numberOfSlides?: number;
  speed?: 300 | 500 | 700;
  direction?: "horizontal" | "vertical";
  dots?: boolean;
  arrows?: boolean;
  animationName?: string;
}

function createSlider({
                        container = "",
                        numberOfSlides = 1,
                        speed = 300,
                        direction = "horizontal",
                        dots = true,
                        arrows = true,
                      }: ISlider = {}): void {
  console.log(container, numberOfSlides, speed, direction, dots, arrows);
}

createSlider();

// ? 61.6.0 Здесь представим, что у нас уже есть какой-то готовый слайдер, однако у нас задача создать другой тип слайдера, который будет похож на предыдущий, но с рядом отличий. Для этого нужно будет создать новый интерфейс, который будет аннотировать объект "customSliderOptions".
// (Go to [/61-practice/61 - form.ts])
// Необходимо типизировать объект настроек, который будет зависим от интерфейса ISlider. Все поля в нем обязательны для заполнения.

// 61.6.1 Т.к. в объекте "customSliderOptions", описывающем новый слайдер, нет поля "animationName", то мы его уберём обёрткой "Omit". Также, заметим, что хотя в объекте нового слайдера и есть поле "speed", но здесь оно уже должно иметь возможность получать произвольное значение, а не фиксированные величины, записанные в union type оригинального интерфейса. Потому нам будет проще также исключить и поле "speed", чтобы потом его добавить в новый тип "ICustomSlider" вновь. Ну, а вторая обёртка "Required" сделает все поля обязательными (можно было бы сделать для этого отдельный тип, но для укорочения кода часто вкладывают одну обёртку в другую).
type CustomSliderBase = Required<Omit<ISlider, "animationName" | "speed">>;

interface ICustomSlider extends CustomSliderBase {
  speed: number;
}

const customSliderOptions: ICustomSlider = {
  container: "id",
  numberOfSlides: 4,
  speed: 1100,
  direction: "horizontal",
  dots: true,
  arrows: true
};

function createCustomSlider(options: ICustomSlider): void {
  if ("container" in options) {
    console.log(options);
  }
}

createCustomSlider(customSliderOptions);