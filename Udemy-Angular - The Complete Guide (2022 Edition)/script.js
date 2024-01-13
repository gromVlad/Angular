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
export class RecipeListComponent  {
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

//-----------------------