// 21.2.0 В функции из прошлого урока есть как раз такой аргумент "timingFunc", где будет очень даже уместно применить приём с псевдонимами типов. Для этого мы создадим отдельный псевдоним типов "AnimationTimingFunc" с помощью ключевого слова "type" и присвоим ему список литеральных типов. Обратите внимание, что название псевдонима типов указывается начиная с большой буквы.
type AnimationTimingFunc = "ease" | "ease-out" | "ease-in";

// 21.3 Конечно же в псевдоним типов мы можем класть не только литеральные типы, но и обычные. Создадим такой псевдоним также для типизации аргумента "id".
type AnimationId = string | number;

// ? 21.4 Такие псевдонимы типов можно создавать внутри функций, методов классов, объектов или отдельных модулей и т.п.

// 21.2.1 Теперь мы можем использовать этот псевдоним типов, где потребуется, вместо перечисления каждый раз этой вереницы литеральных типов.
function createAnimation(
  id: AnimationId,
  animName: string,
  timingFunc: AnimationTimingFunc = "ease",
  // timingFunc: "ease" | "ease-out" | "ease-in" = "ease",
  duration: number,
  iterCount: "infinite" | number,
): void {
  const elem = document.querySelector(`#${id}`) as HTMLElement;

  if (elem) {
    elem.style.animation = `${animName} ${timingFunc} ${duration} ${iterCount}`;
    console.log(`${animName} ${timingFunc} ${duration} ${iterCount}`);
  }
}

createAnimation("id", "fade", "ease-in", 5, "infinite");