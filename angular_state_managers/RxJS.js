//RxJS представляет собой библиотеку, позволяющую управлять всеми асинхронными операциями и событиями в приложении в стиле реактивного программирования. Она построена на основе паттерна проектирования Observer и предусматривает целый ряд операторов для манипуляции асинхронными событиями и обработки передаваемых ими данных
//реализуют принцип push-систем передачи данных от "поставщика" к "потребителю"

//-----------------------
//Объект Observable
//Количество вызовов исполнения такого объекта не ограничено
//Объекты RxJS Observable создаются либо с использованием операторов создания (of, from, fromEvent), либо через new Observable
of('Hello').subscribe((vl) => console.log(vl));

//new Observable
// next() — отправка данных, количество вызовов не ограничено;
// error() — генерация ошибки, параметром указываются данные любого формата (строка, объект, исключение) о причине ее возникновения;
// complete() — завершение исполнения Observable, не принимает никаких параметров и не передает никакого значения.
const obs = new Observable((sub) => {
    sub.next(1);

    setTimeout(() => {
        sub.next(3);
        sub.complete();
    }, 500);
});
obs.subscribe((vl) => console.log(vl));

//Вызов error() или complete() автоматически завершает исполнение Observable.
const obs = new Observable((sub) => {
    sub.next(1);

    setTimeout(() => {
        sub.error(3);
    }, 500);
});
obs.subscribe(
    (vl) => console.log(vl),
    (err) => console.log('Error: ', err),
    () => console.log('Completed')
);

//Метод subscribe() возвращает объект типа Subscription, который хранит текущее исполнение конкретного RxJS Observable и имеет единственный метод unsubscribe() для отмены его исполнения.
const sub = obs.subscribe();
sub.unsubscribe();

//-------------------------
//__Объекты Subject
//Особенность Subject в том, что он может отправлять данные одновременно множеству "потребителей", которые могут регистрироваться уже в процессе исполнения Subject,в то время как исполнение стандартного Observable осуществляется уникально для каждого его вызова
const sbj = new Subject < number > ();

sbj.subscribe((vl) => console.log(`1st: ${vl}`));
sbj.next(3);
sbj.subscribe((vl) => console.log(`2nd: ${vl}`));
sbj.next(9);

/*
Результат  в консоли:
1st: 3
1st: 9
2nd: 9
*/
//исполняются не сразу в момент вызова subscribe(), а после обращения к методам next(), error() или complete() самого объекта.

//---------------------
//__BehaviorSubject
//BehaviorSubject хранит в себе последнее отправленное им значение. Так, каждому новому обработчику в момент регистрации (вызов subscribe()) будет отправлено это значение.
//Начальное значение задается в момент создания RxJS BehaviorSubject.
const sbj = new BehaviorSubject < number > (5);

sbj.subscribe((vl) => console.log(`1st: ${vl}`));
sbj.subscribe((vl) => console.log(`2nd: ${vl}`));
sbj.next(7);

/*
Результат  в консоли:
1st: 5
2nd: 5
1st: 7
2nd: 7
*/

//--------------------
//__ReplaySubject
//Все новые "потребители" сразу же получают по очереди все n указанных значений RxJS ReplaySubject.
//ReplaySubject способны хранить заданное количество последних значений, которое задается при создании объекта
const sbj = new ReplaySubject(2);

sbj.next(5);

sbj.subscribe((vl) => console.log(`1st: ${vl}`));

sbj.next(6);
sbj.next(7);

sbj.subscribe((vl) => console.log(`2nd: ${vl}`));

/*
Результат  в консоли:
1st: 5
1st: 6
1st: 7
2nd: 6
2nd: 7
*/

//-------------------------
//__AsyncSubject
//AsyncSubject "потребителям" передается только последнее значение объекта и только, когда он завершит свое выполнение
const sbj = new AsyncSubject();
sbj.subscribe((vl) => console.log(`Async: ${vl}`));
sbj.next(7);
sbj.next(8);
sbj.next(9);
setTimeout(() => sbj.complete(), 3000);
/*
Результат  в консоли (по истечении 3 сек):
Async: 9
*/

//-------------------------
//__Multicasted Observable
//позволяет в рамках одного и того выполнения регистрировать сразу несколько обработчиков

const subject = new Subject();
const multicasted = from([2, 4, 6]).pipe(
    multicast(subject)
);
multicasted.subscribe((vl) => console.log(`1st: ${vl}`));
multicasted.subscribe((vl) => console.log(`2nd: ${vl}`));
multicasted.connect();
//вызов connect() инициирует выполнение исходного объекта и возвращает его контекст (объект с unsubscribe()

//----------------------
//__refCount()
//Использовать refCount() можно только с объектами ConnectableObservable.
//При регистрации первого обработчика он автоматически начинает выполнение исходного объекта (вызывается connect()), а когда не остается ни одного "потребителя" автоматически завершает его выполнение (вызывается unsubscribe()).
const subject = new Subject();
const refCounted = interval(3).pipe(
    multicast(subject),
    refCount()
);

let sub1, sub2;

//выполнение Observable начинается
sub1 = refCounted.subscribe((vl) =>
    console.log(`1st: ${vl}`)
);

setTimeout(
    () =>
    (sub2 = refCounted.subscribe((vl) =>
        console.log(`2nd: ${vl}`)
    )),
    500
);

setTimeout(() => sub1.unsubscribe(), 1500);

//выполнение Observable завершается
setTimeout(() => sub2.unsubscribe(), 2000);

//--------------------------
//__Scheduler
//Для управления временем и очередностью выполнения операций в объектах Observable, имеются RxJS Schedulers.
//важно знать, что и в каком порядке происходит. Сперва выполняется текущий синхронный код (callstack), далее очередь микрозадач (Promise), и если нет другого синхронного кода — очередь макрозадач (готовый для исполнения код, обернутый функциями setTimeout() и setInterval() или AJAX-запросы).
// Учитывая описанное выше, вполне логично, что имеются следующие типы RxJS Schedulers:
// queue — добавляет операцию в callstack;
// asap — регистрирует операцию в очереди микрозадач;
// async — регистрирует операцию в очереди макрозадач;
// animationFrame — отвечает за действия, выполняемые перед перерисовкой.
from(['b', 'c', 'd'])
    .pipe(startWith('Queue scheduler', queue))
    .subscribe((vl) => console.log(vl));

from(['b', 'c', 'd'])
    .pipe(startWith('Asap scheduler', asap))
    .subscribe((vl) => console.log(vl));

from(['b', 'c', 'd'])
    .pipe(startWith('Async scheduler', async))
    .subscribe((vl) => console.log(vl));

from(['b', 'c', 'd'])
    .pipe(
        startWith(
            'Animation frame scheduler',
            animationFrame
        )
    )
    .subscribe((vl) => console.log(vl));

//observeOn()
//определяет, в каком порядке "потребители" получат данные после их отправления
console.log('Before');
of(9)
    .pipe(observeOn(async))
    .subscribe((vl) => console.log('Value is: ', vl));
console.log('After');

//subscribeOn()
//subscribeOn() определяет не контекст передачи данных, а контекст вызова метода subscribe()

//------------------------------
//__Операторы и метод pipe()__//
//Для преобразования отправляемых объектом Observable данныx
from([7, 21, 10])
    .pipe(map((num) => (num <= 10 ? 1 : 0)))
    .subscribe((vl) => console.log(vl));

// Все RxJS операторы подразделяются на категории. Так, различают операторы:
// Создания (of, from, fromEvent, interval);
// Преобразования (map, scan, buffer);
// Фильтрации (filter, take, skip, distinct);
// Обработки ошибок (catchError, retry, onErrorResumeNext);
// Условия (skipUntil, skipWhile, takeUntil, takeWhile);
// Математические (min, max, count);
// Утилиты (tap, delay);
// Для Connectable Observable (share, shareReplay, publish).

//------------------------
//__Создание операторов
const takeNth = (n: number) => <T(source: Observable<T>) =>
    new Observable < T > ((observer) => {
        let current = 1;

        return source.subscribe(
            (vl) => {
                if (current++ === n) {
                    observer.next(vl);
                    observer.complete();
                }
            },
            (err) => observer.error(err),
            () => observer.complete()
        );
    });

from(['Jack', 'Jane', 'Jim', 'Jason'])
    .pipe(takeNth(3))
    .subscribe(
        (vl) => console.log(vl),
        (err) => { },
        () => console.log('Completed')
    );


//Также создавать операторы можно используя уже существующие
const takeNth = (n: number) => <T(source: Observable<T>) =>
    source.pipe(filter((value, index) => index === n - 1));

from(['Jack', 'Jane', 'Jim', 'Jason'])
    .pipe(takeNth(3))
    .subscribe(
        (vl) => console.log(vl),
        (err) => { },
        () => console.log('Completed')
    );

