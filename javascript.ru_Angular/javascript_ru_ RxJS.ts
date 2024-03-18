//--------------
//__Введение__//
//1)cb - callback сначало были, сложно для работы и был ад cb

//2)promise - хорош когда мы работаем с одним значением
const sequence = new Promise((res) => {
  let count = 1;
  setInterval(() => {
    res(count++);
  });
});

sequence.then((v) => console.log(v));
sequence.then((v) => console.log(v));

//3)генераторы (acync / await и т.д)
const sequence = (function* iteratorFn() {
  let item = 1;
  while (true) {
    yield item++;
  }
})();
console.log(sequence.next().value); //1
console.log(sequence.next().value); //2
console.log(sequence.next().value); //3
console.log(sequence.next().value); //4
console.log(sequence.next().value); //5
console.log(sequence.next().value); //6
//минус должны постоянно запрашивать значения (pull effect)

//4)rxjs
//rxjs использовать по надобности когда появляеться комплексная логика
import { interval } from "rxjs";

//получаем множество значений
interval(1000).subscribe((v) => {
  console.log(v); //1,2,3 ....
});

//-----------------------
//__ReactiveX паттерн__//
//ReactiveX = iterator + observer + FP

// ReactiveX - это библиотека реактивного программирования, которая объединяет концепции итераторов, наблюдателей и функционального программирования (FP).

// Итераторы
// Итераторы - это объекты, которые позволяют перебирать элементы коллекции по одному за раз. В ReactiveX итераторы используются для создания последовательностей элементов, которые могут быть обработаны реактивным способом.

// Наблюдатели
// Наблюдатели - это объекты, которые подписываются на последовательности элементов и получают уведомления, когда элементы становятся доступными. В ReactiveX наблюдатели используются для создания реактивных потоков данных, которые могут быть обработаны и преобразованы.

// Функциональное программирование (FP)
// Функциональное программирование - это парадигма программирования, которая подчеркивает использование функций, неизменяемых данных и избегание побочных эффектов. В ReactiveX FP используется для создания чистых и декларативных реактивных программ.

//Объединение итераторов, наблюдателей и FP ReactiveX объединяет эти три концепции, предоставляя мощный набор инструментов для создания реактивных программ. Итераторы используются для создания последовательностей элементов, наблюдатели используются для обработки и преобразования этих последовательностей, а FP используется для создания чистых и декларативных программ.

//iterator - стандартизация последовательности во времени
//согласно протоколу итератора - это набор методов, которые позволяют объекту выступать в качестве итератора
//Объект итератора должен иметь метод next(), который возвращает объект с двумя свойствами:
//done: логическое значение, указывающее, завершена ли итерация.
//value: значение текущего элемента в итерации.
//Метод [Symbol.iterator]() возвращает объект итератора, который реализует метод next(). Это позволяет использовать пользовательский итератор в циклах for...of.
class CustomIterator {
  private cursor = 0;
  private value: number;

  constructor(private arr: number[], private divisor = 1) {}

  public next() {
    while (this.cursor < this.arr.length) {
      this.value = this.arr[this.cursor++];
      if (this.value % this.divisor === 0) {
        return { done: false, value: this.value };
      }
    }
    return { done: true, value: this.value };
  }

  [Symbol.iterator]() {
    return {
      next: this.next.bind(this),
    };
  }
}

const consumer = new CustomIterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
console.log(consumer.next()); //{ done: false, value: 3};
console.log(consumer.next()); //..6
console.log(consumer.next()); //..9
console.log(consumer.next()); //..10

for (let item of consumer) {
  console.log("iteration 1", item);
} //3 6 9

Array.from(consumer).forEach((v) => {
  console.log("iteration 2", v);
}); //3 6 9

//Оbserver
//Паттерн проектирования Observer (Наблюдатель) - это поведенческий паттерн, который определяет зависимость "один ко многим" между объектами, так что когда состояние одного объекта изменяется, все его зависимые объекты уведомляются и обновляются автоматически
interface IListener {
  next(message: string): void;
}

class Producer {
  private listeners: IListener[] = [];

  public subscribe(listener: IListener) {
    const index = this.listeners.push(listener);
    return {
      //использовать для отмены подписки слушателя
      unsubscribe: () => {
        this.listeners.splice(index - 1, 1);
      },
    };
  }

  //Метод notify() принимает строковое сообщение в качестве аргумента и уведомляет всех подписчиков, вызывая их метод next() с переданным сообщением.
  public notify(message: string) {
    this.listeners.forEach((listener) => {
      listener.next(message);
    });
  }
}

const listener1 = {
  next(message: string) {
    console.log("Listener 1", message);
  },
};

const listener2 = {
  next(message: string) {
    console.log("Listener 2", message);
  },
};

const notifier = new Producer();

const sub1 = notifier.subscribe(listener1);
const sub2 = notifier.subscribe(listener2);

notifier.notify("Hi all RxJS is awesome ");

sub1.unsubscribe();

setTimeout(() => {
  notifier.notify(" After unsubscribe ");
}, 5000);

//----------------------
//__Lazy push collection__//
//Lazy push collection (ленивая коллекция с отложенным добавлением) - это тип коллекции, которая откладывает добавление элементов в коллекцию до тех пор, пока они не будут запрошены. Это означает, что коллекция не хранит все элементы в памяти сразу, а вместо этого вычисляет их по мере необходимости
//Пока не подпишимся он не измениться

//У нас бывают потоки конечные(запросы) и бесконечные потоки (websocket)

const sequence$ = new Observable((subscriber) => {
  //кастомный Observable
  let count = 1;
  const intervalId = setInterval(() => {
    if (count % 5 === 0) {
      clearInterval(intervalId);
      subscriber.complete();
      return;
    }
    subscriber.next(count++);
  }, 1000);
  return () => {
    //по умолчанию будет возврощать сообщение
    console.log("unsubscribe");
    clearInterval(intervalId);
  };
});

const subscription = sequence$.subscribe(
  //next
  (v) => {
    console.log(v);
  },
  //error
  () => {},
  //completed
  () => {
    console.log("completed");
  }
);

setInterval(() => {
  //unsubscribe() - не отписываеться от всего потока а как в паттерне Оbserver только от конретного подписчика
  //Прервет получения данных конкретного подписчика но поток будет жить до сих пор
  subscription.unsubscribe();
}, 3000);
//1
//2
//unsubscribe

//--------------
//__hot/cold__//
//горячая и холодная подписка

// Горячая подписка
// Горячая подписка подключается к существующему потоку данных и начинает получать события с момента подписки.
// События, которые произошли до подписки, не будут получены.
// Горячие подписки обычно используются для потоков данных, которые постоянно генерируют события, например, потоки данных в реальном времени или потоки данных из событий системы.

// Холодная подписка
// Холодная подписка создает новый поток данных, когда происходит подписка.
// События, которые произошли до подписки, будут получены.
// Холодные подписки обычно используются для потоков данных, которые не постоянно генерируют события, например, потоки данных из базы данных или потоки данных из файлов.

const observable = Rx.Observable.interval(1000);

// Горячая подписка
observable.subscribe((value) => {
  console.log(`Горячая подписка: ${value}`);
});

// Холодная подписка
//Когда функция setTimeout выполняется, она создает новую подписку на поток данных observable
setTimeout(() => {
  observable.subscribe((value) => {
    console.log(`Холодная подписка: ${value}`);
  });
}, 3000);

//Горячий поток: Когда продюсер (в данном случае WebSocket) находится вне наблюдаемого объекта (observable), это горячий поток. Это означает, что поток данных генерируется независимо от того, есть ли подписчики или нет. Горячие потоки обычно используются для потоков данных в реальном времени, таких как потоки данных из событий системы или потоки данных из датчиков.
const socket: WebSocket = new WebSocket("wss://echo.websocket.org");
const sequence$ = new Observable((subscriber) => {
  socket.addEventListener("message", (e) => subscriber.next(e));
});

//Холодный поток: Когда продюсер находится внутри наблюдаемого объекта, это холодный поток. Это означает, что поток данных не генерируется до тех пор, пока не будет создана подписка. Холодные потоки обычно используются для потоков данных, которые не постоянно генерируют события, например, потоки данных из базы данных или потоки данных из файлов.
const sequence$ = new Observable((subscriber) => {
  const socket: WebSocket = new WebSocket("wss://echo.websocket.org");
  socket.addEventListener("message", (e) => subscriber.next(e));
});

//---------------
//__Operators__//

//ajax
//Создает наблюдаемый объект, который выполняет асинхронный запрос AJAX и возвращает ответ в виде объекта XMLHttpRequest.
import { ajax } from "rxjs/ajax";

const request$ = ajax("/api/users");

request$.subscribe((response) => {
  console.log(response.status, response.response);
});
//200 {id: 1, name: 'John Doe'}

// bindCallback
// Преобразует функцию обратного вызова в наблюдаемый объект. Функция обратного вызова вызывается с переданными аргументами, а результат передается подписчикам.
import { bindCallback } from "rxjs";

const fs = require("fs");

const readFile$ = bindCallback(fs.readFile);

readFile$("README.md").subscribe((data) => {
  console.log(data.toString());
});
/* 
# This is a README file

This file is used to provide information about the project, such as:

* The purpose of the project
* How to use the project
* How to contribute to the project
*/

// bindNodeCallback
// Подобно bindCallback, но предназначен для функций обратного вызова, которые используют стиль ошибок первого аргумента Node.js.
import { bindNodeCallback } from "rxjs";

const fs = require("fs");

const readFile$ = bindNodeCallback(fs.readFile);

readFile$("README.md").subscribe({
  next: (data) => {
    console.log(data.toString());
  },
  error: (err) => {
    console.error(err);
  },
});
/* 
# This is a README file

This file is used to provide information about the project, such as:

* The purpose of the project
* How to use the project
* How to contribute to the project
*/

// defer
////множество условий
// Создает наблюдаемый объект, который откладывает создание внутреннего наблюдаемого объекта до момента подписки. Это позволяет создавать наблюдаемые объекты на основе динамических значений или асинхронных операций.
import { defer } from "rxjs";

const getUser$ = defer(() => {
  return ajax("/api/users");
});

getUser$.subscribe((user) => {
  console.log(user);
});
//{id: 1, name: 'John Doe'}

const random = Math.round(Math.random() * 10);
const complexConditional$ = defer(() => {
  if (random > 5) {
    if (random >= 8) {
      return of("Значение больше 5 и больше или равно 8");
    } else {
      return of("Значение больше 5 и меньше 8");
    }
  } else {
    return of("Значение меньше или равно 5");
  }
});
complexConditional$.subscribe((v) => console.log(v));

//empty
//Создает наблюдаемый объект, который не генерирует никаких значений и завершается сразу после подписки.
import { empty } from "rxjs";

const empty$ = empty();

empty$.subscribe({
  complete: () => {
    console.log("Completed");
  },
});
//Completed

// from
// Преобразует итерируемый объект или массив в наблюдаемый объект, который генерирует значения из объекта или массива.
import { from } from "rxjs";

const numbers$ = from([1, 2, 3, 4, 5]);

numbers$.subscribe((num) => {
  console.log(num);
});
//1 2 3 4 5

const cold$ = from(
  fetch("https://example.com/api/users").then((res) => res.json())
);
cold$.subscribe((v) => console.log(v));

// fromEvent
// Создает наблюдаемый объект, который генерирует события из указанного DOM-элемента или события Node.js.
import { fromEvent } from "rxjs";

const clicks$ = fromEvent(document, "click");

clicks$.subscribe((event) => {
  console.log(event);
});
//MouseEvent {isTrusted: true, screenX: 100, screenY: 200, clientX: 100, clientY: 200, ...}

// fromEventPattern
// Подобно fromEvent, но позволяет указать функции для добавления и удаления обработчиков событий.
import { fromEventPattern } from "rxjs";

const scroll$ = fromEventPattern(
  (handler) => window.addEventListener("scroll", handler),
  (handler) => window.removeEventListener("scroll", handler)
);

scroll$.subscribe((event) => {
  console.log(event);
});
//Event {isTrusted: true, type: 'scroll', target: Window, ...}

// generate
// Создает наблюдаемый объект, который генерирует значения на основе предоставленной функции генератора. Функция генератора вызывается с индексом значения, и ее результат передается подписчикам.
import { generate } from "rxjs";

const numbers$ = generate({
  initialState: 0,
  condition: (state) => state < 5,
  iterate: (state) => state + 1,
  resultSelector: (state) => state,
});

numbers$.subscribe((num) => {
  console.log(num);
});
//0 1 2 3 4

// interval
// Создает наблюдаемый объект, который генерирует значения с указанным интервалом времени.
import { interval } from "rxjs";

const interval$ = interval(1000);

interval$.subscribe((num) => {
  console.log(num);
});
//0 1 2 3 4 ...

//of
//Создает наблюдаемый объект, который генерирует переданные значения по порядку и завершается.
import { of } from "rxjs";

const numbers$ = of(1, 2, 3, 4, 5);

numbers$.subscribe((num) => {
  console.log(num);
});
//0 1 2 3 4 5

const finite$ = of(1, 2, 3, 4);
finite$.subscribe((v) => console.log(v));

// range
// Создает наблюдаемый объект, который генерирует значения в указанном диапазоне.
import { range } from "rxjs";

const numbers$ = range(1, 5);

numbers$.subscribe((num) => {
  console.log(num);
});
//0 1 2 3 4 5

// throwError
// Создает наблюдаемый объект, который генерирует указанную ошибку и завершается.
import { throwError } from "rxjs";

const error$ = throwError(new Error("Something went wrong!"));

error$.subscribe({
  error: (err) => {
    console.error(err);
  },
});
//Error: Something went wrong!

// timer
// Создает наблюдаемый объект, который генерирует значение после указанной задержки времени.
import { timer } from "rxjs";

const timer$ = timer(1000);

timer$.subscribe((num) => {
  console.log(num);
});
//0

// iif
// Создает наблюдаемый объект, который генерирует значение в зависимости от указанного условия. Если условие истинно, генерируется значение trueResult, если ложно - falseResult.
import { iif } from "rxjs";

const condition = true;

const result$ = iif(() => condition, of("True"), of("False"));

result$.subscribe((value) => {
  console.log(value);
});
//True

const random = Math.round(Math.random() * 10);
const conditional$ = iif(
  () => random > 5,
  of("Значение больше 5"),
  of("Значение меньше или равно 5")
);
conditional$.subscribe((v) => console.log(v));

//Цепочка трансформации
const source$ = of(1, 2, 3, 4, 5).pipe(map((value) => value * 2));

//--------------------------
//__Визуализация потоков__//
//RxJS Marbles -  сайт в виде диаграмм позволяет разобрать операторы RxJS
//Также такие диаграммы есть в оф. документации RxJS
//Marbles диаграммы
//любой интересующий оператор можно разложить на диаграмму

const sequence1$ = interval(1000);

/*
    sequence1$  ---0---1---2---3---4---5---
        map((x)=> ({v: x}))
                ---{v: 0}---{v: 1}---{v: 2}---{v: 3}---{v: 4}---{v: 5}---
        tap((v)=> {
            console.log(v)
            return [1,2,3,4];
        })
                ---{v: 0}---{v: 1}---{v: 2}---{v: 3}---{v: 4}---{v: 5}---
        pluck('v')
                ---0---1---2---3---4---5---
        filter((x)=>x%2===0)
                ---0-------2-------4-------
        map((x)=>x**2)
                ---0-------4-------16-------
        skip(2)
                -------------------16-------
        take(1)
    sequence2$  -------------------16|
 */

sequence1$
  .pipe(
    map((x) => ({ v: x })),
    tap((v) => {
      // console.log(v)
      return [1, 2, 3, 4];
    }),
    pluck("v"),
    filter((x) => x % 2 === 0),
    map((x) => x ** 2),
    skip(2),
    first()
  )
  .subscribe(
    (v) => {
      console.log("Result", v);
    },
    () => {},
    () => {
      console.log("completed");
    }
  );

const el = document.querySelector("input") as HTMLInputElement;

//создает поток событий из указанного DOM-элемента или события Node.js
fromEvent(el, "input")
  //
  .pipe(
    //задерживает выброс значений из потока на указанное количество миллисекунд
    debounceTime(300),
    //извлекает значение свойства value из объекта события
    pluck("target", "value")
  )
  .subscribe((v) => {
    console.log(v);
  });

//-----------
//__Swipe__//
//swipe для вычисления направления смахивания
import { fromEvent, merge, Observable, zip } from "rxjs";
import { map } from "rxjs/operators";

//Создание потоков событий касания и мыши
//zip: Объединяет несколько потоков в один поток, испуская значения из всех исходных потоков в виде кортежей.
swipe(
  zip(
    getX(
      fromEvent<TouchEvent>(document, "touchstart"),
      fromEvent<MouseEvent>(document, "mousedown")
    ),
    getX(
      fromEvent<TouchEvent>(document, "touchend"),
      fromEvent<MouseEvent>(document, "mouseup")
    )
  )
).subscribe((direction) => {
  //Определение направления смахивания
  if (direction < 0) {
    console.log("Swipe Left");
    return;
  }
  console.log("Swipe Right");
});

//Извлечение координаты X из событий
//merge: Объединяет несколько потоков в один поток, испуская значения из всех исходных потоков вперемешку.
function getX(
  source1$: Observable<TouchEvent>,
  source2$: Observable<MouseEvent>
) {
  //возвращает новый поток, который объединяет эти два поток
  return merge(source1$, source2$).pipe(
    map((event: TouchEvent | MouseEvent) => {
      if (event instanceof TouchEvent) {
        return event.changedTouches[0].clientX;
      }
      return event.clientX;
    })
  );
}

//Создание потока смещения по оси X
////map: Преобразует каждое значение в потоке с помощью указанной функции
function swipe(source$: Observable<[number, number]>) {
  return source$.pipe(map(([x, y]) => y - x));
}

//------------
//__Slider__//
//реализация слайдера

//Создание потоков событий для ползунков
const quality$ = getValue(fromEvent($("#quality").slider(), "change"));
const rating$ = getValue(fromEvent($("#rating").slider(), "change"));
const actual$ = getValue(fromEvent($("#actual").slider(), "change"));

//Объединение потоков и вычисление среднего значения
//combineLatest: Объединяет несколько потоков в один поток, испуская кортежи из последних испущенных значений из всех исходных потоков
//map: Преобразует каждое значение в потоке с помощью указанной функции
const slideSequence$ = combineLatest([quality$, rating$, actual$]).pipe(
  map(([quality, rating, actual]) => {
    return Math.round(((quality + rating + actual) / 3) * 10);
  })
);

//Вывод среднего значения в консоль
//Оператор fromEvent создает поток событий для нажатий кнопки
//withLatestFrom: Объединяет поток с другим потоком (вклинивает значения)
fromEvent<MouseEvent>(
  document.querySelector("#send-result") as HTMLButtonElement,
  "click"
)
  .pipe(withLatestFrom(slideSequence$))
  .subscribe(([_e, value]) => {
    console.log(value);
  });

//Извлечение значения из событий ползунка
//pluck: Извлекает указанное свойство из каждого испускаемого значения
//startWith: Устанавливает начальное значение для потока
function getValue(source$: Observable<any>) {
  return source$.pipe(
    map(
      ({
        delegateTarget: { previousElementSibling },
        value: { newValue },
      }: any) => {
        return {
          element: previousElementSibling,
          value: newValue,
        };
      }
    ),
    tap(redrawSlider),
    pluck("value"),
    startWith(5)
  );
}


function redrawSlider({ element, value }: any) {
  const sliderTrack = element.querySelector(".slider-track");
  const v = value * 10;
  sliderTrack.classList.remove("bad", "warn", "good");
  if (v < 40) {
    sliderTrack.classList.add("bad");
    return;
  }
  if (v > 40 && v < 70) {
    sliderTrack.classList.add("warn");
    return;
  }
  sliderTrack.classList.add("good");
}

//------------------------------
//__Кастомные операторы RxJS__//
//Для создания кастомных операторов RxJS используется функция pipe. Она принимает функцию высшего порядка, которая возвращает функцию, принимающую поток в качестве аргумента и возвращающую новый потока
// Оператор, который добавляет префикс к каждому значению в потоке
const addPrefix = (prefix: string) => pipe(
  (source: Observable<string>) => new Observable(subscriber => {
    source.subscribe({
      next: (value) => subscriber.next(prefix + value),
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete()
    });
  })
);

// Использование кастомного оператора
const source$ = Observable.from(['a', 'b', 'c']);
const prefixed$ = source$.pipe(addPrefix('prefix-'));

prefixed$.subscribe(console.log); // Выведет: 'prefix-a', 'prefix-b', 'prefix-c'

//Оператор, который отфильтровывает значения, не являющиеся числам
const isNumber = pipe(
  (source: Observable<any>) =>
    new Observable((subscriber) => {
      source.subscribe({
        next: (value) => {
          if (typeof value === "number") {
            subscriber.next(value);
          }
        },
        error: (err) => subscriber.error(err),
        complete: () => subscriber.complete(),
      });
    })
);

//Оператор, который задерживает испускание значений на указанное количество миллисекунд
const delay = (ms: number) =>
  pipe(
    (source: Observable<any>) =>
      new Observable((subscriber) => {
        source.subscribe({
          next: (value) => setTimeout(() => subscriber.next(value), ms),
          error: (err) => subscriber.error(err),
          complete: () => subscriber.complete(),
        });
      })
  );

//__Создание кастомных операторов RxJS без использования pipe требует немного больше кода, но все же возможно
//Интерфейс Operator
interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: Observable<T>): TeardownLogic;
}
// T - тип значений во входном потоке.
// R - тип значений в выходном потоке.
// Subscriber - объект, который будет получать значения из выходного потока.
// TeardownLogic - функция, которая будет вызвана для очистки любых ресурсов, используемых оператором

import { Observable, Subscriber, TeardownLogic } from 'rxjs';

// Оператор, который добавляет префикс к каждому значению в потоке
class AddPrefixOperator implements Operator<string, string> {
  constructor(private prefix: string) {}

  call(subscriber: Subscriber<string>, source: Observable<string>): TeardownLogic {
    return source.subscribe({
      next: (value) => subscriber.next(this.prefix + value),
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete()
    });
  }
}

// Использование кастомного оператора
const source$ = Observable.from(['a', 'b', 'c']);
const prefixed$ = source$.lift(new AddPrefixOperator('prefix-'));

prefixed$.subscribe(console.log); // Выведет: 'prefix-a', 'prefix-b', 'prefix-c'

//Метод lift используется для применения кастомного оператора к потоку. Он принимает оператор в качестве аргумента и возвращает новый поток, который применяет этот оператор к исходному потоку.

//Оператор, который отфильтровывает значения, не являющиеся числами
class IsNumberOperator implements Operator<any, number> {
  call(subscriber: Subscriber<number>, source: Observable<any>): TeardownLogic {
    return source.subscribe({
      next: (value) => {
        if (typeof value === "number") {
          subscriber.next(value);
        }
      },
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete(),
    });
  }
}

//Оператор, который задерживает испускание значений на указанное количество миллисекунд
class DelayOperator implements Operator<any, any> {
  constructor(private ms: number) {}

  call(subscriber: Subscriber<any>, source: Observable<any>): TeardownLogic {
    return source.subscribe({
      next: (value) => setTimeout(() => subscriber.next(value), this.ms),
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete(),
    });
  }
}

//---------------------------------------
//__Observable высшего порядка в RxJS__//
//Observable высшего порядка в RxJS - это Observable, который испускает другие Observable. Это мощный инструмент, который позволяет создавать сложные потоки данных и выполнять операции над ними

// Observable высшего порядка, который испускает Observable чисел от 1 до 10
const source$ = Observable.create((observer) => {
  for (let i = 1; i <= 10; i++) {
    observer.next(of(i));
  }
  observer.complete();
});

// Подписка на Observable высшего порядка
source$.subscribe((innerObservable) => {
  // Подписка на каждый внутренний Observable
  innerObservable.subscribe(console.log);
});

//Операторы высшего порядка:
//RxJS предоставляет несколько встроенных операторов высшего порядка, основные
//mergeAll: Оператор высшего порядка, который объединяет все внутренние Observable в один поток.
//switchAll: Оператор высшего порядка, который испускает значения только из последнего внутреннего Observable.
//concatAll: Оператор высшего порядка, который испускает значения из внутренних Observable последовательно, гарантирует порядок
//exhaust: Оператор высшего порядка, который испускает значения только первого Observable (работает противоположно switchAll)
const inputEl = document.querySelector("input") as HTMLInputElement;
const sequence = fromEvent(inputEl, "input")
  .pipe(
    map((e) => {
      const value = (e.target as HTMLInputElement).value;
      return ajax(
        `http://learn.javascript.ru/courses/groups/api/participants?key=dsodaf`
      );
    }),
    exhaust(),
    // map + mergeALl = mergeMap
    // map + switchAll = switchMap
    // map + concatAll = concatMap
    // map + exhaust = exhaustMap
    pluck("response")
  )
  .subscribe((value) => {
    console.log(value);
  });

//--------------------
//__Принцип работа RxJS__//
//Потоки данных в RxJS можно представить как потоки воды, которые текут через трубы. Операторы RxJS - это как клапаны, фильтры и другие устройства, которые можно использовать для управления потоком воды.

// Основные принципы работы RxJS:
// Потоки данных: Потоки данных в RxJS представляют собой последовательности значений, которые испускаются во времени. Потоки могут быть созданы из различных источников, таких как события, массивы, обещания и т.д.
// Наблюдаемые: Наблюдаемые - это объекты, которые испускают потоки данных. Наблюдаемые могут быть "холодными" или "горячими". Холодные наблюдаемые испускают значения только тогда, когда на них подписаны. Горячие наблюдаемые испускают значения независимо от того, подписаны они или нет.
// Подписчики: Подписчики - это объекты, которые получают значения из потока данных. Подписчики могут быть созданы с помощью метода subscribe() наблюдаемого.
// Операторы: Операторы - это функции, которые можно применять к потокам данных для их преобразования, фильтрации и объединения. Операторы позволяют создавать сложные потоки данных из более простых.

//----------------------
//__реализация live-search__//

export interface IResult {
  name: string;
  description: string;
  owner: {
    avatar_url: string;
  };
}

//debounceTime - задерживает испускание значений на 300 миллисекунд после последнего события. Это предотвращает выполнение запросов при каждом нажатии клавиши
//pluck('target', 'value'): Извлекает значение свойства value из события клавиатуры
//distinctUntilChanged(): Пропускает повторяющиеся значения
export function liveSearch(
  source$: Observable<KeyboardEvent>,
  request: (text: string) => Observable<any>
) {
  return source$.pipe(
    debounceTime(300),
    pluck<KeyboardEvent, string>("target", "value"),
    map((value) => value.trim()),
    filter((value: string) => value.length > 3),
    distinctUntilChanged(),
    switchMap(request)
  );
}

//bufferCount(3): Группирует элементы по 3 в массив
//catchError((err) => { ... }): Обрабатывает ошибки и возвращает пустую строку
//concatAll: Объединяет все внутренние Observable в один поток поочередно
export function request(source$: Observable<any>) {
  return source$.pipe(
    pluck<any, IResult[]>("response", "items"),
    concatAll(),
    map(createCart),
    bufferCount(3),
    reduce((resultStr: string, htmlStrs: string[]) => {
      return (resultStr += createRow(htmlStrs));
    }, ""),
    map((htmlStr) => htmlStr.trim().replace(/\s+(<)/g, "<")),
    catchError((err) => {
      console.log("CATCH err", err);
      return "";
    })
  );
}

export function createCart({
  name,
  description,
  owner: { avatar_url },
}: IResult) {
  return `
     <div class="col-md-4">
        <div class="card">
          <img class="card-img-top" src=${avatar_url} alt=${name} />
          <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
          </div>
        </div>
     </div>
  `;
}

export function createRow(htmlStrings: string[]) {
  return `
      <div class="row">
       ${htmlStrings.join(" ")}
      </div>
   `;
}

//---------------
//__drag-drop__//
//функцию перетаскивания элемента box с помощью мыши.

//takeUntil: Завершает поток событий mousemove, когда происходит событие mouseup
export function drag(
  source1$: Observable<MouseEvent>,
  source2$: Observable<MouseEvent>,
  source3$: Observable<MouseEvent>
) {
  return source1$.pipe(
    concatMap((startEvent) => {
      return source2$.pipe(
        map((moveEvent) => {
          moveEvent.preventDefault();
          return {
            left: moveEvent.clientX - startEvent.offsetX,
            top: moveEvent.clientY - startEvent.offsetY,
          };
        }),
        takeUntil(source3$)
      );
    })
  );
}

const box = document.querySelector(".draggable") as HTMLDivElement;
const mousedown$ = fromEvent<MouseEvent>(box, "mousedown");
const mousemove$ = fromEvent<MouseEvent>(document, "mousemove");
const mouseup$ = fromEvent<MouseEvent>(box, "mouseup");

drag(mousedown$, mousemove$, mouseup$).subscribe((pos) => {
  box.style.left = `${pos.left}px`;
  box.style.top = `${pos.top}px`;
});

//-----------
//__Error__//
//empty
//Завершает поток без испускания каких-либо значений
//Используется для указания того, что поток завершился с ошибкой или без значений

//never
// Никогда не завершает поток и не испускает никаких значений.
// Используется для создания потока, который никогда не завершается.

// throw
// Немедленно завершает поток с указанной ошибкой.
// Используется для явного создания ошибки в потоке.

//catchError 
// Перехватывает ошибки в потоке и возвращает новый поток, который испускает указанное значение или поток.
// Используется для обработки ошибок и продолжения потока

//retry 
// Повторяет поток указанное количество раз, если он завершается с ошибкой.
// Используется для автоматической повторной попытки операции, если она завершается с ошибкой.

//retryWhen
// Повторяет поток на основе указанного потока уведомлений.
// Используется для более гибкого управления повторными попытками, например, для экспоненциального увеличения интервалов между попытками.

//можно использовать switchMap (он создает под поток и мы его закрываем если что при ошибке, основной поток будет дальше работать) ключевое после switchMap  должен идти pipe чтобы создать подпоток и там уже получаем значения через map и ловим ошибки с помощью catchError

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');

const sequence = zip(sequence1$, sequence2$);

fromEvent(document, 'click')
    .pipe(
        switchMap(()=>{
             return sequence
                 .pipe(
                     // map(([_x, y]: [number, number | string]) => {
                     //     // try {
                     //     //     return (y as any).toUpperCase()
                     //     // } catch (err) {
                     //     //     console.log(err);
                     //     //     return '0';
                     //     // }
                     //     return (y as any).toUpperCase()
                     // }),
                     switchMap(([_x, y]: [number, number | string]) => {
                         return of(y)
                             .pipe(
                                 map((y) => {
                                     return (y as any).toUpperCase()
                                 }),
                                 catchError((err) => err))
                     }),
                     // tap(() => {
                     //     console.log('without error')
                     // }),
                     //retry(3),
                     // retryWhen(errObs => errObs.pipe(delay(5000))),
                     // catchError((err) => {
                     //     console.log('CATCH err', err);
                     //     return EMPTY
                     // }),
                     // tap(() => {
                     //     console.log('AFTER CATCH error')
                     // }),
                 )
        }),
        catchError((err) => {
            console.log('CATCH err', err);
            return EMPTY
        }),
    )

    .subscribe((v) => {
        console.log(v);
    }, (err) => {
        console.log(' ERR', err);
    }, () => {
        console.log('completed')
    })


// const pingEpic = action$ => action$.pipe(
//     filter(action => action.type === 'LOGIN'),
//     switchMap((user)=> service.login(user)
//         .pipe(
//             mergeMap(()=> [JWTLocalStorage, SetUser, LoginSuccess, GO]),
//             catchError(()=>EMPTY)
//         )
//     ),
// );

//-------------
//__Subject__//
//Subject = Observable + Subscriber
//Subject - это гибрид Observable и Subscriber. Он может как испускать значения, так и подписываться на другие Observable.
//горячая последовательность - то что будет до подписки мы потеряем
// Создаем Subject
const subject = new Subject();

// Подписываемся на Subject
subject.subscribe((value) => {
  console.log(`Подписчик 1 получил значение: ${value}`);
});

// Испускаем значения в Subject
subject.next(1);
subject.next(2);
subject.next(3);

// Отменяем подписку первого подписчика
subject.unsubscribe();

// Подписываемся на Subject снова
subject.subscribe((value) => {
  console.log(`Подписчик 2 получил значение: ${value}`);
});

// Испускаем еще одно значение в Subject
subject.next(4);

//BehaviorSubject - это Subject, который имеет инициализационное значение и кэширует последнее испущенное значение.
const subject = new BehaviorSubject(0);

subject.subscribe((value) => {
  console.log(`Подписчик 1 получил значение: ${value}`);
});

subject.next(1);

subject.subscribe((value) => {
  console.log(`Подписчик 2 получил значение: ${value}`);
});

subject.next(2);

//ReplaySubject - это Subject, который кэширует указанное количество последних испущенных значений.
const subject = new ReplaySubject(2);

subject.next(1);
subject.next(2);

subject.subscribe((value) => {
  console.log(`Подписчик 1 получил значение: ${value}`);
});

subject.next(3);

subject.subscribe((value) => {
  console.log(`Подписчик 2 получил значение: ${value}`);
});


//AsyncSubject - это Subject, который кэширует последнее испущенное значение и испускает его только после завершения потока.
const subject = new AsyncSubject();

subject.next(1);
subject.next(2);

subject.subscribe((value) => {
  console.log(`Подписчик 1 получил значение: ${value}`);
});

subject.complete();

subject.subscribe((value) => {
  console.log(`Подписчик 2 получил значение: ${value}`);
});

// const sequence = new AsyncSubject();
// sequence.subscribe((v)=>{
//     console.log('Sub 1', v)
// })
//
// sequence.next('Hi all');
// sequence.next('Rx JS');
// sequence.next('Redux');
// sequence.next('Node');
//
// setTimeout(()=>{
//     sequence.complete();
//     sequence.subscribe((v)=>{
//         console.log('Sub 2', v)
//     })
// },5000)
function getItems(url: string) {
    let subject: AsyncSubject<any>;
    return new Observable((subscriber) => {
        if (!subject) {
            subject = new AsyncSubject();
            ajax(url).subscribe(subject)
        }
        return subject.subscribe(subscriber)
    })
}
const items = getItems('http://learn.javascript.ru/courses/groups/api/participants?key=dsodaf')
items.subscribe((v)=>{
    console.log('User 1', v);
})
setTimeout(()=>{
    items.subscribe((v)=>{
        console.log('User 2', v);
    })
}, 5000)

//------------------
//__multicasting__//

// multicast(control)
// Преобразует холодный поток в горячий поток. Горячий поток испускает значения независимо от того, есть ли подписчики. control - это Subject, который используется для управления потоком. Когда control испускает значение, горячий поток начинает испускать значения. Когда control завершается, горячий поток завершается.sequence.connect() - подключает горячий поток. После подключения поток начинает испускать значения.

// publish()
// Создает новый Subject и применяет к нему оператор multicast. Это эквивалентно вызову multicast(new Subject()).Без connect()

// refCount()
// Подсчитывает количество подписчиков на поток. Когда количество подписчиков становится равным 0, поток завершается. Это гарантирует, что поток будет завершен, когда все подписчики отпишутся от него.

// share()
// Создает новый Subject и применяет к нему оператор multicast. Однако, в отличие от refCount(), share() не завершает поток, когда все подписчики отписываются от него. Вместо этого он продолжает испускать значения, пока не будет завершен исходный поток.Работа всех оператор выше в одном

//const control = new ReplaySubject(2);
const sequence = interval(1000)
    .pipe(
        //multicast(control)
        //publish(), //new Subject + multicast(control)
        // refCount()
        share()
    ) //as ConnectableObservable<any>;
// sequence.connect();
const sub1 = sequence.subscribe((v) => {
    console.log('Sub 1', v);
})
setTimeout(() => {
    sub1.unsubscribe();
}, 3000)

setTimeout(() => {
    sequence.subscribe((v) => {
        console.log('Sub 2', v);
    })
}, 5000)

setTimeout(() => {
    sequence.subscribe((v) => {
        console.log('Sub 3', v);
    })
}, 7000)

//------------
//___forms__//
//Оператор toArray() преобразует поток в массив всех испущенных значений. Он завершает поток после того, как все значения были испущены

// shareReplay()
// Оператор shareReplay() преобразует холодный поток в горячий поток и кэширует все испущенные значения. Это означает, что новые подписчики получат все ранее испущенные значения, даже если они подписались на поток после того, как эти значения были испущены.
const source$ = interval(1000).pipe(take(5));

const shared$ = source$.pipe(shareReplay());

shared$.subscribe((value) => {
  console.log(`Подписчик 1 получил значение: ${value}`);
});

setTimeout(() => {
  shared$.subscribe((value) => {
    console.log(`Подписчик 2 получил значение: ${value}`);
  });
}, 2000);
// Подписчик 1 получил значение: 0
// Подписчик 1 получил значение: 1
// Подписчик 1 получил значение: 2
// Подписчик 1 получил значение: 3
// Подписчик 1 получил значение: 4
// Подписчик 2 получил значение: 0
// Подписчик 2 получил значение: 1
// Подписчик 2 получил значение: 2
// Подписчик 2 получил значение: 3
// Подписчик 2 получил значение: 4

class UserService {
  private uniqueNameSequence$: Observable<any>;

  public getNames() {
    if (!this.uniqueNameSequence$) {
      // this.uniqueNameSequence$ = ajax('http://learn.javascript.ru/courses/groups/api/participants?key=dsodaf')
      //     .pipe(
      //         pluck('response'),
      //         concatAll(),
      //         map((user: any) => user.profileName),
      //         toArray(),
      //         shareReplay()
      //     )
      this.uniqueNameSequence$ = timer(0, 16000).pipe(
        switchMap(() => {
          return ajax(
            "http://learn.javascript.ru/courses/groups/api/participants?key=dsodaf"
          ).pipe(
            pluck("response"),
            concatAll(),
            map((user: any) => user.profileName),
            toArray(),
            shareReplay()
          );
        }),
        shareReplay()
      );
    }
    return this.uniqueNameSequence$;
  }
}

export const userService = new UserService();

//----------------------
//__EventLoop c RxJs__//
//Микрозадачи - это задачи, которые выполняются немедленно после того, как они были запланированы. Они создаются с помощью методов Promise.resolve() и queueMicrotask().

//Макрозадачи - это задачи, которые выполняются после того, как все микрозадачи были выполнены. Они создаются с помощью методов setTimeout(), setInterval() и requestAnimationFrame().

console.log("Начало");

setTimeout(() => {
  console.log("Макрозадача 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Микрозадача 1");
});

console.log("Середина");

queueMicrotask(() => {
  console.log("Микрозадача 2");
});

setTimeout(() => {
  console.log("Макрозадача 2");
}, 0);

console.log("Конец");

// Начало
// Середина
// Микрозадача 1
// Конец
// Микрозадача 2
// Макрозадача 1
// Макрозадача 2

//asap - делает оператор из последовательного потока в асинхронный
console.log('start');
of(1, 2, 3, 4, asap )
    .subscribe((v) => {
        console.log(v);
    });
console.log('end');

const a$ = from([1, 2], asap);
const b$ = of(10);

const c$ = combineLatest([a$, b$])
    .pipe(map(([a, b]) => a + b));

c$.subscribe((v) => {
    console.log(v);
})

// Оператор observeOn(queue) в RxJS используется для изменения планировщика, на котором выполняются наблюдаемые. По умолчанию наблюдаемые выполняются на планировщике, предоставленном средой выполнения (например, setTimeout в браузере).
// Оператор observeOn(queue) позволяет изменить планировщик на другой, например, queue, который является планировщиком с очередью задач. Это означает, что наблюдаемые будут выполняться в порядке их поступления в очередь, а не сразу.
const signal = new Subject<number>();
let count = 0;
const calc = (count: number) => console.log('do some calc ', count)
console.log('start');
signal.pipe(
    observeOn(queue),
    take(1600),

)
    .subscribe((v: number) => {
        calc(v);
        signal.next(v++);
    })
signal.next(count++);
console.log('end');

//---------------
//__Animation__//
//Планировщик animationFrame
//Планировщик animationFrame - это специальный планировщик, который выполняет задачи в конце каждого кадра анимации. Это означает, что задачи, запланированные с помощью animationFrame, будут выполняться плавно и без блокировки потока.

interval(0, animationFrame)
    .subscribe((v) => {
        div.style.transform = `translate3d(0,${v}px,0)`
    })

//-----------
//__Тесты__//

describe("RxJS", () => {
  // объявляет переменную testScheduler типа TestScheduler
  let testScheduler: TestScheduler;

  beforeEach(() => {
    //TestScheduler - это инструмент для тестирования потоков RxJS
    //функция обратного вызова, которая будет вызываться TestScheduler для сравнения фактических испущенных значений с ожидаемыми значениями. В данном случае она использует функцию expect из библиотеки Jest для проверки равенства
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("delay should work ", () => {
    // запускает тест с использованием предоставленного TestScheduler и вспомогательных функций cold и expectObservable
    //cold - холодный поток
    testScheduler.run(({ cold, expectObservable }) => {
      //Создает холодный поток с помощью функции cold. Холодный поток имитирует последовательность испущенных значений во времени. В данном случае поток испускает значения "a" (2), "b" (2) и "c" (10) с интервалом в одну временную единицу.
      const sequence1 = cold("-a--b--c---|", {
        a: 2,
        b: 2,
        c: 10,
      });

      //Определяет ожидаемую последовательность испущенных значений. В данном случае поток испускает значения "a" (4), "b" (4) и "c" (100) через 9 временных единиц после начала потока.
      const sequence = "              9s -a--b--c---|";
      //Проверяет, что фактическая последовательность испущенных значений соответствует ожидаемой последовательности
      expectObservable(
        sequence1.pipe(
          delay(9000),
          map((x) => x ** 2)
        )
      ).toBe(sequence, { a: 4, b: 4, c: 100 });
    });
  });
});