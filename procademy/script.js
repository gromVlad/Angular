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

@Component({ })
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
