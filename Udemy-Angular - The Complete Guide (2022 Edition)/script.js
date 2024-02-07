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
  imports: [RouterModule.forRoot(routes, {useHash:true})],
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

