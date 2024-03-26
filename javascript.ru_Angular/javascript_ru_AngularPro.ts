//--------------------
//__View / content__//
//View - это шаблон HTML, который определяет, как компонент будет отображаться в DOM. Он содержит HTML-элементы, атрибуты и привязку данных.
//Раньше View  хранила всю информацию о компоненте, сейчас также она может хранить некоторую информацию, такую как changeDetection

//Content - это динамический контент, который может быть вставлен в компонент извне. Он обычно используется для создания гибких и повторно используемых компонентов.
//<ng-content></ng-content> - передача контента
/* 

//Content запуститься раньше чем View, т.к если контента нету мы не можем и скомпелировать наше View

<!-- Родительский шаблон -->
<my-component>
  <!-- Содержимое, которое будет вставлено в компонент -->
  <h1>Привет из родительского компонента!</h1>
</my-component>
*/

@Component({
  selector: "app-item",
  template: `
    <p #h>
      VIEW
      <!-- <ng-content></ng-content> -->
    </p>
    <app-child appMy></app-child>
  `,
  styles: [],
})
export class ItemComponent implements OnInit, AfterViewInit, AfterContentInit {
  // @ContentChild() el
  // @ContentChildren()
  // @ViewChildren('', {} ) elements ?: QueryList<Element>

  //получаем в качестве селектора - по ссылке на шаблон ,по названию класса, по дерективе
  // @ViewChildren('h') elements ?: QueryList<Element>
  // @ViewChildren(ChildComponent) elements ?: QueryList<Element>
  // параметр static:true - будет доступен раньше чем AfterViewInit или ngAfterContentInit / в ngOnInit()

  //получили по селектору дерективы но дальше уже продолжаем работать с ChildComponent(<app-child>) по которой реализована деректива
  @ViewChildren(MyDirective, { read: ChildComponent })
  elements?: QueryList<ChildComponent>;

  //утечки памяти не будет при использовании @ViewChildren .. и т.д. они при разрушены компоненты будут отписаны и также удалены

  constructor() {}

  ngOnInit(): void {
    //console.log('ngOnInit')
  }

  ngAfterViewInit(): void {
    //console.log('ngAfterViewInit')
    console.log(this.elements?.toArray());
  }

  ngAfterContentInit(): void {
    //console.log('ngAfterContentInit')
  }
}

//
@Component({
  selector: "app-child",
  template: ` <p>child works!</p> `,
  styles: [],
})
export class ChildComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

//
import { Directive } from "@angular/core";

@Directive({
  selector: "[appMy]",
})
export class MyDirective {
  constructor() {}
}

//__Получать ссылку по сервис провайдеру { provide: , useExisting:  }__//
//Пример
//получить ответ от тех кто являеться животным

//_
@Component({
  selector: "app-root",
  template: `
    <app-animals>
      <!-- <cat #h></cat> .. -->
      <!--  <cat alink></cat> -->
      <cat></cat>
      <dog></dog>
      <rock></rock>
      <fox></fox>
      <p>just an element</p>
    </app-animals>
  `,
  styles: [],
})
export class AppComponent {}

//_
@Directive({
  selector: "[alink]",
})
export class LinkDirective {
  constructor() {}
}

//__
@Component({
  selector: "app-animals",
  template: `
    <ng-content></ng-content>

    <button (click)="say()">Say!</button>
  `,
})
export class AnimalsComponent {
  //можем всем поставить ссылку и обратиться по ссылке
  //плохо подеживать такой код т.к. надо постоянно не забывать добовлять ссылку в каждый элемент
  //@ContentChildren('h') animals: QueryList<Animal> = new QueryList();

  //также можем получить по дерективе / но мы не знаем в свойстве read что именно нам прочитать
  //@ContentChildren(LinkDirective,{read:?}) animals: QueryList<Animal> = new QueryList();

  //получаем по сервис провайдеру все элементы (лучший способ)
  //то есть у тех у элементов у которых есть provide: Animal мы обращаемся
  @ContentChildren(Animal) animals: QueryList<Animal> = new QueryList();

  //также можно и так совмещать с директивой
  @ContentChildren(LinkDirective, { read: Animal }) animals: QueryList<Animal> =
    new QueryList();

  say() {
    this.animals.forEach((animal) => console.log(animal));
    this.animals.forEach((animal) => animal.say());
  }
}

// 
@Component({
  selector: "cat",
  template: `
    <p>
      cat: <strong>{{ phrase }}</strong>
    </p>
  `,
  //есть сервис провайдер поэтому обращаемся к нему
  //useExisting возврощает тот же класс только под другим псевдонимам
  providers: [{ provide: Animal, useExisting: CatComponent }],
})
export class CatComponent extends Animal {
  phrase = "";

  say() {
    this.phrase = "meow";
  }
}

//
@Component({
  selector: "rock",
  template: ` <p>rock</p> `,
})
export class RockComponent {}

//можно использовать и абстрактные классы
export abstract class Animal {
  abstract say(): void;
}

//__export-as__//
//можем получать ссылку на контролер дерективы из вне и далее работать с этим контролером
@Directive({
  selector: "[colory]",
  exportAs: "colory",
})
export class ColoryDirective {
  @HostBinding("style.color") color = "red";

  public changeColor(color: string) {
    this.color = color;
  }
}

@Component({
  selector: "app-root",
  template: `
    <div colory #c="colory">TEXT</div>
    <button (click)="c.changeColor('green')"></button>
    <!-- <input (input)="c.changeColor((<EventTarget>$event.target).value)"> -->
  `,
  styles: [],
})
export class AppComponent {
  // @ViewChild(ColoryDirective) coloryDirective
  // coloryDirective.changeColor('green')
}

//__attribute-decorator__//
//__
//[title2]="title2" - то он становиться обновляемый
//title3="title3" - то он не создает никаких обновлений также становиться статичным
@Component({
  selector: "app-root",
  template: `
    <app-child title="title" [title2]="title2" title3="title3"></app-child>
  `,
  styles: [],
})
export class AppComponent {
  public title2 = "title2";

  constructor() {
    setTimeout(() => {
      console.log("change title2 property");
      this.title2 = "title2-changeProperty";
      console.log("setAttribute");
      document
        .querySelector("app-child")
        ?.setAttribute("title3", "title3-setAttribute");
    }, 3000);
  }
}

//__
@Component({
  selector: "app-child",
  template: ` <p>child works!</p> `,
  styles: [],
})
export class ChildComponent implements OnInit {
  @Input() title2?: string;
  @Input() title3?: string;


  //декоратор атрибут делает элемент статическим , дальше считываться не будет
  constructor(@Attribute("title") public title: string) {
    console.groupCollapsed("constructor");
    console.log("title", this.title);
    console.log("title2", this.title2);
    console.log("title3", this.title3);
    console.groupEnd();

    setInterval(() => {
      console.groupCollapsed("setInterval");
      console.log("title", this.title);
      console.log("title2", this.title2);
      console.log("title3", this.title3);
      console.groupEnd();
    }, 3000);
  }

  ngOnInit(): void {
    console.groupCollapsed("ngOnInit");
    console.log("title", this.title);
    console.log("title2", this.title2);
    console.log("title3", this.title3);
    console.groupEnd();
  }
}

//если хотим переиспользовать один компонент мы его заварачиваем в другой компонент который считаем ребенком и таким образом переиспользуем

//__structural-directive__//
//есть атрибут деректива
//также структурная деректива - которая изменяет DOM

//__
@Component({
  selector: "app-root",
  template: `
    <div *delay="1000; time: 2000; stop: 2000">Something</div>
    <div *delay="2000">Something</div>
    <div *delay="3000">Something</div>
  `,
  styles: [],
})
export class AppComponent {
  title = "structural-directive";
}

//кастомная деректива
@Directive({
  selector: "[delay]",
})
export class DelayDirective {
  @Input() delay?: number;
  @Input() delayTime?: number;
  @Input() delayStop?: number;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<Object>
  ) {}

  ngOnInit() {
    setTimeout(
      () => this.viewContainer.createEmbeddedView(this.templateRef),
      this.delay
    );
  }
}

//Простая форма с сокращенным синтаксисом
//без риализации контейнера ng-template
//<div *ngIf="condition">Content to render when condition is true.</div>

//Простая форма с расширенным синтаксисом
//с контейнером ng-template
//позволяет вешать более одной структурной дерективы стразу
//<ng-template [ngIf]="condition"><div>Content to render when condition is true.</div></ng-template>

//__dynamic-component__//
//__
@Component({
  selector: "app-banner",
  template: ` <p>banner2 works!</p> `,
  styles: [],
})
export class BannerComponent implements OnInit {
  @Input() data: []
  constructor() {}

  ngOnInit(): void {}
}

//__
@Component({
  selector: "app-root",
  template: `
    <!-- для глубых компонентов -->
    <ng-container *ngComponentOutlet="dynamicComponent"> </ng-container>

    <button (click)="load()">LOAD</button>
  `,
  styles: [],
})
export class AppComponent {
  dynamicComponent: any = null;

  constructor(
    viewContainer: ViewContainerRef,
    cfr: ComponentFactoryResolver,
    injector: Injector
  ) {
    // this.dynamicComponent
    // setTimeout(() => {
    //   this.dynamicComponent = Banner2Component
    // }, 3000);
    // setTimeout(() => {
    //   this.dynamicComponent = Banner3Component
    // }, 6000);

    //также можно через ссылку например на дерективу добавить в его контейнер элемент
    // @ViewChild( StrictualDirective) host
    // host.viewContainer

    //для более умных компонент
    //получаем фабрику создание компоненты
    // const BannerComponentFactory = cfr.resolveComponentFactory(BannerComponent);
    //дальше вставляем в наш контейнер баннер из фабрики
    // const bannerComponent = viewContainer.createComponent(BannerComponentFactory);
    //можем задать определенные параметры

    //передаем значения в свойство
    //bannerComponent.instance.data = []

    // удалить все из viewContainer
    // viewContainer.remove()
  }

  //подгружаем целый модуль
  async load() {
    const { BannerComponent } = await import("./banner/banner.component");
    this.dynamicComponent = BannerComponent;
  }
}

//__pipe__//
//если pure:false - постоянно делает изменения при каждом changedetection
//pipe - должны быть легкие

//----------------------
//__Angular-elements__//
//переиспользовать компоненты как виджеты типо стандартных элементов браузера
//компонент остаеться тот же но только добовляеться обертка angular-elements
//можем создавать сложную структуру с вложенностями
//внутри зоны не налаживаються друг на друга если использовать в другом angular приложении, angular-elements hf, работает как бы изолировано
//ng add angular/elements

//app.module.ts
import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";
import { HelloComponent } from "./hello/hello.component";

@NgModule({
  declarations: [HelloComponent],
  imports: [BrowserModule],
})
export class AppModule {
  ngDoBootstrap() {}

  constructor(injector: Injector) {
    //передаем компонент и injector
    const helloElement = createCustomElement(HelloComponent, { injector });
    //чтобы зарегестрировать элемент
    //кастомные идут с " - " в названии
    customElements.define("my-hello", helloElement);
  }
}

//hello.component.ts
@Component({
  selector: "app-hello",
  template: `
    <p (click)="clicked.emit(name)">hello, {{ name }}!</p>
    <!-- <ng-content></ng-content> -->
    <!-- чтобы правильно работала с вложенными элементами и не удаляла их используем slot -->
    <slot></slot>
  `,
  styles: [],
  //чтобы правильно работала с вложенными элементами и не удаляла их
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class HelloComponent implements OnInit, AfterViewInit {
  @Input() name?: string;
  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log("HelloComponent::ngAfterViewInit");
  }
}

//дальше можем работать с этим элементом как с обычным тэгам
//index.html
/* 
<my-hello name="Alice">
    Something is here!
  </my-hello>
*/
//дальше уже нативно работаем с ним
const el = document.querySelector("my-hello");
el.addEventListener("clicked", (event) => console.log(event.detail));
//el.innerHTML = 'Something else!'

setTimeout(() => {
  el.innerHTML = "Something else!";
}, 2000);

setTimeout(() => {
  const newHelloElement = document.createElement("my-hello");
  newHelloElement.setAttribute("name", "Mark");
  document.body.appendChild(newHelloElement);
}, 5000);

//когда компилируем (ng build) сворачиваем в один файл (плагины и скрипты)
//дальше подключаем по ссылке

//----------
//___DI___//
//Provider - определяем сервис провайдер
//Injector - получить зависемость, отвечает за создание объектов
//Dependancy - сама зависемость
//также есть регистр зависемостей

//Инжектор в Angular — это служба, которая отвечает за создание и предоставление зависимостей для компонентов и сервисов приложения. Он использует принцип инверсии управления (IoC), чтобы устранить жесткие зависимости между компонентами и их зависимостями
const myDependency = this.injector.get(MyDependency);
myDependency.doSomething();

const myDependency2 = this.create([MyDependency], injector);
//будут равны
myDependency2.get(MyDependency) === this.injector.get(MyDependency);

//Каждый компонент содержит свой инжектор
//Компонента ищет у себя потом идут вверх

//Если на уровне модуля регистрируем сервис он будет синглтоном
//Если на уровне дочернего он будет создавать новую сущность

//_провайдеры регистрируються с помощью token или рецепт

//token:
//string
//class
//injectionToken (можно указывать фабрику)

//рецепт:
// - useclass - обычный по умолчанию
// - useExiting - когда отдаем другую сущность на основании уже существующей , с ограничением и т.д.
//UserService | AdminService + admin methods
//{ provide: AdminService, useClass: AdminService} { provide: UserService, useExisting: AdminService} 
// - useFactory - функция использует на основания принятых сервисов отдавать новый сервис
// - useValue - обычные данные

//multu
//запишет коллекцию без перезаписи
//{ provide: AdminService, useExisting: AdminService, multi: true } 
//{ provide: VALIDATORS, useExisting: MyVALIDATOR, multi: true }

//__Как происходит инжектирование?
//Любой декоратор добовляет метаинформацию которые примениться к классу и инжектирует сущность

//@Injectable()
//для сервисов не было декоратора для инжектирование поэтому добовили специальный который принимает другие сущности

//__Декораторы инжекторов
//может ругулировать откуда в дереве мы будем брать провайдер
//@Optional() - если не определен не будет ошибки
//@Self() - в текущем искать компоненте
//@slipSelf()  - в глобальном искать
//@Host() - в  случае с компонентами работает как Self, с дерективой то у нее host может быть другой

@Component({
  selector: "app-sample",
  template: ` <app-child extra></app-child> `,
})
export class SampleComponent {}

@Component({
  selector: "app-child",
  template: `<p>Flower emoji: {{ flower?.emoji }}</p>`,
  // providers: [{ provide: FlowerService, useValue: { emoji: "🌼" } }],
})
export class ChildComponent {
  constructor(@Optional() @Self() public flower: FlowerService) {
    if (flower) {
    }
  }
}

//__provideIn
//Для оптимизации и облегчения билда
//он будет показывать использовать в сборке или нет оталкиваясь от импорта
//root - глобальный
//! если наш сервис используються в lazy модуле то тогда он будет инициализирован при загрузке этого модуля
@Injectable({
  providedIn: "root",
})
export class MyService {}
//any - если нужно переинициализировать cервис со своей сущностью отдельной, будет создаваться новый
@Injectable({
  providedIn: "any",
})
export class UserService {
  constructor(private data: any) {}

  // ...
}
//platform - оба приложения используют один и тот же сервис
@Injectable({
  providedIn: "platform",
})
export class MyService {}

//__ViewProviders
//Чтобы внутренний контент не смог получить доступ к провайдеру к текущему нашему элементу, чтобы не мог сломать логику и т.д.

//carousel.component.t
@Component({
  selector: "carousel",
  template: ` <button
      (click)="cursor = cursor - 1; update()"
      [disabled]="cursor - 1 < 0"
    >
      previous
    </button>
    <button
      (click)="cursor = cursor + 1; update()"
      [disabled]="cursor + 1 > nodes.length"
    >
      next
    </button>`,
  viewProviders: [InnerLogicService],
})
export class CarouselComponent implements AfterContentInit {
  private embeddedView?: ViewRef;
  public nodes: TemplateRef<HTMLElement>[] = [];
  public cursor = 0;

  @ContentChildren(CarouselItemDirective, { read: TemplateRef })
  elements: QueryList<TemplateRef<HTMLElement>> = new QueryList();

  constructor(
    private view: ViewContainerRef,
    private innerLogic: InnerLogicService
  ) {}

  ngAfterContentInit() {
    this.nodes = this.elements.toArray();
    setInterval(() => {
      this.cursor = (this.cursor + 1) % this.nodes.length;
      this.update();
    }, this.innerLogic.timer);
    console.log(this.innerLogic.timer);
  }

  update() {
    this.embeddedView && this.embeddedView.destroy();
    this.embeddedView = this.view.createEmbeddedView(this.nodes[this.cursor]);
  }
}

//inner-logic.service.ts
export class InnerLogicService {
  public timer = 3000;
}

//hacker.component.ts
//У хакера теперь нет доступа к сервису
@Component({
  selector: "hacker",
  template: `<div>😈</div>`,
  styles: [],
})
export class HackerComponent {
  constructor(@Optional() innerLogicService: InnerLogicService) {
    if (innerLogicService) {
      innerLogicService.timer = 100;
    }
  }
}

//app.component.ts
@Component({
  selector: "app-root",
  template: `
    <carousel>
      <div *carouselItem>🐌</div>
      <div *carouselItem>🦋</div>
      <div *carouselItem>🐝</div>
      <div *carouselItem>🐠</div>
      <div *carouselItem>🐢</div>
      <div *carouselItem>🦆</div>
      <hacker></hacker>
    </carousel>
  `,
})
export class AppComponent {}

//__router-animations
//анимация при переключении state routera
//заварачиваем router-outlet в обертку и уже на нее навешаем анимацию
@Component({
  selector: "app-root",
  template: `
    <app-nav-bar></app-nav-bar>
    <main [@myAnimation]="getRouterOutletState(o)">
      <router-outlet #o="outlet"></router-outlet>
    </main>
  `,
  styleUrls: ["./app.component.scss"],
  animations: [myAnimation3],
})
export class AppComponent {
  //передаем контролер роутера и когда стэйт меняеться мы включаем анимацию 
  public getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }
}

export const myAnimation3 = trigger("myAnimation", [
  transition("* <=> *", [
    query(":enter, :leave", style({ position: "fixed", width: "100%" }), {
      optional: true,
    }),
    group([
      // block executes in parallel
      query(
        ":enter",
        [
          style({ transform: "translateX(100%)" }),
          animate("0.5s ease-in-out", style({ transform: "translateX(0%)" })),
        ],
        { optional: true }
      ),
      query(
        ":leave",
        [
          style({ transform: "translateX(0%)" }),
          animate(
            "0.5s ease-in-out",
            style({ transform: "translateX(-100%)" })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

//__Preloading
//можем делать предзагрузку стратегии загруки
//также можем создать свою стратегию
//существет масса библитек для реализации стратегии

//mypreloading.service.ts
@Injectable({
  providedIn: "root",
})
export class MypreloadingService implements PreloadingStrategy {
  //load функция которая регулирует загрузку в зависемости от логики
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // return load();
    // return EMPTY;

    //получаем из роута data
    if (route?.data?.nopreload) {
      return EMPTY;
    }

    return of(true).pipe(
      delay(5000),
      switchMap((_) => load())
    );
  }
}

//app-routing.module.ts
const routes: Routes = [
  {
    path: "lazy",
    //передаем data
    data: {
      nopreload: true,
    },
    loadChildren: () => import("./lazy/lazy.module").then((m) => m.LazyModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: MypreloadingService }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}