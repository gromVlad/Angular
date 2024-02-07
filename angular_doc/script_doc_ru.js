//Angular — это фреймворк для проектирования приложений и платформа разработки для создания эффективных и сложных одностраничных приложений.
/* 

//-----------------------------------
//_________Что такое Angular?______//
Angular — это платформа разработки, построенная на TypeScript. Как платформа, Angular включает в себя:
компонентный фреймворк для создания масштабируемых веб-приложений
набор хорошо интегрированных библиотек, которые охватывают широкий спектр функций, включая маршрутизацию, управление формами, взаимодействие клиент-сервер и т.д.
Набор инструментов для разработчиков, которые помогут вам разрабатывать, собирать, тестировать и обновлять код.
*/
//Компоненты — это строительные блоки, из которых состоит приложение. Компонент включает в себя класс TypeScript с декоратором @Component()
//CSS-селектор, определяющий, как компонент будет использоваться в шаблоне
//Необязательный набор стилей CSS

//___
import { Component } from '@angular/core';

@Component({
    selector: 'hello-world',
    template: `
        <h2>Hello World</h2>
        <p>This is my first component!</p>
    `,
})
export class HelloWorldComponent { }
//<hello-world></hello-world>

//__Шаблоны
//Каждый компонент имеет HTML-шаблон, который определяет способ отображения этого компонента
//Одним из применений этой возможности является вставка динамического текста
@Component({
    selector: 'hello-world-interpolation',
    templateUrl:
        './hello-world-interpolation.component.html',
})
export class HelloWorldInterpolationComponent {
    message = 'Hello, World!';
}
//<p>{{ message }}</p>

//также поддерживает привязки свойств
/* 
<p [id]="sayHelloId" [style.color]="fontColor">
    You can set my color in the component!
</p>
*/

//Объявление слушателей событий для прослушивания и реагирования на действия
sayMessage() {
    alert(this.message);
}
/* 
<button
    type="button"
    [disabled]="canClick"
    (click)="sayMessage()"
>
    Trigger alert message
</button>
*/

//__комбинированный пример
@Component({
    selector: 'hello-world-bindings',
    templateUrl: './hello-world-bindings.component.html',
})
export class HelloWorldBindingsComponent {
    fontColor = 'blue';
    sayHelloId = 1;
    canClick = false;
    message = 'Hello, World';

    sayMessage() {
        alert(this.message);
    }
}
/* 
<button
    type="button"
    [disabled]="canClick"
    (click)="sayMessage()"
>
    Trigger alert message
</button>
<p [id]="sayHelloId" [style.color]="fontColor">
    You can set my color in the component!
</p>
<p>My color is {{ fontColor }}</p>
*/

//__директивы
/* 
//if else
<div *ngIf="canEdit; else noEdit">
    <p>You can edit the following paragraph.</p>
</div>

<ng-template #noEdit>
    <p>
        The following paragraph is read only. Try clicking
        the button!
    </p>
</ng-template>
*/

//__Инъекция зависимостей
//Инъекция зависимостей позволяет вам объявлять зависимости ваших классов TypeScript, не заботясь об их инстанцировании
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Logger {
    writeCount(count: number) {
        console.warn(count);
    }
}
//__
@Component({
    selector: 'hello-world-di',
    templateUrl: './hello-world-di.component.html',
})
export class HelloWorldDependencyInjectionComponent {
    count = 0;
    //служба Logger внедряется в класс HelloWorldDI путем добавления private logger: Logger в конструктор
    constructor(private logger: Logger) { }

    onLogMe() {
        this.logger.writeCount(this.count);
        this.count++;
    }
}

//__Angular CLI
//Angular CLI — это самый быстрый, простой и рекомендуемый способ разработки приложений Angular
// ng build	Компилирует приложение Angular в выходной каталог.
// ng serve	Собирает и обслуживает ваше приложение, перестраивая его при изменении файлов.
// ng generate	Генерирует или изменяет файлы на основе схемы.
// ng test	Запускает модульные тесты для данного проекта.
// ng e2e	Собирает и обслуживает приложение Angular, затем запускает сквозные тесты.

//__Сторонние библиотеки
// Angular Router	Расширенная навигация и маршрутизация на стороне клиента на основе компонентов Angular. Поддерживает ленивую загрузку, вложенные маршруты, пользовательское сопоставление путей и многое другое.
// Angular Forms	Единая система участия и проверки форм.
// Angular HttpClient	Надежный HTTP-клиент, способный обеспечить более продвинутое взаимодействие клиент-сервер.
// Angular Animations	Богатая система для управления анимацией на основе состояния приложения.
// Angular PWA	Инструменты для создания прогрессивных веб-приложений \(PWA\), включая сервисный работник и манифест веб-приложения.
// Angular Schematics	Автоматизированные инструменты для создания лесов, рефакторинга и обновления, которые упрощают разработку в больших масштабах.

//-------------------------
//___Обзор компонентов Angular
//ng generate component <component-name>

//---------------------------
//__Жизненный цикл компонента
//Реагируйте на события жизненного цикла компонента или директивы, реализуя один или несколько интерфейсов lifecycle hook в библиотеке Angular core. Эти хуки дают вам возможность действовать на экземпляр компонента или директивы в нужный момент, когда Angular создает, обновляет или уничтожает этот экземпляр.
@Directive({ selector: '[appPeekABoo]' })
export class PeekABooDirective implements OnInit {
    constructor(private logger: LoggerService) { }

    // implement OnInit's `ngOnInit` method
    ngOnInit() {
        this.logIt('OnInit');
    }

    logIt(msg: string) {
        this.logger.log(`#${nextId++} ${msg}`);
    }
}

// constructor(myService: MyService, ...) { ... }
// Вызывается до любого другого хука жизненного цикла. Используйте его для внедрения зависимостей, но избегайте здесь серьезной работы.

// ngOnChanges(changeRecord) { ... }
// Вызывается после каждого изменения входных свойств и перед обработкой содержимого или дочерних представлений.

// ngOnInit() { ... }
// Вызывается после конструктора, инициализации входных свойств и первого вызова ngOnChanges.

// ngDoCheck() { ... }
// Вызывается каждый раз, когда проверяются входные свойства компонента или директивы. Используйте его, чтобы расширить обнаружение изменений, выполнив пользовательскую проверку.

// ngAfterContentInit() { ... }
// Вызывается после ngOnInit, когда содержимое компонента или директивы было инициализировано.

// ngAfterContentChecked() { ... }
// Вызывается после каждой проверки содержимого компонента или директивы.

// ngAfterViewInit() { ... }
// Вызывается после ngAfterContentInit, когда инициализируются представления компонента и дочерние представления / представление, в котором находится директива.

// ngAfterViewChecked() { ... }
// Вызывается после каждой проверки представлений компонента и дочерних представлений / представления, в котором находится директива.

// ngOnDestroy() { ... }
// Вызывается один раз, прежде чем экземпляр будет уничтожен.

//__
// Шпионит за любым элементом, к которому применяется.
let nextId = 1;
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
//<p *ngFor="let hero of heroes" appSpy>{{hero}}</p>

//__
//Метод ngOnChanges() принимает объект, который сопоставляет каждое измененное имя свойства с объектом SimpleChange, содержащим текущее и предыдущее значения свойства. Этот хук перебирает измененные свойства и записывает их в журнал.
//on-changes.component.
ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
        const chng = changes[propName];
        const cur = JSON.stringify(chng.currentValue);
        const prev = JSON.stringify(chng.previousValue);
        this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
}

//--------------------------------------
//______Инкапсуляция представления____//

// ViewEncapsulation.ShadowDom	Angular использует встроенный в браузер Shadow DOM API, чтобы заключить представление компонента внутри ShadowRoot, используемого в качестве основного элемента компонента, и применить предоставленные стили изолированным образом.
// ViewEncapsulation.Emulated	Angular изменяет CSS-селекторы компонента так, что они применяются только к представлению компонента и не влияют на другие элементы в приложении, эмулируя поведение Shadow DOM. Подробнее см. в Проверка сгенерированного CSS.
// ViewEncapsulation.None	Angular не применяет никакого вида инкапсуляции представлений, что означает, что любые стили, заданные для компонента, применяются глобально и могут повлиять на любой HTML-элемент, присутствующий в приложении. Этот режим по сути то же самое, что и включение стилей в сам HTML.

//Этот компонент окрашивает элементы своего шаблона в красный цвет
@Component({
    selector: 'app-no-encapsulation',
    template: `
        <h2>None</h2>
        <div class="none-message">No encapsulation</div>
    `,
    styles: ['h2, .none-message { color: red; }'],
    encapsulation: ViewEncapsulation.None,
})
export class NoEncapsulationComponent { }

//Этот компонент окрашивает элементы своего шаблона в зеленый цвет.
@Component({
    selector: 'app-emulated-encapsulation',
    template: `
        <h2>Emulated</h2>
        <div class="emulated-message">
            Emulated encapsulation
        </div>
        <app-no-encapsulation></app-no-encapsulation>
    `,
    styles: ['h2, .emulated-message { color: green; }'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class EmulatedEncapsulationComponent { }

//Этот компонент окрашивает свои элементы шаблона в синий цвет.
@Component({
    selector: 'app-shadow-dom-encapsulation',
    template: `
        <h2>ShadowDom</h2>
        <div class="shadow-message">
            Shadow DOM encapsulation
        </div>
        <app-emulated-encapsulation></app-emulated-encapsulation>
        <app-no-encapsulation></app-no-encapsulation>
    `,
    styles: ['h2, .shadow-message { color: blue; }'],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShadowDomEncapsulationComponent { }

//--------------------------------
//__Взаимодействие компонентов__//
//передача данных от родителя к ребенку
/* 
<app-hero-child
    *ngFor="let hero of heroes"
    [hero]="hero"
    [master]="master"
    >
</app-hero-child>
*/
@Component({
    selector: 'app-hero-child',
    template: `
        <h3>{{ hero.name }} says:</h3>
        <p>
            I, {{ hero.name }}, am at your service,
            {{ masterName }}.
        </p>
    `,
})
export class HeroChildComponent {
    @Input() hero!: Hero;
    @Input('master') masterName = '';
}

//Перехват изменений входного свойства с помощью сеттера
//Используйте сеттер входного свойства, чтобы перехватить значение от родителя и действовать в соответствии с ним.
/* 
<app-name-child
    *ngFor="let name of names"
    [name]="name"
></app-name-child>
*/
@Component({
    selector: 'app-name-child',
    template: '<h3>"{{name}}"</h3>',
})
export class NameChildComponent {
    @Input()
    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name =
            (name && name.trim()) || '<no name set>';
    }
    private _name = '';
}

//Перехват изменений свойств ввода с помощью ngOnChanges() - не используют

//__Родитель слушает событие ребенка
//выводным свойством - @Output()
/* 
<app-voter
    *ngFor="let voter of voters"
    [name]="voter"
    (voted)="onVoted($event)"
    >
</app-voter>
*/
import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-voter',
    template: `
        <h4>{{ name }}</h4>
        <button
            type="button"
            (click)="vote(true)"
            [disabled]="didVote"
        >
            Agree
        </button>
        <button
            type="button"
            (click)="vote(false)"
            [disabled]="didVote"
        >
            Disagree
        </button>
    `,
})
export class VoterComponent {
    @Input() name = '';
    @Output() voted = new EventEmitter < boolean > ();
    didVote = false;

    vote(agreed: boolean) {
        this.voted.emit(agreed);
        this.didVote = true;
    }
}

//__Родитель взаимодействует с ребенком, используя локальную переменную
//нужно создать переменную-ссылку шаблона для дочернего элемента
@Component({
    selector: 'app-countdown-timer',
    template: '<p>{{message}}</p>',
})
export class CountdownTimerComponent implements OnDestroy {
    message = '';
    seconds = 11;

    ngOnDestroy() {
        this.clearTimer?.();
    }

    start() {
        this.countDown();
    }
    stop() {
        this.clearTimer?.();
        this.message = `Holding at T-${this.seconds} seconds`;
    }

    private clearTimer: VoidFunction | undefined;

    private countDown() {
        this.clearTimer?.();
        const interval = setInterval(() => {
            this.seconds -= 1;
            if (this.seconds === 0) {
                this.message = 'Blast off!';
            } else {
                if (this.seconds < 0) {
                    this.seconds = 10;
                } // reset
                this.message = `T-${this.seconds} seconds and counting`;
            }
        }, 1000);
        this.clearTimer = () => clearInterval(interval);
    }
}

import { Component } from '@angular/core';
import { CountdownTimerComponent } from './countdown-timer.component';

@Component({
    selector: 'app-countdown-parent-lv',
    template: `
        <h3>Countdown to Liftoff (via local variable)</h3>
        <button type="button" (click)="timer.start()">
            Start
        </button>
        <button type="button" (click)="timer.stop()">
            Stop
        </button>
        <div class="seconds">{{ timer.seconds }}</div>
        <app-countdown-timer #timer></app-countdown-timer>
    `,
    styleUrls: ['../assets/demo.css'],
})
export class CountdownLocalVarParentComponent { }
//#timer - даст вам ссылку на дочерний компонент и возможность доступа к любым его свойствам или методам из родительского шаблона

//__Родитель вызывает @ViewChild(
@Component({
    selector: 'parent',
    template: `<child #child></child>`
})
export class ParentComponent {
    @ViewChild('child') child!: ChildComponent;

    ngAfterViewInit() {
        console.log(this.child.name); // "Child"
    }
}

//__Родительский и дочерний компоненты общаются с помощью сервиса
//Создайте сервис
@Injectable({
    providedIn: 'root'
})
export class CommunicationService {
    private message: string = '';

    getMessage(): string {
        return this.message;
    }

    setMessage(message: string): void {
        this.message = message;
    }
}

//Импортируйте сервис в родительский и дочерний компоненты
import { CommunicationService } from './communication.service';

@Component({
    selector: 'parent',
    template: `<child></child>`
})
export class ParentComponent {
    constructor(private communicationService: CommunicationService) { }

    sendMessage(message: string): void {
        this.communicationService.setMessage(message);
    }
}

@Component({
    selector: 'child',
    template: `<h1>{{message}}</h1>`
})
export class ChildComponent {
    constructor(private communicationService: CommunicationService) { }

    ngOnInit(): void {
        this.message = this.communicationService.getMessage();
    }
}

//------------------------
//___Стили компонентов__//

//::ng-deep - повышает стиль компонента до глобального стиля
//::part - произвольные стили, нацеленные на эти конкретные элементы
//:host - Любое правило, примененное к этому селектору, будет влиять на главный элемент и все его потомки
//:host-context -  использовать селектор :host-context для применения стилей к главному элементу компонента, независимо от того, где этот компонент используется в шаблоне.
/* 
:host-context(my-component) {
  background-color: red;
}
*/

//Путем установки метаданных styles или styleUrls

//-------------------------
//__Использование данных между дочерними и родительскими директивами и компонентами__//

//_
export class AppComponent {
    currentItem = 'Television';
}
//<app-item-detail [item]="currentItem"></app-item-detail>

//_
import { Component, Input } from '@angular/core'; // First, import Input
export class ItemDetailComponent {
    @Input() item = ''; // decorate the property with @Input()
}
//<p>Today's item: {{item}}</p>

//__@Output
//@Output() - данные могут перемещаться от дочернего компонента к родительскому

//app-item-output
export class ItemOutputComponent {
    @Output() newItemEvent = new EventEmitter < string > ();

    addNewItem(value: string) {
        this.newItemEvent.emit(value);
    }
}
/* 
<label for="item-input">Add an item:</label>
<input type="text" id="item-input" #newItem />
//принимает в качестве аргумента значение свойства #newItem.value
<button type="button" (click)="addNewItem(newItem.value)">
    Add to parent's list
</button>
*/

//app.component.html
/* 
<app-item-output
    (newItemEvent)="addItem($event)"
></app-item-output>
*/

//--------------------------
//__Проекция содержимого__//
//для создания гибких, многократно используемых компонентов.Проекция содержимого — это шаблон, в котором вы вставляете, или проектируете, содержимое, которое хотите использовать, внутрь другого компонента.

//__Однослотовая проекция контента
//теперь могут проецировать свое собственное сообщение в компонент <p>
/* <app-zippy-basic>
    <p>Is content projection cool?</p>
</app-zippy-basic> */
import { Component } from '@angular/core';

@Component({
    selector: 'app-zippy-basic',
    template: `
        <h2>Single-slot content projection</h2>
        <ng-content></ng-content> // <--- <p>
    `,
})
export class ZippyBasicComponent { }

//__Проекция содержимого на несколько слотов
//слот по умолчанию, в который будет вставляться любое содержимое, не спроецированное на конкретный слот.
//Слот [question]: Это именованный слот, который может быть использован для проецирования определенного содержимого в этот слот.
/* 
<app-zippy-multislot>
    //question
    <p question>Is content projection cool?</p>
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
        <ng-content select="[question]"></ng-content>
    `,
})
export class ZippyMultislotComponent { }

//__Условное проецирование содержимого
//<ng-template> вы можете заставить свой компонент явно выводить содержимое на основе любого условия, сколько угодно раз

//ngTemplateOutlet для рендеринга заданного элемента
/* 
<ng-container
    [ngTemplateOutlet]="content.templateRef"
></ng-container>
*/

//ngProjectAs - это директива Angular, которая позволяет задать имя для слота проекции контента. 
/* 
<app-my-component>
  <header ngProjectAs="header">
    <h1>My Header</h1>
  </header>
  <main ngProjectAs="body">
    <p>This is the main content.</p>
  </main>
  <footer ngProjectAs="footer">
    <p>My Footer</p>
  </footer>
</app-my-component>
*/
@Component({
    selector: 'app-my-component',
    template: `
      <ng-content select="[header]"></ng-content>
      <ng-content select="[body]"></ng-content>
      <ng-content select="[footer]"></ng-content>
    `,
})
export class MyComponent { }
//output
/* 
<h1>My Header</h1>
<p>This is the main content.</p>
<p>My Footer</p>
*/

//-----------------------------------------
//___Динамический загрузчик компонентов__//

//__Директива якоря

//<ng-template adHost></ng-template>
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[adHost]',
})
export class AdDirective {
    constructor(
        //ViewContainerRef для получения доступа к контейнеру представления элемента
        public viewContainerRef: ViewContainerRef
    ) { }
}

//------------------------
//__Понимание шаблонов__//

//_интерполяции
//<h3>Current customer: {{ currentCustomer }}</h3>

//_шаблонное утверждение 
/* 
<button type="button" (click)="deleteHero()">
    Delete hero
</button>
*/

//_Контекст утверждения $event
//<button type="button" (click)="onSave($event)">Save</button

//_Понимание привязки
/* 
<ul>
    <li *ngFor="let customer of customers">
        {{customer.name}}
    </li>
</ul>

<label
    >Type something:
    <input #customerInput />{{customerInput.value}}
</label>
*/

//_Связывание свойств
//<img alt="item" [src]="itemImageUrl" />

//_Связывание атрибутов
//attr + ..
//<p [attr.attribute-you-are-targeting]="expression"></p>

//colspan
//помогает вам поддерживать программную динамику ваших таблиц

//_Привязка классов и стилей
//[class]="classExpression"
//<nav [style.background-color]="expression"></nav>
@Component({
    selector: 'app-nav-bar',
    template: ` <nav [style]="navStyle">
        <a [style.text-decoration]="activeLinkStyle"
            >Home Page</a
        >
        <a [style.text-decoration]="linkStyle">Login</a>
    </nav>`,
})
export class NavBarComponent {
    navStyle = 'font-size: 1.2rem; color: cornflowerblue;';
    linkStyle = 'underline';
    activeLinkStyle = 'overline';
    /* . . . */
}

//_Привязка событий
//<button (click)="onSave()">Save</button>

//Привязка к событиям клавиатуры
//<input (keydown.shift.t)="onKeydown($event)" />

//_Двустороннее связывание
//<app-sizer [(size)]="fontSizePx"></app-sizer>

//------------------------
//___Понимание пайпов___//
//Пайпы — это простые функции, используемые в шаблонных выражениях
// DatePipe: Форматирует значение даты в соответствии с правилами локали.
// UpperCasePipe: Преобразовывает текст в верхний регистр.
// LowerCasePipe: Преобразование текста во все строчные регистры.
// CurrencyPipe: Преобразует число в строку валюты, отформатированную в соответствии с правилами локали.
// DecimalPipe: Преобразует число в строку с десятичной точкой, отформатированную в соответствии с правилами локали.
// PercentPipe: Преобразует число в строку с процентами, отформатированную в соответствии с правилами локали.

//<p>The hero's birthday is {{ birthday | date }}</p>

/* 
<div *ngFor="let hero of (heroes | flyingHeroes)">
    {{hero.name}}
</div>
*/

//пользовательский пайп
@Pipe({
    name: 'flyingHeroesImpure',
    pure: false,
})
export class FlyingHeroesImpurePipe extends FlyingHeroesPipe { }

//_AsyncPipe — это нечистый пайп, который избавляет ваш компонент от необходимости поддерживать подписку и продолжать передавать значения из наблюдаемой таблицы по мере их поступления
//<p>Message: {{ message$ | async }}</p>

//_цепочки пайпов
//The chained hero's birthday is {{ birthday | date | uppercase}}

//--------------------------
//__Встроенные директивы__//
//Директивы — это классы, которые добавляют дополнительное поведение к элементам в ваших приложениях Angular.

//__Встроенные директивы атрибутов
// NgClass	Добавляет и удаляет набор классов CSS.
// NgStyle	Добавляет и удаляет набор стилей HTML.
// NgModel	Добавляет двустороннюю привязку данных к элементу HTML-формы.

/* 
<div [ngClass]="isSpecial ? 'special' : ''">
    This div is special
</div>
*/

//Отображение и обновление свойств с помощью ngModel
// <--- JavaScript import from Angular
import { FormsModule } from '@angular/forms';
/* . . . */
@NgModule({
    /* . . . */

    imports: [
        BrowserModule,
        FormsModule, // <--- import into the NgModule
    ],
    /* . . . */
})
export class AppModule { }
/* 
<label for="example-ngModel">[(ngModel)]:</label>
<input
    [(ngModel)]="currentItem.name"
    id="example-ngModel"
/>
*/

//_Встроенные структурные директивы
// NgIf Условно создает или удаляет вложенные представления из шаблона.
// NgFor Повторяет узел для каждого элемента в списке.
// NgSwitch Набор директив, переключающих между альтернативными представлениями.

/* 
<div *ngIf="currentCustomer">
    Hello, {{currentCustomer.name}}
</div>

<div *ngFor="let item of items; let i=index">
    {{i + 1}} - {{item.name}}
</div>

<div [ngSwitch]="currentItem.feature">
    <app-stout-item
        *ngSwitchCase="'stout'"
        [item]="currentItem"
    ></app-stout-item>
    <app-device-item
        *ngSwitchCase="'slim'"
        [item]="currentItem"
    ></app-device-item>
    <app-lost-item
        *ngSwitchCase="'vintage'"
        [item]="currentItem"
    ></app-lost-item>
    <app-best-item
        *ngSwitchCase="'bright'"
        [item]="currentItem"
    ></app-best-item>
    <!-- . . . -->
    <app-unknown-item
        *ngSwitchDefault
        [item]="currentItem"
    ></app-unknown-item>
</div>
*/

//___Директивы атрибутов

//ElementRef предоставляет прямой доступ к основному элементу DOM через свойство nativeElement.
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
})
export class HighlightDirective {
    constructor(private el: ElementRef) {
        this.el.nativeElement.style.backgroundColor =
            'yellow';
    }

    //Обработка событий пользователя
    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('');
    }
}
//<p appHighlight>Highlight me!</p>

//Передача значений в директиву атрибутов
@Directive({
    selector: '[appHighlight]',
})
export class HighlightDirective {
    @Input() appHighlight = '';
    @Input() defaultColor = '';

    constructor(private el: ElementRef) {
        this.el.nativeElement.style.backgroundColor =
            'yellow';
    }

    //Обработка событий пользователя
    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.appHighlight || this.defaultColor || 'red');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('');
    }
}
/* 
<p [appHighlight]="color" defaultColor="violet">
    Highlight me too!
</p>
*/

//_Деактивация обработки Angular с помощью NgNonBindable
//NgNonBindable - деактивирует интерполяцию
/* 
appHighlight все еще активна, но Angular не оценивает выражение {{ 1 + 1 }}}
<div ngNonBindable [appHighlight]="'yellow'">
    This should not evaluate: {{ 1 +1 }}, but will highlight
    yellow.
</div>
*/

//___Структурные директивы
//обычно сопровождаются звездочкой, *

//<div *ngIf="hero" class="name">{{hero.name}}</div>
/* 
<div
    *ngFor="let hero of heroes; let i=index; let odd=odd; trackBy: trackById"
    [class.odd]="odd"
>
    ({{i}}) {{hero.name}}
</div>

//trackById - для настройки уникальной идентификации элементов в итерируемом файле с помощью NgForOf
<ng-template
    ngFor
    let-hero
    [ngForOf]="heroes"
    let-i="index"
    let-odd="odd"
    [ngForTrackBy]="trackById"
>
    <div [class.odd]="odd">({{i}}) {{hero.name}}</div>
</ng-template>
*/

//Одна структурная директива на элемент
//Вы можете применить только одну структурную директиву к элементу.

//Создание структурной директивы
import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

/**
 * Добавьте содержимое шаблона в DOM, если условие не является истинным.
 */
@Directive({ selector: '[appUnless]' })
export class UnlessDirective {
    private hasView = false;

    constructor(
        //templateRef: ссылка на шаблон, которым будет управлять директива.
        private templateRef: TemplateRef<any>,
        //viewContainer: Ссылка на контейнер представления, в который директива будет вставлять шаблон.
        private viewContainer: ViewContainerRef
    ) { }

    //appUnless. Это свойство используется для указания условия, которое определяет, будет ли отображаться шаблон.
    @Input() set appUnless(condition: boolean) {
        if (!condition && !this.hasView) {
            this.viewContainer.createEmbeddedView(
                this.templateRef
            );
            this.hasView = true;
        } else if (condition && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
/* 
<p *appUnless="condition" class="unless a">
    (A) This paragraph is displayed because the
    condition is false.
</p>

<p *appUnless="!condition" class="unless b">
    (B) Although the condition is true, this paragraph
    is displayed because appUnless is set to false.
</p>

<button
        type="button"
        (click)="condition = !condition"
        [ngClass]="{ 'a': condition, 'b': !condition }"
    >
        Toggle condition to {{condition ? 'false' :
        'true'}}
</button>
*/

//API композиции директив
@Directive({ ...})
export class Menu { }

@Directive({ ...})
export class Tooltip { }

// MenuWithTooltip может компоновать поведение из нескольких других директив
@Directive({
    hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip { }

// CustomWidget может применить уже составленное поведение из MenuWithTooltip
@Directive({
    hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip { }

//_показан компонент, который применяет несколько директив хоста
@Component({
    hostDirectives: [
        DisabledState,
        RequiredState,
        ValidationState,
        ColorState,
        RippleBehavior,
    ],
})
export class CustomCheckbox { }

//-------------------------------------
//__Инъекция зависимостей в Angular__//
//нъекция зависимости (Dependency Injection, или DI) — это шаблон проектирования и механизм создания и передачи одних частей приложения другим частям приложения, которым они необходимы. Angular поддерживает этот шаблон проектирования, и вы можете использовать его в своих приложениях для повышения гибкости и модульности.

//Инжектор предоставляет единичный экземпляр зависимости и может внедрять этот экземпляр в несколько компонентов.

@Injectable()
class HeroService { }

//HeroService становится доступным для всех экземпляров этого компонента и других компонентов и директив, используемых в шаблоне
@Component({
    selector: 'hero-list',
    template: '...',
    providers: [HeroService],
})
class HeroListComponent { }

//providedIn: 'root' - позволяет инжектировать его в другие классы приложения
@Injectable({
    providedIn: 'root',
})
class HeroService { }

//Инжектирование зависимости
@Component({
    /* ... */
})
class HeroListComponent {
    //объявить ее в конструкторе
    constructor(private service: HeroService) { }
}

//Сервис — это широкая категория, охватывающая любые ценности, функции или возможности, необходимые приложению. Обычно сервис — это класс с узкой, четко определенной целью. Компонент — это один из типов классов, который может использовать DI
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';

@Injectable({
    // объявляет, что эта служба должна быть создана
    // корневым инжектором приложения.
    providedIn: 'root',
})
export class HeroService {
    getHeroes() {
        return HEROES;
    }
}

//constructor(heroService: HeroService)

//Инжектирование сервисов в другие сервис
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Logger } from '../logger.service';

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    constructor(private logger: Logger) { }

    getHeroes() {
        this.logger.log('Getting heroes ...');
        return HEROES;
    }
}

//__Настройка поставщиков зависимостей

//инжектор по умолчанию будет инстанцировать этот класс с помощью оператора new -
providers: [Logger];

//Провайдеры классов: useClass
// позволяет вам создавать и возвращать новый экземпляр указанного класса
//[{ provide: Logger, useClass: BetterLogger }];
[{ provide: Logger, useClass: BetterLogger }];

//провайдера useExisting
// чтобы внедрить существующий экземпляр класса
[
    NewLogger,
    // Псевдоним OldLogger со ссылкой на NewLogger
    { provide: OldLogger, useExisting: NewLogger },
];

//Провайдеры фабрик: useFactory
//Псевдоним провайдера useFactory в Angular используется для указания того, что фабричная функция должна использоваться для создания экземпляра класса, который будет использоваться в качестве провайдера для данного токен
providers: [
    {
        provide: MyService,
        useFactory: () => {
            return new MyService();
        }
    }
]

//Провайдеры значений: useValue
//используется для указания того, что конкретное значение должно использоваться в качестве провайдера
//Это означает, что всякий раз, когда Angular пытается внедрить значение токена 'myValue' в компонент или сервис, он будет использовать значение "Hello, world!".
providers: [
    { provide: 'myValue', useValue: 'Hello, world!' }
]

//Использование объекта InjectionToken
//InjectionToken в Angular используется для создания уникальных токенов, которые могут использоваться для внедрения зависимостей в компоненты
const MY_SERVICE_TOKEN = new InjectionToken < MyService > ('MyService');

@Component({
    selector: 'my-component',
    template: `
      <p>MyService: {{myService.value}}</p>
    `,
})
export class MyComponent {
    constructor(@Inject(MY_SERVICE_TOKEN) public myService: MyService) { }
}

//__Иерархические инжекторы

//Модификаторы разрешения
//@Optional(), @Self(), @SkipSelf() и @Host()

//@Optional() позволяет Angular считать сервис, который вы вводите, необязательным.
export class OptionalComponent {
    constructor(
        @Optional() public optional?: OptionalService
    ) { }
}

//Используйте @Self(), чтобы Angular просматривал ElementInjector только для текущего компонента или директивы
@Component({
    selector: 'app-self-no-data',
    templateUrl: './self-no-data.component.html',
    styleUrls: ['./self-no-data.component.css'],
})
export class SelfNoDataComponent {
    constructor(
        @Self() @Optional() public leaf?: LeafService
    ) { }
}

//При использовании @SkipSelf(), Angular начинает поиск сервиса в родительском ElementInjector, а не в текущем
@Component({
    selector: 'app-skipself',
    templateUrl: './skipself.component.html',
    styleUrls: ['./skipself.component.css'],
    // Angular would ignore this LeafService instance
    providers: [
        { provide: LeafService, useValue: { emoji: '🍁' } },
    ],
})
export class SkipselfComponent {
    // Use @SkipSelf() in the constructor
    constructor(@SkipSelf() public leaf: LeafService) { }
}

//@Host() позволяет вам назначить компонент последней остановкой в дереве инжекторов при поиске провайдеров. Даже если есть экземпляр сервиса дальше по дереву, Angular не будет продолжать поиск
@Component({
    selector: 'app-host',
    templateUrl: './host.component.html',
    styleUrls: ['./host.component.css'],
    //  provide the service
    providers: [
        {
            provide: FlowerService,
            useValue: { emoji: '🌷' },
        },
    ],
})
export class HostComponent {
    // use @Host() in the constructor when injecting the service
    constructor(
        @Host() @Optional() public flower?: FlowerService
    ) { }
}

//Использование массива providers
@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css'],
    // provide services
    providers: [
        {
            provide: FlowerService,
            useValue: { emoji: '🌻' },
        },
    ],
    viewProviders: [
        {
            provide: AnimalService,
            useValue: { emoji: '🐶' },
        },
    ],
})
export class ChildComponent {
    // inject service
    constructor(
        public flower: FlowerService,
        public animal: AnimalService
    ) { }
}
/* 
<app-root @NgModule(AppModule)
         @Inject(AnimalService) animal=>"🐳">
  <#VIEW>
    <app-child>
      <#VIEW @Provide(AnimalService="🐶")
            @Inject(AnimalService=>"🐶")>
       <!-- ^^using viewProviders means AnimalService is available in <#VIEW>-->
       <p>Emoji from AnimalService: {{animal.emoji}} (🐶)</p>
      </#VIEW>
    </app-child>
  </#VIEW>
</app-root>
*/

//-------------------------------------
//-------------------------------------
//_______Гайды разработчика__________//

//standalone: true - автономные, не нужно объявлять в NgModule
@Component({
    standalone: true,
    selector: 'photo-gallery',
    // Существующий модуль импортируется непосредственно в отдельный компонент / //использовать другие компоненты, директивы или пайпы в шаблоне компонента
    imports: [ImageGridComponent],
    template: `
        ... <image-grid [images]="imageList"></image-grid>
    `,
})
export class PhotoGalleryComponent {
    // component logic
}

//импортировать отдельный компонент (или директиву, или пайп) точно так же, как и NgModule — используя NgModule.import
@NgModule({
    declarations: [AlbumComponent],
    exports: [AlbumComponent],
    imports: [PhotoGalleryComponent],
})
export class AlbumModule { }

//сервисы для использования во всем приложени
bootstrapApplication(PhotoAppComponent, {
    providers: [
        {
            provide: BACKEND_URL,
            useValue:
                'https://photoapp.looknongmodules.com/api',
        },
        provideRouter([
            /* app routes */
        ]),
        // ...
    ],
});

//Маршрутизация и ленивая загрузка
export const ROUTES: Route[] = [
    {
        path: 'admin',
        loadComponent: () =>
            import('./admin/panel.component').then(
                (mod) => mod.AdminPanelComponent
            ),
    },
    // ...
];

//Ленивая загрузка множества маршрутов одновременно
// In the main application:
export const ROUTES: Route[] = [
    {
        path: 'admin',
        loadChildren: () =>
            import('./admin/routes').then(
                (mod) => mod.ADMIN_ROUTES
            ),
    },
    // ...
];

// In admin/routes.ts:
export const ADMIN_ROUTES: Route[] = [
    { path: 'home', component: AdminHomeComponent },
    { path: 'users', component: AdminUsersComponent },
    // ...
];

//Предоставление услуг подмножеству маршрутов
export const ROUTES: Route[] = [
    {
        path: 'admin',
        providers: [
            AdminService,
            { provide: ADMIN_API_KEY, useValue: '12345' },
        ],
        children: [
            {
                path: 'users',
                component: AdminUsersComponent,
            },
            {
                path: 'teams',
                component: AdminTeamsComponent,
            },
        ],
    },
    // ... other application routes that don't
    //     have access to ADMIN_API_KEY or AdminService.
];

//---------------------
//__Angular Routing__//

//__Общие задачи маршрутизации
//Генерация приложения с включенной маршрутизацией
//ng new routing-app --routing --defaults

//Чтобы использовать маршрутизатор Angular, приложение должно иметь как минимум два компонента, чтобы можно было переходить от одного к другому

//_Определение базового маршрута
//Ниже приведен стандартный AppModule, использующий CLI с флагом --routing.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule, // устанавливает константу routes, в которой вы определяете свои маршруты
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

//__
const routes: Routes = [
    {
        path: 'first-component',
        component: FirstComponent,
    },
    {
        path: 'second-component',
        component: SecondComponent,
    },
]; // устанавливает константу routes, в которой вы определяете свои маршруты

// настраивает импорт и экспорт NgModule
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

//_Добавьте маршруты в приложение
//атрибут routerLink
//Далее обновите шаблон компонента, включив в него <router-outlet>
/* 
<h1>Angular Router App</h1>
<!-- This nav gives you links to click, which tells the router which route to use (defined in the routes constant in  AppRoutingModule) -->
<nav>
    <ul>
        <li>
            <a
                routerLink="/first-component"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >First Component</a
            >
        </li>
        <li>
            <a
                routerLink="/second-component"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >Second Component</a
            >
        </li>
    </ul>
</nav>
<!-- Маршрутизированные представления отображаются в <router-outlet>-->.
<router-outlet></router-outlet>
*/

//!!!Порядок маршрутов важен, поскольку Router использует стратегию выигрыша по первому совпадению при подборе маршрутов, поэтому более конкретные маршруты должны располагаться выше менее конкретных

//_Настройка маршрутов wildcard
//Маршрутизатор Angular выбирает этот маршрут каждый раз, когда запрашиваемый URL не соответствует ни одному пути маршрутизатора
//{ path: '**', component: <component-name> }
const routes: Routes = [
    { path: 'first-component', component: FirstComponent },
    {
        path: 'second-component',
        component: SecondComponent,
    },
    // Маршрут с диким знаком для страницы 404
    { path: '**', component: PageNotFoundComponent },
];

//_Настройка перенаправлений
const routes: Routes = [
    { path: 'first-component', component: FirstComponent },
    {
        path: 'second-component',
        component: SecondComponent,
    },
    {
        path: '',
        redirectTo: '/first-component',
        pathMatch: 'full',
    }, // перенаправление на `первый компонент`.
    { path: '**', component: PageNotFoundComponent },
];

//_Вложенные маршруты
//Здесь FirstComponent имеет свою собственную <nav> и второй <router-outlet> в дополнение к тому, который находится в AppComponent.
/* 
<h2>First Component</h2>

<nav>
    <ul>
        <li><a routerLink="child-a">Child A</a></li>
        <li><a routerLink="child-b">Child B</a></li>
    </ul>
</nav>

<router-outlet></router-outlet>
*/
const routes: Routes = [
    {
        path: 'first-component',
        // это компонент с <router-outlet> в шаблоне
        component: FirstComponent,
        children: [
            {
                // путь к дочернему маршруту
                path: 'child-a',
                // дочерний компонент маршрута, который отображает маршрутизатор
                component: ChildAComponent,
            },
            {
                path: 'child-b',
                // еще один дочерний компонент маршрута, который отображает маршрутизатор
                component: ChildBComponent,
            },
        ],
    },
];

//_Установка заголовка страницы
children: [
    {
        path: 'child-a',
        title: resolvedChildATitle, // <---
        component: ChildAComponent,
    },
    {
        path: 'child-b',
        title: 'child b', // <---
        component: ChildBComponent,
    },
]

//Использование относительных путей
/* 
<li>
    <a routerLink="../second-component"
            >Relative Route to second component</a
    >
</li>
*/

//_Указание относительного маршрута
goToItems() {
    this.router.navigate(['items'], { relativeTo: this.route });
}

//_Доступ к параметрам запроса и фрагментам
//доступа к части маршрута, например, к параметру запроса или фрагменту
hero$: Observable < Hero >;

constructor(
    private route: ActivatedRoute,
    private router: Router) { }

ngOnInit() {
    const heroId = this.route.snapshot.paramMap.get('id');
    this.hero$ = this.service.getHero(heroId);
}

gotoItems(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Передайте идентификатор героя, если он есть.
    // чтобы компонент HeroList мог выбрать этот элемент.
    this.router.navigate(['/heroes', { id: heroId }]);
}

//_Предотвращение несанкционированного доступа\
//ng generate guard your-guard
export const yourGuardFunction: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {

};
/* 
{
    path: '/your-path',
    component: YourComponent,
    canActivate: [yourGuardFunction],
}
*/

//_Массив параметров ссылки
/* 
<a [routerLink]="['/hero', hero.id]">
    <span class="badge">{{ hero.id }}</span>{{ hero.name }}
</a>
*/
//<a [routerLink]="['/crisis-center', 1]">Dragon Crisis</a> --- /crisis-center + :id

//_HTML5 URLs и <base href>
/* 
foo://example.com:8042/over/there?name=ferret#nose
\_/   \______________/\_________/ \_________/ \__/
 |           |            |            |        |
scheme    authority      path        query   fragment
*/

//-----------------------------------------------------
//__Создание пользовательских соответствий маршрута__//


