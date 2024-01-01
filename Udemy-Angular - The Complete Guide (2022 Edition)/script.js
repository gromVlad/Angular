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
<input type="text" (input) ='setInput($event)'>
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







