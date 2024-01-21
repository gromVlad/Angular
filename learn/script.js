/* eslint-disable */

//обновление незначительные обычно каждые полгода
//у angular(фреймворк) все с коробки 
//также можно ставить дополнительные пакеты

//.editorconfig - редактор отступов и т.д
//angular.json - разные настройки стандартные
//main.ts - стартовый файл нашего приложения
//компонентна сама по себе не может сущестовавть она должна быть в каком то модуле
//используем декоратор - функция которая принимает какой то класс и возврощает обратно модифицированный как хоок в реакте

//с каким префиксом написанно через такой и создаем новую компоненту

//test.component.ts
@Component({
  selector: 'app-test1',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class Test1Module { }

//app.component.ts
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [Test1Module],
})
export class AppComponent {
  title = 'app';
}

//main.ts
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

//можно создавать компоненту через терминал спец команда ng generate component ...

//Варианты работы с Component prefix- меняем на необходимое название

//можно сразу писать разметку - плохая практика
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

//Подключение SCSS Миграция приложения с CSS на SCSS
//ng add schematics-scss-migrate
//ng g schematics-scss-migrate:scss-migrate

//Настройки Prettier, Eslint, editorСonfig

//-------------------
//___Интерполяция__//
//помещаем текст в скобочки

interface ObjType {
  age: number;
  name: string;
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-first-project';
  obj: ObjType = {
    age: 23,
    name: 'vlad',
  };
}
/* 
<h1>{{title}}</h1>
<p>{{obj.age}}</p>
<p>{{obj.name}}</p>
*/

//------------------------
//___Property binding___//
//динамическое связывание

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDisabled: boolean = true

  constructor() {
    setTimeout(() => {
      this.isDisabled = false
    }, 5000);
  }
}
/* 
<button [disabled]="isDisabled">Send</button>
*/

//--------------------
//___Event binding__//
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = '';
  inputValue: string = '';
  inputKey: string = '';

  onClick() {
    this.title = 'hello';
  }

  onInputEvent(event: Event) {
    this.inputValue = (event.currentTarget as HTMLInputElement).value;
  }

  onInputKey(event: Event) {
    this.inputKey = (event.currentTarget as HTMLInputElement).value;
  }
}
/* 
<h2>{{title}}</h2>
<button (click)="onClick()" >Send</button>
<hr/>
<h2>{{inputValue}}</h2>
<input type="text" (input)="onInputEvent($event)">
<hr/>
<h2>{{inputKey}}</h2>
<input type="text" (keydown.enter)="onInputKey($event)">
*/

//---------------------
//__Two way binding__//
//двусторонее связывание 

//app.module.ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // NGModule подключаем
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inputValue: string = '';
  inputNGModule: string = 'hello';

  onInputEvent(event: Event) {
    this.inputValue = (event.currentTarget as HTMLInputElement).value;
  }
}
/* 
<h2>{{inputValue}}</h2>
<input type="text" (input)="onInputEvent($event)" [value] ="inputValue" >
<hr/>
<!-- то же самое двусторонее связывание только с помощью дерективы ngModel -->
<h2>{{inputNGModule}}</h2>
<input type="text" [(ngModel)]="inputNGModule">
*/

//------------
//__@Input__//
//передача от родителя к ребенку
//лучше при передаче не менять имя пропсов
//также при типизации использовать interface

//app.component.ts
export interface IObject {
  name: string
  age: number
  address?: string
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'hello';
  object: IObject = {
    name: 'vlad',
    age: 25,
  }
}
/* 
<main-child [title]="title" [object]="object"></main-child>
*/

//child.component.ts
@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Input() title?: string;
  @Input() object?: IObject;
}
/* 
<p>{{title}}</p>
<p>{{object?.name}} {{object?.age}} {{object?.address}}</p>
*/

//-------------
//__@Output__//
//передача от ребенка к родителю

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = ''

  sendvalue(value: IValues) {
    this.title = value.name
  }
}
/* 
$event - принимает только один аргумент поэтому завернули все в объект
<main-child (sendEventValue)="sendvalue($event)"></main-child>
<h1>{{title}}</h1>
*/

//child.component.ts
export interface IValues {
  age: string,
  name: string
}

@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Output() sendEventValue = new EventEmitter < IValues > ();

  sendhandlervalue() {
    const myName = 'vlad'
    const myAge = 24
    this.sendEventValue.emit({ name: myName, age: myAge + "" });
  }
}
/* 
<button (click)="sendhandlervalue()">Send</button>
*/

//-------------------------------------
//__@Output закрепление на практике__//

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  arr: string[] = []

  sendvalue(value: string) {
    this.arr.push(value);
  }
}
/* 
<main-child (sendEventValue)="sendvalue($event)"></main-child>
//pipe - | json -> преобразует в json формат 
<h1>{{arr | json}}</h1>
*/

//child.component.ts
@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Output() sendEventValue = new EventEmitter < string > ();
  info: string = ''

  sendhandlervalue() {
    this.sendEventValue.emit(this.info);
    this.info = ''
  }
}
/* 
<button (click)="sendhandlervalue()">Send</button>
<input type="text" [(ngModel)]="info">
*/

//-----------
//__NgFor__//
//деректива - класс который добовляет к нашим элементам дополнительное поведение
//деляться на компонентные, атрибутные и структурные (изменяют DOM элементы)

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  arr: string[] = []

  sendvalue(value: string) {
    this.arr.push(value);
  }
}
/* 
<main-child (sendEventValue)="sendvalue($event)"></main-child>
//кроме index и count есть и другие совйства...
<div *ngFor="let element of arr; index as i; count as lenght">
  <p>
    {{i }} --- {{element}}
  <br>
  count:{{lenght}}
  </p>
</div>
*/

//------------------------------------
//__NgFor сложная структура данных__//

interface Item {
  id: number;
  name: string;
}

interface NestedArray {
  id: number;
  name: string;
  items: Item[];
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nestedArray: NestedArray[] = [
    {
      id: 1,
      name: 'Parent 1',
      items: [
        {
          id: 11,
          name: 'Child 1.1',
        },
        {
          id: 12,
          name: 'Child 1.2',
        },
      ],
    },
    {
      id: 2,
      name: 'Parent 2',
      items: [
        {
          id: 21,
          name: 'Child 2.1',
        },
        {
          id: 22,
          name: 'Child 2.2',
        },
      ],
    },
  ];

}
/* 
<div *ngFor="let items of nestedArray">
  {{items.name}}
  <div *ngFor="let item of items.items">
    {{item.name}}
  </div>
</div>
*/

/* 
Parent 1
Child 1.1
Child 1.2
Parent 2
Child 2.1
Child 2.2
*/

//----------------------------------
//__NgIf, elseBlock, ng template__//

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = true
  nestedValue: string = 'hello'

  constructor() {
    setTimeout(() => {
      this.isLoading = false
    }, 5000);
  }
}
/* 
<div *ngIf="isLoading; else elseBlock">loading</div>
<ng-template #elseBlock>Content to render when condition is false.</ng-template>
*/

//---------------------------------------------------------------------------
//__Как на один тег повесить несколько структурных директив, ng container__//
//Специальный элемент, который может содержать структурные директивы без добавления новых элементов в DOM
//<ng-container></ng-container>
//т.к мы не можем применить много деректив к одному тэгу мы оборачиваем его еще в этот контейнер пустой чтобы применить еще дополнительно другие дерективы
/* 
<ng-container *ngIf="show">
  <p *ngFor="let item of items">{{ item }}</p>
</ng-container>
*/

//--------------
//__NgSwitch__//

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value: string = ''
}
/* 
<input type="text" [(ngModel)]="value">
<div [ngSwitch]="value">
  <p *ngSwitchCase="1">One</p>
  <p *ngSwitchCase="2">Two</p>
  <p *ngSwitchDefault>not correct values</p>
</div>
*/

//-------------
//__NgClass__//
//динамический влияет на классы

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isError: boolean = false

  constructor() {
    setTimeout(() => {
      this.isError = true
    }, 3000);
  }
}
/* 
.red{
  color: red;
}

<h1 [ngClass]="{red: isError}">hell!!!</h1>
*/

//-------------
//__NgStyle__//
//динамический влияет на стили

//<h1 [ngStyle]="{color:'blue'}">hell!!!</h1>

//-----------------------------------
//__Задача на проработку директив__//

interface Fruit {
  id: string
  name: string
  price: number
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  fruits: Fruit[] = [
    { id: '1', name: 'apple', price: 10 },
    { id: '2', name: 'orange', price: 20 },
    { id: '3', name: 'watermelon', price: 30 },
    { id: '4', name: 'banana', price: 5 },
    { id: '5', name: 'pears', price: 12 },
    { id: '6', name: 'raspberries', price: 18 },
    { id: '7', name: 'avocados', price: 14 },
    { id: '8', name: 'mangoes', price: 3 },
    { id: '9', name: 'kiwifruit', price: 7 },
  ];
}
/* 
<div *ngFor="let fr of fruits; index as i; even as ev; odd as od" [ngClass]="{
  'default': fr.price > 15,
  'success': ev ,
  'error': od 
}">
  <ng-container *ngIf="fr.price > 7">
    {{ fr.name }} {{ fr.price }}
  </ng-container>
</div>
*/

//----------
//__Pipe__//
//коснтрукции которые помогают преобразовывать код в разные форматы
//также можно создавать собственные пайпы

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'hello';
  url: string = 'https://www.npmjs.com/package/@angular/cli';
  date: Date = new Date()
}
/* 
<h2>{{title | uppercase}}</h2>
<h2>{{url | slice:-8}}</h2>
<h2>{{date |  date:'fullDate'}}</h2>

HELLO
ular/cli
Sunday, January 14, 2024
*/

//--------------------------------------------------
//__Введение в сервисы и DI dependency injection__//
//для хранения данных и для распространения этих данных на всем приложениий с одного исходного места
//dependency injection патерн при котором компонент получает все необходимые данные экземпляра класса из какого  внешнего источника(angular injection - создает экземпляры класса)
//могут быть определены на уровне приложения, модуля или компонента
//сервисы это singlton - патер проектирование при котором экземпляр класса создаеться лишь единожды / чтобы получали всегда одни и те же данные
//каждый сервис должен отвечать за что-то свое
//можно использовать DAL уровень в сервисе для работы с API и т.д.
//всегда использовать в сервисе декоратор injectable -обеспечивают правильную работу патерна dependency injection / можно присоединять другие сервисы

//--------------------------------------------------------------
//__Создание и регистрация сервиса, DI, модификаторы доступа__//

//модификаторы доступа
//public - по умолчанию / доступны всем / можно использовать в шаблоне
//private - приватное / доступны только внутри класса
//protected - промежуточный / доступны внутри класса и наследникам класса , экземплярам недоступны

//service.service.ts
//без использования Injectable  то добовляем сервис в provider:... 
@Injectable({
  providedIn: 'root' // будет глобально доступнов приложении
})
export class ServiceData {

  value: number = 5
}

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  value: number = 0;

  constructor(private serviceData: ServiceData) { }
  ngOnInit() {
    this.value = this.serviceData.value
  }
}
//<h1>{{value}}</h1>

//--------------------------------
//__Область видимости сервисов__//
//один сервис на обе компоненты , если хотим использовать разные то пользуемся provider:[] в декораторе компоненты

//service.service.ts
@Injectable({
  providedIn: 'root'
})
export class ServiceData {

  value: number = 5

  add() {
    this.value = this.value + 1
  }

  dec() {
    this.value = this.value - 1
  }
}

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  value: number = 0;

  constructor(private serviceData: ServiceData) { }
  ngOnInit() {
    this.value = this.serviceData.value;
  }

  addHandler() {
    this.serviceData.add()
  }
}
/* 
<h1>{{value}}</h1>
<button (click)="addHandler()"> + </button>
<main-child></main-child>
*/

//child.component.ts
@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  value: number = 0;

  constructor(private serviceData: ServiceData) { }

  ngOnInit() {
    this.value = this.serviceData.value;
  }

  decHandler() {
    this.serviceData.dec();
  }
}
/* 
<h1>{{value}}</h1>
<button (click)="decHandler()"> - </button>
*/

//и там и там будет использоваться только оригинальная значения с сервиса

//---------------------------
//__RxJs, BehaviorSubject__//
//отображать изменения при вызове методов в сервисе

//1 способ неправильный - изменить приватный индефиатор в коснструкторе
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(public serviceData: ServiceData) { }

  addHandler() {
    this.serviceData.add()
  }
}
//<h1>{{value}}</h1>

//2 cпособ правильный
//с помощью библиотеки rxjs - реактивное програмирование
//BehaviorSubject - объект с которым мы работаем / ожидает значения и эмитет это значение подписчикам
//будем подписываться на потоки и у нас будет обновляться данные
/* 
Observable: представляет собой идею вызываемой коллекции будущих значений или событий.
Observer: представляет собой набор обратных вызовов, которые знают, как слушать значения, доставляемые Observable.
Подписка: представляет собой выполнение Observable, в основном полезна для отмены выполнения.
Operators: это чистые функции, которые позволяют использовать функциональный стиль программирования для работы с коллекциями с помощью таких операций, как map, filter, concat, reduce и т. д.
Subject: эквивалентен EventEmitter и является единственным способом многократной передачи значения или события нескольким наблюдателям.
Schedulers: централизованные диспетчеры для контроля параллелизма, позволяющие нам координировать время выполнения вычислений, например, setTimeout, requestAnimationFrame или других.
*/

//service.service.ts
@Injectable({
  providedIn: 'root'
})
export class ServiceData {

  //обычно используем с префиксом $ при взаимодействии с BehaviorSubject
  //next - получить новые данные (перезаписать)
  //getValue() - получить текущие данные
  value$: BehaviorSubject<number> = new BehaviorSubject < number > (5)

  add() {
    this.value$.next(this.value$.getValue() + 1)
  }

  dec() {
    this.value$.next(this.value$.getValue() - 1);
  }
}

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  value: number = 0;

  constructor(private serviceData: ServiceData) { }
  ngOnInit() {

    //подписываемся на изменения / и если изменилось то перезаписываем текущие данные
    this.serviceData.value$.subscribe((value: number) => (this.value = value));
  }

  addHandler() {
    this.serviceData.add()
  }
}

//------------------------------
//__Утечки памяти, asyncpipe__//

//при подписке на поток нельзя забывать от него отписаться

//правильная манипуляция чтобы не было утечки памяти
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  value$ = new Observable(); // создаем Observable представляет собой идею вызываемой коллекции будущих значений или событий

  constructor(private serviceData: ServiceData) { }
  ngOnInit() {
    this.value$ = this.serviceData.value$
  }

  addHandler() {
    this.serviceData.add();
  }
}
/* 
<h1>{{value$ | async}}</h1> - чтобы получить значения а не объект то используем pipe async
<button (click)="addHandler()"> + </button>
<main-child></main-child>
*/

//-------------------------------------------------------------------
//__Создание beatyLoggerService, закрепление сервисов на практике__//

//beaty-logger-service.service
type LogLevel = "None" | "Info" | "Warn" | "Error"

@Injectable({
  providedIn: 'root'
})
export class BeatyLoggerServiceService {
  log(level: LogLevel, msg: string): void {
    switch (level) {
      case 'None':
        return console.log(msg);
      case 'Info':
        return console.info('%c' + msg, 'color: #6495ED');
      case 'Warn':
        return console.warn('%c' + msg, 'color: #FF8C00');
      case 'Error':
        return console.error('%c' + msg, 'color: #DC143C');
      default:
        console.debug(msg);
    }
  }
}

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  value$ = new Observable();

  constructor(private serviceData: ServiceData, private beatyLog: BeatyLoggerServiceService) { }
  ngOnInit() {
    this.value$ = this.serviceData.value$
  }

  addHandler() {
    this.serviceData.add();
    this.beatyLog.log('Info', 'success');
  }
}

//------------------------------------------------------
//___Теория вз-ия с сервером, HttpClient, get запрос__//
//при запросе возврощаеться поток а не Promise, потэтому не забываем подписаться на поток

//app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ChildComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

//app.component.ts
import { HttpClient } from '@angular/common/http';

interface Todos {
  addedDate: string,
  id: string,
  order: number,
  title: string
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todosList: Todos[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
      .get < Todos[] > (
        'https://social-network.samuraijs.com/api/1.1//todo-lists',
        {
          withCredentials: true,
          headers: {
            'api-key': 'e908cfda-79ef-4a49-94d7-a2a43ceaff44',
          },
        }
      )
        .subscribe((data) => {
          this.todosList = data;
          console.log(this.todosList);

        });
  }
}
/* 
<div *ngFor="let todo of todosList">
  <p>{{todo.id}} --- {{todo.order}} ---- {{todo.title}}</p>
</div>

-->
9c7d9dc7-8b15-490d-bb8d-8141d638fe36 --- 16 ---- hnvnvhnmn
199a697c-9622-4fd8-be93-8612271a7906 --- 17 ---- work
*/

//-------------------------------------------------------
//___post и delete запросы___//

//app.component.ts
interface Todos {
  addedDate: string,
  id: string,
  order: number,
  title: string
}

interface ApiResponse<T = {}> {
  resultCode: number;
  messages: string[];
  data: T;
}

interface CreateTodoResponse {
  item: Todos;
}

interface CreateTodoRequest {
  title: string;
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todosList: Todos[] = [];
  options = {
    withCredentials: true,
    headers: {
      'api-key': 'e908cfda-79ef-4a49-94d7-a2a43ceaff44',
    },
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http
      .get < Todos[] > (
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        this.options
      )
        .subscribe((data) => {
          this.todosList = data;
          console.log(this.todosList);
        });
  }

  deleteTodoList(todolistId: string) {
    const url = `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`;

    this.http
      .delete < ApiResponse < CreateTodoResponse >> (url, this.options)
        .subscribe((response) => {
          if (response.resultCode === 0) {
            console.log('Todo list deleted successfully');
            this.getTodos();
          } else {
            console.error('Error deleting todo list:', response.messages);
          }
        });
  }

  createTodoList(title: string) {
    const url = 'https://social-network.samuraijs.com/api/1.1/todo-lists';

    const requestBody: CreateTodoRequest = {
      title: title,
    };

    this.http
      .post < ApiResponse < CreateTodoResponse >> (url, requestBody, this.options)
        .subscribe((response) => {
          if (response.resultCode === 0) {
            console.log('Todo list created successfully');
            const createdTodo = response.data.item;
            this.todosList.push(createdTodo);
          } else {
            console.error('Error creating todo list:', response.messages);
          }
        });
  }
}
/* 
<div>
  <h1>Todo Lists</h1>
  <form (submit)="createTodoList(todoTitle.value)">
    <input type="text" placeholder="Enter Todo Title" #todoTitle />
    <button type="submit">Add Todo</button>
  </form>
  <ul>
    <li *ngFor="let todo of todosList">
      {{ todo.title }}
      <button (click)="deleteTodoList(todo.id)">Delete</button>
    </li>
  </ul>
</div>
*/

//--------------------------------------------------------
//__Вынесение логики в service Рефакторинг Environment__//
//API всегда выносим в сервис а не держим в компоненте

//todoService.service.ts
export interface Todos {
  addedDate: string;
  id: string;
  order: number;
  title: string;
}

export interface ApiResponse<T = {}> {
  resultCode: number;
  messages: string[];
  data: T;
}

export interface CreateTodoResponse {
  item: Todos;
}

export interface CreateTodoRequest {
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://social-network.samuraijs.com/api/1.1/todo-lists';
  private options = {
    withCredentials: true,
    headers: {
      'api-key': 'e908cfda-79ef-4a49-94d7-a2a43ceaff44',
    },
  };

  constructor(private http: HttpClient) { }

  //возврощаем поток Observable
  getTodos(): Observable<Todos[]> {
    return this.http.get < Todos[] > (this.apiUrl, this.options);
  }

  deleteTodoList(todolistId: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${todolistId}`;
    return this.http.delete < ApiResponse > (url, this.options);
  }

  createTodoList(title: string): Observable<ApiResponse<CreateTodoResponse>> {
    const requestBody: CreateTodoRequest = {
      title
    };
    return this.http.post < ApiResponse < CreateTodoResponse >> (
      this.apiUrl,
      requestBody,
      this.options
    );
  }
}

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todosList: Todos[] = [];
  public title: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todosList = data;
      console.log(this.todosList);
      console.log(this.title);
    });
  }

  deleteTodoList(todolistId: string): void {
    this.todoService.deleteTodoList(todolistId).subscribe((response) => {
      if (response.resultCode === 0) {
        console.log('Todo list deleted successfully');
        this.getTodos();
      } else {
        console.error('Error deleting todo list:', response.messages);
      }
    });
  }

  createTodoList(): void {
    if (this.title.trim() === '') {
      console.error('Error creating todo list: Title is required');
      return;
    }

    this.todoService.createTodoList(this.title).subscribe((response) => {
      if (response.resultCode === 0) {
        console.log('Todo list created successfully');
        const createdTodo = response.data.item;
        this.todosList.push(createdTodo);
        this.title = '';
      } else {
        console.error('Error creating todo list:', response.messages);
      }
    });
  }
}
/* 
<div>
  <h1>Todo Lists</h1>
  <form (submit)="createTodoList()">
    <!-- [ngModelOptions]="{ standalone: true }" - чтобы не был привязан к форме  ngModel -->
    <input type="text" placeholder="Enter Todo Title" [(ngModel)]="title" [ngModelOptions]="{ standalone: true }"/>
    <button type="submit">Add Todo</button>
  </form>
  <ul>
    <li *ngFor="let todo of todosList">
      {{ todo.title }}
      <button (click)="deleteTodoList(todo.id)">Delete</button>
    </li>
  </ul>
</div>
*/

//создаем окружения - разные базовый данные приложения / туда кидаем ключи , пути и т.д
//ng generate environments -> создание environments
export const environment = {
  apiUrl: 'https://social-network.samuraijs.com/api/1.1',
  apiKey: 'e908cfda-79ef-4a49-94d7-a2a43ceaff44',
};

//-------------------------------------
//___Обработка ошибок в subscribe__//

//аналог типа try / catch / finally
/* 
      this.beerService
      .getBeers()
      .subscribe({
        next: (beers) => {
          console.log(beers);
          this.beers = beers;
          this.title = beers[0].name;
        },
        error: (e) => {
          console.log(e);
          this.title = 'ups';
        },
        complete: () => console.log('done'),
      });

функция next или success вызывается каждый раз, когда поток выдает значение.
error: это функция, вызываемая при возникновении ошибки и получающая ее.
complete: функция, которая вызывается только при завершении потока.
//!!! В нынешней версии все упаковываем в объект  не через зяапятую
*/

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todosList: Todos[] = [];
  public title: string = '';
  public error: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todosList = data;
      console.log(this.todosList);
      console.log(this.title);
    });
  }

  deleteTodoList(todolistId: string): void {
    this.todoService.deleteTodoList(todolistId).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          console.log('Todo list deleted successfully');
          this.getTodos();
        } else {
          console.error('Error deleting todo list:', response.messages);
        }
      },
      error: (e) => {
        this.error = `${e}`;
      },
      complete: () => console.log('done'),
    });
  }

  createTodoList(): void {
    if (this.title.trim() === '') {
      console.error('Error creating todo list: Title is required');
      return;
    }

    this.todoService.createTodoList(this.title).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          console.log('Todo list created successfully');
          const createdTodo = response.data.item;
          this.todosList.push(createdTodo);
          this.title = '';
        } else {
          console.error('Error creating todo list:', response.messages);
        }
      },
      error: (e) => {
        this.error = `${e}`;
      },
      complete: () => console.log('done'),
    });
  }
}


//------------------------------
//___memory leak, unsubscribe__//
//лучше вообще избегать отписку
//если сделал подписку то сделай и отписку
//через жизненнный метод убираем отписку
//типо добовляем все подписки а потом их убираем

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public todosList: Todos[] = [];
  public title: string = '';
  public error: string = '';

  //храним все подписки
  subscriptions: Subscription = new Subscription()

  constructor(private todoService: TodoService) { }

  ngOnDestroy(): void {
    //убираем подписки
    this.subscriptions.unsubscribe()
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    //добовляем подписки в один объект
    this.subscriptions.add(this.todoService.getTodos().subscribe((data) => {
      this.todosList = data;
      console.log(this.todosList);
      console.log(this.title);
    }))
  }

  //........
}

//-------------------------------------------------
//_____Рефакторинг behaviorsubject, async pype___//
//чтобы уменьшить код надо всю логику преобразование кинуть в сервис / также убираем отписки чтобы не пришлось потом отписываться от них
//с помощью объекта behaviorsubject работаем с нашими данными (выше раньше работали с ним)
//т.к мы возврощаем поток то в шаблоне используем pipe async
//также при изменении данныхй используем специальные операторы rxjs (например map через через метод pipe)
//"!" -  указывает на то, что это свойство не будет иметь значение null или undefined

//todoService.service.ts
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$: BehaviorSubject<Todos[]> = new BehaviorSubject < Todos[] > ([]);

  private apiUrl = `${environment.apiUrl}/todo-lists`;
  private options = {
    withCredentials: true,
    headers: {
      'api-key': `${environment.apiKey}/todo-lists`,
    },
  };

  constructor(private http: HttpClient) { }

  getTodos() {
    this.http
      .get < Todos[] > (this.apiUrl, this.options)
        .subscribe((res) => this.todos$.next(res));
  }

  deleteTodoList(todolistId: string) {
    const url = `${this.apiUrl}/${todolistId}`;
    this.http
      .delete < ApiResponse > (url, this.options)
        //используем pipe метод
        .pipe(
          //специальнй оператор в rxjs  map -пропускает каждое исходное значение через функцию преобразования, чтобы получить соответствующие выходные значения.
          map((res) => {
            return this.todos$
              .getValue()
              .filter((todo) => todo.id !== todolistId);
          })
        )
        .subscribe((res) => this.todos$.next(res));
  }

  createTodoList(title: string) {
    const requestBody: CreateTodoRequest = {
      title,
    };
    this.http
      .post < ApiResponse < CreateTodoResponse >> (
        this.apiUrl,
        requestBody,
        this.options
      )
        .pipe(
          map((res) => {
            return [...this.todos$.getValue(), res.data.item];
          })
        )
        .subscribe((res) => this.todos$.next(res));
  }
}

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todosList$!: Observable<Todos[]>
  public title: string = '';
  public error: string = '';

  constructor(private todoService: TodoService) { }


  ngOnInit(): void {
    //подписываемся чтобы принемать данные с behaviorsubject
    this.todosList$ = this.todoService.todos$;

    this.getTodos()
  }

  getTodos(): void {
    this.todoService.getTodos()
  }

  deleteTodoList(todolistId: string): void {
    this.todoService.deleteTodoList(todolistId)
  }

  createTodoList(): void {
    if (this.title.trim() === '') {
      console.error('Error creating todo list: Title is required');
      return;
    }
    this.todoService.createTodoList(this.title)
    this.title = ''
  }
}
/* 
<div>
  <h1>Todo Lists</h1>
  <form (submit)="createTodoList()">
    <!-- [ngModelOptions]="{ standalone: true }" - чтобы не был привязан к форме  ngModel -->
    <input type="text" placeholder="Enter Todo Title" [(ngModel)]="title" [ngModelOptions]="{ standalone: true }"/>
    <button type="submit">Add Todo</button>
  </form>
  <ul>
    <!-- преобразуем поток в данные с помощью pipe async -->
    <li *ngFor="let todo of todosList$ | async">
      {{ todo.title }}
      <button (click)="deleteTodoList(todo.id)">Delete</button>
    </li>
  </ul>
</div>
*/

//----------------------------
//__rxjs catcherror, empty__//

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$: BehaviorSubject<Todos[]> = new BehaviorSubject < Todos[] > ([]);

  private apiUrl = `${environment.apiUrl}/todo-lists`;
  private options = {
    withCredentials: true,
    headers: {
      'api-key': `${environment.apiKey}/todo-lists`,
    },
  };

  constructor(private http: HttpClient, private beatyLogger: BeatyLoggerServiceService) { }

  getTodos() {
    this.http
      .get < Todos[] > (this.apiUrl, this.options)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.beatyLogger.log('Error', error.message);
            //т.к мы нечего не возврощаем но от нас требует поток должен что то возврощать то используем заглушку EMPTY(то же оператор rxjs)
            return EMPTY;
          })
        )
        .subscribe((res) => this.todos$.next(res));
  }

}

//------------------------
//___Рефакторинг Bind___//
//убираем от дублирование в pipe методах

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$: BehaviorSubject<Todos[]> = new BehaviorSubject < Todos[] > ([]);

  private apiUrl = `${environment.apiUrl}/todo-lists`;
  private options = {
    withCredentials: true,
    headers: {
      'api-key': `${environment.apiKey}/todo-lists`,
    },
  };

  constructor(
    private http: HttpClient,
    private beatyLogger: BeatyLoggerServiceService
  ) { }

  //создаем приватный метод 
  private errorhandler(error: HttpErrorResponse) {
    this.beatyLogger.log('Error', error.message);
    return EMPTY;
  }

  //....

  deleteTodoList(todolistId: string) {
    const url = `${this.apiUrl}/${todolistId}`;
    this.http
      .delete < ApiResponse > (url, this.options)
        .pipe(
          //используем bind чтобы не потерять контекст вызова
          catchError(this.errorhandler.bind(this)),
          map((res) => {
            return this.todos$
              .getValue()
              .filter((todo) => todo.id !== todolistId);
          })
        )
        .subscribe((res) => this.todos$.next(res));
  }

  //.....
}

//-----------------------------------------------
//_____Формы, Реактивные формы, FormControl____//
//есть 2 типа : реактивные и шаблонные
//обычно используем реактивные формы
//FormControl - объект с различными свойствами типо value. touched и т.д.

//todoService.service.ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ChildComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

//app.component.ts
@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todosList$!: Observable<Todos[]>;

  //cоздаем форму
  forms = new FormControl('');

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todosList$ = this.todoService.todos$;
    this.getTodos();
  }
  //....

  createTodoList(): void {
    this.todoService.createTodoList(this.forms.value as string);
  }
}
/* 
<form (submit)="createTodoList()">
    //подключаем ее [formControl]="forms"
    <input type="text" placeholder="Enter Todo Title" [formControl]="forms"/>
    <button type="submit">Add Todo</button>
  </form>
*/

//----------------------------------
//___Создание формы, FormGroup___//

//например хотим динамический заполнить поля например с localstorage
/* 
updateName() {
  this.forms.setValue('Nancy');
}
*/

//поля формы
@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  formValueObj: {} | null = null


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  submitForm() {
    this.formValueObj = this.profileForm.value
  }
}
/* 
<form [formGroup]="profileForm" (ngSubmit)="submitForm()">

  <label for="first-name">First Name: </label>
  <input id="first-name" type="text" formControlName="firstName">

  <label for="last-name">Last Name: </label>
  <input id="last-name" type="text" formControlName="lastName">

  <button type="submit">Add</button>
</form>
<p>{{formValueObj | json}}</p>
*/
//{ "firstName": "cvbvcbcb", "lastName": "cbcbcbcb" }

//-------------------------------------------------
//__Краткий обзор возможностей работы с формами__//

//можно сделать вложенные formGroup
@Component({
  standalone: true,
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
    }),
  });
}

//Обновление частей модели данных
//setValue() - устанавливает новое значение для отдельного элемента
//patchValue() Заменяет все свойства, определенные в объекте, которые изменились в модели формы.
updateProfile() {
  this.profileForm.patchValue({
    firstName: 'Nancy',
    address: {
      street: '123 Drew Street',
    },
  });
}

//FormBuilder 
//удобные методы для генерации элементов управления
@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  fprofileForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

//Validating form
//Validators - Предоставляет набор встроенных валидаторов, которые могут использоваться элементами управления формы.
class Validators {
  static min(min: number): ValidatorFn
  static max(max: number): ValidatorFn
  static required(control: AbstractControl<any, any>): ValidationErrors | null
  static requiredTrue(control: AbstractControl<any, any>): ValidationErrors | null
  static email(control: AbstractControl<any, any>): ValidationErrors | null
  static minLength(minLength: number): ValidatorFn
  static maxLength(maxLength: number): ValidatorFn
  static pattern(pattern: string | RegExp): ValidatorFn
  static nullValidator(control: AbstractControl<any, any>): ValidationErrors | null
  static compose(validators: ValidatorFn[]): ValidatorFn | null
  static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null
}
//можем писать и свои методы проверки

//-------------------------------------------------------
//___validators Вывод ошибки disabled, touched, dirty__//

//child.component.ts
@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  formValueObj: {} | null = null;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  submitForm() {
    this.formValueObj = this.profileForm.value;
  }

  //чтобы не обращться постоянно в шаблоне к полю через длинный метод то записываем его в гетер для сокращения
  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('firstName');
  }
}
/* 
<form [formGroup]="profileForm" (ngSubmit)="submitForm()">
  <label for="first-name">First Name: </label>
  <input id="first-name" type="text" formControlName="firstName" />

  <label for="last-name">Last Name: </label>
  <input id="last-name" type="text" formControlName="lastName" />

  <button [disabled]="profileForm.invalid" type="submit">Add</button>
</form>
<p>{{ formValueObj | json }}</p>

<!-- валидация по гетеру firstName-->
<div
  *ngIf="firstName!.invalid && (firstName!.dirty || firstName!.touched)"
  class="error"
>error firstName</div>
*/

//---------------------------------------
//___Вз-ие с несколькими валидаторами__//
//если пустое поле то будет Name is required
//если поле не валидное то - Name is not correcte

/* 
profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.email]),
    lastName: new FormControl('', Validators.required),
});

<div
  *ngIf="firstName!.invalid && (firstName!.dirty || firstName!.touched)"
  class="error"
>
  <div *ngIf="firstName!.errors?.['required']">Name is required.</div>
  //валидацию связываем с Validators.email поэтому и ['email']
   <div *ngIf="firstName!.errors?.['email']">Name is not corrected</div>
</div>
*/

//-------------------------------
//__validators pattern, regex__//

/* 
profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('', Validators.required),
})

<div *ngIf="firstName!.errors?.['pattern']">Name is not corrected</div>;
*/

//------------------------------------
//___Валидация - работа со стилями__//

//1 способ
/* 
<form
  [formGroup]="profileForm"
  (ngSubmit)="submitForm()"

  //используем дескриптор класса
  [ngClass]="{
    errorForm: firstName!.invalid && (firstName!.dirty || firstName!.touched),
    success: firstName!.valid
  }"
>
  <label for="first-name">First Name: </label>
  <input id="first-name" type="text" formControlName="firstName" />

  <label for="last-name">Last Name: </label>
  <input id="last-name" type="text" formControlName="lastName" />

  <button [disabled]="profileForm.invalid" type="submit">Add</button>
</form>
*/

//2 способ / Control status CSS classes
/* 
прописанные класса с коробки
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; 
}

.ng - invalid: not(form)  {
  border - left: 5px solid #a94442;
}

//можно установить глобально стили
//также можем подключать к компоненту не один стиль а несколько т.к. находиться стили в массиве
*/

//-----------------------
//___Роутинг введение__//
//обязательно добовляем router-outlet (директиву) - чтобы angular понимал куда эти роуты вставлять / будет отрисовывать эти роуты именно туда где вставлен router-outlet

@NgModule({
  declarations: [AppComponent, ChildComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'child', component: ChildComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

//app.component.html
//<router-outlet></router-outlet>

//-------------------------------------------
//__Вынесение роутинга в отдельный модуль__//

//app-routing.module.ts
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'form', component: ChildComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  //не забыть экспортировать зависемость чтобы передать ее в главный модуль
  exports: [RouterModule],
})
export class AppRoutingModule { }

//app.module.ts
@NgModule({
declarations: [AppComponent, ChildComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,// <----
  ],
    providers: [],
      bootstrap: [AppComponent],
})
export class AppModule { }

//app.component.html
//.....
//<router-outlet></router-outlet>

//--------------------------------
//__Навигация, активные ссылки__//

//при использовании обычных ссылок приложения будет подгружать все сразу компоненты
//поэтому используем роутинг ссылки
//routerLinkActive - стили для активной ссылки
//routerLink - сама ссылка

//app-routing.module.ts
const routes: Routes = [
  { path: 'todo', component: AppComponent },
  { path: 'form', component: ChildComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

//app.component.html
/* 
<h1>hello</h1>
<div>
  <!-- [routerLinkActiveOptions]="{exact: true}" - обнавлять классы только при точном совпадении URL со ссылкой -->
  <nav>
    <a class="button" routerLinkActive="activebutton" routerLink="/todo">Todo</a>
    <a class="button" routerLinkActive="activebutton" routerLink="/form">Form</a>
  </nav>
</div>
<router-outlet></router-outlet>
*/

//------------------------------
//__page not found Редиректы__//

const routes: Routes = [
  { path: 'todo', component: AppComponent },
  { path: 'form', component: ChildComponent },
  { path: '404', component: PageNotFoundComponent },
  //неизвестный путь
  { path: '**', redirectTo: '404' },
];

//---------------
//___Роутинг___//
//получаем юзера по его id

//app-routing.module.ts
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'form', component: ChildComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: '404', component: PageNotFoundComponent },
  //неизвестный путь
  { path: '**', redirectTo: '404' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

//users.service.ts
export interface User {
  id: number;
  name: string;
  status?: string;
  photos: {
    small: string | null;
    large: string | null;
  };
  followed: boolean;
}

interface Response {
  items: User[];
  totalCount?: number;
  error?: string | null;
}


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiSocial}/users`;
  private options = {
    withCredentials: true,
    headers: {
      'api-key': `${environment.apiKey}`,
    },
  };

  constructor(
    private http: HttpClient,
    private beatyLogger: BeatyLoggerServiceService
  ) { }

  getUsers(): Observable<User[]> {
    return this.http
      .get < Response > (this.apiUrl, this.options)
        .pipe(map((res) => res.items));
  }
}

//users.component.ts
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
}
/* 
<div class="users-container">
  <h2>Users</h2>

  <ng-container *ngIf="users$ | async as users; else loading">
    <div class="user-card" *ngFor="let user of users">
      <div class="user-info">
        <div class="user-avatar">
          <img [src]="user.photos.large || 'placeholder.png'" alt="User Avatar" />
        </div>
        <div class="user-details">
          <h3>{{ user.name }}</h3>
          <p>Status: {{ user.status || 'N/A' }}</p>
          <p>Followed: {{ user.followed ? 'Yes' : 'No' }}</p>
        </div>
        //идем по роуту
        <a [routerLink]="['/profile',user.id]" routerLinkActive="activebutton" class="button"> Link profile</a> 
      </div>
    </div>
  </ng-container>

  <ng-template #loading>
    <div class="loading-spinner">
      <span>Loading...</span>
    </div>
  </ng-template>
</div>
*/

//profile.service.ts
export interface Profile {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: {
    small: string | null;
    large: string | null;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiSocial}/profile`;
  private options = {
    withCredentials: true,
    headers: {
      'api-key': `${environment.apiKey}`,
    },
  };

  constructor(
    private http: HttpClient,
    private beatyLogger: BeatyLoggerServiceService
  ) { }

  getProfile(id: number): Observable<Profile> {
    return this.http
      .get < any > (`${this.apiUrl}/${id}`, this.options)
  }
}

//profile.component.ts
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<Profile>

  constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {
    //получаем id по роуту
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      //далее по полученному id отображаем profile
      this.profile$ = this.profileService.getProfile(+id);
    }
  }
}
/* 
//преобразуем profile$ и созраняем его как profile / далее по нем берем данные
//альтернативный способ - *ngIf="profile$ | async ; let = profile" 
<div *ngIf="profile$ | async as profile" class="profile">
  <h1>{{ profile.fullName }}</h1>
  <p>Looking for a job: {{ profile.lookingForAJob ? 'Yes' : 'No' }}</p>
  <p>Job description: {{ profile.lookingForAJobDescription }}</p>
  
  <h2>Contacts</h2>
  <ul>
    <li>
      <a href="{{ profile.contacts.github }}" target="_blank">GitHub</a>
    </li>
    <li>
      <a href="{{ profile.contacts.vk }}" target="_blank">VK</a>
    </li>
    <li>
      <a href="{{ profile.contacts.facebook }}" target="_blank">Facebook</a>
    </li>
    <li>
      <a href="{{ profile.contacts.instagram }}" target="_blank">Instagram</a>
    </li>
    <li>
      <a href="{{ profile.contacts.twitter }}" target="_blank">Twitter</a>
    </li>
    <li>
      <a href="{{ profile.contacts.website }}" target="_blank">Website</a>
    </li>
    <li>
      <a href="{{ profile.contacts.youtube }}" target="_blank">YouTube</a>
    </li>
    <li>
      <a href="{{ profile.contacts.mainLink }}" target="_blank">Main Link</a>
    </li>
  </ul>
  
  <h2>Photos</h2>
  <div *ngIf="profile.photos.small">
    <img [src]="profile.photos.small" alt="Small Photo">
  </div>
  <div *ngIf="profile.photos.large">
    <img [src]="profile.photos.large" alt="Large Photo">
  </div>
</div>
*/

//--------------------------------------
//__Программная навигация routerlink__//
//делаем кнопку назад
//[routerLink]="['/profile',user.id]" - можно вещать куда хотим и на a , button, div и т.д.

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<Profile>;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private routes: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profile$ = this.profileService.getProfile(+id);
    }
  }

  //програмный подход через Router
  backToUser() {
    this.routes.navigate(['users']);
  }
}
/* 
  //....
  <button (click)="backToUser()">Back to user</button>

  //аналог просто написать с помощью routerLink через шаблон
  <button [routerLink]="['/users']">Back to user 2</button>
*/

//------------------------------------------------
//___Query параметры Реализация псевдо пагинации__
//Query - параметры(query parameters) являются частью URL - адреса веб - страницы и используются для передачи данных на сервер или для выполнения определенных действий на веб - странице.Они представляются в виде пар "ключ=значение" и разделяются символом вопроса "?" от основной части URL.
//https://example.com/search?q=apple&category=fruits
//Query-параметры могут использоваться для различных целей, включая фильтрацию данных, сортировку, пагинацию, поиск и другие действия на веб-странице. Они могут быть переданы на сервер для обработки запроса или использоваться на клиентской стороне для изменения поведения или отображения веб-страницы.

//users.service.ts
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiSocial}/users`;
  private options = {
    withCredentials: true,
    headers: {
      'api-key': `${environment.apiKey}`,
    },
  };

  constructor(
    private http: HttpClient,
    private beatyLogger: BeatyLoggerServiceService
  ) { }

  getUsers(page: number): Observable<User[]> {
    return this.http
      .get < Response > (`${this.apiUrl}?page = ${page}`, this.options)
        .pipe(map((res) => res.items));
  }
}

//users.component.ts
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;
  currentPage: number = 1;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers(this.currentPage);
  }

  getUsers(page: number) {
    this.users$ = this.userService.getUsers(page);
  }

  nextPageUsers() {
    this.currentPage++;
    //чтобы сначало менялся наш url а после уже запрос на next страницу
    this.router.navigateByUrl(`/users?page=${this.currentPage}`).then(() => {
      this.getUsers(this.currentPage);
    });
  }
}
/* 
<button class="button" (click)="nextPageUsers()"> Next page</button>
*/
