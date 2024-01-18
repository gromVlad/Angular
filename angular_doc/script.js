//Angular - это платформа для разработки, построенная на TypeScript.

//class
/* 
Классы - это шаблон для создания объектов. Они инкапсулируют данные с кодом для работы с этими данными. Классы в JS построены на основе прототипов, но также обладают некоторым синтаксисом и семантикой, присущими только классам.
*/

//ограничения временной мертвой зоны, что и let или const, и ведут себя так, как будто они не подняты


//в строгом режиме даже без директивы "use strict"

// Декларация
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

// Выражение; класс является анонимным, но присваивается переменной
const Rectangle = class {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};

// Выражение; класс имеет собственное имя
const Rectangle = class Rectangle2 {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};

/* 
Конструктор
Метод конструктора - это специальный метод для создания и инициализации объекта, созданного с помощью класса. В классе может быть только один специальный метод с именем "constructor" - если класс содержит более одного вхождения метода constructor, будет выброшена ошибка SyntaxError.
Конструктор может использовать ключевое слово super для вызова конструктора суперкласса.
Внутри конструктора можно создавать свойства экземпляра:
*/

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

//Методы
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    // Getter
    get area() {
        return this.calcArea();
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }
    *getSides() {
        yield this.height;
        yield this.width;
        yield this.height;
        yield this.width;
    }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
console.log([...square.getSides()]); // [10, 10, 10, 10]

//Static methods and fields
//Статические свойства (поля и методы) определяются для самого класса, а не для каждого его экземпляра

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static displayName = "Point";
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance; // undefined
p2.displayName; // undefined
p2.distance; // undefined

console.log(Point.displayName); // "Point"
console.log(Point.distance(p1, p2)); // 7.0710678118654755

//Объявления полей
class Rectangle {
    height = 0;
    width;
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
//поля могут быть объявлены как со значением по умолчанию, так и без него. Поля без значений по умолчанию имеют значение undefined

//Private properties
class Rectangle {
    #height = 0;
    #width;
    constructor(height, width) {
        this.#height = height;
        this.#width = width;
    }
}

//extends
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name); // вызовите конструктор суперкласса и передайте параметр name
    }

    speak() {
        console.log(`${this.name} barks.`);
    }
}

const d = new Dog("Mitzie");
d.speak(); // Mitzie barks.

//------------------
//___Decorators___//
/* 
Декораторы в TypeScript - это функции, которые позволяют модифицировать классы, методы, свойства и другие конструкции языка. Декораторы объявляются с помощью символа @ перед именем функции-декоратора.
*/

//Декоратор класса
function logClass(target: Function, ...args: any[]) {
    console.log(`Создан класс ${target.name} с аргументами: ${args}`);
}

@logClass('John Doe', 42)
class MyClass {
    // ...
}
//['John Doe', 42].

//Декоратор метода
function checkArguments(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        if (args.length !== 2) {
            throw new Error(`Метод ${propertyKey.toString()} должен вызываться с двумя аргументами.`);
        }

        return originalMethod.apply(this, args);
    };
}

class MyClass {
    @checkArguments
    sum(a: number, b: number): number {
        return a + b;
    }
}

//Декоратор свойства
function readOnly(target: Object, propertyKey: string | symbol) {
    const descriptor: PropertyDescriptor = {
        get: function () {
            return this[propertyKey];
        }
    };

    Object.defineProperty(target, propertyKey, descriptor);
}

class MyClass {
    @readOnly
    name: string = 'John Doe';
}

//Декоратор параметра
function notNull(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const originalMethod = target[propertyKey];

    target[propertyKey] = function (...args: any[]) {
        if (args[parameterIndex] === null || args[parameterIndex] === undefined) {
            throw new Error(`Параметр ${parameterIndex + 1} метода ${propertyKey.toString()} не может быть null или undefined.`);
        }

        return originalMethod.apply(this, args);
    };
}

class MyClass {
    sum(@notNull a: number, @notNull b: number): number {
        return a + b;
    }
}

//------------------------------
//------------------------------
//_________Angular____________//

//Компоненты - это фундаментальный строительный блок для создания приложений в Angular

//Декоратор для определения параметров конфигурации
// 📄 todo-list-item.component.ts
@Component({
    standalone: true,
    selector: 'todo-list-item',
    template: ` <li>(TODO) Read cup of coffee introduction</li> `,
    styles: ['li { color: papayawhip; }'],
})
export class TodoListItem {
    /* Component behavior is defined in here */
}

// определении данных, которыми должен управлять компонент
// 📄 todo-list-item.component.ts
@Component({ ... })
export class TodoList {
    taskTitle = '';
    isComplete = false;
}

//__Методы
// 📄 todo-list-item.component.ts
@Component({ ... })
export class TodoList {
    taskTitle = '';
    isComplete = false;

    updateTitle(newTitle: string) {
        this.taskTitle = newTitle;
    }

    completeTask() {
        this.isComplete = true;
    }
}

//HTML-шаблоны могут быть определены как встроенный шаблон в классе TypeScript или в отдельных файлах с помощью свойства templateUrl.
@Component({
    template: ` <p>Title: {{ taskTitle }}</p> `,
})
export class TodoListItem {
    taskTitle = 'Read cup of coffee';
}
//<p>Title: Read cup of coffee</p>

//__Динамические свойства и атрибуты
//Когда вам нужно динамически задать значение атрибутов в HTML-элементе, целевое свойство оборачивается квадратными скобками.
//<button [disabled]="hasPendingChanges"></button>

//__Обработка событий
//<button (click)="saveChanges()">Save Changes</button>

//передать объект события -> $event
//<button (click)="saveChanges($event)">Save Changes</button>

//__Styles
@Component({
    selector: 'profile-pic',
    template: `<img src="profile-photo.jpg" alt="Your profile photo" />`,
    styles: [
        `
        img {
          border-radius: 50%;
        }
      `,
    ],
})
export class ProfilePic {
    /* Your code goes here */
}

//__Directives
//позволяют декларативно и многократно использовать новые поведения элемента

//Условный рендеринг
//будет ли элемент отображаться, если выражение возвращает истинное значение
/* 
<section class="admin-controls" *ngIf="hasAdminPrivileges">
  The content you are looking for is here.
</section>
*/

//__Вывод списка на экран
/* 
<ul class="ingredient-list">
  <li *ngFor="let task of taskList">{{ task }}</li>
</ul>
*/

//__Пользовательские директивы
@Directive({
    selector: '[appHighlight]',
})
export class HighlightDirective {
    private el = inject(ElementRef);
    constructor() {
        this.el.nativeElement.style.backgroundColor = 'yellow';
    }
}
//<p appHighlight>Look at me!</p>

//__Services
//позволяет внедрять код в компоненты и управлять им из единого источника правды

//Calculator
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
class CalculatorService {
    add(x: number, y: number) {
        return x + y;
    }
}

//Receipt
import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
    selector: 'app-receipt',
    template: `<h1>The total is {{ totalCost }}</h1>`,
})
export class Receipt {
    private calculatorService = inject(CalculatorService);
    totalCost = this.calculatorService.add(50, 25);
}

//__Организация
/* 
NgModules, он позволяет разработчикам организовывать код и управлять зависимостями с помощью компонентов, а не функциональных модулей
*/

//NgModule
import { FormsModule } from '@angular/forms';
import { TodoList } from '../todo/todo-list.component';

@NgModule({
    declarations: [TodoList],
    imports: [FormsModule],
    exports: [TodoList, FormsModule],
})
export class TodoModule { }

//Однако теперь вы можете добиться чего-то подобного с помощью отдельного компонента
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoList } from '../todo/todo-list.component';

@Component({
    standalone: true,
    selector: 'todo-app',
    imports: [FormsModule, TodoList],
    template: ` ... <todo-list [tasks]="taskList"></todo-list> `,
})
export class PhotoGalleryComponent {
    // component logic
}
//standalone - при значении true сообщает Angular, что компонент не нужно объявлять в NgModule
//imports - Позволяет разработчикам объявить, какие зависимости будут использоваться в компоненте

//__Интерфейс командной строки (CLI)
/* 
ng build - Компилирует приложение Angular в выходной каталог.
ng serve - Собирает и обслуживает ваше приложение, перестраивая его при изменении файлов.
ng generate - Генерирует или изменяет файлы на основе схемы.
ng test - Запускает модульные тесты в заданном проекте.
ng e2e - Собирает и обслуживает приложение Angular, а затем запускает сквозные тесты.
*/

//__Сторонние библиотеки
/* 
Angular Router - Продвинутая навигация и маршрутизация на стороне клиента на основе компонентов Angular. Поддерживает ленивую загрузку, вложенные маршруты, пользовательское сопоставление путей и многое другое.
Angular Forms -  Единая система участия и проверки форм.
Angular HttpClient - Надежный HTTP-клиент, способный обеспечить более продвинутое взаимодействие между клиентом и сервером.
Angular Animations - Богатая система для управления анимацией на основе состояния приложения.
Angular PWA - Инструменты для создания прогрессивных веб-приложений (PWA), включая рабочий сервис и манифест веб-приложения.
Angular Schematics - Автоматизированные инструменты для создания лесов, рефакторинга и обновления, которые упрощают разработку в больших масштабах.
*/

//--------------------------------
//____Начало работы с Angular___//
//Компоненты - позволяют вам повторно использовать наборы функциональности пользовательского интерфейса.
//ДЕТАЛИ КОМПОНЕНТОВ
//<app-root> Первый загружаемый компонент и контейнер для других компонентов

//__Создание списка товаров
/* 
<h2>Products</h2>
<div *ngFor="let product of products">
</div>
*/

//__интерполяции Angular
//Интерполяция {{ }} позволяет отобразить значение свойства в виде текста
/* 
 <h3>
      {{ product.name }}
  </h3>
*/

//__[ ] позволяет использовать значение свойства в шаблонном выражении
/* 
<a [title]="product.name + ' details'">
</a>
*/

//__*ngIf - если есть элемент
/* 
<p *ngIf="product.description">
    Description: {{ product.description }}
</p>
*/

//__события
/* 
<button type="button" (click)="share()">
    Share
</button>
*/

//__Передача данных в дочерний компонент
//Декоратор @Input() указывает на то, что значение свойства передается из родительского компонента

/* 
<app-product-alerts
  [product]="product">
</app-product-alerts>
*/
export class ProductAlertsComponent {
    @Input() product: Product | undefined;
}
/* 
<p *ngIf="product && product.price > 700">
  <button type="button">Notify Me</button>
</p>
*/


//испускать событие при изменении значения
export class ProductListComponent {

    products = [...products];

    share() {
        window.alert('The product has been shared!');
    }

    onNotify() {
        window.alert('You will be notified when the product goes on sale');
    }
}
/* 
<app-product-alerts
  [product]="product" 
  (notify)="onNotify()">
</app-product-alerts>
*/

export class ProductAlertsComponent {
    @Input() product: Product | undefined;
    @Output() notify = new EventEmitter();
}
/* 
<p *ngIf="product && product.price > 700">
  <button type="button" (click)="notify.emit()">Notify Me</button>
</p>
*/

//-----------------------------
//___Путь URL с компонентом__//
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: ProductListComponent },
            { path: 'products/:productId', component: ProductDetailsComponent },
        ])
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductListComponent,
        ProductAlertsComponent,
        ProductDetailsComponent,
    ]
})

//маршрутизатор Ссылка с параметром product.id.
/* 
<h3>
    <a
      [title]="product.name + ' details'"
      [routerLink]="['/products', product.id]"> -> https://getting-started-myfork.stackblitz.io/products/1
      {{ product.name }}
    </a>
  </h3>
*/

//объединения данных о продуктах и информации о маршрутах, чтобы отобразить конкретные детали для каждого продукта
//извлеките productId из параметров маршрута и найдите соответствующий продукт в массиве products
export class ProductDetailsComponent implements OnInit {

    product: Product | undefined;

    //ActivatedRoute содержит информацию о маршруте и его параметрах / как сервис
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        // Сначала получите идентификатор продукта из текущего маршрута.
        const routeParams = this.route.snapshot.paramMap;
        const productIdFromRoute = Number(routeParams.get('productId'));

        // Найдите продукт, соответствующий идентификатору, указанному в маршруте.
        this.product = products.find(product => product.id === productIdFromRoute);
    }

}
//Если товар существует, в <div> отображается название, цена и описание
/* 
<h2>Product Details</h2>

<div *ngIf="product">
  <h3>{{ product.name }}</h3>
  <h4>{{ product.price | currency }}</h4>
  <p>{{ product.description }}</p>
</div>
*/

//-----------------------------------
//____Управление данными(службы)___//

//
@Injectable({
    providedIn: 'root'
})
export class CartService {
    items: Product[] = [];
    /* . . . */

    addToCart(product: Product) {
        this.items.push(product);
    }

    getItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
        return this.items;
    }
    /* . . . */
}

//Внедрите сервис корзины, добавив его в конструктор()
export class ProductDetailsComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService
    ) { }

    //Определите метод addToCart(), который добавляет текущий товар в корзину
    addToCart(product: Product) {
        this.cartService.addToCart(product);
        window.alert('Your product has been added to the cart!');
    }
}
/* 
<h2>Product Details</h2>

<div *ngIf="product">
  <h3>{{ product.name }}</h3>
  <h4>{{ product.price | currency }}</h4>
  <p>{{ product.description }}</p>
  <button type="button" (click)="addToCart(product)">Buy</button>
</div>
*/

//устанавливает элементы с помощью метода CartService getItems()
export class CartComponent {

    items = this.cartService.getItems();

    constructor(
        private cartService: CartService
    ) { }
}
/* 
<h3>Cart</h3>

<div class="cart-item" *ngFor="let item of items">
  <span>{{ item.name }}</span>
  <span>{{ item.price | currency }}</span>
</div>
*/

//__Angular HttpClient - это встроенный способ получения данных из внешних API,Серверы часто возвращают данные в виде потока
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule, // <---
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: ProductListComponent },
            { path: 'products/:productId', component: ProductDetailsComponent },
            { path: 'cart', component: CartComponent },
        ])
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductListComponent,
        ProductAlertsComponent,
        ProductDetailsComponent,
        CartComponent,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

//Настройте CartService на использование HttpClient
import { HttpClient } from '@angular/common/http';
import { Product } from './products';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    items: Product[] = [];

    constructor(
        private http: HttpClient
    ) { }

    getShippingPrices() {
        return this.http.get < { type: string, price: number }[] > ('/assets/shipping.json');
    }
}

//-------------------------------------------------------
//__Использование форм для ввода данных пользователем__//
//Этот сервис является частью модуля ReactiveFormsModule в @NgModule

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService } from '../cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {

    items = this.cartService.getItems();

    //имя и адрес пользователя, используйте метод FormBuilder group(), чтобы установить свойство checkoutForm на модель формы, содержащую поля имени и адреса
    checkoutForm = this.formBuilder.group({
        name: '',
        address: ''
    });

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder,
    ) { }

    //onSubmit() для обработки формы / Кроме того, этот метод использует метод clearCart() сервиса CartService для сброса формы и очистки корзины
    onSubmit(): void {
        // Process checkout data here
        this.items = this.cartService.clearCart();
        console.warn('Your order has been submitted', this.checkoutForm.value);
        this.checkoutForm.reset();
    }
}
/* 
//Используйте привязку свойства formGroup, чтобы привязать checkoutForm к HTML <form>
//привязку события ngSubmit, чтобы прослушать отправку формы и вызвать метод onSubmit() со значением checkoutForm
<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">

  <div>
    <label for="name">
      Name
    </label>
    <input id="name" type="text" formControlName="name">
  </div>

  <div>
    <label for="address">
      Address
    </label>
    <input id="address" type="text" formControlName="address">
  </div>

  <button class="button" type="submit">Purchase</button>

</form>
*/

//------------------------------
//__Развертывание приложения__//
//Предварительные условия Node.js + npm package manager
//Лучшей практикой является локальный запуск проекта перед его развертыванием
//npm install -g @angular/cli - С помощью Angular CLI вы можете использовать команду ng для создания новых рабочих пространств
//ng new my-app - 
//npm install - установить пакеты npm
//ng serve - Используйте следующую команду CLI, чтобы запустить приложение локально
//ng serve --port 4201 - вы можете указать другой порт с помощью флага port
//ng build - Сборка и размещение вашего приложения / Эта команда создает в корневом каталоге приложения папку dist со всеми файлами, которые необходимы хостинговой службе для обслуживания вашего приложения

//--------------------------------
//______Понимание Angular______//

//-------------------------------
//__Обзор компонентов Angular__//
//Компоненты - это основные строительные блоки для приложений Angular
//ng generate component <component-name> - Создание компонента с помощью Angular CLI
/* 
Каталог с именем компонента
Файл компонента, <component-name>.component.ts
Файл шаблона, <component-name>.component.html
Файл CSS, <component-name>.component.css
Файл спецификации тестирования, <component-name>.component.spec.ts
Где <component-name> - это имя вашего компонента.
*/
//через ссылку на внешний файл или непосредственно в компоненте
@Component({
    selector: 'app-component-overview',
    template: '<h1>Hello World!</h1>',
    styles: ['h1 { font-weight: normal; }']
})

//-------------------------------
//___Жизненный цикл компонента__//
//Вам не нужно реализовывать все (или любые) крючки жизненного цикла, только те, которые вам нужны.

//ngOnChanges() - Вызывается перед ngOnInit() / Реагирует, когда Angular устанавливает или сбрасывает привязанные к данным свойства ввода. Метод получает объект SimpleChanges с текущим и предыдущим значениями свойств
//ngOnInit() - Инициализируйте директиву или компонент после того, как Angular впервые отобразит свойства, связанные с данными, и установит входные свойства директивы или компонента. Вызывается один раз, после первого ngOnChanges(). ngOnInit() вызывается даже тогда, когда ngOnChanges() не вызывается (это происходит, когда нет привязанных к шаблону входов).
//ngDoCheck() - Обнаружение и действие в отношении изменений, которые Angular не может или не хочет обнаружить самостоятельно / Вызывается сразу после ngOnChanges() при каждом запуске обнаружения изменений и сразу после ngOnInit() при первом запуске.
//ngAfterContentInit() - один раз после первого выполнения ngDoCheck() / после того, как Angular проецирует внешний контент 
//ngAfterContentChecked() - после того, как Angular проверит содержимое, спроецированное на директиву или компонент / Вызывается после ngAfterContentInit() и каждой последующей ngDoCheck()
//ngAfterViewInit() - после того, как Angular инициализирует представления и дочерние представления компонента или представление, содержащее директиву / Вызывается один раз после первого ngAfterContentChecked()
//ngAfterViewChecked() - после того, как Angular проверит представления и дочерние представления компонента или представление, содержащее директиву / Вызывается после ngAfterViewInit() и каждой последующей ngAfterContentChecked()
//ngOnDestroy() - Очистка непосредственно перед тем, как Angular уничтожит директиву или компонент. Отпишитесь от Observables и отсоедините обработчики событий, чтобы избежать утечек памяти / Помимо ngOnDestroy(), вы можете внедрить в Angular DestroyRef

//Одноразовая инициализация
//для выполнения одноразовой инициализации, например, для сторонних библиотек или API

let nextId = 1;
// Шпионит за любым элементом, к которому применяется.
// Usage: <div appSpy>...</div>
@Directive({ selector: '[appSpy]' })
export class SpyDirective implements OnInit, OnDestroy {
    private id = nextId++;

    constructor(private logger: LoggerService) { }

    ngOnInit() {
        this.logger.log(`Spy #${this.id} onInit`);
    }

    ngOnDestroy() {
        this.logger.log(`Spy #${this.id} onDestroy`);
    }
}
/* 
<p *ngFor="let hero of heroes" appSpy>
  {{hero}}
</p>
*/

//ngOnChanges() компонента или директивы всякий раз, когда обнаруживает изменения во входных свойствах, принимает объект, который сопоставляет каждое измененное имя свойства с объектом SimpleChange, содержащим текущее и предыдущее значения свойства. Этот хук перебирает измененные свойства и регистрирует их.
ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
        const chng = changes[propName];
        const cur = JSON.stringify(chng.currentValue);
        const prev = JSON.stringify(chng.previousValue);
        this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
}

//to view changes
//вызывает после создания дочерних представлений компонента
export class AfterViewComponent implements AfterViewChecked, AfterViewInit {
    private prevHero = '';

    // Query for a VIEW child of type `ChildViewComponent`
    @ViewChild(ChildViewComponent) viewChild!: ChildViewComponent;

    ngAfterViewInit() {
        // viewChild is set after the view has been initialized
        this.logIt('AfterViewInit');
        this.doSomething();
    }

    ngAfterViewChecked() {
        // viewChild is updated after the view has been checked
        if (this.prevHero === this.viewChild.hero) {
            this.logIt('AfterViewChecked (no change)');
        } else {
            this.prevHero = this.viewChild.hero;
            this.logIt('AfterViewChecked');
            this.doSomething();
        }
    }
    // ...
}

//Хуки AfterContent похожи на хуки AfterView. Ключевое отличие заключается в дочернем компоненте
export class AfterContentComponent implements AfterContentChecked, AfterContentInit {
    private prevHero = '';
    comment = '';

    // Запрос на дочерний компонент CONTENT типа `ChildComponent`.
    @ContentChild(ChildComponent) contentChild!: ChildComponent;

    ngAfterContentInit() {
        // contentChild устанавливается после инициализации содержимого
        this.logIt('AfterContentInit');
        this.doSomething();
    }

    ngAfterContentChecked() {
        // contentChild обновляется после проверки содержимого
        if (this.prevHero === this.contentChild.hero) {
            this.logIt('AfterContentChecked (no change)');
        } else {
            this.prevHero = this.contentChild.hero;
            this.logIt('AfterContentChecked');
            this.doSomething();
        }
    }
    // ...
}

//--------------------------------------
//____Инкапсуляция представления____//
//стили подвергаются постобработке, в результате чего каждый CSS-селектор дополняется соответствующим атрибутом 

//No encapsulation
//окрашивает свои элементы шаблона в красный цвет
@Component({
    standalone: true,
    selector: 'app-no-encapsulation',
    template: `
      <h2>None</h2>
      <div class="none-message">No encapsulation</div>
    `,
    styles: ['h2, .none-message { color: red; }'],
    encapsulation: ViewEncapsulation.None,
  })
  export class NoEncapsulationComponent {}

//Emulated encapsulation
//окрашивает элементы своего шаблона в зеленый цвет
//ViewEncapsulation.Emulated 
//ViewEncapsulation.ShadowDom










