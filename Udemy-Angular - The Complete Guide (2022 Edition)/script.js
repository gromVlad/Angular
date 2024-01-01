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
////server.component.html
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
//<button [disabled] = 'whatThisInput === ""'(click) = 'whatThisInput = ""' > Click</button >

//___