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