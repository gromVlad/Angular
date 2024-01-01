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
  styleUrls: ['./app.component.scss']
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



