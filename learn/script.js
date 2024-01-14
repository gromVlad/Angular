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