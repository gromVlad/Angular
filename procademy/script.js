//платформа разрабокти клиентских приложений (SPA)
//фреймворк(платформа для создание приложений) который использует js / html / css

//весрия angular - 1 версия angular.js , 2 версия angular (2016 c ts) -  послностью отличаеться от первой версии далее уже обновляли 2 версию , сейчас 17 

//--------------------------------
//__Creating a new Angular Project
// + node.js
// + npm
// cli angular (npm install -g @angular/cli)
// ng version
// ng new my-first-project
// cd my-first-project
// ng serve

//-------------------------------------
//___Angular files and folder structure

//package.json - стандартный конфигурационый файл (зависемости)
//package-lock.json - детальный конфигурационый файл (точную версию указанной зависемости) 
//node_modules - все зависимые библиотеки
//.editorconfig - для настройки програмной среды
//.gitignore - игнор дял git
//angular.json - конфигурация проекта
//assets - статические ресурсы
//favicon.ico - значок приложения
//styles.scss - глобальные стили

//__Инициализация
/* 
<body>
  <app-root></app-root> // < ---- корневой тэг куда загружаеться наше приложения
</body>

*/
//main.ts 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // браузер платформы (можно загружать и на мобильные устройство)
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule) // <--- корневой модуль приложения
  .catch(err => console.error(err));

//app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//передаем объект метаданных
@NgModule({
  //что принадлежит нашему модулю
  declarations: [
    AppComponent
  ],
  //все внешние модулю которые требуеться для нашего приложения
  imports: [
    BrowserModule
  ],
  //регистрирум все сервисы 
  providers: [],
  //загрузочный массив (начальный)
  bootstrap: [AppComponent]
})
export class AppModule { }

//app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',//использум компонент как тэг (также можно использовать как атрибут или класс)
  templateUrl: './app.component.html', // шаблон представления (url или cам шаблон)
  styleUrls: ['./app.component.scss'] // массив стилей (url или cами стили)
})
export class AppComponent {
  title = 'proAcademy-project';
}
//<h1>hello</h1>

//------------------------
//__What is TypeScript 
//при компиляции преобразуться в js
//ts -строгт типизирован
//можем ловить ошибки во время компиляции

//-----------------------
//__What is a Component
//Компонент эта ключая функция angular
//В корневой компонент включаем все остальные компоненты
//cтили по умолчанию не действует глобально а локально на свой шаблон

import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  template: `
    <h1>Hello World!</h1>
    <p>This template definition spans multiple lines.</p>
  `,
  styles: ['h1 { font-weight: normal; }']
})
export class HeaderComponent { }

//app.component.html
//<h1>hello</h1>
//<app-header></app-header>

//styles.scss - эти стили будут применины ко всему приложению глобально типо шрифт и т.д
/* 
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
body{
    font-family: 'Montserrat', sans-serif;
}
*/

//-------------------------------------
//___Create Component 
//Генерирует и/или изменяет файлы на основе схемы.
//ng generate component [name]
//selector: '[app-header]' | '.app-header' | '#app-header'  - можно использовать как селектор, как класс, как id, не рекомендуеться используем как тэг

//------------------
//__Data Binding__//
//Привязка данных - поток данных связывающий класс компонента и шаблон
//существет одностороняя привязка данных и двустороняя привязка данных(могут передоваться в обоих направлениях)

//_String Interpolation / Property Binding / Event Binding
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  name = "John Smith";
  addToCart: number = 0;
  product = {
    name: 'iPhone X',
    price: 789,
    color: 'Black',
    discount: 8.5,
    inStock: 10,
    pImage: '/assets/images/iphone.png'
  }

  getDiscountedPrice() {
    return this.product.price - (this.product.price * this.product.discount / 100)
  }

  onNameChange(event: any) {
    this.name = event.target.value;
    console.log(event.target.value);
  }

  decrementCartValue() {
    if (this.addToCart > 0) {
      this.addToCart--;
    }

  }

  incrementCartValue() {
    if (this.addToCart < this.product.inStock) {
      this.addToCart++;
    }

  }
}
/* 
<img [src]="product.pImage">
<p>Name: {{ product.name }}</p>
<p>Price: {{ '$' + product.price }}</p>
<p>Color: {{product.color}}</p>
<p>Discounted Price: {{ getDiscountedPrice().toFixed(2) }}</p>
<p>{{product.inStock > 0 ? 'Only' + product.inStock +' items left': 'Not in Stock'}}</p>
<button (click)="decrementCartValue()">-</button>
<span>{{ addToCart }}</span>
<button (click)="incrementCartValue()">+</button>
<input (input)="onNameChange($event)"><br>
<p>name={{name}}</p> -->
*/

//вместо того чтобы заключать свойства в квадратные скобки можно [src] ="" -> bind-src = ""
//также с атрибутами area-hidden = ""-> можно написать [attr.area-hidden] =""

//__Two way Data Binding 
//app.module.ts
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopHeaderComponent,
    TopMenuComponent,
    MainMenuComponent,
    ProductListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // <----
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//search.component.css
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchText: string = 'Womens watch';

  updateSearchText(event: any) {
    this.searchText = event.target.value;
  }
}
/* 
<div class="ekart--search--product">
    // cвязывание с помощью ngModel
    <input class="ekart-search-product-input" [(ngModel)]="searchText">
    <button class="btn btn-search">Search</button>
</div>
<div class="ekart-search-result-for"><p><strong>Search result for:</strong> {{ searchText }}</p></div>
*/

//-------------------------------
//___Understanding Directives__//
//деректива - управления DOM
// деректива компонентов(сама компонента с шаблонам) , деректива атрибутов (пользовательская деректива , измнения элемента), структурная дериктива (изменять макет DOM, со звездочкой *...)
//!!!Важно нельзя использовать 2 структурные дерективы к одному элементу

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') highlightColor: string = 'yellow';

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }
}
//по умолчанию yellow , также можем изменить на свой типо <p appHighlight = "....
//<p appHighlight>This text will be highlighted.</p>

//__ngFor Directive
//итерация, манипуляция DOM
/* 
<li *ngFor="let user of users; index as i; first as isFirst">
  {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
</li>
*/

//Следующие экспортируемые значения могут быть псевдонимами локальных переменных:
// $implicit: T: Значение отдельных элементов в итерируемой таблице(ngForOf).
// ngForOf: NgIterable < T >: Значение выражения итерируемой переменной.Полезно, когда выражение сложнее, чем доступ к свойству, например, при использовании асинхронного канала(userStreams | async).
// index: число: Индекс текущего элемента в итерируемом выражении.
// count: число: Длина итерируемого элемента.
// first: boolean: Истина, если элемент является первым элементом в итерируемой таблице.
// last: boolean: Истина, если элемент является последним в итерируемой таблице.
// even: boolean: Истина, если элемент имеет четный индекс в итерируемой таблице.
// odd: boolean: Истинно, если элемент имеет нечетный индекс в итерируемой таблице.

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent {
  list: string[] = ['Home', 'Product', 'About', 'Contact'];
}
/* 
<div class="ekart-menu">
    <a href="#">Home</a>
    <a href="#">Products</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
    <!-- the same -->
    <a *ngFor="let item of list" [href]="'/' + item">{{item}}</a>
</div>
*/

//__ngIf Directive
//Структурная директива, которая условно включает шаблон на основе значения выражения, принудительно преобразованного в булево. Если выражение равно true, Angular отображает шаблон, указанный в предложении then, а если false или null, Angular отображает шаблон, указанный в необязательном предложении else. 

/* 
example
<div *ngIf="condition; then thenBlock else elseBlock"></div>
//Сокращенная форма с блоками "then" и "else":
<ng-template #thenBlock>Content to render when condition is true.</ng-template>
<ng-template #elseBlock>Content to render when condition is false.</ng-template>
*/

@Component({
  selector: 'ng-if-else',
  template: `
    <div *ngIf="show; else elseBlock">Text to show</div>
    <ng-template #elseBlock>Alternate text while primary text is hidden</ng-template>
`
})
export class NgIfElse {
  show = true;
}

//__ngStyle Directive
//Директива атрибута, которая обновляет стили для содержащегося HTML-элемента. Устанавливает одно или несколько свойств стиля, заданных в виде пар ключ-значение, разделенных двоеточием

/* 
<div [ngStyle]="{'background-color': 'red', 'font-size': '20px'}">
  Hello, world!
</div>

//позволяет динамически применять стили к элементам HTML
<div [ngStyle]="{'background-color': show ? 'red' : 'blue'}">
  Hello, world!
</div>
*/

//__ngClass Directive
//Добавляет и удаляет классы CSS в элементе HTML.

/* 
//в зависимости от значений переменных isActive и isDisabled
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
  Hello, world!
</div>
*/

/* 
<some-element [ngClass]="'first second'">...</some-element>
<some-element [ngClass]="['first', 'second']">...</some-element>
<some-element [ngClass]="{'first': true, 'second': true, 'third': false}">...</some-element>
<some-element [ngClass]="stringExp|arrayExp|objExp">...</some-element>
<some-element [ngClass]="{'class1 class2 class3' : true}">...</some-element>
*/

//-------------------------------------
//__@Input: Custom Property Binding__//
//Декоратор, который помечает поле класса как входное свойство и предоставляет метаданные конфигурации. Свойство input привязывается к свойству DOM в шаблоне. При обнаружении изменений Angular автоматически обновляет свойство data значением свойства DOM.

//_
import { Component, Input, numberAttribute, booleanAttribute } from '@angular/core';

@Component({
  selector: 'bank-account',
  template: `
    Bank Name: {{bankName}}
    Account Id: {{id}}
    Account Status: {{status ? 'Active' : 'InActive'}}
  `
})
class BankAccount {
  //делает это свойство обязательным
  @Input({ required: true }) bankName!: string;
  // Псевдоним аргумента позволяет привязать значение этого свойства к другому имени свойства.
  // когда этот компонент инстанцируется в шаблоне.
  // Аргумент transform преобразует входное значение из строки в число
  @Input({ alias: 'account-id', transform: numberAttribute }) id: number;
  // Аргумент преобразует входное значение из строки в булево
  @Input({ transform: booleanAttribute }) status: boolean;
  // это свойство не привязано и не обновляется автоматически Angular
  normalizedBankName: string;
}

//_
@Component({
  selector: 'app',
  template: `
    <bank-account bankName="RBC" account-id="4747" status="true"></bank-account>
  `
})
class App { }

//---------------------------------------
//__#27 @Output: Custom Event Binding__//

//__MyComponentComponent
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <button (click)="sayHello('John Doe')">Greet</button>
  `,
  styleUrls: ['./my-component.component.scss']
})
export class MyComponentComponent {

  @Output('greet') sayHello = new EventEmitter < string > ();

}

//__AppComponent
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-my-component (sayHello)="onGreet($event)"></app-my-component>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  onGreet(name: string) {
    console.log(`Hello, ${name}!`);
  }
}
//Hello, John Doe

//---------------------------------
//__Template Reference Variable__//

import { Component } from '@angular/core';

@Component({
  selector: 'app-phone-call',
  template: `
    <input #phone placeholder="phone number" />
    <button type="button" (click)="callPhone(phone.value)">Call</button>
  `,
  styleUrls: ['./phone-call.component.scss']
})
export class PhoneCallComponent {

  callPhone(phoneNumber: string) {
    console.log(`Calling ${phoneNumber}...`);
  }

}

//-------------------------------------
//___Reference Variable on Componen__//
//получаем доступ к значениям класса через ссылку

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'hello'
}
/* 
<app-header #header></app-header>
<h1>{{header.title}}<h1>
*/

//--------------------------------
//__ViewChild()
//Декоратор @ViewChild() позволяет получить доступ к элементам HTML в шаблоне компонента.

import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <input #nameInput type="text">
    <button (click)="greet(nameInput.value)">Greet</button>
  `,
  styleUrls: ['./my-component.component.scss']
})
export class MyComponentComponent {

  @ViewChild('nameInput') nameInput: any;

  greet(name: string) {
    console.log(`Hello, ${name}!`);
  }
}

//-------------------------------
//__ViewChildren() in Angular__//
//Декоратор @ViewChildren() позволяет получить доступ ко всем элементам HTML в шаблоне компонента.
//не инициализируеться сразу а только при изменении в компоненте

import { Component, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <div #element1></div>
    <div #element2></div>
  `,
  styleUrls: ['./my-component.component.scss']
})
export class MyComponentComponent {

  @ViewChildren('element') elements: QueryList<any>;

  ngAfterViewInit() {
    this.elements.forEach((element) => {
      console.log(element);
    });
  }

}

//-----------------------------
//__ng-template in Angular__//
//фрагмент HTML кода

/* 
<!-- создаем шаблон но его пока нету в DOM-->
<ng-template #myTemplate>
  <h2>Hello, {{ name }}!</h2>
</ng-template>

<!-- отрисуем с помощью *ngTemplateOutlet-->
<ng-container *ngTemplateOutlet="myTemplate; context: { name: 'John' }"></ng-container>
*/

//Использование ng-template с условным отображением
/* 
<ng-container *ngIf="showTemplate; else elseTemplate">
  <h2>Welcome, {{ name }}!</h2>
</ng-container>

<ng-template #elseTemplate>
  <h2>Guest User</h2>
</ng-template>
*/

//----------------------
//__ng-container__//
//контейнер
//обычно используем когда хотим работать с несколькими структурными дерективами
//чтобы не создавать дополнительный контейнер при использовании нескольких деректив то используем ng-container (которого мы не увидим в коде, его не рендерит), только при этом события не вешать на него а вешать на элемент который есть в рендере

/* 
<div *ngIf="showContent">
  <h1>Welcome!</h1>
  <p>Some content goes here.</p>
</div>
*/

//--------------------------
//__ng-content__//
//Проекция содержимого - это шаблон, в который вы вставляете или проектируете содержимое, которое хотите использовать внутри другого компонента
/* 
<app-zippy-basic>
  <p>Is content projection cool?</p>
</app-zippy-basic>
*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-zippy-basic',
  template: `
    <h2>Single-slot content projection</h2>
    <ng-content></ng-content> // <---  <ng-content> Элемент является заполнителем
  `
})
export class ZippyBasicComponent { }

//Компонент может иметь несколько слотов

/* 
<app-zippy-multislot>
  <p question>
    Is content projection cool?
  </p>
  <p>Let's learn about content projection!</p>
</app-zippy-multislot>
*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-zippy-multislot',
  template: `
    <h2>Multi-slot content projection</h2>

    Default:
    <ng-content></ng-content>

    Question:
    <ng-content select="[question]"></ng-content> // <--- select - > указывает что именно вставить / как его распознать / в примере по тэгу / можно использовать и класс элемента и т.д.
  `
})
export class ZippyMultislotComponent { }

//--------------------
//__ContentChild()__//
//Она позволяет получить доступ к дочерним элементам компонента из его кода, используя селекторы или имена классов

import { Component, ContentChild } from '@angular/core';

@Component({
  selector: 'app-custom-component',
  template: `
    <div>
      <app-child>
        Custom Component
        <header #header>Hello</header> // < -- получаем доступ к элементам внутри другого элемента 
      </app-child>
      <ng-content></ng-content>
    </div>
  `,
})
export class CustomComponent {
  //ViewChild работать не будет т.к. элемент вложенен в другой элемент
  @ContentChild('header')
  header: ElementRef;

  ngAfterContentInit() {
    console.log(this.header); // Выводит найденный элемент с селектором 'header'
  }
}

//-----------------------
//__ContentChildren()__//
//ContentChildren() – то же самое что и ContentChild() но позволяет получить доступ к коллекции дочерних элементов внутри компонента.
@Component({
  selector: 'app-custom-component',
  template: `
    <div>
      <app-child>
        Custom Component
        <header #header>Hello</header> // < -- получаем доступ к элементам внутри другого элемента 
        <header #header>Hello</header> 
        <header #header>Hello</header> 
      </app-child>
      <ng-content></ng-content>
    </div>
  `,
})
export class CustomComponent {
  //если используем сам компонент то пишем @ContentChildren(AppChild) items: QueryList<AppChild>;
  @ContentChildren('header')
  items: QueryList<ElementRef>;

  ngAfterContentInit() {
    this.items.forEach(element => {
      element
    }); // Выводит найденный элемент с селектором 'header' из массива элементов
  }
}

//-----------------------------------------------------------
//__Component Initialization | Lifecycle Hooks in Angular__//
//При инициализации при создании компоненты создаеться экземпляр каждый раз, тоесть конструктор будет вызван
//если продублировали  3 компоненты то и создаеться 3 экземпляра с вызовом коснтруктора
//входные свойства не появлються в конструкторе (@Input() только те которые были по умолчанию после = "") только те которые были заложены внутри самого компонента
//Тоесть в констукторе инициализируеться начальные занчение всех свойств и значений и больше ничего, представление компоненты не отрисованы, и входные сойства еще не обновлялись
//Lifecycle - последовательность методов, которые вызываются в процессе создания, инициализации, обновления и уничтожения компонента (ngOnChanges(), ngOnInit(), ngDoCheck(), ngAfterContentInit(), ngAfterContentChecked(), ngAfterViewInit(), ngAfterViewChecked(), ngOnDestroy())
export class MyComponent {
  // Свойство, которое инициализируется в конструкторе
  name: string = 'John Doe';

  // Входное свойство, которое не будет доступно в конструкторе
  @Input() age: number = 0;

  constructor() {
    // Конструктор вызывается при создании компонента.
    // Входное свойство `age` еще не инициализировано, поэтому оно равно значению по умолчанию (0).

    console.log('Конструктор вызывается.');
    console.log(`Имя: ${this.name}`);
    console.log(`Возраст: ${this.age}`);
  }
}
/* 
Конструктор вызывается.
Имя: John Doe
Возраст: 0
*/

//-------------------------------------------------------------
//__ngOnChanges Lifecycle Hook | Lifecycle Hooks in Angular__//
//Цикл обнаружение изменений запускаеться при изменений входных, значений, измениний по средствам событий, интервалы, и запросы http
//ngOnChanges() - реагирует, когда Angular устанавливает или сбрасывает входные свойства, привязанные к данным, не вызваеться если не будет изменений и отличий от текущего
export class MyComponent implements OnChanges {
  // Входное свойство
  @Input() name: string;

  // Свойство, которое будет обновляться в методе `ngOnChanges()`
  public fullName: string;

  ngOnChanges(changes: SimpleChanges) {
    // Метод `ngOnChanges()` вызывается, когда Angular устанавливает или сбрасывает входные свойства.

    console.log('Метод `ngOnChanges()` вызывается.');

    // Проверяем, изменилось ли входное свойство `name`.
    if (changes['name']) {
      console.log(`Новое значение свойства 'name': ${changes['name'].currentValue}`);

      // Обновляем свойство `fullName`.
      this.fullName = `${this.name} Doe`;
    }
  }
}
/* 
Метод `ngOnChanges()` вызывается.
Новое значение свойства 'name': John
Метод `ngOnChanges()` вызывается.
Новое значение свойства 'name': Jane
*/

//----------------------------------------------------------
//__ngOnInit Lifecycle Hook | Lifecycle Hooks in Angular__//
//ngOnInit() - Инициализируйте директиву или компонент после того, как Angular сначала отобразит свойства, привязанные к данным, и установит входные свойства директивы или компонента. Вызывается один раз, после первого ngOnChanges(), ссылочные данные не работают (такие как @ContentChildren и т.д.)

export class MyComponent implements OnInit {
  // Входное свойство
  @Input() name: string;

  // Свойство, которое будет инициализировано в методе `ngOnInit()`
  public fullName: string;

  ngOnInit() {
    // Метод `ngOnInit()` вызывается после того, как Angular отобразит свойства, привязанные к данным, и установит входные свойства директивы или компонента.

    console.log('Метод `ngOnInit()` вызывается.');

    // Инициализируем свойство `fullName`.
    this.fullName = `${this.name} Doe`;
  }
}
//Метод `ngOnInit()` вызывается.

//-----------------------------------------------------------
//__ngDoCheck Lifecycle Hook | Lifecycle Hooks in Angular__//
//Вызывается сразу после ngOnChanges() при каждом запуске обнаружения изменений и сразу после ngOnInit() при первом запуске.
//Не имеет значение изменилось что то или нет всегда будет вызываться, также при отработке событий.Ссылочные данные не работают (такие как @ContentChildren, Viewchild и т.д.)

export class MyComponent implements DoCheck {
  // Свойство, которое будет обновляться в методе `ngDoCheck()`
  public count: number = 0;

  ngDoCheck() {
    // Метод `ngDoCheck()` вызывается сразу после `ngOnChanges()` при каждом запуске обнаружения изменений и сразу после `ngOnInit()` при первом запуске.

    console.log('Метод `ngDoCheck()` вызывается.');

    // Увеличиваем значение свойства `count`.
    this.count++;
  }
}
//Метод `ngDoCheck()` вызывается.

//--------------------------------------------------------------------
//__ngAfterContentInit Lifecycle Hook | Lifecycle Hooks in Angular__//
//Реагирует после того, как Angular проецирует внешний контент в представление компонента или в представление, в котором находится директива.Вызывается один раз после первой ngDoCheck(), при проецировании вложенного контента внутри какого либо компонента (типо ng-content, также будут инициализированы ContentChildren() и ContentChild()),не видит свойство оформленые при использовании Viewchild и Viewchildren
//только для компонент не можем использовать в дерективе

export class MyComponent implements AfterContentInit {
  @ContentChild('pr') projectedContent: ElementRef;

  ngDoCheck() {
    console.log(this.content.nativeElement.textContent)// not work
  }

  ngAfterContentInit() {
    // Метод `ngAfterContentInit()` вызывается после того, как Angular проецирует внешний контент в представление компонента или в представление, в котором находится директива.

    console.log('Метод `ngAfterContentInit()` вызывается.');

    // Получаем проецируемый контент.
    console.log(this.content.nativeElement.textContent)
  }
}
//undefined
//Метод `ngAfterContentInit()` вызывается.
//hello

//-----------------------------------------------------------------------
//__ngAfterContentChecked Lifecycle Hook | Lifecycle Hooks in Angular__//
//вызываеться при каждом обнаружении изменении в контенте,вызывается после ngAfterContentInit() и каждой последующей ngDoCheck(),также будут инициализированы ContentChildren() и ContentChild(), также будет запускаться при событий и т.д. даже если ничего не меняеться
//не видит свойство оформленые при использовании Viewchild и Viewchildren
//только для компонент не можем использовать в дерективе

export class MyComponent implements AfterContentChecked {
  @ContentChild('pr') projectedContent: ElementRef;

  ngAfterContentChecked() {
    // Метод `ngAfterContentChecked()` вызывается при каждом обнаружении изменений в контенте.

    console.log('Метод `ngAfterContentChecked()` вызывается.');

    // Получаем длину проецируемого контента.
    console.log(this.content.nativeElement.textContent)
  }
}
//Метод `ngAfterContentChecked()` вызывается.

//-----------------------------------------------------------------
//__ngAfterViewInit Lifecycle Hook | Lifecycle Hooks in Angular__//
//Реагировать после того, как Angular инициализирует представления компонента и дочерние представления или представление, содержащее директиву.
//Вызывается один раз после первого ngAfterContentChecked()
//инициализирует свойство оформленые при использовании Viewchild и Viewchildren
//только для компонент не можем использовать в дерективе

export class MyComponent implements AfterViewInit {
  @Viewchild('pr') childElement: ElementRef;

  ngAfterViewInit() {
    // Метод `ngAfterViewInit()` вызывается после того, как Angular инициализирует представления компонента и дочерние представления или представление, содержащее директиву.

    console.log('Метод `ngAfterViewInit()` вызывается.');

    // Получаем ссылку на дочерний элемент.
    console.log(this.child.nativeElement)
  }
}

//--------------------------------------------------------------------
//__ngAfterViewChecked Lifecycle Hook | Lifecycle Hooks in Angular__//
//Angular проверит представления компонента и дочерние представления или представление, содержащее директиву,даже если ничего не меняеться
//Вызывается после ngAfterViewInit() и каждого последующего ngAfterContentChecked().
//следит за свойствами оформленые при использовании Viewchild и Viewchildren
//только для компонент не можем использовать в дерективе


export class MyComponent implements AfterViewChecked {
  @Viewchild('pr') childElement: ElementRef;

  ngAfterViewChecked() {
    // Метод `ngAfterViewChecked()` вызывается после того, как Angular проверит представления компонента и дочерние представления или представление, содержащее директиву.

    console.log('Метод `ngAfterViewChecked()` вызывается.');

    // Получаем ширину дочернего элемента.
    console.log(this.child.nativeElement)
  }
}
//Метод `ngAfterViewChecked()` вызывается.

//-------------------------------------------------------------
//__ngOnDestroy Lifecycle Hook | Lifecycle Hooks in Angular__//
//Очистка непосредственно перед уничтожением директивы или компонента Angular. Отмените подписку на наблюдаемые объекты и отсоедините обработчики событий, чтобы избежать утечек памяти.Вызывается непосредственно перед тем, как Angular уничтожит директиву или компонент.

export class MyComponent implements OnDestroy {

  ngOnDestroy() {
    // Метод `ngOnDestroy()` вызывается непосредственно перед тем, как Angular уничтожит директиву или компонент.
    console.log('Метод `ngOnDestroy()` вызывается.');
  }
}

//--------------------------------
//__Custom Attribute Directive__//
//create setbacground and color

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSetBackground]'
})
export class SetBackgroundDirective {

  //Директива принимает входной параметр color, который указывает цвет фона.
  @Input('appSetBackground') color: string;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    //не рекомендуеться напрямую взаимодействоать с DOM т.к. будет работать только в браузерах, небезосны для атак и т.д.
    this.el.nativeElement.style.backgroundColor = this.color;
  }

}

//<div appSetBackground color="red">...</div>

//--------------------------
//__Renderer2 in Angular__//
//класс который предостовляет возможность через него взаимодействовать с DOM

import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<div id="my-element">Hello, world!</div>'
})
export class AppComponent {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // Создаем новый элемент
    const newElement = this.renderer.createElement('p');

    // Устанавливаем текст нового элемента
    this.renderer.setProperty(newElement, 'textContent', 'This is a new element.');

    // Добавляем новый элемент в DOM
    this.renderer.appendChild(this.el.nativeElement, newElement);

    // Устанавливаем стиль нового элемента
    this.renderer.setStyle(newElement, 'color', 'red');

    // Добавляем класс новому элементу
    this.renderer.addClass(newElement, 'my-class');

    // Удаляем класс из нового элемента
    this.renderer.removeClass(newElement, 'my-class');

    // Устанавливаем атрибут новому элементу
    this.renderer.setAttribute(newElement, 'id', 'my-new-element');

    // Удаляем атрибут из нового элемента
    this.renderer.removeAttribute(newElement, 'id');

    // Добавляем обработчик события к новому элементу
    this.renderer.listen(newElement, 'click', (event) => {
      alert('Новый элемент был нажат.');
    });

    // Удаляем обработчик события из нового элемента
    this.renderer.removeListener(newElement, 'click');

    // Удаляем новый элемент из DOM
    this.renderer.removeChild(this.el.nativeElement, newElement);
  }

}

//-----------------------------
//__@HostListner in Angular__//

/* 
Вот список всех возможных событий, которые можно прослушивать с помощью директивы @HostListener:
click - событие щелчка мыши
dblclick - событие двойного щелчка мыши
mousedown - событие нажатия кнопки мыши
mouseup - событие отпускания кнопки мыши
mousemove - событие перемещения мыши
mouseover - событие наведения курсора мыши на элемент
mouseout - событие ухода курсора мыши с элемента
keydown - событие нажатия клавиши клавиатуры
keyup - событие отпускания клавиши клавиатуры
keypress - событие нажатия и удержания клавиши клавиатуры
resize - событие изменения размера окна браузера
scroll - событие прокрутки окна браузера
focus - событие получения фокуса элементом
blur - событие потери фокуса элементом
*/

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClick]'
})
export class ClickDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseover')
  onClick() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
  }

}

//-----------------------------
//__@HostBinding in Angular__//
//@HostBinding в Angular позволяет привязать свойство хост-элемента директивы к свойству компонента или директивы
import { Component, Directive, HostBinding } from '@angular/core';

@Component({
  selector: 'my-component',
  template: '<div appColor>...</div>'
})
export class MyComponent {
  color = 'red';
}

//_
@Directive({
  selector: '[appColor]'
})
export class ColorDirective {

  @HostBinding('style.color')
  color: string;

  constructor(private component: MyComponent) {
    //не надо обращаться через this.el.nativeElement и т.д. а проще сохранить как свойство а потом просто использовать
    this.color = component.color;
  }
}

//-------------------------------------
//__Property Binding vs @HostBinding__//

// Привязку свойств следует использовать в следующих случаях:
// Когда необходимо привязать свойство компонента или директивы к свойству хост - элемента, и изменения в свойстве хост - элемента не должны приводить к изменениям в свойстве компонента или директивы.

// @HostBinding следует использовать в следующих случаях:
// Когда необходимо привязать свойство хост - элемента к свойству компонента или директивы, и изменения в свойстве хост - элемента должны приводить к изменениям в свойстве компонента или директивы.
// Когда необходимо привязать свойство хост - элемента к свойству компонента или директивы, и изменения в свойстве компонента или директивы должны приводить к изменениям в свойстве хост - элемента.

//-----------------------------------
//__Property Binding in Directives__//
//Привязка свойств в директивах позволяет связать свойства хост-элемента директивы со свойствами компонента или директивы. Хост-элемент - это элемент, к которому применяется директива.

import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {

  constructor(private el: ElementRef) { }

  //1 вариант @Input() color: string;
  //2 @Input('appColor') color: string;
  //3 @Input('appColor') color: string = 'red'
  @Input('appColor') color: { backgroundColor: string, color: string }

  ngOnInit() {
    this.el.nativeElement.style.color = this.color.backgroundColor;
  }

}
//1) <div appColor [color]='"red"'>...</div>
//2) <div [appColor] = '"red"'>...</div>
//3) по умолчанию <div [appColor] >...</div>
//4 использовать объект <div [appColor]='"{backgroundColor:'...', color:'..'}"' >...</div>

//-------------------------------------
//__Conditional Attribute Directive__//
//Условная директива атрибута (conditional attribute directive) - это директива, которая позволяет условно добавлять или удалять атрибут из хост-элемента директивы.

import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appShow]'
})
export class ShowDirective {

  @Input()
  set show(value: boolean) {
    if (this.show) {
      this.el.nativeElement.setAttribute('appShow', '');
    }
  }

}
//<div *appShow="show">...</div>

//---------------------------------------
//__Creating a Custom Class Directive__//
//Использование сеттера и геттера позволяет нам лучше контролировать доступ к входному параметру customClass и выполнять дополнительные действия при его изменении.

import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appCustomClass]'
})
export class CustomClassDirective {

  @Input('appCustomClass')
  set customClass(value: 'string' | 'object') {
    if (typeof value === 'string') {
      this.el.nativeElement.classList.add(value);
    } else if (typeof value === 'object') {
      for (const key in value) {
        if (value[key]) {
          this.el.nativeElement.classList.add(key);
        }
      }
    }
  }

}
//<div [appCustomClas]="customClass">...</div>

//----------------------------------------
//___Creating a Custom Class Directive__//
//аналог ngStyle

import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appSetStyle]'
})
export class SetStyleDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { }


  @Input() appSetStyle(value: Object) {
    for (const key in value) {
      this.renderer.setStyle(this.el.nativeElement, key, value[key]);
    }
  }
}

export class MyComponent {
  setStyle = {
    'color': 'red',
    'font-size': '20px',
    'background-color': 'blue'
  };
}
//<div *appSetStyle="setStyle">...</div>

//--------------------------------------
//__How a Structural Directive Works__//
//Структурная директива, которая условно включает шаблон, основанный на значении выражения, приведенного к логическому значению. Когда выражение принимает значение true, Angular отображает шаблон, указанный в then предложении, а когда false или null, Angular отображает шаблон, указанный в необязательном else предложении

//<app-conditional-component [show]="show"></app-conditional-component>
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-conditional-component',
  template: '<div *ngIf="show">...</div>'
})
export class ConditionalComponent {

  @Input() show: boolean;

}

//other
/* 
<div *ngIf="condition; then thenBlock else elseBlock"></div>
<ng-template #thenBlock>Content to render when condition is true.</ng-template>
<ng-template #elseBlock>Content to render when condition is false.</ng-template>
*/

//вместо *ngIf ... можем написать 
/* 
<ng-template [ngIf]="show">
  <div>...</div>
</ng-template>
*/

//---------------------------------
//__Custom Structural Directive__//


import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomIf]'
})
export class CustomIfDirective {

  private _show: boolean;

  @Input()
  set appCustomIf(value: boolean) {
    this._show = value;
    this.updateView();
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

  private updateView() {
    if (this._show) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
//использование структурной дерективы добовляем *
//<app-my-component *appCustomIf="show"></app-my-component>

//-------------------
//___ngSwitchCase__//

//<app-switch-component [value]="value"></app-switch-component>
@Component({
  selector: 'app-switch-component',
  template: `
    <div [ngSwitch]="value">
      <div *ngSwitchCase="'A'">...</div>
      <div *ngSwitchCase="'B'">...</div>
      <div *ngSwitchCase="'C'">...</div>
      <div *ngSwitchDefault>...</div>
    </div>
  `
})
export class SwitchComponent {
  @Input() value: string;
}

//---------------------------------
//___What is View Encapsulation__//
//View Encapsulation - это механизм в Angular, который позволяет изолировать стили компонента от стилей других компонентов. Это означает, что стили компонента не будут влиять на стили других компонентов, и наоборот.

/* 
есть три режима View Encapsulation:
 - Emulated (по умолчанию): В этом режиме Angular пытается эмулировать Shadow DOM, применяя CSS-классы с уникальными идентификаторами к элементам компонента. Это позволяет применять стили компонента только к его собственным элементам, изолируя их от внешнего контекста. Это достигается с помощью префикса уникального атрибута ng-сomponent- к CSS-классам, которые применяются к элементам компонента.
- None: В этом режиме стили компонента применяются глобально, без всякой изоляции. Это означает, что стили компонента могут влиять на другие элементы на странице, и стили из внешнего контекста могут влиять на элементы компонента.
- ShadowDom: В этом режиме Angular использует настоящий Shadow DOM, который обеспечивает полную изоляцию стилей и кода компонента от внешнего контекста. Стили компонента применяются только к элементам внутри его Shadow DOM, и стили из внешнего контекста не проникают внутрь компонента.
*/

//ViewEncapsulation.Emulated - используеться по умолчанию
@Component({
  selector: 'app-button',
  template: '<button class="button">Click me</button>',
  styles: ['.button { background-color: blue; color: white; }'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ButtonComponent { }
//Angular автоматически добавит уникальный атрибут с префиксом ng-component- к классу стиля компонента. Например, вместо класса "button" наша кнопка будет иметь класс "ng-component-button". Это обеспечивает изоляцию стилей компонента от внешнего контекста

//--------------------------------
//__What is Service in Angular__//
//Сервисы выполняют роль поставщиков данных и функций для компонентов, а также предоставляют механизмы для обработки бизнес-логики приложения

/* 
Сервисы в Angular могут быть использованы для:
- Предоставления данных: Сервисы могут предоставлять данные, полученные из удаленного сервера, локального хранилища или других источников данных. Они могут выполнять запросы HTTP, работать с базами данных или получать данные из других сервисов.
- Обработки бизнес-логики: Сервисы могут содержать логику, связанную с обработкой данных, выполнением сложных вычислений или взаимодействием с другими сервисами. Они могут быть ответственными за обработку событий, валидацию данных, авторизацию и т.д.
- Взаимодействия с внешними ресурсами: Сервисы могут обеспечивать взаимодействие с внешними ресурсами, такими как API сторонних сервисов, платежные системы, сенсоры устройств и другие интеграции.
- Обмен данными между компонентами: Сервисы могут использоваться для обмена данными между компонентами. Они могут хранить общие данные или состояние, которые могут быть доступны различным компонентам в приложении. Это позволяет обеспечить согласованность данных и избежать дублирования кода.
*/

//---------------------------------
//___ Creating & Using Services__//

//__
export class DataService {
  private data: string[];

  constructor() {
    this.data = ['Apple', 'Banana', 'Orange'];
  }

  getData(): string[] {
    return this.data;
  }

  addData(item: string): void {
    this.data.push(item);
  }
}

//__
@Component({
  selector: 'app-my-component',
  template: `
    <ul>
      <li *ngFor="let item of data">{{ item }}</li>
    </ul>
    <button (click)="addItem()">Add Item</button>
  `
})
export class MyComponent {
  data: string[];

  addItem(): void {
    //в простом примере создаем экземпляр самостоятельно
    let dataService = new DataService()
    this.dataService.addData('Mango');
  }
}

//--------------------------
//__Dependency Injection__//
//Dependency Injection (DI) - это паттерн программирования, который используется для управления зависимостями между компонентами и обеспечения легкого расширения, тестирования и поддержки кода.В Angular фреймворке Dependency Injection(DI) используется для внедрения зависимостей в компоненты, сервисы и другие объекты.Вместо того, чтобы объекты создавали и управляли своими зависимостями, DI позволяет внедрять(inject) зависимости извне.

//__
export class DataService {
  private data: string[];

  constructor() {
    this.data = ['Apple', 'Banana', 'Orange'];
  }

  getData(): string[] {
    return this.data;
  }

  addData(item: string): void {
    this.data.push(item);
  }
}

//__
@Component({
  selector: 'app-my-component',
  template: `
    <ul>
      <li *ngFor="let item of data">{{ item }}</li>
    </ul>
    <button (click)="addItem()">Add Item</button>
  `,
  //внедрили экземпляр зависемостей, при внедрении создаеться новый экземпляр зависемостей
  providers: [DataService]
})
export class MyComponent {
  data: string[];

  constructor(private dataService: DataService) {
    this.data = this.dataService.getData();
  }

  addItem(): void {
    this.dataService.addData('Mango');
  }
}

//---------------------------------------
//__Hierarchical Dependency Injection__//
//Предоставление общих зависимостей: Если у вас есть зависимость, которая должна быть доступна во всем приложении, вы можете предоставить ее на уровне корневого модуля приложения. Таким образом, эта зависимость будет доступна для всех компонентов и сервисов в приложении ниже по иерархии.

//__
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  //получаем один экземпляр который будет доступен во всем приложении
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//-----------------------------------------------
//__Injecting Service into Another Service__//
//В Angular можно инжектировать сервис в другой сервис. Это позволяет сервисам взаимодействовать друг с другом и обмениваться данными. Чтобы инжектировать сервис в другой сервис, необходимо использовать декоратор @Injectable. Рекондеуеться во все сервисы добовлять @Injectable
@Injectable({
  providedIn: 'root'
})
export class ServiceB {
  constructor(private serviceA: ServiceA) { }
}

//-----------------------------
//__Angular Injection Token__//

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  //за кулисами преоразуеться в объект / provide - хранит уникальный индефикатор токен
  providers: [DataService], // < --- {provide: DataService, useValue:DataService} 
  bootstrap: [AppComponent]
})
export class AppModule { }

//лучше создавать специальный токен для служб а неиспользовать строковый формат
import { InjectionToken } from '@angular/core';
export const APP_CONFIG = new InjectionToken < string > ('app.config');

//__
import { NgModule } from '@angular/core';
import { APP_CONFIG } from './app-config.token';

@NgModule({
  providers: [
    { provide: APP_CONFIG, useValue: 'some value' }
  ]
})
export class AppModule { }

//__Инжектирование зависимости с использованием Injection Token
import { Component, Inject } from '@angular/core';
import { APP_CONFIG } from './app-config.token';

@Component({})
export class MyComponent {
  //при использовании токенов при подключении сервисов используем @Inject()
  constructor(@Inject(APP_CONFIG) private config: string) {
    console.log(config); // 'some value'
  }
}

//при использовании в сервисе его не надо подключать в providers он сразу доступен во всем приложении
@Injectable({
  providedIn: 'root'
})

//вы также можете инжектировать сервисы непосредственно в компоненты с помощью аннотации inject
@Component({})
class HeroListComponent {
  private service = inject(HeroService);
}

//------------------------------------------
//__Component Interaction using Services__//
//речь идет о взаимодействии компонентов с использованием сервисов в Angular, вы можете использовать общий сервис в качестве посредника между компонентами

//__Создайте общий сервис:
@Injectable()
export class DataService {
  private data: string;

  getData(): string {
    return this.data;
  }

  setData(newData: string): void {
    this.data = newData;
  }
}

//__
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, Component1, Component2],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }

//__
@Component({
  selector: 'app-component1',
  template: `
    <h1>Компонент 1</h1>
    <input [(ngModel)]="data" (ngModelChange)="updateData()">
  `,
})
export class Component1 {
  data: string;

  constructor(private dataService: DataService) { }

  updateData(): void {
    this.dataService.setData(this.data);
  }
}

//__
@Component({
  selector: 'app-component2',
  template: `
    <h1>Компонент 2</h1>
    <p>Данные из Компонента 1: {{ data }}</p>
  `,
})
export class Component2 {
  data: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.data = this.dataService.getData();
  }
}

//С такой настройкой, когда пользователь вводит значение в поле ввода Component1, данные обновляются в общем сервисе. Затем Component2 получает обновленные данные из общего сервиса и отображает их. Это позволяет осуществлять взаимодействие и обмен данными между компонентами с использованием общего сервиса в качестве посредника.

//___можем реализовать сервис с использованием EventEmitter и получения данных в компоненте с помощью подписки
@Injectable()
export class DataService {
  dataUpdated: EventEmitter<string> = new EventEmitter < string > ();

  updateData(newData: string): void {
    this.dataUpdated.emit(newData);
  }
}

//__
@Component({
  selector: 'app-component1',
  template: `
    <h1>Компонент 1</h1>
    <input [(ngModel)]="data" (ngModelChange)="updateData()">
  `,
})
export class Component1 {
  data: string;

  constructor(private dataService: DataService) { }

  //обновляем данные
  updateData(): void {
    this.dataService.updateData(this.data);
  }
}

//__
@Component({
  selector: 'app-component2',
  template: `
    <h1>Компонент 2</h1>
    <p>Данные: {{ data }}</p>
  `,
})
export class Component2 implements OnDestroy {
  data: string;
  subscription: Subscription;

  constructor(private dataService: DataService) {
    //подписваемся на изменения и получаем data
    this.subscription = this.dataService.dataUpdated.subscribe((newData: string) => {
      this.data = newData;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

//---------------------------
//__What is an Observable__//
//Он представляет собой поток данных или событий, которые можно наблюдать со временем. Observable предоставляет способ обработки асинхронных операций и позволяет реагировать на изменения или эмиссии данных.

/* 
ключевые характеристики Observable:
- Поток данных: Observable представляет собой последовательность значений, которые могут быть эмитированы со временем, как синхронно, так и асинхронно. Эти значения могут быть любого типа, такого как числа, строки, объекты или даже пользовательские структуры данных. Поток данных может быть конечным (с определенным концом) или бесконечным (непрерывным).
- Производитель и потребитель: Observable имеет отношение производитель-потребитель. Производитель, часто называемый источником, эмитирует значения или события в своем собственном ритме. Потребитель, который обычно является кодом, подписывается на Observable, получает и реагирует на эмитированные значения.
- Асинхронные операции: Observable прекрасно подходят для обработки асинхронных операций, таких как HTTP-запросы, таймеры или пользовательские взаимодействия. Они предоставляют способ обработки ответа или результата асинхронной задачи без блокирования выполнения другого кода.
- Операторы: Observable предлагает множество операторов, которые позволяют преобразовывать, фильтровать, комбинировать или манипулировать эмитированными значениями различными способами. Эти операторы позволяют выполнять операции, такие как отображение, фильтрация, сокращение, слияние и другие операции с потоком данных.
- Подписка: При подписке на Observable вы создаете связь между производителем и потребителем. Потребитель получает эмитированные значения через обратный вызов или набор обратных вызовов, которые определяются во время подписки. Подписки могут использоваться для управления ресурсами, отмены текущих операций или отписки от Observable, когда он больше не нужен.
- Обработка ошибок: Observable обрабатывает ошибки структурированным образом. Если происходит ошибка во время выполнения Observable, она может быть передана вниз по потоку и обработана обработчиком ошибок, определенным в подписке. Это позволяет элегантно обрабатывать ошибки и принимать соответствующие меры.
*/

//------------------------------------
//__Creating & Using an Observable__//
//Observable в RxJS (Reactive Extensions for JavaScript) позволяет работать с асинхронными потоками данных и реагировать на изменения в этих потоках.

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable-demo',
  template: `
    <h1>Observable Demo</h1>
    <button (click)="startObservable()">Start Observable</button>
    <ul>
      <li *ngFor="let value of values">{{ value }}</li>
    </ul>
  `,
})
export class ObservableDemoComponent implements OnInit {
  values: string[] = [];

  ngOnInit() { }

  startObservable() {
    //Создание Observable
    const myObservable = new Observable < string > (subscriber => {
      //данные передаються потокам одним за другим
      subscriber.next('Hello');
      subscriber.next('World');
      //После вызова метода complete(), Observable больше не будет эмитировать значения
      subscriber.complete();
    });

    //Подписка на Observable
    myObservable.subscribe(value => {
      //получаем поток данных и далее их push в values
      this.values.push(value);
    });
  }
}

//Обработка ошибок: Observable также предоставляет возможность обработки ошибок
const myObservable = new Observable(subscriber => {
  try {
    // выполнение операций
    subscriber.next('Success');
    subscriber.complete();
  } catch (error) {
    subscriber.error(error);
  }
});

//Отписка от Observable: После завершения работы с Observable рекомендуется отписаться от него, чтобы избежать утечки памяти
subscription.unsubscribe();

//---------------------------------------
//__ Error & Completion of Observable__//
//В процессе работы с Observable могут возникать ошибки или Observable может успешно завершиться.

const myObservable = new Observable(subscriber => {
  try {
    // ...
    if (errorCondition) {
      throw new Error('Something went wrong');
    } else {
      subscriber.next('Success');
    }
    // ...
  } catch (error) {
    subscriber.error(error);
  }
});

//3 функции в подписчике
myObservable.subscribe({
  next: value => console.log(value),
  error: err => console.error(err),
  complete: () => console.log('Observable completed'),
});

//можно написать и таким образом
myObservable.subscribe(
  (value) => console.log(value),
  (err) => console.error(err),
  () => console.log('Observable completed')
);

//---------------------------------
//__RxJS of() & from() Operator__//
//Оба оператора of() и from() являются полезными для создания Observables из различных типов данных. Они позволяют нам эффективно работать с асинхронными операциями и управлять потоком данных в RxJS.

//Оператор of():
//Оператор of() позволяет создавать Observable, который эмитирует заданные значения в определенном порядке.
import { of } from 'rxjs';
const myObservable = of('Value 1', 'Value 2', 'Value 3');
myObservable.subscribe(value => console.log(value));
/* 
Value 1
Value 2
Value 3
*/

// Оператор from():
// Оператор from() позволяет создавать Observable из различных источников данных, таких как массивы, промисы, строки и другие Observable.
import { from } from 'rxjs';

const myArray = [1, 2, 3, 4, 5];
const myPromise = fetch('https://api.example.com/data');
const myString = 'Hello, world!';

const arrayObservable = from(myArray);
const promiseObservable = from(myPromise);
const stringObservable = from(myString);

arrayObservable.subscribe(value => console.log(value));
/* 
1
2
3
4
5
*/
promiseObservable.subscribe(value => console.log(value));
/* 
{data: ...}
*/
stringObservable.subscribe(value => console.log(value));
/* 
H
e
..
*/

//------------------------------
//____The fromEvent Operator__//
//Оператор fromEvent в RxJS позволяет создавать Observable, который эмитирует события от определенного источника событий, такого как DOM элементы, Node.js EventEmitter и другие.

import { fromEvent } from 'rxjs';

const button = document.getElementById('myButton');
const buttonClicks = fromEvent(button, 'click');
buttonClicks.subscribe(event => console.log('Клик!', event));
//Мы передаем button как первый аргумент, указывая на DOM элемент, от которого мы хотим получать события. Второй аргумент - это строка 'click', которая указывает на тип события, которое мы хотим отслеживать.

//При использовании fromEvent, вы можете подписываться на различные события и выполнять различные операции с данными, полученными от этих событий. Например, вы можете фильтровать события, преобразовывать данные или комбинировать их с другими Observables для создания сложной логики потока данных.

//--------------------------------
//__RxJS map & filter Operator__//

//Оператор map:
//Оператор map применяет функцию преобразования к каждому значению в потоке данных и возвращает новый поток данных с преобразованными значениями.
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const numbers = of(1, 2, 3, 4, 5);
const squaredNumbers = numbers.pipe(
  map(num => num * num)
);
squaredNumbers.subscribe(value => console.log(value));
/* 
1
4
9
16
25
*/

//Оператор filter:
//Оператор filter фильтрует значения в потоке данных на основе заданного условия и возвращает новый поток данных, содержащий только значения, удовлетворяющие условию фильтрации.

const numbers = of(1, 2, 3, 4, 5);
const evenNumbers = numbers.pipe(
  filter(num => num % 2 === 0)
);
evenNumbers.subscribe(value => console.log(value));
/* 
2
4
*/

//Мы используем оператор pipe, чтобы связать операторы filter и map в цепочку.

const numbers = of(1, 2, 3, 4, 5).pipe(
  filter(num => num % 2 === 0),
  map(num => num * num)
);
numbers.subscribe(value => console.log(value));

//----------------------
//__Subjects in RxJS__//
//Subject - это специальный тип Observable, который может выступать и в качестве Observable, и в качестве Observer. Он позволяет подписчикам подписываться на него и получать значения, а также эмитировать новые значения, которые будут доставлены всем подписчикам.

import { Subject } from 'rxjs';

class UserService {
  private users: User[] = [];
  private usersSubject = new Subject < User[] > ();

  getUsers(): Observable<User[]> {
    //возвращает Observable
    return this.usersSubject.asObservable();
  }

  addUser(user: User) {
    this.users.push(user);
    //добавляет нового пользователя в массив users и затем вызывает чтобы оповестить подписчиков о новом состоянии массива пользователей
    this.usersSubject.next(this.users);
  }

  removeUser(user: User) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.usersSubject.next(this.users);
    }
  }
}

//__
@Component({
  selector: 'app-user-list',
  template: `
    <ul>
      <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
  `
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}

//----------------------------
//__Observable vs Subjects__//
//Observable и Subject предоставляют различные возможности для работы с асинхронными потоками данных. Observable является однонаправленным потоком данных, который может быть подписан и отменен, не всегда выдает одни и те же значения всем подписчикам,одноадресная рассылка данных, в то время как Subject является двунаправленным,одни и те же данные всем подписчикам, и он также может эмитировать значения для всех подписчиков, в отличие от Observable, он также является Observer. это означает, что Subject может как получать значения, так и эмитировать их для всех своих подписчиков..

//----------------------
//__Behavior Subject__//
//Behavior Subject (Поведенческий субъект) является одним из типов Subject в библиотеке RxJS. Он расширяет функциональность обычного Subject

/* 
имеет следующие особенности:
- Значение по умолчанию:
Behavior Subject хранит в себе значение по умолчанию, которое будет доступно для всех новых подписчиков. При создании Behavior Subject, вы должны указать начальное значение.
- Запоминание последнего значения:
Behavior Subject запоминает последнее эмитированное значение. Когда новый подписчик подключается к Behavior Subject, он автоматически получает последнее эмитированное значение.
- Эмитирование значения при подписке:
При подписке на Behavior Subject, подписчик сразу же получает последнее эмитированное значение.
- Множество подписчиков:
Behavior Subject может иметь несколько подписчиков, и каждый из них получит последнее значение и все последующие эмитированные значения.
*/

import { BehaviorSubject } from 'rxjs';

const behaviorSubject = new BehaviorSubject('Значение 1');

// Подписка на Behavior Subject
behaviorSubject.subscribe(value => {
  console.log('Подписчик 1:', value); //Подписчик 1: Значение 1
});

// Эмитирование нового значения
behaviorSubject.next('Значение 2');

// Подписка на Behavior Subject после эмитирования значения
behaviorSubject.subscribe(value => {
  console.log('Подписчик 2:', value);//Подписчик 2:Значение 2
});

// Эмитирование еще одного значения
behaviorSubject.next('Значение 3');

//--------------------
//__Replay Subject__//
//Replay Subject (Воспроизводящий субъект) является одним из типов Subject в библиотеке RxJS.

import { ReplaySubject } from 'rxjs';

const replaySubject = new ReplaySubject(2); // Запоминаем два последних значения

// Эмитирование новых значений
replaySubject.next('Значение 1');
replaySubject.next('Значение 2');
replaySubject.next('Значение 3');

// Подписка на Replay Subject
replaySubject.subscribe(value => {
  console.log('Подписчик 1:', value);
});

// Подписка на Replay Subject после эмитирования значений
replaySubject.subscribe(value => {
  console.log('Подписчик 2:', value);
});
/*
Подписчик 1: Значение 2
Подписчик 1: Значение 3
Подписчик 2: Значение 2
Подписчик 2: Значение 3 
 */

//Replay Subject запоминает историю эмитированных значений и передает ее всем новым подписчикам при подписке

//--------------------
//__Async Subject__//
//Async Subject (Асинхронный субъект) является одним из типов Subject в библиотеке RxJS
//Он особенно полезен, когда вам нужно отправить значение только одному подписчику, который подключается после завершения.
//Async Subject запоминает только последнее эмитированное значение. Он игнорирует все предыдущие значения, эмитированные во время работы, и сохраняет только последнее

import { AsyncSubject } from 'rxjs';

const asyncSubject = new AsyncSubject();

// Эмитирование новых значений
asyncSubject.next('Значение 1');
asyncSubject.next('Значение 2');

// Подписка на Async Subject
asyncSubject.subscribe(value => {
  console.log('Подписчик 1:', value);
});

// Эмитирование еще одного значения
asyncSubject.next('Значение 3');

// Завершение Async Subject
asyncSubject.complete();

// Подписка на Async Subject после завершения
asyncSubject.subscribe(value => {
  console.log('Подписчик 2:', value);
});

/* 
Подписчик 1: Значение 3
Подписчик 2: Значение 3
*/

//---------------------------
//__Promise vs Observable__//
//Они оба позволяют обрабатывать асинхронные задачи, но имеют некоторые отличия в своей работе и функциональности

//Promise представляет собой объект, который представляет результат или ошибку асинхронной операции, которая может быть выполнена только один раз
const myPromise = new Promise((resolve, reject) => {
  // Асинхронная операция
  setTimeout(() => {
    const randomValue = Math.random();
    if (randomValue > 0.5) {
      resolve(randomValue); // Успешное выполнение
    } else {
      reject(new Error('Ошибка')); // Отклонение с ошибкой
    }
  }, 1000);
});

// Обработка успешного выполнения
myPromise.then(result => {
  console.log('Результат:', result);
}).catch(error => {
  console.error('Ошибка:', error);
});

//Observable представляет поток асинхронных данных, которые могут быть переданы по мере их поступления
//может быть выполнена много раз
import { Observable } from 'rxjs';

const myObservable = new Observable(observer => {
  // Асинхронная операция
  setTimeout(() => {
    const randomValue = Math.random();
    if (randomValue > 0.5) {
      observer.next(randomValue); // Передача значения
      observer.complete(); // Завершение успешно
    } else {
      observer.error(new Error('Ошибка')); // Завершение с ошибкой
    }
  }, 1000);
});

// Обработка значений и завершения
//Возврощает данные только если есть подписчик
myObservable.subscribe(
  result => console.log('Значение:', result),
  error => console.error('Ошибка:', error),
  () => console.log('Завершено Observable')
)

//------------------------------------
//__Unsubscribe from an Observable__//
//Отписка от Observable - это процесс отмены подписки на поток данных, который эмитирует Observable. Она позволяет прекратить получение новых значений из Observable и освободить ресурсы, связанные с этой подпиской.

import { interval } from 'rxjs';

// Создание Observable, который эмитирует значения каждую секунду
const observable = interval(1000);
// Подписка на Observable
const subscription = observable.subscribe(value => {
  console.log(value);
});
// Отписка от Observable через 5 секунд
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

//Повторное использование Observable:
//После отписки от Observable, подписка становится недействительной, и ее нельзя повторно использовать.Если вам нужно снова получать значения из Observable, вам придется создать новую подписку.

//Отписка от Observable особенно важна, когда вы работаете с долгоживущими Observable, которые продолжают эмитировать значения в течение длительного времени. Отписка позволяет корректно управлять потоком данных и предотвращает утечки ресурсов.

//-----------------------------------------
//__ Introduction to Dynamic Components__//
//Динамические компоненты - это популярная концепция во многих фреймворках и библиотеках разработки веб-приложений, таких как Angular. Они позволяют создавать и отображать компоненты динамически во время выполнения приложения. Вместо статического определения компонентов в разметке или шаблонах, динамические компоненты позволяют программно создавать, управлять и отображать компоненты на основе определенных условий или динамических данных.

/* 
Примеры использования динамических компонентов:
- Модальные окна: Вы можете создавать модальные окна динамически, когда пользователь нажимает на определенную кнопку или выполняет определенное действие. Это позволяет отображать контент и взаимодействовать с ним только по требованию.
- Динамические формы: Вы можете создавать формы динамически на основе данных, полученных от сервера или других источников. Это позволяет генерировать и отображать различные типы полей формы в зависимости от требуемых данных.
- Компоненты списка: Вы можете создавать компоненты списка динамически на основе массива данных. Это позволяет отображать списки элементов и обновлять их при изменении данных.
*/

//-------------------------------------------
//__Creating Dynamic Component using ngIf__//
/* 
Для создания динамической компоненты программно в Angular, вы можете использовать фабрику компонентов и контейнер для отображения компоненты. Вот подробное объяснение шагов:
Создайте компонент, который вы хотите отобразить динамически. Для примера, предположим, что у вас есть компонент с именем DynamicComponent, который вы хотите создать динамически.
В родительском компоненте, где вы хотите создать динамическую компоненту программно, включите ComponentFactoryResolver в конструктор компонента:
*/

//__
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: '<ng-container #dynamicComponentContainer></ng-container>',
})
export class ParentComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  createDynamicComponent() {
    // Получите фабрику компонента для DynamicComponent
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);

    // Создайте экземпляр компонента
    const componentRef = this.dynamicComponentContainer.createComponent(componentFactory);
  }
}

//-------------------------------
//__What is an entryComponent__//
//В Angular, entry component (компонент входа) - это компонент, который не указывается в шаблоне другого компонента. Когда вы создаете компоненты динамически с помощью ComponentFactoryResolver, вам необходимо указать их как entry components.

@NgModule({
  declarations: [DynamicComponent],
  entryComponents: [DynamicComponent],
  // остальная конфигурация модуля
})
export class AppModule { }

//с Angular версии 9, концепция entry components стала менее важной

//------------------------------
//___Data & Event Binding__//
//Data binding и event binding также могут использоваться при создании динамических компонентов в Angular. 

//_Data Binding(Привязка данных):
// Создание экземпляра динамической компоненты
const componentRef = this.dynamicComponentContainer.createComponent(componentFactory);
// Установка значения свойства message
componentRef.instance.message = 'Hello, dynamic component!';
//<p>{{ message }}</p>

//_Event Binding (Привязка событий):
// Создание экземпляра динамической компоненты
const componentRef = this.dynamicComponentContainer.createComponent(componentFactory);

// Привязка обработчика события к кнопке
componentRef.instance.buttonClick.subscribe(() => {
  this.handleButtonClick();
});
//<button (click)="onButtonClick()">Click me</button>

//-------------------------------------
//__Implementing Routing in Angular__//
//Роутинг в Angular позволяет навигироваться по различным компонентам и представлениям в вашем приложении на основе URL-адресов

//В массиве маршрутов { path: '', redirectTo: '/home', pathMatch: 'full' } указывает, что при переходе на корневой URL, пользователь будет перенаправлен на /home. / pathMatch - указывает как сопоставить путь с указанным url адресом
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//В вашем основном шаблоне (обычно app.component.html), добавьте <router-outlet></router-outlet> там, где вы хотите отображать компоненты, соответствующие маршрутам
//<!-- app.component.html -->
//<router-outlet></router-outlet>

//использовать метод router.navigate() в вашем компоненте для программной навигации
import { Router } from '@angular/router';

constructor(private router: Router) { }

goToContact() {
  this.router.navigate(['/contact']);
}

//---------------------------------
//__Implementing NotFound Route__//
//Для реализации маршрута "NotFound" в Angular, вы можете использовать маршрут с пустым путем и установить его в конце массива маршрутов. Это позволит перенаправлять пользователей на страницу "404 Not Found", если они пытаются перейти по несуществующему маршруту

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  //порядок важен 
  { path: '**', component: NotFoundComponent }, // Маршрут для страницы "NotFound" - будет использоваться, когда пользователь пытается перейти по несуществующему маршруту.
];

//----------------------
//__route navigation__//
//Для настройки ссылок для навигации по маршрутам в Angular можно использовать директиву [routerLink]

//routerLink - не перезагружает страницы
/* 
<a [routerLink]="/home">Home</a>
<a [routerLink]="/about">About</a>
<a [routerLink]="/contact">Contact</a>
*/

//Навигация по маршрутам программно
goToContact() {
  this.router.navigate(['/contact']);
}

//--------------------------------
//__Styling Active Router Link__//
//Вы можете стилизовать активную ссылку маршрута в Angular, используя псевдокласс :router-link-active и добавляя соответствующие стили в CSS или SCSS файл вашего компонента.

/* 
<a [routerLink]="/home" routerLinkActive="router-link-active">Home</a>
<a [routerLink]="/about" routerLinkActive="router-link-active">About</a>
<a [routerLink]="/contact" routerLinkActive="router-link-active">Contact</a>
*/

/* 
a.router-link-active {
  font-weight: bold;
  color: blue;
}
*/

//Если вы хотите, чтобы маршрут по умолчанию не всегда был активным, вы можете добавить дополнительные настройки к директиве [routerLinkActive]
//В приведенном выше примере, ссылка "/home" будет активной только при явном выборе этого маршрута, а не при загрузке маршрута по умолчанию.
/* 
<a [routerLink]="/home" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
<a [routerLink]="/about" routerLinkActive="active">About</a>
*/

//-------------------------------------
//__Relative vs Absolute Route Path__//
//При работе с маршрутами в Angular можно использовать как относительные, так и абсолютные пути
//Относительные пути начинаются с символа / ../
//Абсолютный путь без символов

import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <a routerLink="home">Home</a>
    <a routerLink="/about">About</a>
  `
})
export class MyComponent { }

//------------------------------------------------
//__Navigating between Routes Programmatically__//

//при разработке приложений на Angular часто возникает необходимость программно переходить между маршрутами. Angular предоставляет сервис Router, который можно использовать для навигации между маршрутами программно
//Программная навигация позволяет динамически переходить между маршрутами в зависимости от логики вашего приложения, например, при обработке событий или после выполнения определенных действий.

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-component',
  template: `
    <button (click)="navigateToHome()">Go to Home</button>
    <button (click)="navigateToProduct(1)">Go to Product</button>
  `
})
export class MyComponent {

  //ActivatedRoute в качестве точки отсчета для относительного пути
  constructor(private router: Router, private route: ActivatedRoute) { }

  //Для использования относительного пути вместе с ActivatedRoute в Angular можно использовать метод navigate() сервиса Router с дополнительным параметром relativeTo.

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToProduct(productId: number) {
    //по умолчанию абсолютный путь
    this.router.navigate(['/product', productId]);// 1 -> /product/1

    // Метод navigateByUrl() также может принимать второй параметр в виде объекта NavigationExtras, который позволяет настроить дополнительные параметры навигации, такие как queryParams, fragment, queryParamsHandling, preserveFragment и други
    // Программный переход на полный URL-адрес '/products/1' с передачей query параметров
    this.router.navigateByUrl('/products/1', { queryParams: { category: 'electronics' } });//products/1?category=electronics'

    // Программный переход на относительный путь 'child' от текущего ActivatedRoute
    this.router.navigate(['child'], { relativeTo: this.route });//home/child
  }
}

//-----------------------------------
//__Working with route Parameters__//

//Работа с параметрами маршрута в Angular позволяет передавать динамические значения в маршруты и использовать их в компонентах
//Получаем значения url и из него забираем id для дальнешего использование напр имер для фильтрации

//_url = ... product/1
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-component',
  template: `
    <h1>Product Details</h1>
    <p>Product ID: {{ productId }}</p>
  `
})
export class MyComponent implements OnInit {
  productId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Получение значения параметра 'id' из paramMap
    // Используйте значение параметра для выполнения необходимых действий
    this.route.snapshot.paramMap.get('id') // 1
  }
}

//----------------------------------------------------
//__Using observable to Retrieving Route Parameter__//

//Использование Observable для получения параметра маршрута позволяет реагировать на изменения параметра и обновлять соответствующие данные или выполнить необходимые действия в компоненте Angular

//this.route.snapshot.paramMap.get('id') он при измнениний например при пролистовании на другую страницу сама страница не отрендариться поэтому используем подписчика

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-component',
  template: `
    <h1>Product Details</h1>
    <p>Product ID: {{ productId }}</p>
  `
})
export class MyComponent implements OnInit {
  productId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id'); // Получение значения параметра 'id' из paramMap
      // Используйте значение параметра для выполнения необходимых действий
    });
  }

}

//всегда полезно самому отписаться от предыдущего с помощью onDestroy

//---------------------------------
//__Using Query String in Route__//
// Query parametrs не обязательные , параметры маршрута обязательные

//___
import { Router } from '@angular/router';

constructor(private router: Router) { }

//В приведенном выше примере мы используем метод navigate() объекта Router, передавая путь '/product-details' и объект queryParams, содержащий параметры 'id' и 'name' с их значениями. При переходе по этому маршруту значения параметров будут добавлены в URL в виде строки запрос
navigateToProductDetails() {
  const queryParams = {
    id: '123',
    name: 'Product ABC'
  };
  this.router.navigate(['/product-details'], { queryParams });
}

//___
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-component',
  template: `
    <h1>Product Details</h1>
    <p>Product ID: {{ productId }}</p>
    <p>Product Name: {{ productName }}</p>
  `
})
export class MyComponent implements OnInit {
  productId: string;
  productName: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.productId = this.route.snapshot.queryParams.get('id');
    this.productName = this.route.snapshot.queryParams.get('name');
    // Используйте значения параметров для выполнения необходимых действий
  }
}

//Для добавления параметров строки запроса к тегу <a> в HTML-шаблоне с использованием queryParams, вы можете использовать связывание данных с помощью атрибутов
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-component',
  template: `
    <h1>Product Details</h1>
    <a [routerLink]="['/product-details']" [queryParams]={ productId:'123'}>Product Details</a>
    <a [routerLink]="['/product-details']" [queryParams]=getQueryParams()>Product Details</a>
  `
})
export class MyComponent {
  productId = '123';
  productName = 'Product ABC';

  constructor(private route: ActivatedRoute) { }

  getQueryParams() {
    return { id: this.productId, name: this.productName };
  }
}

//также используем observable что позволяет реагировать на изменения параметра
@Component({
  selector: 'app-my-component',
  template: `
    <h1>Product Details</h1>
    <p>Product ID: {{ productId }}</p>
    <p>Product Name: {{ productName }}</p>
  `
})
export class MyComponent implements OnInit {
  productId: string;
  productName: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id']; // Получение значения параметра 'id' из queryParams
      this.productName = params['name']; // Получение значения параметра 'name' из queryParams
      // Используйте значения параметров для выполнения необходимых действий
    });
  }
}

//-------------------------------
//__Using Fragment in Route__//
//Упрощение навигации к определенным частям страницы
//следует использовать фрагменты с осторожностью, чтобы избежать проблем с индексацией поисковыми системами и доступностью.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-component',
  template: `
    <h1>Product Details</h1>
    <a [routerLink]="['/product-details']" fragment="description">Product Details</a>

    <section id='description'>.....<section>
  `
})
export class MyComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  //В методе ngOnInit() компонента MyComponent мы подписываемся на свойство fragment сервиса ActivatedRoute. Когда фрагмент изменяется, мы получаем его значение и используем метод scrollIntoView() элемента window, чтобы прокрутить страницу к разделу с соответствующим идентификатором.
  ngOnInit() {
    this.activatedRoute.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}

//-------------------------------
//__Working with Child Routes__//
//Работа с дочерними маршрутами (child routes) в Angular позволяет вам организовать вложенную навигацию внутри основного маршрут

//__
const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      { path: 'child1', component: Child1Component },
      { path: 'child2', component: Child2Component }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/* 
<!-- main.component.html -->
<h1>Main Component</h1>
<nav>
  <a routerLink="/main/child1">Child 1</a>
  <a routerLink="/main/child2">Child 2</a>
</nav>
<router-outlet></router-outlet>
*/

//----------------------------------
//__Creating a Route Module File__//
//Создание файлов модуля маршрутизации (route module) в Angular помогает организовать и централизовать определение маршрутов для вашего приложения. В модуле маршрутизации вы можете определить все маршруты и их настройки, а затем импортировать этот модуль в основной модуль вашего приложени

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Импортируйте компоненты, которые будут использованы в маршрутах
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
// И другие компоненты вашего приложения

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  // Добавьте другие маршруты вашего приложения
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//__
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Импортируйте созданный модуль маршрутизации
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

//-----------------------------
//__ What is a Route Guard__//
//Route Guard (или охранник маршрута) - это механизм в Angular, который позволяет контролировать доступ к маршрутам. Route Guard может быть использован для авторизации, проверки ролей, загрузки данных перед отображением маршрута и других целей.

/* 
Различают следующие виды guard-ов:
CanActivate — разрешает/запрещает доступ к маршруту;
CanActivateChild -разрешает/запрещает доступ к дочернему маршруту;
CanDeactivate — разрешает/запрещает уход с текущего маршрута;
Resolve — выполняет какое-либо действие перед переходом на маршрут, обычно ожидает данные от сервера;
CanLoad — разрешает/запрещает загрузку модуля, загружаемого асинхронно.
*/

//Все guard-ы должны возвращать либо true, либо false. И происходить это может как в синхронном режиме (тип Boolean), так и в асинхронном режиме (Observable<boolean> или Promise<boolean>).

//------------------------------
//__CanActivate Route Guard ..14 version__//

//В этом примере мы создали Route Guard AuthGuard, который использует сервис аутентификации AuthService для проверки того, авторизован ли пользователь.
//в более поздних версиях
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated();
  }
}

//Чтобы использовать Route Guard AuthGuard, необходимо добавить его в массив canActivate объекта маршрута
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];

//--------------------------------------------
//__CanActivate Route Guard 15 version ...__//

//В 15 version и выше в качестве альтернативы вы можете использовать класс с возможностью ввода в качестве функциональной защиты
//также можно поместить туда функции предворительно прописанную

const routes: Routes = [
  {
    path: 'my-component',
    component: MyComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()]
  },
];

//----------------------------
//__CanActivateChild Route__//

//то же самое что CanActivate только защищаем дочерние маршруты

import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated(); // Your authentication logic here
  }
}

//__
const routes: Routes = [
  {
    path: 'my-component',
    component: MyComponent,
    canActivateChild: [AuthGuard]
  },
];

//__в версии 15 и выше
const routes: Routes = [
  {
    path: 'my-component',
    component: MyComponent,
    canActivateChild: [() => inject(AuthService).isAuthenticated()]
  },
];

//-------------------------------
//__CanDeactivate Route Guard__//

//__
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentWithDeactivation } from './component-with-deactivation';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentWithDeactivation> {
  canDeactivate(
    component: ComponentWithDeactivation
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate(); // Ваша логика деактивации компонента
  }
}

//CanDeactivateGuard реализует интерфейс CanDeactivate и переопределяет метод canDeactivate. Внутри этого метода вы можете реализовать вашу собственную логику деактивации, например, проверку наличия несохраненных изменений или подтверждение от пользователя, например пользователь не перейдет никуда пока до конца не заполнит форму  на текущей странице или не нажмет отмену в модальном окне
const routes: Routes = [
  {
    path: 'my-component',
    component: MyComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];

//__в версии 15 и выше
const routes: Routes = [
  {
    path: 'my-component',
    component: MyComponent,
    canDeactivate: [(comp: MyComponent) => comp.myCustomDeactivationLogic()]
  },
];

//-------------------------
//__Resolve Route Guard__//
//Когда данные будут доступны мы перейдем на этот маршрут, то есть нажали кнопку, но сразу не перешли т.к. данные мы получаем не сразу а ждем ответа от сервера и чтобы не получить сразу пустую страницу мы используем Resolve Route Guard, он не дает нам перейти пока не подгрузим данные, тоесть при нажатии на маршрут переход идет с задержкой

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable()
export class DataResolver implements Resolve<any> {
  constructor(private dataService: DataService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    //вы можете реализовать вашу логику получения данных, например, получение данных через сервис DataService
    return this.dataService.getData(); // Ваша логика получения данных
  }
}

//__
const routes: Routes = [
  {
    path: 'my-component',
    component: MyComponent,
    resolve: {
      data: DataResolver
    }
  },
];
//в компоненте получить данные в то же время как и в guard
this.activatedRoute.snapshot.data['data']

//__в версии 15 и выше
const resolve = ()  => {
  return this.dataService.getData()
}

const routes: Routes = [
  {
    path: 'my-component',
    component: MyComponent,
    resolve: {
      data: resolve
    }
  },
];

//------------------------------
//__Router Navigation Events__//
//Angular предоставляет набор событий навигации, которые могут быть использованы для отслеживания и реагирования на изменения маршрутов в приложении.

//enableTracing:true - просматривать все Router событие в консоли
@NgModule({
  imports: [RouterModule.forRoot(routes),{enableTracing:true}],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//NavigationStart: Событие NavigationStart возникает, когда начинается навигация к новому маршруту. Это событие может быть использовано для выполнения дополнительных действий перед началом навигации, например, для отображения индикатора загрузки
import { Router, NavigationStart } from '@angular/router';

constructor(private router: Router) {
  router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      // Выполнить действия перед началом навигации
    }
  });
}

//NavigationEnd: Событие NavigationEnd возникает после успешного завершения навигации к новому маршруту.
import { Router, NavigationEnd } from '@angular/router';

constructor(private router: Router) {
  router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      // Выполнить действия после завершения навигации
    }
  });
}

//-------------------------------
//___Passing Data with a Route__//
//Когда вы маршрутизируетесь между компонентами в Angular, вы можете передавать данные с помощью параметров маршрута

//<a routerLink="/main/child1" [state] = "'{ id: 1, name: 'Product' }'">Child 1</a>

// Перенаправление с передачей данных состояния маршрута
this.router.navigate(['/product'], { state: { id: 1, name: 'Product' } });

// Извлечение данных состояния маршрута в целевом компоненте
import { Router } from '@angular/router';

constructor(private router: Router) {
  const state = this.router.getCurrentNavigation().extras.state;
  if (state) {
    const id = state.id;
    const name = state.name;
    // Используйте данные состояния маршрута
  }

  //если не работает то используем 
  const state2 = history.state
}

//___
//также можем передовать в route
const routes: Routes = [
  {
    path: 'my-component',
    component: MyComponent,
    data: { id: 1, name: 'Product' }
  },
];

// Извлечение параметра запроса в целевом компоненте
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {
  this.route.data.subscribe(date => {
    const dataState = date
    // Используйте значение параметра запроса
  });
}

//-------------------------------
//__What are Pipes in Angular__//
//В Angular, Pipes (пайпы) представляют собой инструмент для преобразования данных прямо в шаблоне компонента. Они позволяют выполнять форматирование и преобразование данных перед их отображением пользователю. Пайпы часто используются для изменения формата дат, чисел, строк и других типов данных

//DatePipe: Позволяет форматировать даты
//<p>Текущая дата: {{ currentDate | date:'dd/MM/yyyy' }}</p>

//UpperCasePipe и LowerCasePipe:
//Позволяют преобразовывать строки в верхний или нижний регистр.Например:
//<p>Привет, {{ name | uppercase }}</p>

//CurrencyPipe:
//Позволяет форматировать числа в денежном формате.Например:
//<p>Цена: {{ price | currency:'USD':'symbol' }}</p>

//DecimalPipe
//Позволяет форматировать числа с заданным количеством десятичных знаков. Например:
//<p>Рейтинг: {{ rating | number:'1.1-2' }}</p>

//Кроме встроенных пайпов, вы также можете создавать свои пользовательские пайпы, определяя класс с декоратором @Pipe. 

//---------------------------------
//__