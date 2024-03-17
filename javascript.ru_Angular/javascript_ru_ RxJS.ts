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