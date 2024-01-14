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

//__