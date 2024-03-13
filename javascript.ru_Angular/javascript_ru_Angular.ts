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

// Сборка приложения
// ng build --prod: сборка приложения в режиме production.

// Кастомизация сборки
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

// Компонентный подход
// Использование суффиксов *.component.js для обозначения компонентов.
// Создание модулей, инкапсулирующих компоненты, директивы и сервисы.
// Экспорт сущностей из модулей для их использования в других частях приложения.

// Сущности Angular
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
ыы
// Дополнительные ресурсы
// Medium
// Telegram-канал "Гидра Angular"

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
//импортируем platformBrowserDynamic из пакета @angular/platform-browser-dynamic и AppModule из нашего собственного модуля приложения
//platformBrowserDynamic(): создает платформу для запуска приложения в браузере.
//bootstrapModule(AppModule): загружает и запускает главный модуль приложения (AppModule).
//catch(err => console.error(err)): перехватывает любые ошибки, возникшие при загрузке или запуске приложения, и выводит их в консоль.

//------------------------
//__Часть 2 Компоненты__//

// Интерполяция
// Процесс вычисления выражения и приведения его к примитивному типу (обычной строке). <p>Hello, {{ name }}!</p>
// Используется для отображения данных в шаблоне.
// При использовании интерполяции следует учитывать, что вычисление происходит постоянно, что может привести к снижению производительности.
// Для вычисления сложных выражений лучше использовать чистые пайпы или логику в TypeScript.

// Связывание данных
// Связывание данных позволяет синхронизировать данные между моделью и представлением.
// Целью связывания может служить атрибут, свойство или директива.
// Связывание атрибутов и свойств в тегах синхронизируется автоматически.
// Для доступа к свойствам через стиль можно использовать [style.width.px].
// Для вставки целого тега с содержимым можно использовать [innerHtml].

//В HTML атрибуты и свойства являются разными понятиями. Атрибуты используются для настройки элемента, а свойства - для доступа к его состоянию.
//В Angular атрибуты и свойства синхронизируются только в том случае, если они имеют одинаковое имя.
//<img [src]="imageUrl">
//Если имееться только атрибут то обращаемся к нему attr.src 

//Можно через [innerHtml] вставлять целый тэг с контентом
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

// Безопасность
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

// События
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

// Локальные ссылки
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

// Связывание и интерполяция
// Не следует путать связывание и интерполяцию.
// Интерполяцию следует использовать только для отображения простых данных.
// Для сложных данных следует использовать связывание.

// Двусторонняя и односторонняя связь
// Двусторонняя связь позволяет синхронизировать данные в обоих направлениях (из модели в представление и из представления в модель).
// Односторонняя связь позволяет синхронизировать данные только в одном направлении (из модели в представление).
// Для улучшения читабельности кода рекомендуется использовать одностороннюю связь.

//Использования публичных и непубличных свойств и методов
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

//Использования свойства readonly для сервиса
//Свойство readonly не может быть изменено после инициализации
@Injectable({
  providedIn: 'root'
})
export class MyService {
  readonly readonlyProperty = 'Readonly property';
}

//__Часть 3 компоненты (продолжения)__//
// Часть 3: Компоненты

// Необходимость древовидной структуры компонентов
// Компоненты организованы в древовидную структуру, где каждый компонент может содержать другие компоненты.
// Это позволяет создавать сложные пользовательские интерфейсы из более мелких и управляемых компонентов.

// Умные и тупые компоненты
// Умные компоненты содержат логику и состояние приложения.
// Тупые компоненты являются простыми оболочками, которые отображают данные и взаимодействуют с пользователем.

// Кастомные теги
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

// Переменные в компонентах
// Переменные в компонентах можно инициализировать значениями по умолчанию или использовать восклицательный знак (!) для указания того, что переменная не может быть null или undefined.
//@Input() message!: string;

// UI-киты
// UI-киты предоставляют готовые компоненты для создания пользовательских интерфейсов.
// Для использования UI-китов обычно требуется использовать их собственные сборщики.

// Общий модуль
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


//Все что принадлежит к компоненте должна лежать рядом с ним

// @ViewChild
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

// @Output и EventEmitter
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


// ng-content
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

// @ContentChild
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

// Жизненный цикл компонента
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

// Static в @ViewChild
// По умолчанию ссылки на элементы или компоненты, полученные с помощью @ViewChild, доступны после жизненного цикла AfterViewInit.
// Установка static: true делает ссылки доступными после жизненного цикла OnInit.

//__