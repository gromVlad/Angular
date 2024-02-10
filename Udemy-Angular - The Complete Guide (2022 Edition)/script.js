//позволяет создавать реактивные одностраничные приложения
//существовал angular1 а также angular 2 и далее его версии с 2 - по сегоднешнию
//версии обновляеться каждые полгода но она совметсима со старой версией
//осуществима разница в версиях на уровне 1 и 2 (2 - 17 ...)

//cli ставит высоко оптимизированную версию

//при подключений какой то фичи нам необходимо в angular подлючать конкретные модули (субпакеты)

//----------------------------
//__Базовая работа__//
//при загрузку получает скрипты которые подгружет потом на странице

//index.html
//<app-root></app-root>

//cтартовая точка приложения подлючаем все модули
//main.ts
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

//настройки модулей / подключения и т.д
//app.module.ts

//набор функциональных возможностей приложения
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//app.component.ts
//@класический декоратор внутри которого передаем объект с параметрами чтобы на выходе изменить класс
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // может бытьмножество стилей подключено поэтому в []
})
export class AppComponent {
  title = 'app';
}

/* 
app.component.html
//ngModel работает т.к подключили FormsModule 
<input type="text" [(ngModel)] ='title'>
<h1>{{title}}</h1> - значения инпутав title по умолчанию app

app.component.scss
...
*/

//___Создание компонент__//

//можно создавать компоненту через терминал спец команда ng generate component .../ng g c ...

//можно сразу писать разметку в template- плохая практика
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>hello<h1/>
  `,
  styles: [
    `
    .title{}
  `
  ],
  imports: [Test1Module],
})
export class AppComponent {
  title = 'app';
}

//___мы можем также добовляь и создавать компоненты как атрибуты и стили но лучше это не использовать
@Component({
  //selector: `[app-root]`,
  //selector: '.app-root',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // может бытьмножество стилей подключено поэтому в []
})
export class AppComponent {
  title = 'app';
}
/* 
app.component.html
<div app-root></div>
<div class='app-root'></div>
<app-root></app-root> 
*/

//___привязка данных
//{{..}} - просто переменную
//[...] = '..' - атрибут
//(...) = " " событие
//(ngModel) = '..' - реагирует сразу в двух напрвлениях

//___строкавая интерполяция
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  userId: number = 10
  error: boolean = true

  getHello() {
    return 'hello!!!'
  }
}
//<p>server works!</p>
//<p>{{userId}} , error - {{error}}, {{getHello()}}</p> 
// >> 10 , error - true, hello!!!

//___динамический привязать некоторые свойства к атрибуту
//server.component.ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  isclick: boolean = true

  constructor() {
    setTimeout(() => {
      this.isclick = false
    }, 3000);
  }
}
//server.component.html
//<button [disabled] = "!isclick" > click</button >
//<p [innerText] ='isclick'></p> - то же самое что и {{}} только добовляем значение через свойства

//___взаимодействия с событиями клик и т.д...
//server.component.ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  isServer: string = 'not server'
  whatThisInput: string = ''

  setServer() {
    this.isServer = 'server add!!!'
  }

  setInput(event: any) {
    this.whatThisInput = event.target.value
  }
}
//server.component.html
/* 
<p>{{isServer}}</p>
<button (click) = 'setServer()'>click</button>

<p>{{whatThisInput}}</p>
<input type="text" (input) ='setInput($event)'> - > $ - дает доступ к данным по этому событию
*/

//___двухсторонняя привязка
//типо как мы связали выше input только без функции и событий через определенный модуль
//server.component.ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  whatThisInput: string = ''

}
//server.component.html
//<p>{{whatThisInput}}</p>
//<input type="text" [(ngModel)] = "whatThisInput" >

//___упражнение
//сделать input с привязкой и внизу кнопку очистки данных
//очитска если input не пустой
//server.component.ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  whatThisInput: string = ''
}
//server.component.html
//<p>{{whatThisInput}}</p>
//<input type="text" [(ngModel)] = "whatThisInput" >
//<button [disabled] = 'whatThisInput === ""' (click) = 'whatThisInput = ""' > Click</button >

//___Дериктивы
//добовляються как отрибуты обычно в тэги (но также можно создовать как компоненты)
//типо как декораторы берем добовляем в тэг этот атрибут сделанный и получаем видоизмененный тэг

//_структурная деректива *ngIf - если true то покажет тэг если нет то не покажет / выполняет проверку между ковычками может быть переменная а может быть событие
//<h2 *ngIf="whatThisInput">Hello</h2> ->>> Hello

//_также если нам нужно не только if но else
//elseNotvalue - придуманное название дерективый / ng-template в них обязательно
//<h2 * ngIf="whatThisInput; else elseNotvalue" > Hello</h2 >
//<ng-template #elseNotvalue>Not value</ng-template>

//_изменение динамический стилей - деректива ngStyle / пишем в [] т.к. ей приравниваем какие то свойства не путать с атрибутам
//server.component.ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  isOnline: string = 'online'

  constructor() {
    this.isOnline = Math.random() > 0.5 ? "online" : "offline"
  }

  setColor() {
    return this.isOnline === 'online' ? 'blue' : 'red'
  }
}
//server.component.html
//<h2 [ngStyle] = "{color: setColor()}" > what online!!!!</h2 >

//_ngClass почти то же самое что и с классом только передаем сам класс в качесте ключа и значения true или false
//<h2 [ngClass] = "{online:isOnline === 'online'}" > what online!!!!</h2 >

//_деректива for добовляем как через цикл компоненты
//server.component.ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  isOnline: number = 0
  isArray = [0.5, 0.6, 0.8]


  constructor() {
    this.isOnline = Math.random()
  }

  pushArray() {
    this.isArray.push(Math.random());
  }
}
//server.component.html
//<button (click) = "pushArray()" > Click</button >
//item - дальше можем использовать в дерективах в шаблонный строках и т.д. / let i = index - получить индекс
//<div [ngStyle]="{'background-color': 'red', 'width': '20px', 'height': '15px'}" *ngFor="let item of isArray; let i = index">{{i}} : {{item}}</div>

//__coздаем модуль
//на основе его будет строить другие компоненты
//recipe.model.ts
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
  }
}
//recipe-list.component.ts
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
  ];
  constructor() { }
}
//recipe-list.component.html
/* 
    <a
      href="#"
      class="list-group-item clearfix"
      *ngFor="let recipe of recipes">
      <div class="pull-left">
        <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
        <p class="list-group-item-text">{{ recipe.description }}</p>
      </div>
      <span class="pull-right">
        <img
          [src]="recipe.imagePath"
          alt="{{ recipe.name }}"
          class="img-responsive"
          style="max-height: 50px;">
      </span>
    </a>
*/

//-------------------------------------------------------
//___Передача свойств от компоненты другой компоненте__//
//По умолчанию свойства компонента принадлежит только ему а ивне недоступно
//с помощью декоратора открываем доступ к свойствам извне
//Также работает и с событиями с помощью специального метода new EventEmmiter() и декоратора
//передача по цепочки не самый лучший вариант если компоненты далеки друг от друга
//angular делает инкапсуляцию стилей чтобы они не перебивали друг друга добовляя в тег специальный атрибут самостоятельно ,можно отключить инкапсуляцию или добавить режим по умолчанию только с совместимыми браузерами который подерживает теневой DOM
//получить ссылку на элемент при связывании в тэге делаем ссылку #... а дальше при клике передаем эту ссылку получая тем самым весль наш элемент с его атрибутами значением и т.д, только не перезаписывать данные с помощью  ref и ссылок только получать, напрямую лучше не изменять DOM
//чтобы не передовать через длинную цепочку можем сразу получить доступ в html файле к компоненту добавив <ng-content> это как бы крючок который связывает наши данные
//Также существют хуки жизненные циклы:
/* 
gOnChange()
Выполняется много раз при изменении компоненты.
Используется для реагирования на изменения входных свойств компоненты.
Например, если у компоненты есть входное свойство name, метод gOnChange() будет вызван каждый раз, когда значение свойства name изменяется.

ngOnInit()
Выполняется после инициализации компоненты (запущен после конструктора).
Используется для инициализации компоненты и ее свойств.
Например, метод ngOnInit() можно использовать для загрузки данных из сервера или для установки начального состояния компоненты.

ngDoCheck()
Запускается каждый раз при изменении.
Используется для обнаружения изменений в компоненте и ее свойствах.
Например, метод ngDoCheck() можно использовать для обновления пользовательского интерфейса компоненты в соответствии с изменениями в ее свойствах.

ngAfterContentInit()
Вызывается после того, как родительская компонента инициализирована, в частности, та часть, где находится наша компонента.
Используется для инициализации компоненты и ее свойств, которые зависят от родительской компоненты.
Например, метод ngAfterContentInit() можно использовать для доступа к свойствам родительской компоненты или для подписки на события, генерируемые родительской компонентой.

ngAfterContentChecked()
Обнаружение изменений.
Используется для обнаружения изменений в компоненте и ее свойствах, которые зависят от родительской компоненты.
Например, метод ngAfterContentChecked() можно использовать для обновления пользовательского интерфейса компоненты в соответствии с изменениями в свойствах родительской компоненты.

ngAfterViewInit()
После завершения и инициализации нашего компонента, как только отрендерит компонент.
Используется для инициализации компоненты и ее свойств, которые зависят от представления компонента.
Например, метод ngAfterViewInit() можно использовать для доступа к элементам DOM компонента или для подписки на события, генерируемые элементами DOM компонента.

ngAfterViewChecked()
Всякий раз когда наш вид будет проверен.
Используется для обнаружения изменений в компоненте и ее свойствах, которые зависят от представления компонента.
Например, метод ngAfterViewChecked() можно использовать для обновления пользовательского интерфейса компоненты в соответствии с изменениями в элементах DOM компонента.

ngOnDestroy()
Удаляется компонента, работа по очистке.
Используется для очистки ресурсов, которые были выделены компонентой.
Например, метод ngOnDestroy() можно использовать для отмены подписок на события или для освобождения памяти, которая была выделена компонентой.
*/

//app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{ type: 'server', name: 'Testserver', content: 'Just a test!' }];

  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }
}
//app.component.html
/* 
<div class="container">
  <app-cockpit
    (serverCreated)="onServerAdded($event)"
    (bpCreated)="onBlueprintAdded($event)"
  ></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onChangeFirst()">Change first Element</button>
      <button class="btn btn-danger" (click)="onDestroyFirst()">Destroy first Component</button>
      <app-server-element
        *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement"
        [name]="serverElement.name">
        <p #contentParagraph>
          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
          <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
        </p>
      </app-server-element>
    </div>
  </div>
</div>
*/

//server-element /server-element.component.ts
@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input('srvElement') element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  constructor() {
    console.log('constructor called!');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ngOnInit called!');
    console.log('Text Content: ' + this.header.nativeElement.textContent);
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called!');
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called!');
    console.log('Text Content: ' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called!');
  }

}
//server-element.component.html
/* 
<div
  class="panel panel-default">
  <!--<div class="panel-heading">{{ element.name }}</div>-->
  <div class="panel-heading" #heading>{{ name }}</div>
  <div class="panel-body">
    <ng-content></ng-content>
  </div>
</div>
*/

//server/server.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  isOnline: number = 0
  isArray = [0.5, 0.6, 0.8]


  constructor() {
    this.isOnline = Math.random()
  }

  pushArray() {
    this.isArray.push(Math.random());
  }
}
//server.component.html
/* 
<button (click)="pushArray()">Click</button>
<div [ngStyle]="{'background-color': 'red', 'width': '20px', 'height': '15px'}" *ngFor="let item of isArray; let i = index">{{i}} : {{item}}</div>
*/

//cockpit/cockpit.component.ts
@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter < { serverName: string, serverContent: string } > ();
  @Output('bpCreated') blueprintCreated = new EventEmitter < { serverName: string, serverContent: string } > ();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', { static: false }) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      //2 способа получения ссылки и ref элемента
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

}
//cockpit.component.html
/* 
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <!--<input type="text" class="form-control" [(ngModel)]="newServerName">-->
    <input
      type="text"
      class="form-control"
      #serverNameInput  cсылка>
    <label>Server Content</label>
    <!--<input type="text" class="form-control" [(ngModel)]="newServerContent">-->
    <input
      type="text"
      class="form-control"
      #serverContentInput>
    <br>
    <button
      class="btn btn-primary"
      (click)="onAddServer(serverNameInput) - передаем ее">Add Server</button>
    <button
      class="btn btn-primary"
      (click)="onAddBlueprint(serverNameInput)">Add Server Blueprint</button>
  </div>
</div>
*/

//__базовая работа с формой
//с помощью ref сохроняем данные а далее опрокидываем выше в родительскую компоненту

//shopping-edit.component.ts
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter < Ingredient > ();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredientAdded.emit(newIngredient);
  }

}
//shopping-edit.component.html
/* 
<div class="row">
  <div class="col-xs-12">
    <form>
      <div class="row">
        <div class="col-sm-5 form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            class="form-control"
            #nameInput>
        </div>
        <div class="col-sm-2 form-group">
          <label for="amount">Amount</label>
          <input
            type="number"
            id="amount"
            class="form-control"
            #amountInput>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button class="btn btn-success" type="submit" (click)="onAddItem()">Add</button>
          <button class="btn btn-danger" type="button">Delete</button>
          <button class="btn btn-primary" type="button">Clear</button>
        </div>
      </div>
    </form>
  </div>
</div>
*/

//shopping-list.component.ts
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  ngOnInit() {
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
//shopping-list.component.html
/* 
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit
      (ingredientAdded)="onIngredientAdded($event)"></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a
        class="list-group-item"
        style="cursor: pointer"
        *ngFor="let ingredient of ingredients"
      >
        {{ ingredient.name }} ({{ ingredient.amount }})
      </a>
    </ul>
  </div>
</div>
*/

//-------------------------
//__Дериктивы__//
//могут идти с коробки можем создавать свои
//есть дериктивы структурные и локальные на тэге или элементе
//angular сначало проверяет наши дерективы а после уже идет к родным стилям и свойствам
//* -указывает что это структурная деректива

//создаем свою дериктиву базовый уровень - меняем стили сразу напрямую так делать не рекомендуеться
//basic - highlight.directive.ts
@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}

//правильная работа со своей дерективой
//better - highlight.directive.ts
@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  //можем вводить разные данные для правильной конфигурации
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';

  //использовать вместо модуля Renderer2
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;

    //Renderer2 - можно использовать модуль
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

  //взаимодействия с определенными событиями
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }

}

//создаем свою структурную дириктиву
//unless.directive.ts
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  //ViewContainerRef  - вид элемента в контейнере
  //TemplateRef - cам элемент
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}

//app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // numbers = [1, 2, 3, 4, 5];
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd = false;
  value = 5;
}
//app.component.html
/* 
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button
        class="btn btn-primary"
        (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li
            class="list-group-item"
            [ngClass]="{odd: odd % 2 !== 0}"
            [ngStyle]="{backgroundColor: odd % 2 !== 0 ? 'yellow' : 'transparent'}"
            *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
        </div>
        <!--<div *ngIf="!onlyOdd">-->
          <!--<li-->
            <!--class="list-group-item"-->
            <!--[ngClass]="{odd: even % 2 !== 0}"-->
            <!--[ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"-->
            <!--*ngFor="let even of evenNumbers">-->
            <!--{{ even }}-->
          <!--</li>-->
        <!--</div>-->

        <!-- если не использовать * по умолчанию надо добовлять  ng-template при добовлении используем обычный div-->
        <!--<ng-template [ngIf]="!onlyOdd">-->
          <!--<div>-->
            <!--<li-->
              <!--class="list-group-item"-->
              <!--[ngClass]="{odd: even % 2 !== 0}"-->
              <!--[ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"-->
              <!--*ngFor="let even of evenNumbers">-->
              <!--{{ even }}-->
            <!--</li>-->
          <!--</div>-->
        <!--</ng-template>-->

        <!-- структурная деректива -->
        <div *appUnless="onlyOdd">
          <li
            class="list-group-item"
            [ngClass]="{odd: even % 2 !== 0}"
            [ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"
            *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
      </ul>

      <p appBasicHighlight>Style me with basic directive!</p>
      <p [appBetterHighlight]="'red'" defaultColor="yellow">Style me with a better directive!</p>

      <!-- использование switch -->
      <div [ngSwitch]="value">
        <p *ngSwitchCase="5">Value is 5</p>
        <p *ngSwitchCase="10">Value is 10</p>
        <p *ngSwitchCase="100">Value is 100</p>
        <p *ngSwitchDefault>Value is Default</p>
      </div>
    </div>
  </div>
</div>
*/

//dropdown.directive.ts
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
/* 
<div class="col-xs-12">
    <div
      class="btn-group"
      appDropdown>
      <button
        type="button"
        class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#">To Shopping List</a></li>
        <li><a href="#">Edit Recipe</a></li>
        <li><a href="#">Delete Recipe</a></li>
      </ul>
    </div>
  </div>
*/

//----------------------
//__Сервис(store)___//
//чтобы не грамоздить бесконечное число цепочек
//помогают придерживаться DRY кода
//можно использовать где хотим
//сервисы наследуеться от высоко уровня к низкому и если хотим использовать один и тот же сервис то добовлять provider каждый раз сервис в каждый элемент не неадо надо добавить в главный компонент а дальше дети родительского компонента будут наследовать этот сервис

//logging.service.ts
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}

//accounts.service.ts
@Injectable()//прослушиваем все другие сервисы
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  //также наследовали EventEmitter
  statusUpdated = new EventEmitter < string > ();

  constructor(private loggingService: LoggingService) { }

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}

//подлючаем на вершину всех компонент и далее распростроняем по всему приложению
//app.module.ts
@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [AccountsService, LoggingService], // подлючили
  bootstrap: [AppComponent]
})
export class AppModule { }

//app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  //providers: [AccountsService, LoggingService] - не надо везде добовлять так как наследуеться от родительской компоненты а мы поместили сервисы на вершину приложения
})
export class AppComponent implements OnInit {
  accounts: { name: string, status: string }[] = [];

  //получаем сервис и далее используем
  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
}

//../new-account.component.ts
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService,
    private accountsService: AccountsService) {

    //пример подписки из EventEmitter / уведомления о изменениях
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}

//____
import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
  //используем new EventEmitter чтобы подписываться на измнения
  //чтобы происходила перерисовка и изменения данных
  ingredientsChanged = new EventEmitter < Ingredient[] > ();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}

//___
@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    //подписались на изменения(new EventEmitter) и получаем данные
    this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
}

//---------------------------------
//---------------------------------
//__Changing Pages with Routing__//

//------------------------------------
//___Setting up and Loading Routes__//
//__Navigating with Router Links__//

// Импорт необходимых модулей
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Создание константы с маршрутами
const appRoutes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'servers', component: ServersComponent },
  { path: '', component: HomeComponent } // Маршрут по умолчанию
];

// Компонент приложения
@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li><a [routerLink]="['/users']">Users</a></li>
      <li><a [routerLink]="['/servers']">Servers</a></li>
    </ul>

    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}

// Регистрация маршрутов в модуле приложения
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) // Регистрация маршрутов с помощью метода forRoot()
  ],
  declarations: [
    AppComponent,
    UsersComponent,
    ServersComponent,
    HomeComponent
  ]
})
export class AppModule { }

//------------------------------------
//__Understanding Navigation Paths__//
//Относительный путь — это путь к файлу относительно текущего каталога
//Абсолютный путь всегда начинается с корневого каталога файловой системы
//относительные пути с "./" в начале, что эквивалентно отсутствию слэша, или использовать "../", чтобы перейти на один уровень выше и добавить путь.

//---------------------------------
//__Styling Active Router Links__//
// В этом коде мы добавили директиву routerLinkActive к каждому элементу li. Директива routerLinkActive принимает значение active в качестве аргумента, что означает, что она будет добавлять класс active к элементу li, когда соответствующий маршрут активен.
// Мы также добавили объект опций routerLinkActiveOptions к директиве routerLinkActive. Объект опций routerLinkActiveOptions содержит свойство exact, которое мы установили в значение true. Это означает, что директива routerLinkActive будет добавлять класс active к элементу li только тогда, когда полный путь к маршруту совпадает с путем к ссылке.
/* 
<ul>
  <li routerLink="/" routerLinkActive="active" routerLinkActiveOptions = {exact:true}>
    Home
  </li>
  <li routerLink="/servers" routerLinkActive="active">
    Servers
  </li>
  <li routerLink="/users" routerLinkActive="active">
    Users
  </li>
</ul>;
 */

//---------------------------------
//__Navigating Programmatically__//

import { Component, OnInit, Router } from "@angular/core";

@Component({
  selector: "app-home",
  template: ` <button (click)="onLoadServers()">Load Servers</button> `,
})
export class HomeComponent implements OnInit {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void { }

  //Метод onLoadServers() использует метод navigate() класса Router для перехода на страницу /servers.
  onLoadServers() {
    this.router.navigate(["/servers"]);
  }
}

//-----------------------------------------------------
//__Using Relative Paths in Programmatic Navigation__//
//Свойство relativeTo можно использовать для перехода на любой маршрут, относительно текущего маршрута. 

import { Component, OnInit, Router, ActivatedRoute } from "@angular/core";

@Component({
  selector: "app-servers",
  template: ` <button (click)="onReload()">Reload Page</button> `,
})
export class ServersComponent implements OnInit {
  private router: Router;
  private route: ActivatedRoute;

  constructor(router: Router, route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void { }

  onReload() {
    // this.router.navigate(['/servers']); // This will cause an error because it tries to navigate to /servers/servers
    //Мы также передаем второй аргумент в метод navigate(). Это объект, который содержит свойство relativeTo. Свойство relativeTo указывает, относительно какого маршрута следует перейти на новый маршрут.
    this.router.navigate(["./servers"], { relativeTo: this.route }); // В данном случае мы передаем в свойство relativeTo объект this.route. Это означает, что мы хотим перейти на страницу /servers относительно текущего маршрута.Метод navigate() переходит на страницу /servers без перезагрузки страницы.
  }
}

//--------------------------------------
//__Route  / Parameters / Error / ..__//

// app.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "users", component: UsersComponent },
  //Путь users/:id означает, что мы можем перейти на страницу пользователя с любым идентификатором. Например, мы можем перейти на страницу пользователя с идентификатором 1 по адресу /users/1.
  { path: "users/:id", component: UserComponent }, // Added a dynamic segment to the path
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppModule { }

// user.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-user",
  template: `
    <h1>User</h1>
    <p>ID: {{ id }}</p>
    <p>Name: {{ name }}</p>
  `,
})
export class UserComponent implements OnInit {
  id: string;
  name: string;

  //Объект ActivatedRoute содержит информацию о текущем маршруте
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Когда мы переходим на страницу пользователя, компонент UserComponent будет загружен
    this.id = this.route.snapshot.params["id"];
    this.name = "John Doe"; // Dummy data
  }
}

//__//
// Мы вызываем метод subscribe() на объекте route.params. Этот метод принимает функцию в качестве аргумента.
// Функция, которую мы передаем в метод subscribe(), будет вызываться каждый раз, когда параметры маршрута изменяются.
// В функции мы обновляем объект user новыми значениями параметров маршрута.
@Component({
  selector: "app-user",
  template: `
    <h1>User</h1>
    <p>ID: {{ id }}</p>
    <p>Name: {{ name }}</p>
  `,
})
export class UserComponent implements OnInit {
  id: string;
  name: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the initial values of the route parameters
    this.id = this.route.snapshot.params["id"];
    this.name = this.route.snapshot.params["name"];

    // Subscribe to changes in the route parameters
    //подписались на изменения параметров маршрута. Когда параметры маршрута изменяются, функция, которую мы передали в метод subscribe(), вызывается и обновляет объект user новыми значениями параметров маршрута.
    this.route.params.subscribe((params) => {
      // Update the user object with the new values
      this.id = params["id"];
      this.name = params["name"];
    });
  }
}

//__
@Component({
  selector: "app-user",
  template: `
    <h1>User</h1>
    <p>ID: {{ id }}</p>
    <p>Name: {{ name }}</p>
  `,
})
export class UserComponent implements OnInit, OnDestroy {
  id: string;
  name: string;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.name = this.route.snapshot.params["name"];
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.name = params["name"];
    });
  }

  ngOnDestroy(): void {
    //Когда мы покинем страницу /users/.., подписка на изменения параметров маршрута будет отменена. Это предотвратит утечку памяти.
    this.paramsSubscription.unsubscribe();
  }
}

//_//
//добавили код для получения параметров запроса и фрагмента из объекта ActivatedRoute
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-servers",
  template: `
    <ul>
      <li *ngFor="let server of servers">
        <a
          [routerLink]="['/servers', server.id, 'edit']"
          [queryParams]="{ allowEdit: 1 }"
          fragment="loading"
          >Edit Server</a
        >
      </li>
    </ul>
    <button (click)="onLoadServer(1)">Load Server</button>
  `,
})
export class ServersComponent implements OnInit {
  servers: { id: number; name: string }[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    const fragment = this.route.snapshot.fragment;

    console.log(queryParams);
    console.log(fragment);
  }

  onLoadServer(id: number) {
    // Navigate to the server edit page with query parameters and fragment
    this.router.navigate(["/servers", id, "edit"], {
      queryParams: { allowEdit: 1 },
      fragment: "loading", //#loading - для указания конкретного места в документе, к которому нужно перейти
    });
  }
}

//__//
//добавили код для получения идентификатора сервера из параметров маршрута и для получения сервера с этим идентификатором из сервиса ServersService
@Component({
  selector: "app-server",
  template: `
    <h1>Server</h1>
    <p>ID: {{ id }}</p>
    <p>Name: {{ name }}</p>
  `,
})
export class ServerComponent implements OnInit {
  id: number;
  name: string;

  constructor(
    private route: ActivatedRoute,
    private serversService: ServersService
  ) { }

  ngOnInit(): void {
    // Get the ID from the ActivatedRoute
    this.id = +this.route.snapshot.params["id"];

    // Get the server with the ID from the ServersService
    this.serversService.getServer(this.id).subscribe((server) => {
      this.name = server.name;
    });

    // Subscribe to changes in the route parameters
    this.route.params.subscribe((params) => {
      // Get the new ID from the route parameters
      this.id = +params["id"];

      // Get the server with the new ID from the ServersService
      this.serversService.getServer(this.id).subscribe((server) => {
        this.name = server.name;
      });
    });
  }
}

//__//
// app.component.html
/*
//В разметке AppComponent мы добавили разметку router-outlet после элемента <nav>. Это позволит нам загружать дочерние маршруты в этот компонент, также добавить router-outlet везде где импользуються дочерние маршруты
 <nav>
  <a routerLink="/">Home</a>
  <a routerLink="/servers">Servers</a>
  <a routerLink="/users">Users</a>
</nav>
<router-outlet></router-outlet> 
*/

// app-routing.module.ts

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//___//
// что параметры запроса текущей страницы будут сохранены при переходе на новую страницу
//this.router.navigate(['edit'], { queryParamsHandling: 'preserve', relativeTo: this.route });

//__//
//Мы перенаправляем все запросы, которые не соответствуют ни одному из других маршрутов, на маршрут not-found. Для этого мы используем свойство redirectTo в маршруте **
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id', component: UserComponent }
    ]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//___//
//отдельный модуль для маршрутизации, что делает наш код более организованным и удобным в обслуживании
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id', component: UserComponent }
    ]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//__
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServersComponent,
    UsersComponent,
    ServerComponent,
    UserComponent,
    EditServerComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule], // <-----AppRoutingModule
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

//__//
//AuthGuard - это сервис, который реализует интерфейс CanActivate из Angular Router. Этот интерфейс позволяет определить, может ли пользователь получить доступ к определенному маршруту или нет.
//canActivate - это метод интерфейса CanActivate, который возвращает true или false в зависимости от того, может ли пользователь получить доступ к маршруту
// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((loggedIn) => {
      if (loggedIn) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}

// app-routing.module.ts
const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "servers",
    component: ServersComponent,
    children: [
      { path: ":id", component: ServerComponent },
      //Если пользователь авторизован, то компонент EditServerComponent будет загружен
      {
        path: ":id/edit",
        component: EditServerComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id", component: UserComponent }],
  },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//__//
//CanActivateChild - перед загрузкой любого из дочерних компонентов маршрута servers будет выполнен код из класса AuthGuard.
//auth-guard.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((loggedIn) => {
      if (loggedIn) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}

// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'servers', component: ServersComponent, canActivateChild: [AuthGuard], children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id', component: UserComponent }
    ]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//__//
//Метод canDeactivate возвращает true или false в зависимости от того, может ли пользователь покинуть страницу. В данном случае мы проверяем, были ли сохранены изменения на странице. Если изменения не были сохранены, то мы показываем пользователю диалоговое окно с подтверждением
// can-deactivate-guard.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanComponentDeactivate, CanDeactivateGuard, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean | Promise<boolean>> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard<T extends CanComponentDeactivate> implements CanDeactivate<T> {
  canDeactivate(component: T, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | Promise<boolean>> | boolean {
    return component.canDeactivate();
  }
}

// edit-server.component.ts
@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: Server;
  serverName = '';
  serverStatus = '';
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.server = this.serversService.getServer(params['id']);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean | Promise<boolean>> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}

// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id', component: UserComponent }
    ]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//__//
//при загрузке компонента ErrorPageComponent ему будет передан объект data, содержащий свойство message со значением Page Not Found
// app-routing.module.ts
const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "servers",
    component: ServersComponent,
    children: [
      { path: ":id", component: ServerComponent },
      { path: ":id/edit", component: EditServerComponent },
    ],
  },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id", component: UserComponent }],
  },
  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page Not Found" },
  },
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// error-page.component.ts
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.errorMessage = this.route.snapshot.data['message'];

    this.route.data.subscribe((data) => {
      this.errorMessage = data['message'];
    });
  }
}

//__//
//Resolver-  Это позволяет отображать данные сервера сразу же после загрузки компонента, без необходимости отправки отдельного запроса к серверу
// Гард ServerResolver нужен для того, чтобы данные сервера были загружены до того, как будет загружен компонент ServerComponent.Это позволяет отображать данные сервера сразу же после загрузки компонента, без необходимости отправки отдельного запроса к серверу.

// Это особенно важно для страниц, которые содержат много данных, которые необходимо загрузить с сервера.Например, страница со списком всех серверов может содержать сотни или даже тысячи серверов.Если бы данные серверов загружались после загрузки компонента, то пользователю пришлось бы ждать, пока все данные будут загружены, прежде чем он сможет увидеть страницу.

// Используя гард ServerResolver, мы можем загрузить данные серверов до того, как будет загружен компонент ServerComponent.Это позволяет отобразить данные серверов сразу же после загрузки компонента, без необходимости заставлять пользователя ждать.
// server-resolver.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Server } from './server.model';
import { ServersService } from './servers.service';

@Injectable({
  providedIn: 'root'
})
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}

// server.component.ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: Server;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.server = this.route.snapshot.params['id'];

    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
  }
}

// app-routing.module.ts
const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "servers",
    component: ServersComponent,
    children: [
      //перед загрузкой компонента ServerComponent будет выполнен код из класса ServerResolver
      {
        path: ":id",
        component: ServerComponent,
        resolve: { server: ServerResolver },
      },
    ],
  },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id", component: UserComponent }],
  },
  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page Not Found" },
  },
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//__//
// app-routing.module.ts
//Когда мы переходим на страницу /.., в URL появится хэш #/...
//Преимущества использования хэшей в URL:
// Хэши в URL поддерживаются всеми браузерами, даже старыми.
// Хэши в URL не требуют специальной конфигурации сервера.
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent }
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id', component: UserComponent }
    ]
  },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page Not Found' } },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//-----------------------------------
//__Understanding Observables__//
// Observable - это источник данных, который может испускать данные с течением времени.
// Observer - это объект, который подписывается на observable и получает данные, когда они испускаются.
// Observable может испускать три типа данных:
// Обычные данные
// Ошибки
// Завершение
//В Angular observables используются для обработки асинхронных задач, таких как сетевые запросы и события пользовательского интерфейса.

// Преимущества использования observable
// Observables позволяют обрабатывать асинхронные задачи в реактивном стиле.
// Observables имеют ряд операторов, которые можно использовать для обработки данных.
// Observables являются мощным инструментом для создания сложных приложений.

// Недостатки использования observables
// Observables могут быть сложными для понимания и использования.
// Observables могут привести к утечкам памяти, если они не отписаны должным образом.

// Когда следует использовать observables
// Observables следует использовать для обработки асинхронных задач.
// Observables следует использовать для создания сложных приложений.

// Когда не следует использовать observables
// Observables не следует использовать для обработки синхронных задач.
// Observables не следует использовать для создания простых приложений.

//__//
//мы подписываемся на observable params, который содержит параметры маршрута. Когда параметры маршрута изменяются, вызывается функция обратного вызова, и мы извлекаем из нее параметр id
// user.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}

//__//
//В этом коде мы создаем новый observable с помощью метода interval() из пакета rxjs. Метод interval() создает observable, который испускает значение каждые 1000 миллисекунд
// home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  firstObsSubscription: Subscription;

  ngOnInit(): void {
    this.firstObsSubscription = interval(1000).subscribe((count) => {
      console.log(count);
    });
  }

  //Чтобы предотвратить утечку памяти, мы отписываемся от observable в методе ngOnDestroy()
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}

//__//
//мы создаем новый observable с помощью метода create() из пакета rxjs. Метод create() принимает функцию в качестве аргумента, которая будет вызываться, когда кто-то подписывается на observable
import { Observable } from 'rxjs';

const customIntervalObservable = Observable.create((observer) => {
  let count = 0;
  const interval = setInterval(() => {
    observer.next(count);
    count++;
  }, 1000);

  //В этой функции мы очищаем интервал с помощью метода clearInterval()
  return () => {
    clearInterval(interval);
  };
});

// Subscribe to the observable
customIntervalObservable.subscribe((data) => {
  console.log(data);
});

//__//
//Метод next() используется для передачи данных наблюдателю. Метод error() используется для передачи ошибки наблюдателю. Метод complete() используется для завершения observable.
import { Observable } from 'rxjs';

const customIntervalObservable = Observable.create((observer) => {
  let count = 0;
  const interval = setInterval(() => {
    if (count === 3) {
      observer.error(new Error('Count is greater than 3'));
    } else if (count === 2) {
      observer.complete();
    } else {
      observer.next(count);
    }
    count++;
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});

//В первой функции мы просто выводим испускаемое значение в консоль. Во второй функции мы выводим сообщение об ошибке в консоль и показываем алерт с сообщением об ошибке. В третьей функции мы просто выводим сообщение о завершении в консоль
customIntervalObservable.subscribe(
  (data) => {
    console.log(`Data: ${data}`);
  },
  (error) => {
    console.log(`Error: ${error.message}`);
    alert(error.message);
  },
  () => {
    console.log('Completed');
  }
);

//__//
//операторы могут использоваться для преобразования и фильтрации данных, испускаемых наблюдаемой переменной
//используем оператор pipe()
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// Создаём наблюдаемую переменную, которая испускает числа 0, 1, 2, 3, а затем завершается с ошибкой
const observable = of(0, 1, 2, 3).pipe(
  // Используем оператор map для преобразования данных
  map((data) => `Раунд ${data + 1}`),
  // Используем оператор filter для фильтрации первого значения
  filter((data) => data !== 'Раунд 1')
);

// Подписываемся на наблюдаемую переменную и выводим данные в консоль
observable.subscribe((data) => {
  console.log(data);
});

//__//
// В Angular subject - это объект, который представляет собой поток данных, который может быть подпиской и на который можно подписаться.Subjects используются для передачи данных между компонентами, сервисами и другими частями приложения.

// Subjects похожи на Observables, но имеют несколько ключевых отличий:
// Subjects могут быть как источником, так и получателем данных.
// Subjects могут быть завершены, что означает, что они больше не будут испускать значения.
// Subjects могут быть повторно подписываемы, что означает, что новые подписчики могут подписаться на них и получать все значения, испускаемые после того, как они подписались.

// user.service.ts
@Injectable({
  providedIn: 'root'
})
export class UserService {
  activatedEmitter = new Subject < boolean > ();
}

// user.component.ts
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onActivate() {
    this.userService.activatedEmitter.next(true);
  }
}

// app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  activatedSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.activatedSub = this.userService.activatedEmitter.subscribe((didActivate) => {
      this.userActivated = didActivate;
    });
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}

//------------------------------------
//__Handling Forms in Angular Apps__//
// Как Angular работает с формами

// Angular предоставляет мощные инструменты для работы с формами.С помощью Angular вы можете:
// Получать значения, введенные пользователем в поля формы.
// Проверять валидность формы и отдельных полей.
// Изменять внешний вид формы в зависимости от ее состояния.
// Сбрасывать форму.
// Как Angular представляет формы

// Angular представляет формы в виде объектов JavaScript.Эти объекты содержат следующую информацию:
// Значения полей формы.
// Состояние формы(валидная / невалидная).
// Состояние отдельных полей формы(валидные / невалидные).

//__//
// Angular: два подхода к обработке форм

// Angular предлагает два подхода к обработке форм:
// Шаблонный подход(template - driven approach)
// Реактивный подход(reactive approach)

// Шаблонный подход
// Шаблонный подход прост в использовании и подходит для большинства случаев.При использовании шаблонного подхода вы определяете структуру формы в HTML - шаблоне.Angular автоматически создает экземпляр формы и привязывает его к элементам управления формы.

// Реактивный подход
// Реактивный подход дает вам больше контроля над формой.При использовании реактивного подхода вы определяете структуру формы в TypeScript - коде.Затем вы создаете экземпляр формы и привязываете его к элементам управления формы вручную.

// Шаблонный подход:
// Преимущества:
// Прост в использовании.
// Подходит для большинства случаев.
//   Недостатки:
// Менее гибкий, чем реактивный подход.
// Трудно тестировать.

// Реактивный подход:
// Преимущества:
// Более гибкий, чем шаблонный подход.
// Легко тестировать.
// Недостатки:
// Более сложен в использовании.
// Требует больше кода.

//__//
// В шаблоне компонента создаем форму с помощью тега < form >.
// Внутри формы добавляем поля ввода для имени пользователя, электронной почты и секретного вопроса.
// Добавляем кнопку отправки формы.
// К каждому полю ввода добавляем директиву ngModel.
// К каждому полю ввода добавляем атрибут name.
/* 
<!-- app.component.html -->
<form>
  <input type="text" name="username" placeholder="Username" ngModel>
  <input type="email" name="email" placeholder="Email" ngModel>
  <select name="secret" ngModel>
    <option value="question1">Question 1</option>
    <option value="question2">Question 2</option>
    <option value="question3">Question 3</option>
  </select>
  <button type="submit">Submit</button>
</form>
*/

//__//
// app.component.ts
//К форме добавляем локальную ссылку #form.
import { Component, ElementRef, NgForm } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form (ngSubmit)="onSubmit(form) #form='ngForm'">
      <input type="text" name="username" placeholder="Username" ngModel>
      <input type="email" name="email" placeholder="Email" ngModel>
      <select name="secret" ngModel>
        <option value="question1">Question 1</option>
        <option value="question2">Question 2</option>
        <option value="question3">Question 3</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  `
})
export class AppComponent {
  onSubmit(form: NgForm) {
    console.log(form);
  }
}

//__//
// Свойства формы

// Форма, созданная Angular, имеет следующие свойства:
// dirty: true, если форма была изменена пользователем.
// disabled: true, если форма отключена.
// enabled: true, если форма включена.
// errors: объект, содержащий ошибки формы.
// invalid: true, если форма невалидна.
// pristine: true, если форма не была изменена пользователем.
// submitted: true, если форма была отправлена.
// touched: true, если пользователь коснулся какого-либо элемента управления формы.
// valid: true, если форма валидна.
// Свойства элементов управления формы

// Элементы управления формы, созданные Angular, имеют следующие свойства:
// dirty: true, если элемент управления формы был изменен пользователем.
// disabled: true, если элемент управления формы отключен.
// enabled: true, если элемент управления формы включен.
// errors: объект, содержащий ошибки элемента управления формы.
// invalid: true, если элемент управления формы невалиден.
// pristine: true, если элемент управления формы не был изменен пользователем.
// touched: true, если пользователь коснулся элемента управления формы.
// valid: true, если элемент управления формы валиден.

//__//
//Получение доступа к форме с помощью @ViewChild
// app.component.ts
import { Component, ElementRef, NgForm, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
      <input type="text" name="username" placeholder="Username" ngModel>
      <input type="email" name="email" placeholder="Email" ngModel>
      <select name="secret" ngModel>
        <option value="question1">Question 1</option>
        <option value="question2">Question 2</option>
        <option value="question3">Question 3</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  `
})
export class AppComponent {
  @ViewChild('form') signupForm: NgForm;

  onSubmit() {
    console.log(this.signupForm);
  }
}

//___//
// Добавление валидаторов

// Чтобы добавить валидаторы к полю ввода, можно использовать следующие способы:
// Добавить атрибут required.
// Добавить директиву email.
// Добавить пользовательские валидаторы.

/* 
<!-- app.component.html -->
<form (ngSubmit)="onSubmit(form)" #form="ngForm">
  <input type="text" name="username" placeholder="Username" ngModel required>
  <input type="email" name="email" placeholder="Email" ngModel required email>
  <select name="secret" ngModel>
    <option value="question1">Question 1</option>
    <option value="question2">Question 2</option>
    <option value="question3">Question 3</option>
  </select>
  <button type="submit">Submit</button>
</form>
*/

//__//
//Отключение кнопки отправки формы
/* 
<!-- app.component.html -->
<form (ngSubmit)="onSubmit(form)" #form="ngForm">
  <input type="text" name="username" placeholder="Username" ngModel required>
  <input type="email" name="email" placeholder="Email" ngModel required email>
  <select name="secret" ngModel>
    <option value="question1">Question 1</option>
    <option value="question2">Question 2</option>
    <option value="question3">Question 3</option>
  </select>
  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
*/

//Добавление красной границы к невалидным элементам управления формы
/* 
app.component.css 
input.ng - invalid, select.ng - invalid {
  border: 1px solid red;
}

input: not(.ng - touched).ng - invalid, select: not(.ng - touched).ng - invalid {
  border: none;
}
*/

//__//
//Вывод сообщения об ошибке
/* 
<!-- app.component.html -->
<form (ngSubmit)="onSubmit(form)" #form="ngForm">
  <input type="text" name="username" placeholder="Username" ngModel required>

  <input type="email" name="email" placeholder="Email" #email="ngForm" required email #email="ngModel">
  //для вывода сообщения об ошибке
  <span *ngIf="email.invalid && email.touched" class="help-block">Please enter a valid e-mail.</span>

  <select name="secret" ngModel>
    <option value="question1">Question 1</option>
    <option value="question2">Question 2</option>
    <option value="question3">Question 3</option>
  </select>
  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
*/

//__//
//Установка значения по умолчанию для элемента управления формы
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
      <input type="text" name="username" placeholder="Username" ngModel required>
      <input type="email" name="email" placeholder="Email" ngModel required email>
      <select name="secret" [ngModel]="defaultQuestion">
        <option value="question1">Question 1</option>
        <option value="question2">Question 2</option>
        <option value="question3">Question 3</option>
      </select>
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  `
})
export class AppComponent {
  defaultQuestion = 'pet';

  onSubmit(form: NgForm) {
    console.log(form);
  }
}

//__//
//Использование двухсторонней привязки данных
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
      <input type="text" name="username" placeholder="Username" ngModel required>
      <input type="email" name="email" placeholder="Email" ngModel required email>
      <select name="secret" [ngModel]="defaultQuestion">
        <option value="question1">Question 1</option>
        <option value="question2">Question 2</option>
        <option value="question3">Question 3</option>
      </select>
      <div class="form-group">
        <label for="questionAnswer">Question Answer</label>
        <textarea name="questionAnswer" [(ngModel)]="answer" class="form-control" rows="3"></textarea>
      </div>
      <p>Your reply: {{ answer }}</p>
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  `
})
export class AppComponent {
  defaultQuestion = 'pet';
  answer = '';

  onSubmit(form: NgForm) {
    console.log(form);
  }
}

//__//
//Группировка элементов управления формы (ngModelGroup)
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">

      <div class="form-group" id="userData" ngModelGroup="userData" #userData="ngModelGroup">
        <input type="text" name="username" placeholder="Username" ngModel required>
        <input type="email" name="email" placeholder="Email" ngModel required email>
      </div>
      <p *ngIf="userData.invalid && userData.touched">User data is invalid.</p>

      <select name="secret" [ngModel]="defaultQuestion">
        <option value="question1">Question1</option>
        <option value="question2">Question 2</option>
        <option value="question3">Question 3</option>
      </select>
      <div class="form-group">
        <label for="questionAnswer">Question Answer</label>
        <textarea name="questionAnswer" [(ngModel)]="answer" class="form-control" rows="3"></textarea>
      </div>
      <p>Your reply: {{ answer }}</p>
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  `
})
export class AppComponent {
  defaultQuestion = 'pet';
  answer = '';

  onSubmit(form: NgForm) {
    console.log(form.userData.username);
  }
}

//__//
//Использование радиокнопок
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
        <label *ngFor="let gender of genders">
          <input type="radio" name="gender" [value]="gender">
          {{ gender }}
        </label>
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  `
})
export class AppComponent {
  genders = ['male', 'female'];
  defaultQuestion = 'pet';
  answer = '';

  onSubmit(form: NgForm) {
    console.log(form);
  }
}

//__//
// Использование метода setValue и patchValue

// Чтобы установить значение всей формы, можно использовать метод setValue.Метод setValue принимает в качестве аргумента объект, который представляет собой значение формы.

// Чтобы установить значение отдельных элементов управления формы, можно использовать метод patchValue.Метод patchValue также принимает в качестве аргумента объект, который представляет собой значение формы.Однако, в отличие от метода setValue, метод patchValue не перезаписывает значения элементов управления формы, которые уже имеют значение.
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
      <div class="form-group" id="userData" ngModelGroup="userData">
        <input type="text" name="username" placeholder="Username" ngModel required>
        <input type="email" name="email" placeholder="Email" ngModel required email>
      </div>
      <select name="secret" [ngModel]="defaultQuestion">
        <option value="question1">Question1</option>
        <option value="question2">Question 2</option>
        <option value="question3">Question 3</option>
      </select>
      <div class="form-group">
        <label for="questionAnswer">Question Answer</label>
        <textarea name="questionAnswer" [(ngModel)]="answer" class="form-control" rows="3"></textarea>
      </div>
      <p>Your reply: {{ answer }}</p>
      <p *ngIf="userData.invalid && userData.touched">User data is invalid.</p>
      <div class="radio">
        <label *ngFor="let gender of genders">
          <input type="radio" name="gender" [(ngModel)]="gender">
          {{ gender }}
        </label>
      </div>
      <button type="button" (click)="suggestUserName()">Suggest Username</button>
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  `
})
export class AppComponent {
  genders = ['male', 'female'];
  defaultQuestion = 'pet';
  answer = '';

  onSubmit(form: NgForm) {
    console.log(form);
  }

  suggestUserName() {
    // this.signupForm.setValue({
    //   userData: {
    //     username: 'super user',
    //     email: '',
    //     secret: 'pet',
    //     questionAnswer: '',
    //     gender: 'male'
    //   }
    // });

    this.signupForm.form.patchValue({
      userData: {
        username: 'super user'
      }
    });
  }
}

//__//
//Вывод данных формы
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
      <div class="form-group" id="userData" ngModelGroup="userData">
        <input type="text" name="username" placeholder="Username" ngModel required>
        <input type="email" name="email" placeholder="Email" ngModel required email>
      </div>
      <select name="secret" [ngModel]="defaultQuestion">
        <option value="question1">Question1</option>
        <option value="question2">Question 2</option>
        <option value="question3">Question 3</option>
      </select>
      <div class="form-group">
        <label for="questionAnswer">Question Answer</label>
        <textarea name="questionAnswer" [(ngModel)]="answer" class="form-control" rows="3"></textarea>
      </div>
      <p>Your reply: {{ answer }}</p>
      <p *ngIf="userData.invalid && userData.touched">User data is invalid.</p>
      <div class="radio">
        <label *ngFor="let gender of genders">
          <input type="radio" name="gender" [(ngModel)]="gender">
          {{ gender }}
        </label>
      </div>
      <button type="submit" [disabled]="!form.valid">Submit</button>
      <hr>
      <div class="row" *ngIf="submitted">
        <div class="col-md-6">
          <strong>Username:</strong> {{ user.username }}
        </div>
        <div class="col-md-6">
          <strong>Email:</strong> {{ user.email }}
        </div>
        <div class="col-md-6">
          <strong>Secret Question:</strong> {{ user.secretQuestion }}
        </div>
        <div class="col-md-6">
          <strong>Answer:</strong> {{ user.answer }}
        </div>
        <div class="col-md-6">
          <strong>Gender:</strong> {{ user.gender }}
        </div>
      </div>
    </form>
  `
})
export class AppComponent {
  genders = ['male', 'female'];
  defaultQuestion = 'pet';
  answer = '';
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  onSubmit(form: NgForm) {
    this.user.username = form.value.userData.username;
    this.user.email = form.value.userData.email;
    this.user.secretQuestion = form.value.secret;
    this.user.answer = form.value.questionAnswer;
    this.user.gender = form.value.gender;
    this.submitted = true;
  }
}

//__//
//Чтобы сбросить форму, можно вызвать метод reset() на объекте формы. Метод reset() сбрасывает все поля формы в их начальное состояние.
@Component({
  selector: 'app-root',
  template: `
    ..//
  `
})
export class AppComponent {
  genders = ['male', 'female'];
  defaultQuestion = 'pet';
  answer = '';

  onSubmit(form: NgForm) {
    console.log(form);
  }

  resetForm() {
    this.signupForm.reset();
  }
}

//---------------- --//
//__Reactive_ Form__//
//используем реактивный подход к обработке форм

@NgModule({
  imports: [
    ReactiveFormsModule
  ]
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="signupForm">
    </form>
  `
})
export class AppComponent {
  signupForm: FormGroup;

  constructor() {
    this.signupForm = new FormGroup({});
  }
}

//__//
// В этом фрагменте кода мы настраиваем форму в Angular, используя реактивные формы.

@Component({
})
export class MyComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'gender': new FormControl('male')
    });
  }
}

//__//
//привязываем к форме в HTML с помощью директив formGroup и formControlName

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-your-component',
  template: `
    <form [formGroup]="signupForm">
      <input type="text" formControlName="username">
      <input type="email" formControlName="email">
      <select formControlName="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </form>
  `
})
export class YourComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl('male')
    });
  }
}

//__//
//при отправке формы вызывается метод onSubmit()
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-your-component',
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="username">
      <input type="email" formControlName="email">
      <select formControlName="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  `
})
export class YourComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl('male')
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }
}

//__//
//валидаторы для полей формы
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-component',
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="username" placeholder="Username">
      <input type="email" formControlName="email" placeholder="Email">
      <button type="submit">Submit</button>
    </form>
  `
})
export class YourComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
    }
  }
}

//__//
//добавлены сообщения об ошибках, которые отображаются, если поля формы недопустимы и были касаемы
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-component',
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="username" placeholder="Username">
      <span class="help-block" *ngIf="signupForm.get('username').invalid && signupForm.get('username').touched">
        Please enter a valid username
      </span>

      <input type="email" formControlName="email" placeholder="Email">
      <span class="help-block" *ngIf="signupForm.get('email').invalid && signupForm.get('email').touched">
        Please enter a valid email
      </span>

      <button type="submit">Submit</button>
    </form>
  `
})
export class YourComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
    }
  }
}

//__//
//создании формы с вложенными группами полей
// Код компонента
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <div formGroupName="userData">
        <div>
          <label>Username</label>
          <input type="text" formControlName="username">
        </div>
        <div>
          <label>Email</label>
          <input type="email" formControlName="email">
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  `,
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
      })
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }
}

//__//
//Динамически созданные контролы

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <!-- ... остальной код формы ... -->

      <div formArrayName="hobbies">
        <!-- Динамически созданные контролы хобби -->
        <div *ngFor="let hobbyControl of hobbies.controls; let i = index">
          <input type="text" [formControlName]="i" class="form-control">
        </div>
      </div>

      <button type="button" (click)="addHobby()">Добавить хобби</button>

      <button type="submit">Отправить</button>
    </form>
  `,
})
export class MyFormComponent {
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      // ... остальные контролы формы ...
      hobbies: new FormArray([]),
    });
  }

  get hobbies(): FormArray {
    return this.myForm.get('hobbies') as FormArray;
  }

  addHobby(): void {
    const hobbyControl = new FormControl('', Validators.required);
    this.hobbies.push(hobbyControl);
  }

  onSubmit(): void {
    console.log(this.myForm.value);
  }
}

//__//
//создании собственных валидаторов форм в Angular.

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-component',
  template: `
    <form [formGroup]="signupForm">
      <input type="text" formControlName="username">
      <p *ngIf="username.invalid && username.touched">Имя пользователя недопустимо!</p>
    </form>
  `,
})
export class YourComponent {
  signupForm: FormGroup;

  // Запрещенные имена пользователей
  forbiddenUsernames = ['Chris', 'Anna'];

  constructor() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [this.forbiddenNames.bind(this)])
    });
  }

  // Собственный валидатор
  forbiddenNames(control: FormControl): { [key: string]: boolean } | null {
    const enteredUsername = control.value;

    // Проверяем, есть ли имя пользователя в списке запрещенных имен
    if (this.forbiddenUsernames.indexOf(enteredUsername) !== -1) {
      return { nameIsForbidden: true };
    }

    return null; // Возвращаем null, если валидация успешна
  }
}

//__//
//соответствующие сообщения об ошибке собственных валидаторов форм
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-component',
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" formControlName="username">
        <div *ngIf="signupForm.get('userData.username').invalid && (signupForm.get('userData.username').dirty || signupForm.get('userData.username').touched)">
          <span *ngIf="signupForm.get('userData.username').errors['required']>Поле обязательно для заполнения.</span>
          <span *ngIf="signupForm.get('userData.username').errors['forbidden']>Недопустимое имя пользователя.</span>
        </div>
      </div>
      <button type="submit" [disabled]="signupForm.invalid">Submit</button>
    </form>
  `
})
export class MyComponent {
  signupForm: FormGroup;

  forbiddenUsernames = ['admin', 'user'];

  constructor() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames])
      })
    });
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'forbidden': true };
    }
    return null;
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }
}

//__//
//создали асинхронный валидатор

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email" class="form-control">
        <div *ngIf="signupForm.get('email').invalid && (signupForm.get('email').dirty || signupForm.get('email').touched)">
          <div *ngIf="signupForm.get('email').errors.required">Email is required.</div>
          <div *ngIf="signupForm.get('email').errors.email">Please enter a valid email address.</div>
          <div *ngIf="signupForm.get('email').errors.emailIsForbidden">This email is forbidden.</div>
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" formControlName="password" class="form-control">
        <div *ngIf="signupForm.get('password').invalid && (signupForm.get('password').dirty || signupForm.get('password').touched)">
          <div *ngIf="signupForm.get('password').errors.required">Password is required.</div>
        </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" formControlName="confirmPassword" class="form-control">
        <div *ngIf="signupForm.get('confirmPassword').invalid && (signupForm.get('confirmPassword').dirty || signupForm.get('confirmPassword').touched)">
          <div *ngIf="signupForm.get('confirmPassword').errors.required">Confirm Password is required.</div>
        </div>
      </div>
      <button type="submit" [disabled]="signupForm.invalid">Submit</button>
    </form>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise < any > ((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}

//__//
// подписываемся на изменения значений формы с помощью метода valueChanges, который является Observable и вызывает переданный callback при каждом изменении значений формы

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit() {
    // Создаем форму с тремя полями: email, password и confirmPassword
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });

    // Подписываемся на изменения значений формы
    this.signupForm.valueChanges.subscribe(value => {
      console.log(value); // Выводим значения формы в консоль при изменении
    });

    // Подписываемся на изменения состояния формы
    this.signupForm.statusChanges.subscribe(status => {
      console.log(status); // Выводим состояние формы в консоль при изменении
    });
  }

  onSubmit() {
    // Обработка отправки формы
  }
}

//__//
//используем метод setValue для установки начальных значений формы. Мы передаем объект с соответствующими значениями для каждого поля формы
//метод patchValue для обновления отдельного значения формы

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit() {
    // Создаем форму с тремя полями: username, email и password
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    // Используем метод setValue для установки начальных значений формы
    this.signupForm.setValue({
      username: 'Max',
      email: 'max@test.com',
      password: ''
    });

    // Используем метод patchValue для обновления отдельного значения формы
    this.signupForm.patchValue({
      username: 'Anna'
    });
  }

  onSubmit() {
    // Обработка отправки формы

    // Сбрасываем значения формы после отправки
    this.signupForm.reset();
  }
}

//------------------------------------//
//__Using Pipes to Transform Output__//
//пайпы позволяют преобразовывать данные перед их выводом в шаблон. Это удобный способ форматирования вывода

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {


  servers = [
    {
      name: 'Test Server 1',
      instanceType: 'medium',
      started: new Date()
    },
    {
      name: 'Test Server 2',
      instanceType: 'large',
      started: new Date()
    }
  ];
}

/* 
<div 
  *ngFor="let server of servers"
  class="panel panel-default">

  <div class="panel-heading">
    <h2>
      {{ server.name }}
    </h2>
  </div>

  <div class="panel-body">

    <p>
      Тип: {{ server.instanceType | uppercase }}
    </p>

    <p>
      Запущен: {{ server.started | date }} 
    </p>

  </div>
</div>
*/

//__//
//date
//fullDate' в данном случае указывает, что мы хотим отформатировать дату в полном формате
//{{ currentDate | date:'fullDate' }}

//__//
//Комбинирование "pipe" в Angular можно использовать в различных ситуациях, в которых требуется преобразование данных перед их отображением на пользовательском интерфейсе.
//{{ serverStarted | date:'dd/MM/yyyy' | uppercase }}
//{{ serverName | slice:0:5 | uppercase }}
//{{ serverName | uppercase | uppercase }}

//__//
//кастомный пайп
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 10) {
      return value.substr(0, 10) + '...';
    }
    return value;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  servers = [
    {
      name: 'Productionserver',
      started: new Date()
    },
    {
      name: 'Longservernamewithmorethan10letters',
      started: new Date()
    }
  ];

}
/* 
<app-server *ngFor="let server of servers">
  <h3> {{server.name | shorten}} </h3> 
  <p> Запущен: {{server.started | date}} </p>
 </app-server>
*/

//__//
//позволяет использовать пользовательский пайп с параметром для сокращения значений в зависимости от указанного лимит
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (value.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  servers = [
    {
      name: 'Productionserver',
      started: new Date()
    },
    {
      name: 'Longservernamewithmorethan10letters',
      started: new Date()
    }
  ];
}
/* 
<app-server 
  *ngFor="let server of servers">
  <h3>
    {{server.name | shorten:10}}
  </h3>
  <p>
    Запущен: {{server.started | date}}
  </p>
</app-server>
*/

//__//
//фильтруем массив значений

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}

// Использование пайпа в шаблоне:
// servers - массив объектов, filterString - фильтрующая строка, propName - имя свойства объекта,
// по которому производится фильтрация
// <div *ngFor="let server of servers | filter: filterString: 'status'">
// {{ server.name }}
// </div>

//__//
//статичный режим изменения или динамичный режим в pipe
//добавление или изменение в pipe вызовет перерасчет, применение pipe к данным снова, но изменение данных не произойдет
//высокую стоимость производительности при фильтрации
//Чтобы указать Angular, что метод transform не является чистым, мы можем установить флаг pure в false в декораторе Pipe.
@Pipe({
  name: 'serverFilter',
  pure: false
})
export class ServerFilterPipe implements PipeTransform {
  // ...
}
//Теперь Angular будет пересчитывать pipe каждый раз, когда данные изменяются.

//__//
//используем пайп async для автоматической обработки асинхронных данных и отображения их на экране
@Component({
  selector: 'app-example',
  template: `
    <h1>appStatus</h1>
    <p>{{ appStatus | async }}</p>
  `,
})
export class ExampleComponent {
  appStatus: Promise<string>;

  constructor() {
    this.appStatus = new Promise < string > ((resolve, reject) => {
      setTimeout(() => {
        resolve('stable');
      }, 2000);
    });
  }
}

//-------------------------//
//__Making Http Requests__//
//Angular может взаимодействовать с сервером и базой данных
//вместо прямого подключения Angular к базе данных, мы отправляем HTTP-запросы и получаем HTTP-ответы от сервера. Сервер в этом случае представляет собой API (REST API или GraphQL API), с которым мы общаемся.
//взаимодействие с сервером может использоваться не только для работы с базой данных, но и для загрузки файлов, отправки аналитических данных и других задач

//__//
//HttpClient
//добовлять посты на сервер

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="sendRequest()">Send Request</button>
    <p>{{ response }}</p>
  `,
})
export class AppComponent {
  response: string;

  constructor(private http: HttpClient) { }

  sendRequest() {
    const url = 'http://example.com/api';
    const data = {
      name: 'John',
      age: 30
    };

    this.http.post(url, data)
      .subscribe(
        (response: any) => {
          this.response = response.message;
        },
        (error: any) => {
          this.response = 'Error: ' + error.message;
        }
      );
  }
}

//__//
//получать посты с сервера и отображать их на странице

@Component({
  selector: 'app-root',
  template: `
    <button (click)="onFetchPosts()">Fetch Posts</button>
    <ul>
      <li *ngFor="let post of posts">{{ post.title }}</li>
    </ul>
  `,
})
export class AppComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    this.http.get(url)
      .subscribe((response: any[]) => {
        this.posts = response;
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }
}

//__//
//map для преобразования данных, полученных с сервера
//используем оператор pipe, который позволяет применять несколько операторов к данным до того, как они достигнут метода subscribe

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get('https://example.com/posts').pipe(
      map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], ID: key });
          }
        }
        return postsArray;
      })
    ).subscribe(posts => {
      this.posts = posts;
    });
  }
}

//__//
//типизируем http

interface Post {
  id?: string;
  title: string;
  content: string;
}

@Injectable()
export class PostService {
  private apiUrl = 'https://api.example.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get < any[] > (this.apiUrl).pipe(
      map(response => {
        return response.map(postData => {
          const post: Post = {
            id: postData.id,
            title: postData.title,
            content: postData.content
          };
          return post;
        });
      })
    );
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.fetchPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      console.log(posts);
    });
  }
}

//__//
//индикатор загрузки
@Injectable()
export class PostService {
  private apiUrl = 'https://api.example.com/posts';
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    this.isFetching = true;
    return this.http.get < any[] > (this.apiUrl).pipe(
      map(response => {
        return response.map(postData => {
          const post: Post = {
            id: postData.id,
            title: postData.title,
            content: postData.content
          };
          return post;
        });
      }),
      //для выполнения побочных эффектов без изменения потока данных
      tap(posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      })
    );
  }
}

//__//
//полное CRUD-действие над данными через HTTP-запросы

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post) {
    return this.http.post < Post > ('https://jsonplaceholder.typicode.com/posts', post);
  }

  getPosts() {
    return this.http.get < Post[] > ('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        map(posts => {
          // transformation logic
          return posts;
        })
      );
  }

  updatePost(post: Post) {
    return this.http.put < Post > ('https://jsonplaceholder.typicode.com/posts/' + post.id, post);
  }

  deletePost(id: number) {
    return this.http.delete < void> ('https://jsonplaceholder.typicode.com/posts/' + id);
  }

}

@Component({ ...})
export class PostComponent {

  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts()
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  // other methods calling post service

}

//__//
//Отображение данных/ошибок

@Component({ ...})
export class PostComponent {

  loading = false;
  error = null;
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  getPosts() {
    this.loading = true;

    this.postService.getPosts()
      .subscribe(
        posts => {
          this.loading = false;
          this.posts = posts;
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
  }

  // template

}
/* 
<div *ngIf="loading">Loading...</div>

<div *ngIf="error">
  Error: {{error}}
</div> 

<div *ngIf="!loading && !error">
  Posts: {{posts}}
</div>
*/

//__//
//Subject, которые выполнит нужные действия при получении ошибки
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit, OnDestroy {
  errorSub: Subscription;
  error = '';

  private errorSubject = new Subject < string > ();
  error$ = this.errorSubject.asObservable();

  ngOnInit() {
    this.errorSub = this.error$.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  // Метод, в котором происходит обработка ошибки и передача ее в Subject
  handleError(errorMessage: string) {
    this.errorSubject.next(errorMessage);
  }
}

//__//
//добавить оператор catchError в наш поток данных, перед вызовом метода subscribe. Например, если мы хотим обработать ошибку при получении данных
fetchPosts() {
  this.http.get('https://example.com/posts')
    .pipe(
      catchError((error) => {
        // Обработка ошибки
        console.log('An error occurred:', error);
        throw error; // Пробрасываем ошибку дальше, чтобы она могла быть обработана в методе `subscribe`
      })
    )
    .subscribe(
      (response) => {
        // Обработка успешного ответа
        console.log('Received response:', response);
      },
      (error) => {
        // Обработка ошибки
        console.log('An error occurred in subscribe:', error);
      }
    );
}

//__//
//заголовки в опции запроса с помощью объекта { headers }

// Импортируем необходимые модули
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Импортируем HttpHeaders для работы с заголовками

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: any[] = []; // Переменная для хранения данных

  constructor(private http: HttpClient) { }

  fetchPosts() {
    const headers = new HttpHeaders().set('custom-header', 'hello'); // Создаем новый экземпляр HttpHeaders с нашим заголовком
    this.http.get('https://example.com/posts', { headers }) // Передаем заголовки в опции запроса
      .subscribe(
        (response) => {
          this.posts = response; // Устанавливаем полученные данные
        }
      );
  }
}

//__//
//HttpParams

// Импортируем необходимые модули
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; // Импортируем HttpParams для работы с параметрами запроса

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: any[] = []; // Переменная для хранения данных

  constructor(private http: HttpClient) { }

  fetchPosts() {
    const headers = new HttpHeaders().set('custom-header', 'hello'); // Создаем новый экземпляр HttpHeaders с нашим заголовком

    const params = new HttpParams().set('print', 'pretty'); // Создаем новый экземпляр HttpParams с нашими параметрами

    //использовать метод append() для добавления нового параметра в объект HttpParams / append() добавляет новое значение в конец объекта без удаления или замены существующих значений
    params.append('q', 'angular');
    params.append('sort', 'desc');

    this.http.get('https://example.com/posts', { headers, params }) // Передаем заголовки и параметры в опции запроса
      .subscribe(
        (response) => {
          this.posts = response; // Устанавливаем полученные данные
        }
      );
  }
}

//__//
//При использовании Angular HttpClient для выполнения HTTP-запросов, мы можем наблюдать различные типы событий ответа

/* 
HttpEventType.Sent: Это событие отправки запроса. Оно генерируется сразу же после отправки запроса.
HttpEventType.ResponseHeader: Это событие получения заголовков ответа. Оно генерируется после получения заголовков ответа от сервера.
HttpEventType.DownloadProgress: Это событие прогресса загрузки данных. Оно генерируется во время загрузки данных с сервера, позволяя отслеживать прогресс загрузки.
HttpEventType.UploadProgress: Это событие прогресса загрузки данных на сервер. Оно генерируется во время загрузки данных на сервер, позволяя отслеживать прогресс загрузки.
HttpEventType.Response: Это событие получения полного ответа от сервера. Оно генерируется после получения полного ответа, который можно использовать для обработки данных.
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get < Post[] > ('posts', { observe: 'events' }).pipe(
      tap(event => {
        if (event.type === HttpEventType.Sent) {
          console.log('Request sent');
        }
        if (event.type === HttpEventType.ResponseHeader) {
          console.log('Response headers received');
        }
        if (event.type === HttpEventType.DownloadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          console.log(`Download Progress: ${percentDone}%`);
        }
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          console.log(`Upload Progress: ${percentDone}%`);
        }
        if (event.type === HttpEventType.Response) {
          console.log('Full response received');
        }
      })
    );
  }
}

//observe: 'body': По умолчанию, если значение observe не указано, HttpClient возвращает только тело ответа в виде наблюдаемого объекта. Нет необходимости наблюдать за событиями или заголовками ответа
//observe: 'response': HttpClient возвращает полный объект ответа, включая тело, заголовки, статус и другую информацию.Это полезно, когда вам нужно получить доступ к полному ответу, а не только к телу.
//observe: 'response' as 'body': Это комбинация предыдущих двух параметров.HttpClient возвращает полный объект ответа, но внутри него только тело.Это полезно, если вы хотите получить доступ к полному объекту ответа, но вам нужно только тело.

//__//
//responseType: 'json' указывает, что данные в теле ответа являются JSON и должны быть преобразованы в объект JavaScript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    // Опция observe позволяет настраивать режим наблюдения
    // По умолчанию используется observe: 'body', что означает, что будет наблюдаться только тело ответа

    // Опция responseType позволяет настраивать тип ответа
    // По умолчанию используется responseType: 'json', что означает, что данные в теле ответа являются JSON и будут автоматически преобразованы в объект JavaScript

    // Пример использования опций observe и responseType
    return this.http.get < Post[] > ('posts', { observe: 'body', responseType: 'json' });

    // В этом примере мы указываем, что нам нужно наблюдать только за телом ответа и что данные в теле являются JSON

    // Другие варианты для опции responseType:
    // - 'text': Означает, что данные в теле ответа являются текстом и не нужно их преобразовывать в объект JavaScript
    // - 'blob': Означает, что ответ является файлом (например, изображение или документ)

    // Пример использования опций observe и responseType для текстового ответа:
    //return this.http.get < string > ('posts', { observe: 'body', responseType: 'text' });

    // В этом примере мы указываем, что нам нужно наблюдать только за телом ответа и что данные в теле являются текстом

    // Пример использования опций observe и responseType для получения файла (blob):
    //return this.http.get('file.pdf', { observe: 'body', responseType: 'blob' });

    // В этом примере мы указываем, что нам нужно наблюдать только за телом ответа и что ответ является файлом (blob)
  }
}

//__//
//intercept - мы можем выполнять какую - либо логику перед отправкой запроса
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    //Указываем, что используемый провайдер - интерцептор с помощью provide: HTTP_INTERCEPTORS. И устанавливаем multi: true, чтобы добавить интерцептор к уже существующим провайдерам.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');

    // Можно добавить заголовки к запросу
    const authReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });

    // Позволяет продолжить отправку запроса
    return next.handle(authReq);
  }
}

//or
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api/posts')) {
      // Применить интерсептор только для запросов на URL-адресе `api/posts`
      const modifiedRequest = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(req);
  }
}

//возможности взаимодействия с ответом сервера в интерсепторе HTTP
//в интерсепторе также можно взаимодействовать с ответом сервера
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Response arrived, body data:', event.body);
        }
      })
    );
  }
}

//__//
//Для добавления нескольких интерцепторов, нам необходимо создать каждый интерцептор в отдельном файле и затем добавить их в нужном порядке в приложение

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', 'xyz') // добавляем заголовок Authorization
    });
    return next.handle(modifiedRequest);
  }
}

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Исходящий запрос:', request.url); // логируем URL исходящего запроса
    return next.handle(request).pipe(
      tap(event => {
        if (event.type === 4) { // проверяем, является ли событие ответом
          console.log('Входящий ответ:', event.body); // логируем тело ответа
        }
      })
    );
  }
}

//порядок, в котором мы добавляем интерцепторы, определяет порядок их выполнения
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth-interceptor.service';
import { LoggingInterceptor } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//------------------------------------------------//
//__Authentication & Route Protection in Angular__//

//создания страницы аутентификации
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // Обработка отправки формы
  }
}
/* 
<h2>{{ isLoginMode ? 'Вход' : 'Регистрация' }}</h2>
<form (ngSubmit)="onSubmitForm(authForm)" #authForm="ngForm">
  <!-- Поля для ввода данных -->
  <button type="submit">{{ isLoginMode ? 'Войти' : 'Зарегистрироваться' }}</button>
</form>
<button (click)="onSwitchMode()">{{ isLoginMode ? 'Переключить на регистрацию' : 'Переключить на вход' }}</button>
*/

//__//
//isLoginMode определяет текущий режим(вход или регистрация).Метод onSwitchMode() переключает режим между true и false.Метод onSubmitForm() обрабатывает отправку формы

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
    if (form.invalid) {
      return; // Если форма невалидна, просто выходим из функции
    }

    const email = form.value.email; // Получаем значение email из формы
    const password = form.value.password; // Получаем значение password из формы

    if (this.isLoginMode) {
      // Код для входа пользователя
      console.log('Вход:', email, password);
    } else {
      // Код для регистрации пользователя
      console.log('Регистрация:', email, password);
    }

    form.reset(); // Сбрасываем значения формы
  }
}
/* 
<h2>{{ isLoginMode ? 'Вход' : 'Регистрация' }}</h2>
<form (ngSubmit)="onSubmitForm(authForm)" #authForm="ngForm">
  <label for="email">E-mail</label>
  <input type="email" id="email" name="email" ngModel required>
  
  <label for="password">Пароль</label>
  <input type="password" id="password" name="password" ngModel minlength="6" required>
  
  <button type="submit" [disabled]="!authForm.valid">
    {{ isLoginMode ? 'Войти' : 'Зарегистрироваться' }}
  </button>
</form>
<button (click)="onSwitchMode()">
  {{ isLoginMode ? 'Переключить на регистрацию' : 'Переключить на вход' }}
</button>
*/

//__//
//сервис AuthService для работы с API Firebase

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  signup(email: string, password: string) {
    return this.http.post < AuthResponse > (
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }

}

interface AuthResponse {
  //...
}

export class AuthComponent {

  constructor(private authService: AuthService) { }
  onSubmit() {
    this.authService.signup(
      this.email.value,
      this.password.value
    ).subscribe()
  }
}

//__//

@Component({
  // ...
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (!form.valid) {
      return;
    }

    if (this.isLoginMode) {
      // Логика для входа
    } else {
      this.authService.signUp(email, password).subscribe(
        responseData => {
          console.log(responseData);
          form.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}

//__//
//лоадер при загрузке данных

import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: <div class="loadingio-eclipse">       <div class="ldio-rpinwye8j0b">         <div></div>       </div>     </div>,
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent { }

//_
@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent // добавляем компонент лоадера
  ],
  imports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//_
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoading = false;

  onSubmit() {
    this.isLoading = true;


    this.isLoading = false;
  }
}

//__//
//обработку ошибки

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
}

@Component({
  selector: 'app-user',
  template: `
    <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
    <form (ngSubmit)="registerUser()">
      <!-- form fields -->
      <button type="submit">Register</button>
    </form>
  `,
  styles: [
    `
    .error-message {
      color: red;
      margin-bottom: 10px;
    }
    `
  ]
})
export class UserComponent {
  errorMessage: string;

  constructor(private userService: UserService) { }

  registerUser() {
    const user = {/* user data from form */ };
    this.userService.registerUser(user).subscribe(
      () => {
        // Registration successful
        // Redirect or show success message
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}

//__//
//final auth example

//auth.guard.ts
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}

//user.model.ts
export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) { }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

//auth-interceptor.service.ts
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      //арантирует, что будет взят только первый элемент из потока данных authService.user
      //Оператор exhaustMap применяет функцию, которая обрабатывает элемент из потока данных authService.use
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}

//auth.service.ts
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject < User > (null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http
      .post < AuthResponseData > (
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwB_3o7Y',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
        .pipe(
          catchError(this.handleError),
          tap(resData => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        );
  }

  login(email: string, password: string) {
    return this.http
      .post < AuthResponseData > (
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwB_3o7Y',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
        .pipe(
          catchError(this.handleError),
          tap(resData => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}

//auth.component.ts
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}

//---------------------------