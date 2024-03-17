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
import { fromEvent, iif, merge, Observable, of, zip } from "rxjs";
import { map, pluck, switchMap } from "rxjs/operators";

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
  if (direction < 0) {
    console.log("Swipe Left");
    return;
  }
  console.log("Swipe Right");
});

function getX(
  source1$: Observable<TouchEvent>,
  source2$: Observable<MouseEvent>
) {
  return merge(source1$, source2$).pipe(
    // switchMap((event: TouchEvent | MouseEvent) => {
    //     return iif(
    //         () => event instanceof TouchEvent,
    //         of(event as TouchEvent).pipe(pluck('changedTouches', 0, 'clientX')),
    //         of(event as MouseEvent).pipe(pluck('clientX')),
    //     )
    // })
    map((event: TouchEvent | MouseEvent) => {
      if (event instanceof TouchEvent) {
        return event.changedTouches[0].clientX;
      }
      return event.clientX;
    })
  );
}

function swipe(source$: Observable<[number, number]>) {
  return source$.pipe(map(([x, y]) => y - x));
}

//2.50