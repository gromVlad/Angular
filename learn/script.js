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

//-----------------------------
//___