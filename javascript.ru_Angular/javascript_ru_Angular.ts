//--------------
//__Введение__//
// RxJS: библиотека для реактивного программирования, реализующая паттерн ReactiveJS. Используется для работы с асинхронным кодом и управления потоками данных.
// NgRx: вариант работы с состоянием в Angular.
// Окружение и компонентный подход
// package.json: список зависимостей проекта.
// tsconfig.json: настройки компиляции TypeScript.
// karma.conf.js: конфигурация тестов.
// angular.json: конфигурация проекта Angular, включая окружение, стили и скрипты.
// polyfills.ts: добавление полифилов для поддержки старых версий браузеров.
// main.ts: точка входа в приложение, где выполняется загрузка главного модуля.

//__Сборка приложения
// ng build --prod: сборка приложения в режиме production.

//__Кастомизация сборки
// Использование кастомного билдера, например custom-webpack.
// Создание собственного файла конфигурации сборки (extra-webpack.config.js).
//extra-webpack.config.js
module.exports = {
  plugins: [
    // Ваш кастомный плагин или конфигурация
  ],
};
//angular.json
// "builder": "custom-webpack:dev-server",
// "options": {
//   "extraWebpackConfig": "extra-webpack.config.js"
// }
// В секции build мы указываем, что хотим использовать кастомный билдер custom-webpack:dev-server.
// В опции extraWebpackConfig мы указываем путь к нашему файлу конфигурации сборки extra-webpack.config.js.

//__Компонентный подход
// Использование суффиксов *.component.js для обозначения компонентов.
// Создание модулей, инкапсулирующих компоненты, директивы и сервисы.
// Экспорт сущностей из модулей для их использования в других частях приложения.

//__Сущности Angular
// - Модули: аналог модулей в ES6, инкапсулируют компоненты, директивы и сервисы -  являются аналогом модулей в ES6 и служат для инкапсуляции компонентов, директив, сервисов и других сущностей приложения
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

//CommonModule - это модуль, который экспортирует все общие директивы и пайпы, необходимые для работы в Angular. Он автоматически импортируется в BrowserModule, который, в свою очередь, импортируется в главный модуль приложения.
// - Директивы: расширяют возможности HTML, могут использоваться для добавления поведения или изменения внешнего вида элементов.
// - Пайпы: трансформируют данные перед их отображением в шаблоне.
// - Сервисы: предоставляют логику и данные для компонентов.

//__Дополнительные ресурсы
// Medium
// Telegram-канал "Гидра Angular"

//__platformBrowserDynamic
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
//импортируем platformBrowserDynamic из пакета @angular/platform-browser-dynamic и AppModule из нашего собственного модуля приложения
//platformBrowserDynamic(): создает платформу для запуска приложения в браузере.
//bootstrapModule(AppModule): загружает и запускает главный модуль приложения (AppModule).
//catch(err => console.error(err)): перехватывает любые ошибки, возникшие при загрузке или запуске приложения, и выводит их в консоль.

//------------------------
//__Часть 2 Компоненты__//

//__Интерполяция
// Процесс вычисления выражения и приведения его к примитивному типу (обычной строке). <p>Hello, {{ name }}!</p>
// Используется для отображения данных в шаблоне.
// При использовании интерполяции следует учитывать, что вычисление происходит постоянно, что может привести к снижению производительности.
// Для вычисления сложных выражений лучше использовать чистые пайпы или логику в TypeScript.

//__Связывание данных
// Связывание данных позволяет синхронизировать данные между моделью и представлением.
// Целью связывания может служить атрибут, свойство или директива.
// Связывание атрибутов и свойств в тегах синхронизируется автоматически.
// Для доступа к свойствам через стиль можно использовать [style.width.px].
// Для вставки целого тега с содержимым можно использовать [innerHtml].

//__В HTML атрибуты и свойства являются разными понятиями. Атрибуты используются для настройки элемента, а свойства - для доступа к его состоянию.
//В Angular атрибуты и свойства синхронизируются только в том случае, если они имеют одинаковое имя.
//<img [src]="imageUrl">
//Если имееться только атрибут то обращаемся к нему attr.src 

//__Можно через [innerHtml] вставлять целый тэг с контентом
//Использование [innerHtml] следует использовать с осторожностью, так как оно может привести к уязвимостям безопасности, если вставляемый HTML не является надежным.
// В компоненте
@Component({
  selector: 'app-root',
  template: `
    <div [innerHtml]="htmlContent"></div>
  `
})
export class AppComponent {
  htmlContent = '<p>Hello, world!</p>';
}

//__Безопасность
// Angular блокирует вставку стилей в строке кода для защиты от атак XSS.
// Для внедрения тега в HTML можно использовать сервис санитайзер.
//В этом примере мы используем сервис Sanitizer для обхода блокировки вставки стилей. Мы вызываем метод bypassSecurityTrustHtml(), чтобы пометить содержимое как безопасное для вставки.
//Использование сервиса Sanitizer следует использовать с осторожностью, так как оно может привести к уязвимостям безопасности, если вставляемый HTML не является надежным.
@Component({
  selector: 'app-root',
  template: `
    <div [innerHTML]="sanitizedStyleContent"></div>
  `
})
export class AppComponent {
  styleContent = '<style>p { color: red; }</style>';

  constructor(private sanitizer: Sanitizer) {}

  ngOnInit() {
    this.sanitizedStyleContent = this.sanitizer.bypassSecurityTrustHtml(this.styleContent);
  }
}

//__События
// События можно привязать к методам компонентов.
// Для передачи объекта события можно использовать зарезервированное слово $event.
//Пример передачи объекта события с помощью $event:
@Component({
  selector: 'app-root',
  template: `
    <button (click)="onClick($event)">Click me</button>
  `
})
export class AppComponent {
  onClick(event: Event) {
    console.log(event);
  }
}

//__Локальные ссылки
// Для получения локальной ссылки на тег или элемент можно использовать префикс #.
//Пример получения локальной ссылки на тег с помощью #:
@Component({
  selector: 'app-root',
  template: `
    <div #myDiv>Hello, world!</div>
  `
})
export class AppComponent {
  @ViewChild('myDiv') myDiv: ElementRef;

  ngAfterViewInit() {
    console.log(this.myDiv.nativeElement);
  }
}

//__Связывание и интерполяция
// Не следует путать связывание и интерполяцию.
// Интерполяцию следует использовать только для отображения простых данных.
// Для сложных данных следует использовать связывание.

// Двусторонняя и односторонняя связь
// Двусторонняя связь позволяет синхронизировать данные в обоих направлениях (из модели в представление и из представления в модель).
@Component({
  selector: 'app-my-component',
  template: `
    <input type="text" [(ngModel)]="name">
    <p>Привет, {{ name }}!</p>
  `
})
export class MyComponent {
  name: string = '';
}
// Односторонняя связь позволяет синхронизировать данные только в одном направлении (из модели в представление).
// Для улучшения читабельности кода рекомендуется использовать одностороннюю связь.

//__Использования публичных и непубличных свойств и методов
@Component({
  selector: 'app-root',
  template: `
    <p>{{ publicProperty }}</p>
    <button (click)="publicMethod()">Public method</button>
  `
})
export class AppComponent {
  public publicProperty = 'Public property';

  public publicMethod() {
    console.log('Public method called');
  }

  private privateProperty = 'Private property';

  private privateMethod() {
    console.log('Private method called');
  }
}
//Публичные свойства и методы доступны извне компонента, в то время как непубличные свойства и методы доступны только внутри компонента.

//__Использования свойства readonly для сервиса
//Свойство readonly не может быть изменено после инициализации
@Injectable({
  providedIn: 'root'
})
export class MyService {
  readonly readonlyProperty = 'Readonly property';
}

//__Для обработки отписки в Angular компонентах можно использовать паттерн "отписки от подписок" (unsubscribe pattern). Этот паттерн позволяет избежать утечек памяти, связанных с подписками на Observable и другие ресурсы.
@Component({
  template: ''
})
export class UnsubscribeComponent implements OnDestroy {
  //1 вариант
  // private subscriptions: Subscription[] - в ней будем храниить приходящие данные

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(subscription => subscription.unsubscribe());
  // }

  //2 вариант
  private unSubscriber$ = new Subject()

  ngOnDestroy(): void {
    this.unSubscriber$.next()
    // complete() для unSubscriber$, чтобы полностью завершить поток. Это освобождает все ресурсы, связанные с Subject
    this.unSubscriber$.complete()
  }
}
//
@Component({
  selector: 'app-my-component',
  template: `
    <p>This component will unsubscribe after 5 seconds.</p>
  `
})
export class MyComponent extends UnsubscribeComponent implements OnDestroy {

  ngOnInit() {
    // Создаем поток, который будет испускать значения каждые 1000 миллисекунд
    const interval$ = interval(1000);

    // Подписываемся на поток и отписываемся после 5 секунд
    interval$.pipe(
      takeUntil(this.unSubscriber$)
    ).subscribe(value => console.log(`Received value: ${value}`));
  }
}

//__Часть 3 компоненты (продолжения)__//
// Часть 3: Компоненты

//__Необходимость древовидной структуры компонентов
// Компоненты организованы в древовидную структуру, где каждый компонент может содержать другие компоненты.
// Это позволяет создавать сложные пользовательские интерфейсы из более мелких и управляемых компонентов.

//__Умные и тупые компоненты
// Умные компоненты содержат логику и состояние приложения.
// Тупые компоненты являются простыми оболочками, которые отображают данные и взаимодействуют с пользователем.

//__Кастомные теги
// Кастомные теги позволяют определять собственные HTML-элементы для использования в компонентах.
// Свойства кастомных тегов определяются в декораторе @Input().
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-child",
  template: `<p>{{ message }}</p>`,
})
export class ChildComponent {
  @Input() message: string;
}

//__Переменные в компонентах
// Переменные в компонентах можно инициализировать значениями по умолчанию или использовать восклицательный знак (!) для указания того, что переменная не может быть null или undefined.
//@Input() message!: string;

//__UI-киты
// UI-киты предоставляют готовые компоненты для создания пользовательских интерфейсов.
// Для использования UI-китов обычно требуется использовать их собственные сборщики.

//__Общий модуль
// Общий модуль содержит компоненты, директивы и сервисы, которые используются во всем приложении.
//shared.module.ts
@NgModule({
  imports: [CommonModule],
  declarations: [MySharedComponent, MySharedDirective],
  providers: [MySharedService],
  exports: [MySharedComponent, MySharedDirective],
})
export class SharedModule {}
//app.module.ts
@NgModule({
  imports: [BrowserModule, SharedModule],
  declarations: [AppComponent, MyOtherComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}


//__Все что принадлежит к компоненте должна лежать рядом с ним

//__@ViewChild
// @ViewChild используется для получения ссылки на элемент или компонент в шаблоне.
// Можно использовать @ViewChildren для получения ссылок на несколько элементов или компонентов.
@Component({
  selector: "app-my-component",
  template: `<p #myElement>Hello, world!</p>`,
})
export class MyComponent {
  @ViewChild("myElement") myElement: ElementRef;

  ngAfterViewInit() {
    console.log(this.myElement.nativeElement); // Выведет ссылку на элемент <p>
  }
}
//использования @ViewChildren
@Component({
  selector: "app-my-component",
  template: `<p *ngFor="let item of items" #myElement>Hello, world!</p>`,
})
export class MyComponent {
  @ViewChildren("myElement") myElements: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.myElements.forEach((element) => {
      console.log(element.nativeElement); // Выведет ссылку на каждый элемент <p>
    });
  }
}
// Для получения ссылки на конкретный экземпляр элемента или компонента можно использовать опцию read.
//Пример получения ссылки на элемент
@Component({
  selector: 'app-my-component',
  template: `<p #myElement>Hello, world!</p>`
})
export class MyComponent {
  @ViewChild('myElement', { read: ElementRef }) myElement: ElementRef;

  ngAfterViewInit() {
    console.log(this.myElement.nativeElement); // Выведет ссылку на элемент <p>
  }
}
//получения ссылки на контейнер представления
@Component({
  selector: "app-my-component",
  template: `<ng-container #myContainer></ng-container>`,
})
export class MyComponent {
  @ViewChild("myContainer", { read: ViewContainerRef })
  myContainer: ViewContainerRef;

  ngAfterViewInit() {
    console.log(this.myContainer); // Выведет ссылку на контейнер представления
  }
}
//использования свойства static
// свойство static: true, чтобы получить ссылку на элемент в методе жизненного цикла ngOnInit, который вызывается раньше, чем ngAfterViewInit.
@Component({
  selector: "app-my-component",
  template: `<p #myElement>Hello, world!</p>`,
})
export class MyComponent {
  @ViewChild("myElement", { static: true }) myElement: ElementRef;

  ngOnInit() {
    console.log(this.myElement.nativeElement); // Выведет ссылку на элемент <p>
  }
}

//__ @Output и EventEmitter
// @Output используется для создания события, которое можно выпустить из компонента.
// EventEmitter используется для выпуска событий.
// В родительском компоненте
@Component({
  selector: "app-parent",
  template: `<app-my-component (myEvent)="onEvent($event)"></app-my-component>`,
})
export class ParentComponent {
  onEvent(event: any) {
    console.log(event); // Выведет "Hello, world!"
  }
}
// В компоненте
@Component({
  selector: "app-my-component",
  template: `<button (click)="emitEvent()">Emit event</button>`,
})
export class MyComponent {
  @Output() myEvent = new EventEmitter();

  emitEvent() {
    this.myEvent.emit("Hello, world!");
  }
}
// Для отправки ссылок на элементы или компоненты в событиях необходимо установить static: true,используем свойство static: true в @ViewChild, чтобы получить ссылку на элемент в методе жизненного цикла ngOnInit, который вызывается раньше, чем ngAfterViewInit. Это необходимо, потому что мы хотим выпустить событие с ссылкой на элемент в методе emitEvent(), который вызывается в методе жизненного цикла ngOnInit.
@Component({
  selector: 'app-my-component',
  template: `<p #myElement>Hello, world!</p>`
})
export class MyComponent {
  @ViewChild('myElement', { static: true }) myElement: ElementRef;

  @Output() myEvent = new EventEmitter();

  emitEvent() {
    this.myEvent.emit(this.myElement.nativeElement);
  }
}
// В родительском компоненте
@Component({
  selector: 'app-parent',
  template: `<app-my-component (myEvent)="onEvent($event)"></app-my-component>`
})
export class ParentComponent {
  onEvent(element: any) {
    console.log(element); // Выведет ссылку на элемент <p>
  }
}
//Если ваш эмиттер отправляет асинхронное действие и вы хотите передать его с помощью EventEmitter, то вторым параметром при вызове emit нужно передать значение true. Это позволит выполнить асинхронную передачу события
import { EventEmitter } from "@angular/core";

// Создаем экземпляр эмиттера
const myEmitter = new EventEmitter();

// Вызываем эмиттер с асинхронным действием
setTimeout(() => {
  const asyncData = "Результат асинхронного действия";
  myEmitter.emit(asyncData, true); // Передаем вторым параметром true для асинхронной передачи
}, 2000);


//__ng-content
// ng-content позволяет проецировать контент в компонент.
// В родительском компоненте
@Component({
  selector: 'app-parent',
  template: `<app-child><p>Hello, world!</p></app-child>`
})
export class ParentComponent { }
// В дочернем компоненте
@Component({
  selector: "app-child",
  template: `<ng-content></ng-content>`, //будет проецироваться Hello, world!
})
export class ChildComponent {}
// ng-content select можно использовать для фильтрации контента, который будет проецироваться.
// В родительском компоненте
@Component({
  selector: 'app-parent',
  template: `<app-child><p>Hello, world!</p><span>Goodbye, world!</span></app-child>`
})
export class ParentComponent { }

// В дочернем компоненте
@Component({
  selector: 'app-child',
  template: `<ng-content select="p"></ng-content>`
})
export class ChildComponent { }
//В этом примере мы используем ng-content select для фильтрации контента, который будет проецироваться. В данном случае мы проецируем только элементы <p>, а элементы <span> будут отфильтрованы
//еще один пример
/* 
<app-zippy-multislot>
  <p question>
    Is content projection cool?
  </p>
  <p>Let's learn about content projection!</p>
</app-zippy-multislot>
*/
@Component({
  selector: "app-zippy-multislot",
  template: `
    <h2>Multi-slot content projection</h2>

    Default:
    <ng-content></ng-content>

    Question:
    <ng-content select="[question]"></ng-content>
  `,
})
export class ZippyMultislotComponent {}//Содержимое, использующее атрибут question, проецируется в элемент <ng-content> с атрибутом select=[question]

//__@ContentChild
// @ContentChild используется для получения ссылки на компонент, который проецируется в компонент.
// В родительском компоненте
@Component({
  selector: 'app-parent',
  template: `<app-child><p #myProjectedContent>Hello, world!</p></app-child>`
})
export class ParentComponent { }

// В дочернем компоненте
@Component({
  selector: 'app-child',
  template: `<ng-content></ng-content>`
})
export class ChildComponent {
  @ContentChild('myProjectedContent') myProjectedContent: ElementRef;
}
//В этом примере мы используем @ContentChild в дочернем компоненте ChildComponent для получения ссылки на элемент <p> с локальной ссылкой #myProjectedContent, который проецируется в дочерний компонент из родительского компонента ParentComponent.
//Если нам нужна ссылка на проецируемый компонент во время инициализации компонента, мы можем использовать свойство static: true.
@ContentChild('myProjectedContent', { static: true }) myProjectedContent: ElementRef;

//__Жизненный цикл компонента
// Конструктор: Вызывается при создании компонента.
// ngOnChanges: Вызывается при изменении входных свойств компонента.
// ngOnInit: Вызывается после инициализации компонента.
// DoCheck: Вызывается после каждого цикла обнаружения изменений.
// AfterViewInit: Вызывается после инициализации представления компонента.
// AfterContentInit: Вызывается после инициализации проецируемого контента.
// AfterViewChecked: Вызывается после проверки представления компонента.
// AfterContentChecked: Вызывается после проверки проецируемого контента.
// OnDestroy: Вызывается при уничтожении компонента.
@Component({
  selector: 'app-my-component',
  template: `<p>Hello, world!</p>`
})
export class MyComponent implements OnInit, OnDestroy, OnChanges, DoCheck, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked {

  //Сеттер @Input позволяет нам перехватить изменение свойства и выполнить дополнительную логику. 
  @Input()
  set myProperty(value: string) {
    this._myProperty = value;
    // Выполнить дополнительную логику при изменении свойства
  }

  constructor() {
    console.log('Constructor called');
    //Вызывается при создании компонента.
    //Используется для инициализации свойств и зависимостей компонента.
    // Мы не инициализируем свойства в конструкторе, потому что входные свойства компонента могут быть изменены после создания экземпляра компонента. Если мы инициализируем свойства в конструкторе, они будут иметь свои первоначальные значения, а не значения, переданные входными свойствами
    //Инициализация свойств в методе ngOnInit гарантирует, что они будут иметь правильные значения, переданные входными свойствами после ngOnChanges
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    // Вызывается при изменении входных свойств компонента.
    // Используется для реагирования на изменения входных свойств и обновления состояния компонента.
    if (changes['myProperty']) {
      console.log('myProperty changed from', changes['myProperty'].previousValue, 'to', changes['myProperty'].currentValue);
    }
  }

  ngOnInit() {
    console.log('ngOnInit called');
    // Вызывается после инициализации компонента.
    // Используется для выполнения любой необходимой инициализации, такой как получение данных или подписка на события.
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
    // Вызывается после каждого цикла обнаружения изменений.
    // Используется для выполнения дополнительных проверок изменений, которые не могут быть обнаружены стандартным механизмом обнаружения изменений.
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    //Вызывается после инициализации представления компонента.
    //Используется для выполнения любых операций, связанных с представлением, таких как получение ссылок на элементы или выполнение анимаций.
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
    // Вызывается после инициализации проецируемого контента.
    // Используется для выполнения любых операций, связанных с проецируемым контентом, таких как получение ссылок на проецируемые компоненты.
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
    // Вызывается после проверки представления компонента.
    // Используется для выполнения любых дополнительных проверок представления, которые не могут быть обнаружены стандартным механизмом проверки представления.
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
    // Вызывается после проверки проецируемого контента.
    // Используется для выполнения любых дополнительных проверок проецируемого контента, которые не могут быть обнаружены стандартным механизмом проверки проецируемого контента.
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
    // Вызывается при уничтожении компонента.
    // Используется для выполнения любой необходимой очистки, такой как отмена подписок на события или освобождение ресурсов.
  }
}

//__Static в @ViewChild
// По умолчанию ссылки на элементы или компоненты, полученные с помощью @ViewChild, доступны после жизненного цикла AfterViewInit.
// Установка static: true делает ссылки доступными после жизненного цикла OnInit.

//--------------------------------
//__Часть 4. Пайпы и директивы__//
//Директивы из Common Module не будут доступны в этом модуле по умолчанию. Вам необходимо вручную импортировать Common Module в свой модуль.Browser Module - это встроенный модуль Angular, который предоставляет функциональность, необходимую для работы приложения в браузер и включает Common Module

//__Директивы
// Директивы позволяют изменять поведение элементов и добавлять дополнительную функциональность в шаблоны.
// Директивы должны быть определены в модуле и экспортированы.
// Выделяют три типа директив:
// С собственным шаблоном, или по-другому компоненты (компоненты являются директивами);
// Структурные, которые изменяют структуру DOM-дерева;
// <div *ngIf="show">
//   Hello, world!
// </div>
// Атрибуты, которые изменяют внешний вид или поведение по умолчанию элемента DOM-дерева
// <p ngClass="{'text-red': isError}">
//   This is a paragraph.
// </p>
//ngClass

//__Структурные директивы
// Начинаются со звездочки (*).
// Изменяют структуру DOM, добавляя или удаляя элементы.
// Примеры: *ngIf, *ngSwitch, *ngFor.
// Директива *ngIf отображает первый блок только если переменная show имеет значение true.
// Директива *ngSwitch отображает разные блоки в зависимости от значения переменной color.
// Директива *ngFor отображает список элементов из массива items. В первом случае мы также выводим индекс элемента в списке.
// Контейнер ng-container используется для группировки элементов, не создавая дополнительного элемента DOM.

@Component({
  selector: 'app-my-component',
  template: `
    <div *ngIf="show">
      This is shown only if the 'show' property is true.
    </div>

    <div *ngSwitch="color">
      <div *ngCase="'red'">This is red.</div>
      <div *ngCase="'green'">This is green.</div>
      <div *ngCase="'blue'">This is blue.</div>
      <div *ngDefault>This is the default case.</div>
    </div>

    <ul>
      <li *ngFor="let item of items; index as i">
        {{ i + 1 }}. {{ item }}
      </li>
    </ul>

    <ng-container *ngFor="let item of items">
      <div>{{ item }}</div>
    </ng-container>
  `
})
export class MyComponent {
  show = true;
  color = 'red';
  items = ['Item 1', 'Item 2', 'Item 3'];
}
//Дополнительные параметры *ngFor
// index as i: Добавляет индекс текущего элемента в список в переменную i.
// trackBy: Указывает свойство элемента, которое будет использоваться для отслеживания изменений. Это повышает производительность, особенно для больших списков.
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <ul>
      <li *ngFor="let item of items; trackBy: trackByFn">
        {{ item }}
      </li>
    </ul>
  `
})
export class MyComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];

  trackByFn(index: number, item: string) {
    return item;
  }
}
//Директиву *ngFor также можно использовать для итерации по свойствам объекта.
/* 
<ng-container *ngFor="let key of object | keyvalue">
  <div>{{ key }}: {{ object[key] }}</div>
</ng-container>
*/

//__Атрибутивные директивы
// Применяются к атрибутам элементов.
// Изменяют поведение или внешний вид элемента.
// Примеры: ngClass, ngStyle.
//Директива ngClass позволяет динамически добавлять и удалять классы CSS из элемента. Она принимает объект, в котором ключи - это имена классов, а значения - логические выражения, определяющие, следует ли добавлять класс
// Директива ngStyle позволяет динамически применять стили CSS к элементу. Она принимает объект, в котором ключи - это имена стилей, а значения - значения стилей.
@Component({
  selector: 'app-my-component',
  template: `
    <p [ngClass]="{ 'text-red': isError, 'text-green': isSuccess }"
       [ngStyle]="{ 'color': 'red', 'font-size': '20px' }">
      This is a paragraph.
    </p>
  `
})
export class MyComponent {
  isError = false;
  isSuccess = true;
}

//__Pipe
//Проблема с использованием обычных функций для фильтрации данных в компонентах -Когда мы используем обычную функцию для фильтрации данных в компоненте, эта функция будет вызываться каждый раз, когда происходит изменение данных. Это может привести к проблемам с производительностью, особенно для больших наборов данных.Пайпы - это оптимизированные функции, которые используются для преобразования или фильтрации данных в шаблонах компонентов. Они вызываются только тогда, когда изменяются их входные данные
//Если входные данные пайпа не изменяются, пайп не будет вызываться повторно. Это означает, что пайпы очень эффективны для фильтрации данных, поскольку они не вызывают ненужных пересчетов
//В этом примере функция filterItems будет вызываться каждый раз, когда изменяется значение filterString. Это может привести к проблемам с производительностью, если массив items большой
@Component({
  selector: 'app-my-component',
  template: `
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
  `
})
export class MyComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];

  filterItems(filterString: string) {
    return this.items.filter(item => item.includes(filterString));
  }
}
//Теперь перепишем этот пример с использованием пайп
@Component({
  selector: 'app-my-component',
  template: `
    <input type="text" [(ngModel)]="filterString">
    <ul>
      <li *ngFor="let item of items | filter: filterString">{{ item }}</li>
    </ul>
  `
})
export class MyComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  filterString = '';
}
//FilterPipe будет вызываться только тогда, когда изменяется значение filterString. Это значительно повысит производительность, особенно для больших массивов
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string): any[] {
    if (!filterString) {
      return value;
    }

    return value.filter(item => item.includes(filterString));
  }
}
// Пайпы преобразуют данные в шаблоне.
// Определяются с помощью декоратора @Pipe.
// Примеры: json, async, date.
// Пайп json: Преобразует объект data в строку JSON.
// Пайп async: Подписывается на наблюдаемую asyncData и отображает ее значение, когда оно становится доступным. Отписываться от наблюдаемой не нужно, так как пайп async делает это автоматически.
// Пайп date: Форматирует объект date в строку с указанным форматом даты.
@Component({
  selector: 'app-my-component',
  template: `
    <p>{{ data | json }}</p>
    <p>{{ asyncData | async }}</p>
    <p>{{ date | date: 'dd/MM/yyyy' }}</p>
  `
})
export class MyComponent {
  data = { name: 'John Doe', age: 30 };
  asyncData = new Observable(observer => {
    setTimeout(() => {
      observer.next('Async data');
      observer.complete();
    }, 1000);
  });
  date = new Date();
}

//__Рекомендации
// - Использовать пайпы для преобразования данных: Пайпы хорошо оптимизированы и позволяют избежать ненужных пересчетов.
//Пример кастомного пайпа для фильтрации массива
//filter.pipe.ts
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string): any[] {
    if (!filterString) {
      return value;
    }

    return value.filter(item => item.includes(filterString));
  }
}
//использование
@Component({
  selector: 'app-my-component',
  template: `
    <input type="text" [(ngModel)]="filterString">
    <ul>
      <li *ngFor="let item of items | filter: filterString">{{ item }}</li>
    </ul>
  `
})
export class MyComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  filterString = '';
}
// - Разделять шаблоны на более мелкие части: Это улучшает читаемость и удобство обслуживания.
// -  Отключать инкапсуляцию классов: Это может быть необходимо, если директивы или компоненты используют атрибуты, которые инкапсулированы по умолчанию.
@Component({
  selector: 'app-my-component',
  template: `<p class="my-class">This is a paragraph.</p>`,
  encapsulation: ViewEncapsulation.None
})
export class MyComponent { }//означает, что классы CSS, определенные в компоненте, могут применяться к элементам за пределами компонента
// - Использовать функции в пайпах: Функции в пайпах не вызываются при каждом изменении, что повышает производительность.

//__Отписка от асинхронных подписок
// При использовании паттерна async отписка от асинхронных подписок не требуется.
// Однако, если есть возможность использовать паттерн async, лучше использовать его, чтобы избежать необходимости отписываться вручную.

//--------------------------------
//__Часть 5: Пайпы и директивы__//

//__Пайпы и RxJS
// Используйте RxJS для непрерывной обработки и преобразования данных.
// Используйте методы .pipe для фильтрации, преобразования и выделения нужных потоков данных.

//__Логика в контроллере
// Старайтесь размещать логику в контроллере, а не в шаблоне.

//__Пайпы
// Используйте декоратор pure: false в пайпах, которые необходимо постоянно пересчитывать.
// Обычно используйте чистые пайпы.
@Pipe({
  name: 'myPipe',
  pure: false
})
export class MyPipe implements PipeTransform {
  transform(value: any): any {
    // Логика преобразования, которая должна выполняться при каждом изменении входных данных
    return value;
  }
}
//В этом примере пайп MyPipe имеет pure: false, что означает, что он будет пересчитываться при каждом изменении входных данных. Это может быть полезно, если логика преобразования должна выполняться при каждом изменении, например, при отслеживании событий клика
@Component({
  selector: 'app-my-component',
  template: `
    <button (click)="onClick()">Click me</button>
    <p>{{ value | myPipe }}</p>
  `
})
export class MyComponent {
  value = 0;

  onClick() {
    this.value++;
  }
}

//__Flex-layout
// Используйте библиотеку Flex-layout для быстрого создания компоновки.
/* 
<div fxLayout="row" fxLayoutAlign="center">
  <div fxFlex="30%">Item 1</div>
  <div fxFlex="70%">Item 2</div>
</div>
*/

//__Кастомные структурные директивы
// Создавайте кастомные структурные директивы для повторного использования кода.
// Принимайте ссылку на элемент и контейнер в качестве параметров.
// Указывайте методы директивы в шаблоне с помощью as.
// Удаляйте контейнер в OnDestroy с помощью метода destroy.
@Directive({
  selector: '[myStructuralDirective]'
})
export class MyStructuralDirective implements OnInit, OnDestroy {

  @Input("myStructuralDirectiveFrom")  
  public rates:any = [] // Параметр "from" то слова после которого я хочу иметь значения

  @Input("myStructuralDirectiveAutoplay") 
  public set playAuto (mode:"off" | "on"){

  }

  public context:any

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.context = {
      //По умолчанию в контексте должны быть значения так работаю т все структурные директивы под капотом
      $implicit: this.rates[0],// значения контекста, которые мы можем передать и использовать в шаблоне
      controller:{
        next:() => this.next(),
        prev:() => this.prev()
      } // методы которые мы можем передать и использовать в шаблоне
    };
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  ngOnDestroy() {
    this.viewContainerRef.clear();
  }

  public next(){
    console.log('next');
  }

  public prev(){
    console.log('next');
  }
}
//app-component.ts
@Component({
  selector: 'app-my-component',
  template: `
    <div *myStructuralDirective="let rate from rates autoplay mode; controller as ctrl">
      <p>{{ rate.age }}</p>
      <p>{{ rate.name }}</p>
      <span (click) ="ctrl.next()">click</span>
    </div>
  `
})
export class MyComponent {
  rates = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Doe', age: 25 }
  ];

  mode:"off" | "on" = "off"
}

//__Директива hidden
// Создавайте директиву hidden с помощью @Directive и @HostBinding.
// Указывайте свойство, которое будет скрывать элемент в @HostBinding.
// Используйте @HostListener для обработки событий.
//Отписка происходит автоматический при разрушении компоненты к которой применена деректива
@Directive({
  selector: '[hidden]'
})
export class HiddenDirective implements OnInit, OnDestroy {

  //свойство к которому мы хотим обратиться и применяеться к ней определенное значения
  @HostBinding('style.display') 
  public visibility:"visible" | "hidden" = 'hidden'

  //также работать с событием и принимающем параметром $event(можно без) дальше работать с логикой
  //дополнительно также можно указывать событие и виндов, window.click
   @HostBinding('click',['$event']) 
   public onclick (event){
      console.log(event);
   }

  constructor() {}

}
// Получайте доступ к экземпляру директивы с помощью exportAs.Использование exportAs позволяет получить доступ к методам и свойствам директивы извне компонента, где она применяется
@Directive({
  selector: '[hidden]',
  exportAs: 'hiddenDirective' // Имя для экспорта директивы
})
export class HiddenDirective implements OnInit, OnDestroy {

  @HostBinding('style.display') 
  public visibility:"visible" | "hidden" = 'hidden'

   @HostBinding('click',['$event']) 
   public onclick (event){
      console.log(event);
   }

  constructor() {}

}
//app-component.ts
@Component({
  selector: 'app-my-component',
  template: `
    <div [hidden]="isHidden" #hiddenRef="hiddenDirective" (click)="hiddenRef.onClick($event)">Скрытый элемент</div>
  `
})
export class MyComponent {
  @ViewChild('hiddenRef') hiddenDirective!: HiddenDirective;

  isHidden = true;

  onClick(event: MouseEvent) {
    console.log('Кликнули на скрытом элементе', event);
  }
}

//---------------------------------------------------------------
//__Сервисы, работа с сетью и внедрение зависимостей. часть 1__//
//Наше приложения это древо компонент (огромный тэг состоящий из других тэгов)
//У компонента есть свои зависемости

//__Внедрение зависимостей (DI)
// DI позволяет компонентам получать необходимые зависимости извне.
// Angular использует инжектор для создания и управления зависимостями.

//__Регистрация сервисов
// Сервисы регистрируются в провайдерах.
// Регистрация идет от родителя к детям (базовый принцип разрешения зависимостей).
// Существует 4 способаы регистрации:
// providers: [{ provide: Service, useClass: ServiceClass }] - полный синтаксис

// 1) useClass - реализации указывается класс
@Component({
  providers: [
    { provide: MyService, useClass: MyServiceImpl }
  ]
})
export class MyComponent { }
// providers: [Service] - сокращенный синтаксис (при условии, что ключ и значение одинаковы)
@NgModule({
  providers: [
    MyService
  ]
})
export class MyModule { }

//2) useValue - конкретный экземпляр значения, которое может быть любым типом данных
roviders: [
  // число
  { provide: 'VALUE_NUMBER', useValue: 1  },
  // текст
  { provide: 'VALUE_STRING', useValue: 'Текстовое значение' },
  // функция
  { provide: 'VALUE2_FUNCTION', useValue: () => { return 'что-то' } },
  // объект
  { provide: 'VALUE2_OBJECT', useValue: { id: 1, name: 'имя' } },
  // массив
  { provide: 'VALUE2_ARRAY', useValue: [1, 2, 3] } ,
  // и т.д.
  /* Другие провайдеры */
]

// 3) useFactory - когда мы сами создаем свой конструктор и хотим сами определить как возвращать что-то, например по какому либо условию хотим возвращать либо один либо другую сущность, логика получения , можно использовать зависимости с массиве deps от чего будет оталкиваться наша логика
export interface ISettings
{
  /** URL к API для некоторого сервиса My */
  apiUrlMy: string;
} 

/** Токен конфигурации */
export const SETTINGS_TOKEN = new InjectionToken<Observable<ISettings>>('SETTINGS_TOKEN');
/** Токен для получения URL API */
export const API_URL_MY_TOKEN = new InjectionToken<Observable<string>>('API_URL_MY_TOKEN'); 

providers: [
  {
    provide: SETTINGS_TOKEN,

    useFactory: (http: HttpClient): Observable<ISettings> =>
      http
        .get<ISettings>('/assets/settings.json')
        .pipe(shareReplay()),
    deps: [HttpClient]
  },
  {
    provide: API_URL_MY_TOKEN,
    useFactory:
      (injector: Injector) =>
        injector.get(SETTINGS_TOKEN).pipe(map(s => s.apiUrlMy)),
    deps: [Injector] //< -- использовали другой сервис в нашей логике
  }, 
  /* Другие провайдеры */
]
//app-component.ts
@Component({
  selector: 'app-your-component',
  template: `
    <div>{{ apiUrlMy$ | async }}</div>
  `
})
export class YourComponent implements OnInit {
  apiUrlMy$: Observable<string>;

  constructor(private apiUrlMyToken: Observable<string>) {}

  ngOnInit(): void {
    this.apiUrlMy$ = this.apiUrlMyToken;
  }
}

//4) useExisting - выбирается уже существующая зависимость.То есть определить провайдер который был определен до этого, типо использовать по ключу другого класса,или использовать alias для более удобного имени,
providers: [
  { provide: 'CarService1', useClass: CarService},
  { provide: 'CarService2', useExisting: 'CarService1' }, // <_--CarService1 используем его
  /* Другие провайдеры */
]

//__Объявление зависимостей в компонентах
// Для объявления зависимостей в компонентах используются декораторы:
// @Inject(ключ) - полная запись с указанием ключа
// private service: Service - сокращенная запись (при использовании одинаковых ключа и значения в провайдере)
// @Optional() - делает зависимость необязательной (не выбросит ошибку, если зависимость не найдена)
// @Self() - ограничивает поиск зависимостью только текущим компонентом и root
// @Host() - то же самао что и @Self только далее заставляет Angular искать зависимость в компоненте-хосте
@Component({
  selector: 'app-example',
  template: '...',
  providers: [{ provide: MY_SERVICE_TOKEN, useClass: MyService }]
})
export class ExampleComponent {
  constructor(@Inject(MY_SERVICE_TOKEN) private myService: MyService) {
    // Использование myService
    //Angular будет искать провайдер, связанный с этим ключом в провайдерах компонента или его родительских компонентах.
  }
}

// сокращенной записи для инъекции зависимости
@Component({
  selector: 'app-example',
  template: '...',
  providers: [MyService]
})
export class ExampleComponent {
  constructor(private myService: MyService) {
    // Использование myService
  }
}

//@Optional для объявления необязательной зависимости (без ошибок)
@Component({
  selector: 'app-example',
  template: '...',
})
export class ExampleComponent {
  constructor(@Optional() private myService: MyService) {
    // Использование myService (может быть null, если зависимость не найдена)
  }
}

//@Self и @Host для ограничения области поиска зависимости
//В этом примере мы используем @Self для ограничения поиска зависимости MyService только внутри текущего компонента. Затем мы используем @Host для продолжения поиска зависимости в компоненте-хосте (родительском компоненте). Это может быть полезно, если у нас есть несколько экземпляров MyService в разных компонентах, и нам нужно явно указать, какой экземпляр использовать в нашем компоненте.
@Component({
  selector: 'app-example',
  template: '...',
  providers: [MyService]
})
export class ExampleComponent {
  constructor(@Self() private myService: MyService, @Host() private hostService: MyService) {
    // Использование myService и hostService (соответствующие зависимости)
  }
}

//__HttpClientModule
// Экспортирует сервис HttpClient для работы с HTTP-запросами.
@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('https://api.example.com/data');
  }
}

//__Использование декоратора @Injectable()
// Декоратор @Injectable() позволяет сервисам использовать другие зависимости.
@Injectable()
export class MyService {
  constructor(private otherService: MyOtherService) {
    // Использование otherService
  }
}

//__Окружения
// Значения окружения хранятся в файле environments.ts.
// можем сделать сервис получения url (providers:"baseUrl",useclass:enveroments.url)
// Для получения URL можно создать сервис, который будет использовать окружения:
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [
    { provide: 'baseUrl', useValue: 'https://api.example.com/' },
    UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

//_UrlService
@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(@Inject('baseUrl') private baseUrl: string) {}

  getUrl() {
    return this.baseUrl;
  }
}

//__Провайдеры с одинаковыми ключами
// При наличии нескольких провайдеров с одинаковыми ключами будет использоваться последний.
// Для получения массива зависимостей можно использовать флаг multi: true в провайдере,буду получать массив засемостей обоих сервисов. - дальше обращаемся к сервису url[0]
export const MY_TOKEN = new InjectionToken<string>('myToken');

@Injectable()
export class FirstService {
  constructor() {}
}

@Injectable()
export class SecondService {
  constructor() {}
}

@NgModule({
  providers: [
    { provide: MY_TOKEN, useClass: FirstService, multi: true },
    { provide: MY_TOKEN, useClass: SecondService, multi: true }
  ]
})
export class AppModule {}
// и обращаться к нужному элементу массива, например, MY_TOKEN[0]

//__Токены
// Токены используются в качестве ключей для зависимостей, чтобы избежать конфликтов.
// Для создания токенов используется класс InjectionToken.
interface AppConfig {
  apiUrl: string;
  apiKey: string;
}
const APP_CONFIG = new InjectionToken<AppConfig>('appConfig');

// Использование токена в провайдере
providers: [
  { provide: APP_CONFIG, useValue: { apiUrl: 'https://api.example.com', apiKey: '123456789' } }
]

//__Middleware (Interceptor)
// Interceptor - это класс, который перехватывает HTTP-запросы и ответы и может их модифицировать.
// Interceptor регистрируется в провайдерах с флагом multi: true при регистрации т.к пустой провайдер уже есть по умолчанию поэтому мы используем флаг.
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Добавляем заголовок 'Authorization' к каждому запросу
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer your_token_here'
      }
    });

    return next.handle(modifiedRequest).pipe(
      tap((event: HttpEvent<any>) => {
        // Обработка события
        if (event instanceof HttpResponse) {
          // Обработка успешного ответа
        }
      })
    );
  }
}
//AppModule
@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }
  ]
})
export class AppModule {}

//__Регистрация сервисов в корне приложения
// Для автоматической регистрации сервисов в корне приложения можно использовать @Injectable({ providedIn: 'root' }).
// Также существует опция 'platform', которая создает синглтон в рамках платформы браузера.

//---------------------------------------------------------------
//__Сервисы, работа с сетью и внедрение зависимостей. часть 2__//

//__Дополнения 
//Метод asObservable() используется для преобразования этих объектов в обычные Observable. Это полезно, когда вы хотите предоставить доступ только для чтения к источнику данных и предотвратить его изменение извне
import { Subject } from 'rxjs';

const subject = new Subject<number>();

const observable = subject.asObservable();

observable.subscribe(value => {
  console.log(value);
});

subject.next(1); // Значение 1 будет выведено в консоль
//после преобразования в Observable вы не сможете вызвать методы next(), error() или complete() из исходного Subject, так как Observable предоставляет только возможность подписки и чтения данных

//В большо проекте нам нужно стэйт машина так как если писать все на потоках данных можно запутаться и сложно подерживать такой код с принцами TRY и KISS

//__ Cервис был синглтоном и доступным для всех модулей
// Для того чтобы сервис был синглтоном и доступным для всех модулей в Angular, вы можете зарегистрировать его с помощью метода forRoot() в провайдере
import { Injectable } from '@angular/core';

@Injectable()
export class MyService {
  // ...
}

//Теперь сервис MyService будет доступен во всех модулях вашего приложения и будет являться синглтоном. Вы можете внедрять его в другие компоненты и сервисы, используя инжекцию зависимостей
@NgModule({
  imports: [HttpClientModule],
  declarations: [AppComponent],
})
export class MyModule {
  static forRoot(): ModuleWithProviders<MyModule> {
    return {
      ngModule: MyModule,
      providers: [MyService]
    };
  }
}

//!!!Обратите внимание, что только модули, которые импортируют MyModule.forRoot(), получат один и тот же экземпляр сервиса MyService. Другие модули, которые импортируют MyModule без использования forRoot(), получат отдельные экземпляры сервиса  в данном случае imports: [HttpClientModule] и declarations: [AppComponent] без providers: [MyService]
@NgModule({
  imports: [
    BrowserModule,
    MyModule.forRoot()
  ],
  declarations: [/* ... */],
  bootstrap: [/* ... */]
})
export class AppModule { }

//__ComponentFactoryResolver 
//ComponentFactoryResolver в Angular - это сервис, который используется для создания фабрик компонентов. Фабрика компонентов - это объект, который знает, как создать экземпляр компонента.
//ComponentFactoryResolver используется для динамического создания компонентов во время выполнения. Это может быть полезно в следующих случаях:
// Создание компонентов на основе данных, полученных с сервера.
// Создание компонентов, которые могут быть повторно использованы в разных частях приложения.
// Создание компонентов, которые могут быть настроены во время выполнения.
//Реализация модального окна с помощью сервиса, который передает компонент, а мы его используем и отрисовываем с помощью ComponentFactoryResolver в основном компоненте
//Создание сервиса модального окна
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector//Injector в Angular - это сервис, который используется для создания и управления зависимостями.
  ) { }

  open(component: any, data?: any) {
    return {
      component,
      data
    };
  }
}

//Модальный компонент
@Component({
  selector: 'app-modal',
  template: `<div>{{ data }}</div>`
})
export class ModalComponent {
  @Input() data: any;
}

@Component({
  selector: 'app-root',
  template: `<div #modalContainer></div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('modalContainer', { static: true }) modalContainer: ViewContainerRef;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    const modalData = this.modalService.open(ModalComponent);//также можно сразу предать компонент и констектс ModalComponent, { data: 'Hello, world!' }

    //также можно передать ,ленивый компонент - это компонент, который загружается только тогда, когда он необходим. Но нам нужно заимпортить либо модуль со всеми зависемостями либо standalone компоненту
    // const { ModalComponent } = await import('./modal/modal.component');
    // const modalData = this.modalService.open(ModalComponent, { data: 'Hello, world!' });

    //также можно использовать injector

    this.loadComponent(this.modalContainer, modalData.data);
  }

  loadComponent(viewContainerRef: ViewContainerRef, data: any) {
    // Эта строка создает фабрику компонентов для модального компонента.
    const componentFactory = this.resolver.resolveComponentFactory(ModalComponent);
    // Эта строка очищает контейнер модального окна от любых существующих компонентов
    viewContainerRef.clear();
    // Эта строка создает экземпляр модального компонента с помощью фабрики компонентов.Пока компонент голый
    const componentRef = viewContainerRef.createComponent(componentFactory);
    //Эта строка устанавливает свойство data экземпляра компонента на переданные данные. Свойство data используется для передачи данных в модальное окно, мы передаем по простому т.к в контролере(app-modal) только свойство data, если бы было множество элементов то надо было проходить циклом и т.д.
    componentRef.instance.data = data;
  }
}

//__Другая реализация ComponentFactoryResolver
@Injectable()
export class ModalService {
  #control$ = new Subject<IModalData | null>();

  public open(data: IModalData | null): void {
    this.#control$.next(data);
  }

  public close(): void {
    this.#control$.next(null);
  }

  public get modalSequence$(): Observable<any> {
    return this.#control$.asObservable();
  }
}

//app-product-car
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {

  @Input()
  public product!: IProduct;

  @Input()
  public isOdd!: boolean;

  constructor(
    private readonly modalService: ModalService,
    private store: Store<IState>
  ) {
  }

  public async addToCart(): Promise<void> {
    const {CardConfirmComponent} = await import('./card-confirm/card-confirm.component');
    this.modalService.open({
      component: CardConfirmComponent,
      context: {
        product: {...this.product},
        save: () => {
          this.store.dispatch(addProductToCart({product: this.product}));
          this.modalService.close();
        },
        close: () => {
          this.modalService.close();
        }
      }
    });
  }
}

//__
export interface IModalData {
  component: Type<any>;
  context: any;
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('modalContent', {read: ViewContainerRef})
  private modalContent!: ViewContainerRef;

  public isOpen = false;
  public content!: any;
  public componentFactory!: ComponentFactory<any>;
  public modalContentRef!: ComponentRef<any>;

  constructor(
    private readonly modalService: ModalService,
    private readonly cfr: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    this.modalService.modalSequence$.subscribe((data: IModalData | null) => {
      if (!data) {
        this.close();
        return;
      }
      const {component, context} = data;
      this.isOpen = true;

      this.componentFactory = this.cfr.resolveComponentFactory(component);
      this.modalContentRef = this.modalContent.createComponent(this.componentFactory);
/*
 context = {
   product: {},
   save: (_)={}.
   close: ()={}
 }
 */
      Object.keys(context)
        .forEach((key: string) => {
          this.modalContentRef.instance[key] = context[key];
        });

    });
  }

  @HostListener('window:keyup', ['$event.keyCode'])
  public close(code: number = 27): void {
    if (code !== 27) {
      return;
    }
    this.isOpen = false;
    if (this.modalContentRef) {
      this.modalContentRef.destroy();
    }
  }
}

//__Использование HostListener в компоненте над функцией
//HostListener - это декоратор, который позволяет прослушивать события, происходящие на хост-элементе компонента. Хост-элемент - это элемент DOM, который представляет компонент в шаблоне.
// Декоратор HostListener может использоваться только в методах компонента.
// Методы HostListener не могут быть асинхронными (т. е. они не могут использовать async или await
@HostListener('event', ['arguments'])
methodName(args: any[]) {
  // код метода
}
//event - это событие, которое нужно прослушивать (например, click, mouseenter, keydown).
//arguments - это необязательный массив аргументов, которые будут переданы в метод при срабатывании события.
@Component({
  selector: 'my-component',
  template: `<h1>My Component</h1>`
})
export class MyComponent {
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    console.log(`Component clicked at (${event.clientX}, ${event.clientY})!`);
  }
}

//

//-----------------
//__08. Роутинг__//
