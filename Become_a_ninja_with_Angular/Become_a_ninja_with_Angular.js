//Become a ninja with Angular
//Исходный код самого Angular сначала был скомпилирован с помощью Traceur, а затем переключился на TypeScript. TypeScript — это язык с открытым исходным кодом, разработанный Microsoft. Это типизированный расширенный набор JavaScript, который компилируется в простой JavaScript

//Но в JS есть концепция под названием «подъем», которая фактически объявляет переменную в верхней части функции, даже если вы объявили ее позже
function getPonyFullName(pony) {
    if (pony.isChampion) {
        var name = 'Champion ' + pony.name;
        return name;
    }
    return pony.name;
}

//Let был введен для замены var в долгосрочной перспективе, так что вы можете отказаться от старого доброго ключевого слова var и вместо этого начать использовать let
function getPonyFullName(pony) {
    if (pony.isChampion) {
        let name = 'Champion ' + pony.name;
        return name;
    }
    // name is not accessible here
    return pony.name;
    5
}


//Когда вы объявляете переменную с помощью const, ее необходимо инициализировать, и вы не сможете позже присвоить другое значение.
const poniesInRace = 6;
poniesInRace = 7; // SyntaxError


//Что касается переменных, объявленных с помощью let, константы не поднимаются и объявляются только на уровне блока. Одна маленькая вещь может вас удивить: вы можете инициализировать константу с помощью объекта, а затем изменить содержимое объекта.
const PONY = {};
PONY.color = 'blue'; // works

//Сокращения при создании объектов,когда свойство объекта, которое вы хотите создать, имеет то же имя, что и переменная, используемая в качестве значения
function createPony() {
    const name = 'Rainbow Dash';
    const color = 'blue';
    return { name: name, color: color };
}
//the same
function createPony() {
    const name = 'Rainbow Dash';
    const color = 'blue';
    return { name, color };
}

//определить метод в объекте
function createPony() {
    return {
        run() {
            console.log('Run!');
        }
    };
}

//__Destructuring assignment ES2015
const httpOptions = { timeout: 2000, isCache: true };
// later
const { timeout: httpTimeout, isCache: httpCache } = httpOptions;

//the same name 
const httpOptions = { timeout: 2000, isCache: true };
// later
const { timeout, isCache } = httpOptions;

//with nested objects
const httpOptions = { timeout: 2000, cache: { age: 2 } };
// later
const {
    cache: { age }
} = httpOptions;
// you now have a variable named 'age' with value 2

function randomPonyInRace() {
    const pony = { name: 'Rainbow Dash' };
    const position = 2;
    // ...
    return { pony, position };
}
const { pony } = randomPonyInRace();

//Default parameters and values
function getPonies(size = 10, page = 1) {
    // ...
    server.get(size, page);
}

//also be a function call
function getPonies(size = defaultSize(), page = 1) {
    // the defaultSize method will be called if size is not provided
    // ...
    server.get(size, page);
}

//using a destructuring assignment
const { timeout = 1000 } = httpOptions;

//__Rest operator
function addPonies(...ponies) {
    for (let pony of ponies) {
        poniesInRace.push(pony);
    }
}

const [winner, ...losers] = poniesInRace;

const ponyPrices = [12, 3, 4];
const minPrice = Math.min(...ponyPrices);

//__ Classes
class Pony {
    constructor(color) {
        this.color = color;
    }
    toString() {
        return `${this.color} pony`;
        // see that? It is another cool feature of ES2015, called template literals
        // we'll talk about these quickly!
    }
}
const bluePony = new Pony('blue');
console.log(bluePony.toString()); // blue pony

//Он также может иметь статические атрибуты и методы
class Pony {
    static defaultSpeed() {
        return 10;
    }
}
const speed = Pony.defaultSpeed();

//getters and setters
class Pony {
    get color() {
        console.log('get color');
        return this._color;
    }
    set color(newColor) {
        console.log(`set color ${newColor}`);
        this._color = newColor;
    }
}
const pony = new Pony();
pony.color = 'red';
// 'set color red'
console.log(pony.color);
// 'get color'
// 'red'

//наследование
class Animal {
    speed() {
        return 10;
    }
}
class Pony extends Animal { }
const pony = new Pony();
console.log(pony.speed()); // 10

//Animal называется базовым классом, а Pony — производным классом. Как видите, производный класс имеет методы базового класса. Он также может их переопределить
class Animal {
    speed() {
        return 10;
    }
}
class Pony extends Animal {
    speed() {
        return super.speed() + 10;
    }
}
const pony = new Pony();
console.log(pony.speed()); // 20, as Pony overrides the parent method

//Ключевое слово super также можно использовать в конструкторах для вызова конструктора базового класса
class Animal {
    constructor(speed) {
        this.speed = speed;
    }
}
class Pony extends Animal {
    constructor(speed, color) {
        super(speed);
        this.color = color;
    }
}
const pony = new Pony(20, 'blue');
console.log(pony.speed); // 20

//__Promises
const getUser = function (login) {
    return new Promise(function (resolve, reject) {
        if (response.status === 200) {
            resolve(response.data);
        } else {
            reject('No user');
        }
    });
};

//success
getUser(login)
    .then(function (user) {
        console.log(user);
    })

//promise возврощает новый promise
getUser(login)
    .then(function (user) {
        return getRights(user); // getRights is returning a promise
    })
    .then(function (rights) {
        return updateMenu(rights);
    })

//обработка ошибок: вы можете использовать один обработчик для каждого промиса или один для всей цепочки
getUser(login)
    .then(function (user) {
        return getRights(user);
    })
    .then(function (rights) {
        return updateMenu(rights);
    })
    .catch(function (error) {
        console.log(error); // will be called if getUser or getRights fails
    })

//Arrow functions
getUser(login)
    .then(user => getRights(user))
    .then(rights => updateMenu(rights))


//Async/await
async function getUserRightsAndUpdateMenu() {
    try {
        // getUser is a promise
        const user = await getUser(login);
        // getRights is a promise
        const rights = await getRights(user);
        updateMenu(rights);
    } catch (e) {
        // will be called if getUser, getRights or updateMenu fails
        console.log(e);
    }
}
await getUserRightsAndUpdateMenu();

//__ Sets and Maps
const cedric = { id: 1, name: 'Cedric' };
const users = new Map();
users.set(cedric.id, cedric); // adds a user
console.log(users.has(cedric.id)); // true
console.log(users.size); // 1
users.delete(cedric.id); // removes the user

const cedric = { id: 1, name: 'Cedric' };
const users = new Set();
users.add(cedric); // adds a user
console.log(users.has(cedric)); // true
console.log(users.size); // 1
users.delete(cedric); // removes the user

//__Template literals
const fullname = `Miss ${firstname} ${lastname}`;

const template = `<div>
  <h1>Hello</h1>
</div>`;

const person1 = 'Cedric';
const person2 = 'Agnes';
const template = `Hello ${person1}! Where is ${person2}?`;

const uppercaseNames = (strings, ...values) => {
    const names = values.map(name => name.toUpperCase());
    return strings.map((string, i) => `${string}${names[i] ? names[i] : ''}`).join('');
};
const result = uppercaseNames`Hello ${person1}! Where is ${person2}?`;

//__Modules

export function bet(race, pony) {
    // ...
}
export function start(race) {
    // ...
}

//_
import { bet, start } from './races.service';
// later
bet(race, pony1);
start(race);

//_
import { start as startRace } from './races.service';
startRace(race);

//_
import * as racesService from './races.service';
// later
racesService.bet(race, pony1);
racesService.start(race);

// pony.js
export default class Pony { }
// races.service.js
import Pony from './pony';

//----------------
//__TypeScript__//

//метаданные, дающие фреймворку подсказку, необходимую для правильного внедрения
class RaceList {
    raceService: RaceService;
    races: Array<string> = [];
    constructor(raceService: RaceService) {
        // the interesting part is `: RaceService`
        this.raceService = raceService;
        this.raceService.list().then(races => (this.races = races));
    }
}

//__Types as in TypeScript
const ponyNumber: number = 0;
const ponyName: string = 'Rainbow Dash';

const pony: Pony = new Pony();
const ponies: Array<Pony> = [new Pony()];
ponies.push('hello'); // error TS2345
// Argument of type 'string' is not assignable to parameter of type 'Pony'

let changing: any = 2;
changing = true; // no problem

let changing: number | boolean = 2;
changing = true; // no problem

//__Enums
enum RaceStatus {
    Ready,
    Started,
    Done
}
const race = new Race();
race.status = RaceStatus.Ready;

type Color = 'blue' | 'red' | 'green';
const ponyColor: Color = 'blue';

//__Return types
function startRace(race: Race): Race {
    race.status = RaceStatus.Started;
    return race;
}

function startRace(race: Race): void {
    race.status = RaceStatus.Started;
}

//__Interfaces

interface HasScore {
    score: number;
}
function addPointsToScore(player: HasScore, points: number): void {
    player.score += points;
}

interface PonyModel {
    name: string;
    speed: number;
}
const pony: PonyModel = { name: 'Light Shoe', speed: 56 };

//__Optional arguments
function addPointsToScore(player: HasScore, points?: number): void {
    points = points || 0;
    player.score += points;
}

//__Functions as property
interface CanRun {
    run(meters: number): void;
}

function startRunning(pony: CanRun): void {
    pony.run(10);
}
const ponyOne = {
    run: (meters: number) => logger.log(`pony runs ${meters}m`)
};
startRunning(ponyOne);

//__Classes

//implement an interface
class Pony implements CanRun {
    run(meters: number): void {
        logger.log(`pony runs ${meters}m`);
    }
}

//можете реализовать несколько интерфейсов
class HungryPony implements CanRun, CanEat {
    run(meters: number): void {
        logger.log(`pony runs ${meters}m`);
    }
    eat(): void {
        logger.log(`pony eats`);
    }
}

//свойства классов не являются стандартной функцией ES2015. Это возможно только в TypeScript
class SpeedyPony {
    speed = 10;// <--
    run(): void {
        logger.log(`pony runs at ${this.speed}m/s`);
    }
}

//можете использовать ключевое слово Private, чтобы скрыть свойство или метод
class NamedPony {
    constructor(public name: string, private speed: number) { }
    run(): void {
        logger.log(`pony runs at ${this.speed}m/s`);
    }
}
const pony = new NamedPony('Rainbow Dash', 10);

class NamedPonyWithoutShortcut {
    public name: string;
    private speed: number;
    constructor(name: string, speed: number) {
        this.name = name;
        this.speed = speed;
    }
    run(): void {
        logger.log(`pony runs at ${this.speed}m/s`);
    }
}

//__Decorators
//Декоратор — это способ выполнить метапрограммирование
//Декораторы действительно мощные инструменты: они могут изменять свою цель (метод, классы и т. д.) и, например, изменять параметры вызова, вмешиваться в результат, вызывать другие методы при вызове цели или добавлять метаданные

//который принимает 3 параметра: • target: метод, на который нацелен наш декоратор • name: имя целевого метода • descriptor: дескриптор целевого метода (является ли метод перечислимым, записываемым и т. д.)
const Log = () => {
    return (target: any, name: string, descriptor: any) => {
        logger.log(`call to ${name}`);
        return descriptor;
    };
};
class RaceService {
    @Log()
    getRaces() {
        // call API
    }
    @Log()
    getRace(raceId: number) {
        36
        // call API
    }
}
raceService.getRaces();
// logs: call to getRaces
raceService.getRace(1);
// logs: call to getRace

//in Angular looks
//декоратор также может получать параметры, в данном случае объект конфигурации
@Component({ selector: 'ns-home', template: 'home' })
class HomeComponent {
    constructor(@Optional() hello: HelloService) {
        logger.log(hello);
    }
}

//-------------------------
//__Advanced TypeScript__//

//readonly
//только для чтения
interface Config {
    readonly timeout: number;
}
const config: Config = { timeout: 2000 };

//__keyof
interface PonyModel {
    name: string;
    color: string;
    speed: number;
}
type PonyModelKey = keyof PonyModel;
// this is the same as `'name'|'speed'|'color'`

//первый параметр имеет тип T • второй параметр имеет тип K, который является ключом T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
const pony: PonyModel = {
    name: 'Rainbow Dash',
    color: 'blue',
    speed: 45
};
// TypeScript infers that `nameValue` is of type `string`!
const nameValue = getProperty(pony, 'name');

//__Mapped type

//свойство было необязательным
interface PartialPonyModel {
    name?: string;
    color?: string;
    speed?: number;
}

const pony: PartialPonyModel = {
    name: 'Rainbow Dash'
}

type Partial<T> = {
    [P in keyof T]?: T[P];
};

const pony: Partial<PonyModel> = {
    name: 'Rainbow Dash'
};

//__Readonly
//только для чтения
const pony: Readonly<PonyModel> = {
    name: 'Rainbow Dash',
    color: 'blue',
    speed: 45
};
// all properties are `readonly`

//__Pick
//помогает создать тип только с некоторыми исходными свойствами
const pony: Pick<PonyModel, 'name' | 'color'> = {
    name: 'Rainbow Dash',
    color: 'blue'
};

//__Record
//Record помогает вам создать тип с теми же свойствами, что и другой тип, но другого типа
interface FormValue {
    value: string;
    valid: boolean;
}
const pony: Record<keyof PonyModel, FormValue> = {
    name: { value: 'Rainbow Dash', valid: true },
    color: { value: 'blue', valid: true },
    speed: { value: '45', valid: true }
};

//__Union types and type guards
//использовать защиту типа

interface User {
    type: 'authenticated' | 'anonymous';
    name: string;
}

interface AuthenticatedUser extends User {
    type: 'authenticated';
    loggedSince: number;
}

interface AnonymousUser extends User {
    type: 'anonymous';
    visitingSince: number;
}

function onWebsiteSince(user: User): number {
    if (user.type === 'authenticated') {
        return (user as AuthenticatedUser).loggedSince;
    } else if (user.type === 'anonymous') {
        return (user as AnonymousUser).visitingSince;
    }
    return 0;
}

//_
interface AdminUser extends BaseUser {
    type: 'admin';
    adminSince: number;
}

type User = AuthenticatedUser | AnonymousUser | AdminUser;

function onWebsiteSince(user: User): number {
    switch (user.type) {
        case 'authenticated':
            return user.loggedSince;
        case 'anonymous':
            return user.visitingSince;
        case 'admin':
            return user.adminSince;
    }
}

//-------------
//__Angular__//

//___Custom elements
//Пользовательские элементы — это новый стандарт, позволяющий разработчикам создавать свои собственные элементы DOM

class PonyComponent extends HTMLElement {
    constructor() {
        super();
        console.log("I'm a pony!");
    }
    connectedCallback() {
        this.innerHTML = '<h1>General Soda</h1>';
    }
}
// <ns-pony><h1>General Soda</h1></ns-pony>

//___Shadow DOM
//Теневой DOM — это способ инкапсулировать DOM нашего компонента. Эта инкапсуляция означает, что таблица стилей и логика JavaScript вашего приложения не будут применяться к компоненту и непреднамеренно испортят его

class PonyComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const title = document.createElement('h1');
        title.textContent = 'General Soda';
        shadow.appendChild(title);
    }
}
/* 
//если вы попытаетесь добавить стиль к элементам h1, визуальный аспект компонента вообще не изменится: это потому, что Shadow DOM действует как барьер
<ns-pony>
  #shadow-root (open)
  <h1>General Soda</h1>
</ns-pony>
*/

//___Template
//Чтобы использовать шаблон, его необходимо клонировать

/* 
<template id="pony-template">
  <style>
  h1 {
  color: orange;
  }
  </style>
  <h1>General Soda</h1>
</template>
*/
class PonyComponent extends HTMLElement {
    constructor() {
        super();
        const template = document.querySelector('#pony-template');
        const clonedTemplate = document.importNode(template.content, true);
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(clonedTemplate);
    }
}

//___Фреймворки поверх веб-компонентов
//Поскольку веб-компоненты не полностью поддерживаются всеми браузерами, существует полифил, который вы можете включить в свое приложение

//----------------------------------
//___Понимание философии Angular__//
//Прежде всего, Angular ориентирован на компоненты. Вы напишете крошечные компоненты, и вместе они составят целое приложение. Компонент — это группа HTML-элементов в шаблоне, предназначенная для конкретной задачи

//Ваши компоненты будут расположены иерархически, как и DOM. Корневой компонент будет иметь дочерние компоненты, у каждого из них также будут дочерние компоненты и т. д
import { Component } from '@angular/core';
import { RacesService } from './services';
@Component({
    selector: 'ns-race',
    templateUrl: './race.component.html'
})
export class RaceComponent {
    race: any;
    constructor(racesService: RacesService) {
        racesService.get().then(race => (this.race = race));
    }
}
/* 
<div>
  <h2>{{ race.name }}</h2>
  <div>{{ race.status }}</div>
  <div *ngFor="let pony of race.ponies">
  <ns-pony [pony]="pony"></ns-pony>
  </div>
</div>
*/
//в фигурных скобках {{ }}, которое будет оценено и заменено соответствующим значением

//__установить Node.js и NPM

//__ Angular CLI
//Angular CLI — это утилита командной строки, позволяющая легко и быстро запустить проект, уже настроенная с помощью Webpack

//npm install -g @angular/cli
//ng new ponyracer --prefix ns --defaults --strict
//ng serve

//____Application structure
//package.json: в нем определяются зависимости приложения
//Сам TypeScript имеет файл конфигурации tsconfig.json (и еще один в src, называемый tsconfig.app.json), в котором хранятся параметры компиляции

//____first component
//Чтобы сообщить Angular, что это компонент, мы используем декоратор @Component

@Component({
    selector: 'ns-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ponyracer';
}
//<span>{{ title }} app is running!</span>

//Каждый раз, когда Angular находит в нашем HTML элемент, соответствующий селектору компонента, он создает экземпляр компонента и заменяет содержимое элемента шаблоном компонента.

//___Our first Angular Module
//сгруппировать наши компоненты

import { NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
//корневой модуль
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
@NgModule({
    declarations: [
        AppComponent
    ],
    //Когда вы импортируете модуль, вы сделаете все директивы, компоненты и каналы, экспортированные импортированным модулем, пригодными для использования в вашем модуле.
    imports: [
        BrowserModule
    ],
    providers: [],
    //поле начальной загрузки объекта конфигурации
    bootstrap: [AppComponent]
})
export class AppModule { }

//___Bootstrapping the app
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

//CLI создал для нас файл index.html, который является единственной страницей нашего приложения
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

//____The templating syntax
//с некоторыми динамическими частями в зависимости от наших данных

//hard-coded
@Component({
    selector: 'ns-root',
    template: '<h1>PonyRacer</h1>'
})
export class AppComponent {
    numberOfUsers = 146;
}

//___ Interpolation
//указать, что выражение должно быть вычислено - {{ numberOfUsers }}

@Component({
    selector: 'ns-root',
    template: `
    <h1>PonyRacer</h1>
    <h2>{{ numberOfUsers }} users</h2>
    `
})
export class AppComponent {
    numberOfUsers = 146;
}
/* 
<ns-root>
  <h1>PonyRacer</h1>
  <h2>146 users</h2>
</ns-root>
*/

//если мой пользовательский объект действительно будет получен с сервера и, таким образом, будет инициализирован как неопределенный, прежде чем будет оценен как результат вызова сервера - user?.name

//___Using other components in our templates

// in app.component.ts
import { Component } from '@angular/core';
@Component({
    selector: 'ns-root',
    // added the RacesComponent component
    template: `
  <h1>PonyRacer</h1>
  <ns-races></ns-races> //<---- RacesComponent
  `
})
export class AppComponent { }
/* 
<ns-root>
  <h1>PonyRacer</h1>
66
  <ns-races>
  <h2>Races</h2>
  </ns-races>
</ns-root>
*/

//RacesComponent не является корневым компонентом нашего приложения, поэтому он должен быть в объявлениях
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// do not forget to import the component
import { RacesComponent } from './races.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, RacesComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

// in another file, races.component.ts
import { Component } from '@angular/core';
@Component({
    selector: 'ns-races',
    template: `<h2>Races</h2>`
})
export class RacesComponent { }

//____Property binding
//свойства могут также иметь логические значения, тогда как некоторые атрибуты могут отражать это только наличием или отсутствием в начальном теге.
// <option selected>Rainbow Dash</option>
// <option selected="false">Rainbow Dash</option> <!-- still selected -->
//<img src="{{ pony.avatar.url }}">
//Вы также можете получить доступ к вложенным свойствам, таким как атрибут цвета свойства стиля
//<p [style.color]="foreground">Friendship is Magic</p>
// <ns-pony name="Pony {{ pony.name }}"></ns-pony>
// <ns-pony [name]="'Pony ' + pony.name"></ns-pony>
//выражение также может содержать вызовы функций
// <ns-pony name="{{ pony.fullName() }}"></ns-pony>
// <ns-pony [name]="pony.fullName()"></ns-pony>

//____Events
//Реагировать на событие можно следующим образом
//<button (click)="onButtonClick()">Click me!</button>

@Component({
    selector: 'ns-races',
    template: `
    <h2>Races</h2>
    <button (click)="refreshRaces()">Refresh the races list</button>
    <p>{{ races.length }} races</p>
    `
})
export class RacesComponent {
    races: any = [];
    refreshRaces(): void {
        this.races = [{ name: 'London' }, { name: 'Lyon' }];
    }
}

@Component({
    selector: 'ns-root',
    template: `
    <h1>PonyRacer</h1>
    <ns-races (newRaceAvailable)="onNewRace()"></ns-races>
    `
})
export class AppComponent {
    onNewRace(): void {
        // add a flashy message for the user.
    }
}

//можете легко обрабатывать события клавиатуры с помощью
//<textarea (keydown.space)="onSpacePress()">Press space!</textarea>

//____Expressions vs statements
//<component [property]="user = 'Cédric'"></component>

//___Local variables
//Локальные переменные — это переменные, которые вы можете динамически объявлять в своем шаблоне, используя синтаксис #.
//<input type="text" #name> -> {{ name.value }}

//Используя синтаксис #, мы создаем имя локальной переменной, ссылающееся на объект DOM HTMLInputElement. Эту локальную переменную можно использовать в любом месте шаблона. Поскольку у него есть свойство значения, мы можем отобразить это свойство в интерполированном выражении
// <input type="text" #name>
// <button (click)="name.focus()">Focus the input</button>

//___Structural directives
//Он используется для добавления поведения к элементу. Структурные директивы, предоставляемые Angular, основаны на использовании элемента ng-template, вдохновленного стандартным тегом шаблона спецификации HTML
/* 
<ng-template>
  <div>Races list</div>
</ng-template>
*/
//Структурные директивы имеют возможность выполнять простые действия с этим контентом, например, отображать его или нет, повторять и т. д

//___NgIf
/* 
<ng-template [ngIf]="races.length > 0">
  <div><h2>Races</h2></div>
</ng-template>
*/

import { Component } from '@angular/core';
@Component({
    selector: 'ns-races',
    template: `<div *ngIf="races.length > 0"><h2>Races</h2></div>`
})
export class RacesComponent {
    races: Array<any> = [];
}

//Также возможно использовать синтаксис else
import { Component } from '@angular/core';
@Component({
    selector: 'ns-races',
    template: `
  <div *ngIf="races.length > 0; else empty"><h2>Races</h2></div>
  <ng-template #empty><h2>No races.</h2></ng-template>
  `
})
export class RacesComponent {
    races: Array<any> = [];
}

//___NgFor
//он позволяет создавать экземпляры одного шаблона для каждого элемента коллекции
import { Component } from '@angular/core';
@Component({
    selector: 'ns-races',
    template: `
                <div *ngIf="races.length > 0">
                <h2>Races</h2>
                <ul>
                <li *ngFor="let race of races">{{ race.name }}</li>
                </ul>
                </div>
            `
})
export class RacesComponent {
    races: Array<any> = [{ name: 'London' }, { name: 'Lyon' }];
}

//Можно объявить еще одну локальную переменную, привязанную к индексу текущего элемента
/* 
<ul>
  <li *ngFor="let race of races; index as i">{{ i }} - {{ race.name }}</li>
</ul>
*/

//Существуют также другие экспортируемые переменные, которые могут быть полезны
//even, odd, first,last

//___NgSwitch
//Как можно догадаться по названию, эта директива позволяет переключаться между различными шаблонами в зависимости от условия.
/* 
<div [ngSwitch]="messageCount">
  <p *ngSwitchCase="0">You have no message</p>
  <p *ngSwitchCase="1">You have a message</p>
  <p *ngSwitchDefault>You have some messages</p>
</div>
*/

//-----------------------------
//___Other template directives

//___NgStyle
//<p [style.color]="foreground">Friendship is Magic</p>
//установить несколько стилей одновременно
//<div [ngStyle]="{fontWeight: fontWeight, color: color}">I've got style</div>

//___NgClass
//позволяет динамически добавлять или удалять классы элемента
//<div [class.awesome-div]="isAnAwesomeDiv()">I've got style</div>
//<div [ngClass]="{'awesome-div': isAnAwesomeDiv(), 'colored-div': isAColoredDiv()}">I've got style</div>

//___Summary
//{{}} для интерполяции • [] для привязки свойств • () для привязки событий • # для объявления переменной • * для структурных директив.

//Пример - Я хочу написать компонент PonysComponent, отображающий список пони. Каждый пони должен быть представлен компонентом PonyComponent. Итак, сейчас мы собираемся отобразить простой список. Список должен отображаться только в том случае, если он не пуст, и мне хотелось бы иметь цвет для четных строк моего списка. Наконец, я хочу иметь возможность обновлять список одним нажатием кнопки.
import { Component } from '@angular/core';
@Component({
    selector: 'ns-ponies',
    template: `
    <button (click)="refreshPonies()">Refresh</button>
    <ul>
    <li *ngFor="let pony of ponies; even as isEven" [style.color]="isEven ? 'green'
    : 'black'">
    {{ pony.name }}
    </li>
    </ul>
  `
})
export class PoniesComponent {
    ponies: Array<any> = [{ name: 'Rainbow Dash' }, { name: 'Pinkie Pie' }];
    refreshPonies(): void {
        this.ponies = [{ name: 'Fluttershy' }, { name: 'Rarity' }];
        80
    }
}

//-----------------------------------------
//___Building components and directives__//
//Директива очень похожа на компонент, за исключением того, что у нее нет шаблона

//Например, это очень простая директива, которая ничего не делает, но активируется, если атрибут doNothing присутствует в элементе:

@Directive({
    selector: '[doNothing]'
})
export class DoNothingDirective {
    constructor() {
        console.log('Do nothing directive');
    }
}

@Component({
    selector: 'ns-test',
    template: '<div doNothing>Click me</div>'
})
export class TestComponent { }

//Здесь он будет соответствовать всем элементам div с классом loggable и атрибутом logText, у которых нет атрибута notLoggable с истинным значением.
@Directive({
    selector: 'div.loggable[logText]:not([notLoggable=true])'
})
export class ComplexSelectorDirective {
    constructor() {
        console.log('Complex selector directive');
    }
}
//Итак, этот шаблон вызовет директиву:
//<div class="loggable" logText="text">Hello</div>
//Но этого не будет
//<div class="loggable" logText="text" notLoggable="true">Hello</div>

//___Inputs
//Каждый раз, когда вы хотите, чтобы верхний компонент передавал данные одному из своих дочерних элементов, вы будете использовать привязку свойства.

@Component({
    selector: 'ns-pony',
    template: `<div>{{ pony.name }}</div>`
})
export class PonyComponent {
    @Input() pony!: PonyModel;
}

//_
@Component({
    selector: 'ns-ponies',
    template: `
    <div>
    <h2>Ponies</h2>
    // the pony is handed to PonyComponent via [pony]="currentPony"
    <ns-pony *ngFor="let currentPony of ponies" [pony]="currentPony"></ns-pony>
    </div>
    `
})
export class PoniesComponent {
    ponies: Array<PonyModel> = [
        { id: 1, name: 'Rainbow Dash' },
        { id: 2, name: 'Pinkie Pie' }
    ];
}

//___Outputs
//Пользовательские события создаются с помощью EventEmitter и должны быть объявлены в декораторе с использованием атрибута выходов

//<ns-pony [pony]="pony" (ponySelected)="betOnPony($event)"></ns-pony>
@Component({
    selector: 'ns-pony',
    template: ` <div (click)="selectPony()">{{ pony.name }}</div> `
})
export class SelectablePonyComponent {
    @Input() pony!: PonyModel;
    @Output() readonly ponySelected = new EventEmitter<PonyModel>();
    selectPony(): void {
        this.ponySelected.emit(this.pony);
    }
}

//____Lifecycle
//входные данные компонента еще не оцениваются в его конструкторе
@Directive({
    selector: '[undefinedInputs]'
})
export class UndefinedInputsDirective {
    @Input() pony!: string;
    constructor() {
        console.log(`inputs are ${this.pony}`);
    }
}
//Если вы хотите получить доступ к значению ввода, например, для загрузки дополнительных данных с сервера, вам необходимо использовать фазу жизненного цикла

/* 
Доступно несколько этапов, каждый из которых имеет свою специфику: 
• ngOnChanges будет вызываться первым при изменении значения связанного свойства. Он получит карту изменений, содержащую текущие и предыдущие значения привязки, завернутую в SimpleChange. Он не будет вызываться, если не будет изменений. 
• ngOnInit будет вызываться только один раз после первого изменения (тогда как ngOnChanges вызывается при каждом изменении). Это делает этот этап идеальным для работы по инициализации, как следует из названия.
• ngOnDestroy вызывается при удалении компонента. Действительно полезно сделать некоторую очистку. Доступны и другие этапы, но они предназначены для более сложных случаев использования: 
• ngDoCheck немного отличается. Если он присутствует, он будет вызываться в каждом цикле обнаружения изменений, переопределяя алгоритм обнаружения изменений по умолчанию, который ищет разницу между каждым связанным значением свойства. Это означает, что если хотя бы одно входное значение изменилось, по умолчанию компонент считается измененным платформой, а его дочерние элементы будут проверены и отображены. Но вы можете переопределить это, если знаете, что некоторые входные данные не имеют эффекта, даже если они были изменены. Это может быть полезно, если вы хотите ускорить обнаружение изменений, просто проверив минимум и не используя алгоритм по умолчанию, но обычно вы не будете его использовать. 
• ngAfterContentInit вызывается, когда все проецируемое содержимое компонента проверено в первый раз. 
• ngAfterContentChecked вызывается, когда все проецируемое содержимое компонента проверено, даже если оно не изменилось.
 • ngAfterViewInit вызывается, когда все привязки шаблона проверяются впервые.
  • ngAfterViewChecked вызывается, когда все привязки шаблона проверены, даже если они не изменились. Это может быть полезно, если ваш компонент или директива ожидает доступности элемента, чтобы что-то с ним сделать, например, сфокусировать его.
*/

@Directive({
    selector: '[initDirective]'
})
export class OnInitDirective implements OnInit {
    @Input() pony!: string;
    ngOnInit(): void {
        console.log(`inputs are ${this.pony}`);
        // inputs are not undefined \o/
    }
}

//Параметр изменений представляет собой карту с именами привязок в качестве ключей и объект SimpleChange с двумя атрибутами (предыдущее и текущее значение) в качестве значения, а также метод isFirstChange(), чтобы узнать, является ли это… первым изменением!
@Directive({
    selector: '[changeDirective]'
})
export class OnChangesDirective implements OnChanges {
    @Input() pony!: string;
    ngOnChanges(changes: SimpleChanges): void {
        const ponyValue = changes['pony'];
        console.log(`changed from ${ponyValue.previousValue} to ${ponyValue.currentValue}
  `);
        console.log(`is it the first change? ${ponyValue.isFirstChange()}`);
    }
}

//Вы также можете использовать сеттер, если хотите реагировать только на изменение одной из ваших привязок. Следующий пример выдаст тот же результат, что и предыдущий.
@Directive({
    selector: '[setterDirective]'
})
export class SetterDirective {
    private ponyModel!: string;
    @Input()
    set pony(newPony: string) {
        console.log(`changed from ${this.ponyModel} to ${newPony}`);
        this.ponyModel = newPony;
    }
}

//ngOnDestroy идеально подходит для очистки компонента — например, для отмены фоновых задач
@Directive({
    selector: '[destroyDirective]'
})
export class OnDestroyDirective implements OnDestroy {
    sayHello: number;
    constructor() {
        this.sayHello = window.setInterval(() => console.log('hello'), 1000);
    }
    ngOnDestroy(): void {
        window.clearInterval(this.sayHello);
    }
}

//--------------------------------------------
//___Styling components and encapsulation___//
//Стили, которые вы определяете в компоненте (либо с помощью атрибута стилей, либо в специальном файле CSS для компонента с помощью styleUrls), ограничиваются Angular этим компонентом и только этим. Это называется инкапсуляцией стиля.
//зависит от стратегии, которую вы выбираете для инкапсуляции атрибутов декоратора компонента. Этот атрибут может иметь три разных значения: 
//• ViewEncapsulation.Emulated, значение по умолчанию. 
//• ViewEncapsulation.Native, основанное на Shadow DOM v0 (первая версия спецификации, теперь устаревшая). 
//• ViewEncapsulation.ShadowDom, основанное на Shadow DOM v1. (новый параметр, представленный в Angular 6.1 для поддержки новой спецификации Shadow DOM)
// • ViewEncapsulation.None, что означает, что вам не нужна инкапсуляция.

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ns-pony',
    template: `<div class="red">{{ name }}</div>`,
    styles: [
        `
  .red {
  color: red;
  }
  `
    ],
    // это то же самое, что и режим по умолчанию
    encapsulation: ViewEncapsulation.Emulated
})
export class PonyComponent {
    name = 'Rainbow Dash';
}
/* 
.red {
  color: red;
}
*/

//___Shadow DOM strategy
//Используя стратегию ShadowDom, вы уверены, что стили вашего компонента не «просачиваются» в ваши дочерние компоненты
/* 
<ns-pony>
  #shadow-root (open)
  <style>.red {color: red}</style>
  <div class="red">Rainbow Dash</div>
</ns-pony>
*/

//___ Emulated strategy
//Этот уникальный атрибут затем добавляется ко всем элементам шаблона нашего компонента! Таким образом, стиль будет применяться только к нашему компоненту
/* 
<html>
  <head>
  <style>.red[_ngcontent-dvb-3] {color: red}</style>
  </head>
  <body>
  ...
  <ns-pony _ngcontent-dvb-2="" _nghost-dvb-3="">
  <div _ngcontent-dvb-3="" class="red">Rainbow Dash</div>
  </ns-pony>
  </body>
</html>
*/

//___ None strategy
//ведут себя как «нормальные» стили, переходящие в дочерние элементы.

//___
//позволяющий стилизовать только хост-элемент
/* 
:host {
  display: block;
}
*/

//-----------
//__Pipes__//
//Иногда необработанные данные — это не то, что мы хотим отображать в представлении. Нам часто нужно преобразовать его, отфильтровать, ограничить его количество и т. д.

//___json
//применяет JSON.stringify() к вашим данным
//<p>{{ ponies | json }}</p>
//<p>{{ ponies | slice:0:2 | json }}</p>
//<p [textContent]="ponies | json"></p>

//____slice
//Он работает как метод среза в JavaScript
//<p>{{ 'Ninja Squad' | slice:0:5 }}</p>
//<p>{{ 'Ninja Squad' | slice:2:-2 }}</p>

@Component({
    selector: 'ns-ponies',
    template: `<div *ngFor="let pony of ponies | slice : 0 : 2">{{ pony.name }}</div>`
})
export class PoniesComponent {
    ponies: Array<any> = [{ name: 'Rainbow Dash' }, { name: 'Pinkie Pie' }, {
        name:
            'Fluttershy'
    }];
}

//___keyvalue
//порядочивает ключи: • сначала лексикографически, если они оба являются строками • затем по их значению, если они оба являются числами • затем по их логическому значению, если они оба являются логическими значениями (false перед true)
//Если у вас есть нулевые или неопределенные ключи, они будут отображены в конце.

@Component({
    selector: 'ns-ponies',
    template: `
    <ul>
    <!-- entry contains { key: number, value: PonyModel } -->
    <li *ngFor="let entry of ponies | keyvalue">{{ entry.key }} - {{
  entry.value.name }}</li>
    </ul>
    `
})
export class PoniesComponent {
    ponies = new Map<number, PonyModel>();
    constructor() {
        this.ponies.set(103, { name: 'Rainbow Dash' });
        this.ponies.set(56, { name: 'Pinkie Pie' });
    }
}

//___uppercase
// <p>{{ 'Ninja Squad' | uppercase }}</p>
// <!-- will display 'NINJA SQUAD' -->

//___lowercase
// <p>{{ 'Ninja Squad' | lowercase }}</p>
// <!-- will display 'ninja squad' -->

//___titlecase
// <p>{{ 'ninja squad' | titlecase }}</p>
// <!-- will display 'Ninja Squad' -->

//___number
/* 
<p>{{ 12345 | number }}</p>
<!-- will display '12,345' -->

<p>{{ 12345 | number:'.2' }}</p>
<!-- will display '12,345.00' -->

<p>{{ 12345.13 | number:'.1-1' }}
<!-- will display '12,345.1' -->
*/

//___percent
/* 
<p>{{ 0.8 | percent }}</p>
<!-- will display '80%' -->
<p>{{ 0.8 | percent:'.3' }}</p>
<!-- will display '80.000%' -->
*/

//___currency
/* 
<p>{{ 10.6 | currency:'CAD' }}</p>
<!-- will display 'CA$10.60' -->

<p>{{ 10.6 | currency:'CAD':'symbol-narrow' }}</p>
<!-- will display '$10.60' -->

<p>{{ 10.6 | currency:'EUR':'code':'.3' }}</p>
<!-- will display 'EUR10.600' -->
*/

//___date
/* 
<p>{{ birthday | date:'dd/MM/yyyy' }}</p>
<!-- will display '16/07/1986' -->

<p>{{ birthday | date:'longDate' }}</p>
<!-- will display 'July 16, 1986' -->
*/

//___async
//позволяет отображать данные, полученные асинхронно

import { Component } from '@angular/core';
@Component({
    selector: 'ns-user',
    template: `<div *ngIf="asyncUser | async as user">{{ user.name }}</div>`
})
export class UserComponent {
    asyncUser = new Promise<UserModel>(resolve => {
        window.setTimeout(() => resolve({ name: 'Cédric' }), 1000);
    });
}

//___A pipe in your code
//Вы также можете использовать его в своем коде посредством внедрения зависимостей

import { Component, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';
@Component({
    selector: 'ns-pony',
    template: `<p>{{ formattedSpeed }}</p>`
})
export class PonyComponent {
    pony = { name: 'Rainbow Dash', speed: 15 };
    formattedSpeed: string | null;

    constructor(decimalPipe: DecimalPipe, @Inject(LOCALE_ID) locale: string) {
        this.formattedSpeed = decimalPipe.transform(this.pony.speed, '.2', locale);
    }
}

//___Creating your own pipes
//создавать свои собственные
//Например, мы создали его, чтобы отображать, сколько времени прошло с момента действия, которое пользователь совершил (например, 12 секунд назад или 3 дня назад) в нескольких наших приложениях

import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
@Pipe({ name: 'fromNow' })
export class FromNowPipe implements PipeTransform {
    transform(value: string, args: Array<unknown>): string {
        const date = parseISO(value);
        return formatDistanceToNowStrict(date, { addSuffix: true });
    }
}

// declarations of your @NgModule.

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, RacesComponent, FromNowPipe],
    bootstrap: [AppComponent]
})
export class AppModule { }

//-----------------------------
//____Dependency injection___//
//Чтобы иметь возможность использовать внедрение зависимостей, нам нужно несколько вещей:
// • способ регистрации зависимости, чтобы сделать ее доступной для внедрения в другой компонент.
//• способ объявить, какие зависимости необходимы в текущем компоненте

//Чтобы сообщить Angular, что этот сервис сам имеет некоторые зависимости, нам нужно добавить декоратор класса: @Injectable()
//нам необходимо «зарегистрировать» его, чтобы сделать его доступным для внедрения - использовать ProvideIn
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    get(path: string): Array<any> {
        // todo: call the backend API
    }
}

//получает экземпляр зависимости или создает его и фактически внедряет его в наш компонент
import { ApiService } from './api.service';
export class RaceService {
    constructor(private apiService: ApiService) { }
}

//Другой способ решистрации сделать это — использовать атрибут поставщиков декоратора
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    providers: [
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

//если мы хотим сделать наш RaceService доступным для внедрения в другие сервисы или компоненты, нам также необходимо его зарегистрировать
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RaceModel } from './race.model';

@Injectable({
    providedIn: 'root'
})
export class RaceService {
    constructor(private apiService: ApiService) { }
    list(): Array<RaceModel> {
        return this.apiService.get('/races');
    }
}

//_
@Component({
    selector: 'ns-root',
    template: `
    <h1>PonyRacer</h1>
    <p>{{ list() }}</p>
    `
})
export class AppComponent {
    constructor(private raceService: RaceService) { }
    list(): Array<RaceModel> {
        return this.raceService.list();
    }
}

//____Easy to configure
//Мы можем представить отношения между компонентом и сервисами следующим образом

//Мы сообщаем Injector, что хотим создать связь между токеном (типа RaceService) и классом RaceService. Injector — это служба, которая отслеживает внедряемые компоненты путем ведения реестра и фактически внедряет их при необходимости. Реестр представляет собой карту, которая связывает ключи, называемые токенами, с классами. Токены не обязательно являются строками, в отличие от многих фреймворков внедрения зависимостей. Это может быть что угодно, например, ссылки на типы. И это обычно так и будет. Поскольку в нашем примере токен и внедряемый класс одинаковы, вы можете написать то же самое в более короткой форме:
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        RaceService,
        ApiService
    ],
    // providers: [
    //     { provide: RaceService, useClass: RaceService },
    //     { provide: ApiService, useClass: ApiService }
    // ]
})
export class AppModule { }

//инжектор возвращается обещанием bootstrapModule, поэтому мы можем с ним поиграть

// in our module
providers: [
    ApiService,
    { provide: RaceService, useClass: RaceService },
    // добавим еще одного провайдера в тот же класс
    // с другим токеном
    // Токен можно объявить следующим образом:
    // const token = new InjectionToken<RaceService>
    { provide: token, useClass: RaceService }
]

// let's bootstrap the module
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(
        // and play with the returned injector
        appRef => playWithInjector(appRef.injector)
    );

function playWithInjector(inj: Injector): void {
    //можем запросить у инжектора зависимость с помощью метода get
    console.log(inj.get(RaceService));
    // logs "RaceService {apiService: ApiService}"
    console.log(inj.get(token));
    // logs "RaceService {apiService: ApiService}" again
    console.log(inj.get(RaceService) === inj.get(RaceService));
    // logs "true", так как каждый раз для токена возвращается один и тот же экземпляр
    console.log(inj.get(RaceService) === inj.get(token));
    // logs "false", поскольку провайдеры разные
}

//Весь этот пример был просто для того, чтобы указать на несколько вещей:
// • провайдер связывает токен с сервисом. 
//• инжектор возвращает один и тот же экземпляр каждый раз, когда ему запрашивается один и тот же токен. 
//• имя токена может отличаться от имени класса
//полезно, поскольку вы можете обмениваться информацией между компонентами, использующими службу, и вы будете уверены, что они используют один и тот же экземпляр службы

//__Other types of provider
//В нашем примере проверяется константа и возвращается поддельный сервис или настоящий сервис.

const IS_PROD = true;

providers: [
    ApiService,
    {
        provide: RaceService,
        // экземпляр apiService будет внедрен на фабрику чтобы мы могли передать его RaceService
        useFactory: (apiService: ApiService) => (IS_PROD ? new RaceService(apiService) :
            new FakeRaceService()),
        //вы можете указать массив зависимостей
        deps: ['IS_PROD', ApiService]
    }
]

//___Hierarchical injectors
//Иерархические инжекторы
//• зависимости, объявленные в корневом инжекторе, доступны для каждого компонента приложения.

//В этом компоненте поставщик с токеном RaceService всегда будет предоставлять экземпляр FakeRaceService, независимо от того, что было определено в корневом инжекторе. Это действительно полезно, если вы хотите иметь другой экземпляр службы для данного компонента или если вы хотите идеально инкапсулировать

@Component({
    selector: 'ns-races',
    providers: [{ provide: RaceService, useClass: FakeRaceService }],
    template: `<strong>Races list: {{ list() }}</strong>`
})
export class RacesComponent {
    constructor(private raceService: RaceService) { }
    list(): Array<RaceModel> {
        return this.raceService.list();
    }
}

//Как правило, если только один компонент должен иметь доступ к сервису, рекомендуется предоставлять этот сервис только в инжекторе компонента, используя атрибут поставщиков. Если зависимость может использоваться всем приложением, объявите ее в корневом модуле

//___DI without types
//Также можно не использовать тип для внедрения зависимостей, используя декоратор @Inject()

//Чтобы использовать @Inject(), вам необходимо передать ему токен. Этот токен определяется следующим образом:
import { InjectionToken } from '@angular/core';
export const BACKEND_URL = new InjectionToken<string>('API URL');
//Затем мы используем этот токен в поставщиках модуля, чтобы определить его значение:
{ provide: BACKEND_URL, useValue: 'http://localhost:8080' }

//_
import { Inject, Injectable } from '@angular/core';
import { BACKEND_URL } from './tokens';
@Injectable({
    providedIn: 'root'
})
export class RaceService {
    constructor(@Inject(BACKEND_URL) private url: string) { }
}

//вы можете зарегистрировать его напрямую с помощью ProvideIn:
export const BACKEND_URL_PROVIDED = new InjectionToken<string>('API URL', {
    providedIn: 'root',
    factory: () => 'http://localhost:8080'
});

//Сам Angular использует этот механизм токенов и позволяет нам определять локаль приложения, например, с помощью токена LOCALE_ID
@NgModule({
    imports: [BrowserModule],
    declarations: [
        CustomLocaleComponent
    ],
    122
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' }
    ]
    // ...
  })
export class AppModule { }
@Component({
    selector: 'ns-locale',
    template: `
    <p>The locale is {{ locale }}</p>
    <!-- will display 'fr-FR' -->
    <p>{{ 1234.56 | number }}</p>
    <!-- will display '1 234,56' -->
    `
})
export class CustomLocaleComponent {
    constructor(@Inject(LOCALE_ID) public locale: string) { }
}

//--------------
//__Services__//
//Angular содержит концепцию сервисов: классов, которые вы можете внедрить в другой. Некоторые сервисы предоставляются платформой, некоторые — общими модулями, а другие могут быть созданы вами.

//___Title service
//изменить заголовок своей страницы
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'ns-root',
    template: `<h1>PonyRacer</h1>`
})
export class AppComponent {
    constructor(title: Title) {
        title.setTitle('PonyRacer - Bet on ponies');
    }
}

//___Meta service
//позволяет получать или обновлять «мета»-значения страницы.
@Component({
    selector: 'ns-root',
    template: `<h1>PonyRacer</h1>`
})
export class AppComponent {
    constructor(meta: Meta) {
        meta.addTag({ name: 'author', content: 'Ninja Squad' });
    }
}

//___Создание собственного сервиса
//Если у вашего сервиса есть какие-то зависимости, вам нужно добавить к нему декоратор @Injectable(). Без этого декоратора фреймворк не будет выполнять внедрение зависимостей.
@Injectable({
    providedIn: 'root'
})
export class RacesServiceWithHttp {
    constructor(private http: HttpClient) { }
    list(): Observable<Array<RaceModel>> {
        return this.http.get<Array<RaceModel>>('/api/races');
    }
}

//---------------------------
//___Reactive Programming__//
//способ создания приложения, использующего события и реагирующего на них (отсюда и название).
//Общие принципы В реактивном программировании все является потоком. Поток — это упорядоченная последовательность событий.
//Ваша задача как разработчика — подписаться на эти потоки, т. е. определить прослушиватель, способный обработать
//Такой слушатель называется наблюдателем(observer), а поток — наблюдаемым(observable).
//наблюдатель — это не одноразовая вещь, такая как обещание: он будет продолжать слушать до тех пор, пока не получит событие «завершения».

//-----------
//___RxJS__//

//Любую наблюдаемую, как и любой массив, можно преобразовать с помощью функций, с которыми вы, возможно, уже встречались: 
//• take(n) выберет первые n событий (например, первые пять). • Map(fn) применит fn к каждому событию и вернет результат. 
//• filter(predicate) будет пропускать только те события, которые удовлетворяют предикату.
// • reduce(fn) будет применять fn к каждому событию, чтобы свести поток к одному значению. 
//• merge(s1, s2) объединит потоки. 
//• subscribe(fn) будет применять fn к каждому полученному событию. • и многое другое…

[1, 2, 3, 4, 5]
    .map(x => x * 2)
    .filter(x => x > 5)
    .forEach(x => console.log(x)); // 6, 8, 10\

//_
import { filter, from, map } from 'rxjs';

from([1, 2, 3, 4, 5])
    .pipe(
        map(x => x * 2),
        filter(x => x > 5)
    )
    .subscribe(x => console.log(x)); // 6, 8, 10

//можете создавать наблюдаемые из запросов AJAX, событий браузера, ответов веб-сокетов, обещаний и всего, что вы можете придумать.
//new Observable() принимает функцию, которая будет генерировать события для наблюдателя, указанного в качестве параметра
const observable = new Observable(observer => observer.next('hello'));
observable.subscribe(value => console.log(value));
// logs "hello"

range(1, 5)
    .pipe(
        map(x => {
            if (x % 2 === 1) {
                throw new Error('something went wrong');
            } else {
                return x;
            }
        }),
        filter(x => x > 5)
    )
    .subscribe({
        next: x => console.log(x),
        error: error => console.log(error)
    });
// something went wrong
//Как только наблюдаемый объект будет завершен, он выдаст событие завершения, которое вы можете перехватить с помощью третьего обработчика

//Сам Angular использует RxJS в EventEmitter.

//----------------------
//__Testing your app__//
//мы можем писать два типа тестов: • модульные тесты (Unit test) • сквозные тесты. Первые тесты предназначены для проверки работоспособности небольшой единицы кода (компонента, службы, канала…). правильно изолированно, т.е. без учета его зависимостей. Написание такого модульного теста требует от вас выполнения каждого компонента.

//___Unit test
//Одной из основных концепций модульного тестирования является изоляция: мы не хотим, чтобы на наш тест влияли его зависимости. Поэтому мы обычно используем «фиктивные» объекты в качестве зависимостей. Это поддельные объекты, которые мы создаем только в целях тестирования
//Сначала нам нужна библиотека для написания тестов -  Jasmine

//___Jasmine and Karma
//Jasmine предоставляет нам несколько методов для объявления наших тестов:
// • describe() объявляет набор тестов (группу тестов); 
//• it() объявляет тест; 
//• expect()  объявляет утверждение.

class Pony {
    constructor(public name: string, public speed: number) { }
    isFasterThan(speed: number): boolean {
        return this.speed > speed;
    }
}

//тест для него
describe('My first test suite', () => {
    it('should construct a Pony', () => {
        const pony = new Pony('Rainbow Dash', 10);
        expect(pony.name).toBe('Rainbow Dash');
        expect(pony.speed).not.toBe(1);
        expect(pony.isFasterThan(8)).toBe(true);
    });
});

//Вы можете поместить свой тест рядом с тестируемым файлом или в специальный каталог со всеми своими тестами.
//То же самое, если вы хотите запустить только один тест: используйте fit() вместо it() в describe , если вы хотите исключить тест, используйте xit() или xdescribe()

//метод beforeEach() для настройки контекста перед каждым тестом
describe('Pony', () => {
    let pony: Pony;
    beforeEach(() => {
        pony = new Pony('Rainbow Dash', 10);
    });

    it('should have a name', () => {
        expect(pony.name).toBe('Rainbow Dash');
    });
    it('should have a speed', () => {
        expect(pony.speed).not.toBe(1);
        expect(pony.speed).toBeGreaterThan(9);
    });
});

//Jasmine позволяет нам создавать поддельные объекты (имитировать или шпионить, как хотите) или даже шпионить за методом реального объекта. Затем мы можем сделать некоторые утверждения для этих методов, например, с помощью toHaveBeenCalled(), который проверяет, был ли вызван метод, или с помощью toHaveBeenCalledWith(), который проверяет точные параметры вызова шпионского метода
class Race {
    constructor(private ponies: Array<Pony>) { }
    start(): Array<Pony> {
        return (
            this.ponies
                // start every pony
                // and only keeps the ones that started running
                .filter(pony => pony.run(10))
        );
    }
}


describe('Race', () => {
    let rainbowDash: Pony;
    let pinkiePie: Pony;
    let race: Race;
    beforeEach(() => {
        rainbowDash = new Pony('Rainbow Dash');
        // первая пони соглашается бежать
        spyOn(rainbowDash, 'run').and.returnValue(true);

        pinkiePie = new Pony('Pinkie Pie');
        // вторая пони отказывается бежать
        spyOn(pinkiePie, 'run').and.returnValue(false);

        // создаем гонку с этими двумя пони
        race = new Race([rainbowDash, pinkiePie]);
    });
});

//и проверьте, вызываются ли методы:
it('should make the ponies run when it starts', () => {
    // start the race
    const runningPonies: Array<Pony> = race.start();
    // should have called `run()` on the ponies
    expect(pinkiePie.run).toHaveBeenCalled();
    // with a speed of 10
    expect(rainbowDash.run).toHaveBeenCalledWith(10);
    // as one pony refused to start, the result should be an array of one pony
    expect(runningPonies).toEqual([rainbowDash]);
});

//____Using dependency injection
@Injectable({
    providedIn: 'root'
})
export class RaceService {
    list(): Array<RaceModel> {
        const race1: RaceModel = { name: 'London' };
        const race2: RaceModel = { name: 'Lyon' };
        return [race1, race2];
    }
}

describe('RaceService', () => {
    it('should return races when list() is called', () => {
        const raceService = new RaceService();
        expect(raceService.list().length).toBe(2);
    });
});

//Этот метод позволяет получить конкретную зависимость от инжектора внутри тестовой функции.
import { TestBed } from '@angular/core/testing';

import { TestBed } from '@angular/core/testing';
describe('RaceService', () => {
    let service: RaceService;

    beforeEach(() => (service = TestBed.inject(RaceService)));

    it('should return races when list() is called', () => {
        expect(service.list().length).toBe(2);
    });
});

//асинхронное ожидание
import { TestBed, waitForAsync } from '@angular/core/testing';

describe('RaceService', () => {
    let service: RaceService;

    beforeEach(() => (service = TestBed.inject(RaceService)));

    it('should return an observable of 2 races', waitForAsync(() => {
        service.list().subscribe(races => {
            expect(races.length).toBe(2);
        });
    }));
});

//____Fake dependencies
//Мы можем без особых проблем объявить поддельную службу зависимостью вместо реальной.
@Injectable({
    providedIn: 'root'
})
export class RaceService {
    constructor(private localStorage: LocalStorageService) { }
    list(): Array<RaceModel> {
        return this.localStorage.get('races');
    }
}

export class FakeLocalStorage {
    get(key: string): any {
        return [{ name: 'Lyon' }, { name: 'London' }];
    }
}

import { TestBed } from '@angular/core/testing';
describe('RaceService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [{ provide: LocalStorageService, useClass: FakeLocalStorage }]
        })
    );
    it('should return 2 races from localStorage', () => {
        const service = TestBed.inject(RaceService);
        const races = service.list();
        expect(races.length).toBe(2);
    });
});

//__Testing components
@Component({
    selector: 'ns-pony',
    template: `
    <img [src]="'./images/pony-' + pony.color.toLowerCase() + '.png'"
  [alt]="pony.name" (click)="clickOnPony()" />
    `
})
export class PonyComponent {
    @Input() pony!: PonyModel;
    @Output() readonly ponyClicked = new EventEmitter<PonyModel>();
    clickOnPony(): void {
        this.ponyClicked.emit(this.pony);
    }
}

import { TestBed } from '@angular/core/testing';
import { PonyComponent } from './pony.component';
describe('PonyComponent', () => {
    it('should have an image', () => {
        TestBed.configureTestingModule({
            declarations: [PonyComponent]
        });
        140
        const fixture = TestBed.createComponent(PonyComponent);
        // задан экземпляр компонента с инициализированным вводом пони
        const ponyComponent = fixture.componentInstance;
        ponyComponent.pony = { name: 'Rainbow Dash', color: 'BLUE' };
        // когда мы запускаем обнаружение изменений
        fixture.detectChanges();
        // тогда у нас должно быть изображение с правильным атрибутом источника
        // в зависимости от цвета пони
        const element = fixture.nativeElement;
        const imageElement = element.querySelector('img');
        expect(imageElement.getAttribute('src')).toBe('./images/pony-blue.png');
        expect(imageElement.getAttribute('alt')).toBe('Rainbow Dash');
    });
});

//__End-to-end tests (e2e)
//Сквозное тестирование заключается в реальном запуске вашего приложения в браузере и эмуляции взаимодействия пользователя с ним
//Cypress делает снимок на каждом этапе ваших тестов, поэтому вы можете очень легко отлаживать. Просто наведя курсор на шаг неудачного теста, вы увидите точное состояние приложения и сможете поиграть с ним

//----------
//__HTTP__//

//__Getting data
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [BrowserModule, HttpClientModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

//__
//возврощает Observable
@Component({
    selector: 'ns-races',
    template: `<h1>Races</h1>`
})
export class RacesComponent {
    constructor(private http: HttpClient) {

        http
            .get<Array<RaceModel>>(`${baseUrl}/api/races`, { observe: 'response' })
            .subscribe((response: HttpResponse<Array<RaceModel>>) => {
                console.log(response.status); // logs 200
                console.log(response.headers.keys()); // logs []
            });
    }
}

//__Transforming data
raceService.list().subscribe(races => {
    // in the component
    this.races = races;
});

// of RxJS
raceService
    .list()
    .pipe(
        // if the request fails, retry 3 times
        retry(3)
    )
    .subscribe(races => {
        // in the component
        this.races = races;
    });

//__Advanced options

//params
const params = {
    sort: 'ascending',
    page: '1'
};

http.get<Array<RaceModel>>(`${baseUrl}/api/races`, { params })
    .subscribe(response => {
        this.races = response;
    });

// custom headers
const headers = { Authorization: `Bearer ${token}` };
http.get<Array<RaceModel>>(`${baseUrl}/api/races`, { headers }).subscribe(response => {
    this.races = response;
});

//___Jsonp
http
    .jsonp<{ data: Array<GithupRepo> }>('https://api.github.com/orgs/Ninja-Squad/repos',
        'callback')
    .pipe(
        map((res: { data: Array<GithupRepo> }) => res.data)
    )
    .subscribe(response => {
        this.repos = response;
    });

//___Interceptors
@Injectable()
export class GithubAPIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if it is a Github API request
        if (req.url.includes('api.github.com')) {
            // we need to add an OAUTH token as a header to access the Github API
            const clone = req.clone({
                setHeaders: { Authorization: `token ${OAUTH_TOKEN}` }
            });
            return next.handle(clone);
        }
        // if it's not a Github API request, we just hand it to the next handler
        return next.handle(req);
    }
}

//in ngModule
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GithubAPIInterceptor, multi: true }
]

//__ generic way
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private router: Router, private errorHandler: ErrorHandler) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // we catch the error
            tap({
                error: (errorResponse: HttpErrorResponse) => {
                    // if the status is 401 Unauthorized
                    if (errorResponse.status === HttpStatusCode.Unauthorized) {
                        // we redirect to login
                        this.router.navigateByUrl('/login');
                    } else {
                        // else we notify the user
                        this.errorHandler.handle(errorResponse);
                    }
                }
            })
        );
    }
}

//___Tests
@Injectable({
    providedIn: 'root'
})
export class RaceService {
    constructor(private http: HttpClient) { }
    list(): Observable<Array<RaceModel>> {
        return this.http.get<Array<RaceModel>>('/api/races');
    }
}

//__
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from
    '@angular/common/http/testing';

describe('RaceService', () => {
    let raceService: RaceService;
    let http: HttpTestingController;
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
    );
    beforeEach(() => {
        raceService = TestBed.inject(RaceService);
        http = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
        http.verify();
    });
    it('should return an Observable of 2 races', () => {
        // fake response
        const hardcodedRaces = [{ name: 'London' }, { name: 'Lyon' }];
        // call the service
        let actualRaces: Array<RaceModel> = [];
        raceService.list().subscribe(races => (actualRaces = races));
        // check that the underlying HTTP request was correct
        http
            .expectOne('/api/races')
            // return the fake response when we receive a request
            .flush(hardcodedRaces);
        // check that the returned array is deserialized as expected
        expect(actualRaces.length).toBe(2);
    });
});

//__Router

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'races', component: RacesComponent }
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    declarations: [AppComponent, HomeComponent, RacesComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

//path - the navigation
//component -  component 

// a special tag - <router-outlet>.
/* 
<header>
  <nav>...</nav>
</header>
<main>
  <router-outlet></router-outlet> // <------!!! 
  <!-- the component's template will be inserted here-->
</main>
<footer>made with &lt;3 by Ninja Squad</footer>
*/

//__Navigation
/* 
<a href="" routerLink="/">Home</a>
<!-- same as -->
<a href="" [routerLink]="['/']">Home</a>
*/

//link points to the current route - routerLinkActive
//<a href="" routerLink="/" routerLinkActive="selected-menu">Home</a>

//<a href="" routerLink="/" routerLinkActive #route="routerLinkActive">Home {{ route.isActive ? '(here)' : '' }}</a>

// navigate from the code
export class RacesComponent {
    constructor(private router: Router) { }
    saveAndMoveBackToHome(): void {
        // ... save logic ...
        this.router.navigate(['']);
    }
}

//dynamic URLs
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'races', component: RacesComponent },
    { path: 'races/:raceId/ponies/:ponyId', component: PonyComponent }
];

//with routerLink
//<a href="" [routerLink]="['/races', race.id, 'ponies', pony.id]">See pony</a>

//get parameters of the URL
export class PonyComponent implements OnInit {
    pony!: PonyModel;
    constructor(private ponyService: PonyService, private route: ActivatedRoute) { }
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('ponyId')!;
        this.ponyService.get(id).subscribe(pony => (this.pony = pony));
    }
}

// every time the URL changes from /ponies/1 to /ponies/2 for example, the paramMap observable
export class PonyReusableComponent implements OnInit {
    pony!: PonyModel;
    constructor(private ponyService: PonyService, private route: ActivatedRoute) { }
    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const id = params.get('ponyId')!;
            this.ponyService.get(id).subscribe(pony => (this.pony = pony));
        });
    }
}

export class PonySwitchMapComponent implements OnInit {
    pony!: PonyModel;
    constructor(private ponyService: PonyService, private route: ActivatedRoute) { }
    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map((params: ParamMap) => params.get('ponyId')!),
                switchMap(id => this.ponyService.get(id))
            )
            .subscribe(pony => (this.pony = pony));
    }
}

//___Redirects
//{ path: '', pathMatch: 'full', redirectTo: '/breaking' },

//__child
{
    path: 'ponies/:ponyId',
        component: PonyComponent,
            children: [
                { path: '', pathMatch: 'full', redirectTo: 'birth-certificate' },
                { path: 'birth-certificate', component: BirthCertificateComponent },
                { path: 'track-record', component: TrackRecordComponent },
                { path: 'reviews', component: ReviewsComponent }
            ]
}

