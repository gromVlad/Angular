//__Angular Custom Directives__//

import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
  host: {
    '(click)': "onClick()"
  }
})
export class ChangeColorDirective {

  constructor(private el: ElementRef) { }

  onClick() {
    this.el.nativeElement.style.backgroundColor = 'red';
  }

}
//<div appChangeColor>Нажмите на меня, чтобы изменить цвет</div>

//-----------------------------------------------
//__Route Guards | Ensuring Secure Navigation__//
//может загружать guard с помощью CLI

//Защита маршрутов в Angular используется для управления доступом к маршрутам на основе условий, заданных в реализации интерфейса.
//Существует пять типов защиты маршрутов: canActivate, canActivateChild, canLoad, canDeactivate и canActivate.

//Пример использования canActivate:

//Описание: Защита маршрута canActivate используется для проверки того, авторизован ли пользователь для доступа к маршруту.В этом примере мы проверяем, есть ли у пользователя токен в локальном хранилище, и если да, то разрешаем доступ к маршруту.

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token')) {
      // Пользователь авторизован
      return true;
    }

    // Пользователь не авторизован
    this.router.navigate(['/login']);
    return false;
  }

}

//Пример использования canActivateChild:
//Описание: Защита маршрута canActivateChild используется для проверки того, авторизован ли пользователь для доступа к дочернему маршруту.В этом примере мы проверяем, является ли пользователь администратором, и если да, то разрешаем доступ к дочернему маршруту.

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('role') === 'admin') {
      // Пользователь является администратором
      return true;
    }

    // Пользователь не является администратором
    return false;
  }

}

//Пример использования canLoad:
//Описание: Защита маршрута canLoad используется для проверки того, может ли модуль быть загружен.В этом примере мы проверяем, включена ли функция в локальном хранилище, и если да, то разрешаем загрузку модуля.

@Injectable({
  providedIn: 'root'
})
export class FeatureGuard implements CanLoad {

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (localStorage.getItem('feature') === 'enabled') {
      // Функция включена
      return true;
    }

    // Функция отключена
    return false;
  }

}

//Пример использования canDeactivate:
//Описание: Защита маршрута canDeactivate используется для проверки того, может ли пользователь покинуть маршрут.В этом примере мы проверяем, сохранены ли изменения на странице, и если нет, то спрашиваем пользователя, действительно ли он хочет покинуть страницу.

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanDeactivate<any> {

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    if (component.isDirty) {
      // Изменения не сохранены
      return confirm('Вы уверены, что хотите покинуть страницу?');
    }

    // Изменения сохранены
    return true;
  }
}

//Пример использования resolve:
//Описание: Резолверы используются для получения данных перед активацией маршрута.В этом примере мы получаем данные о пользователе из службы и передаем их компоненту маршрута.

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.userService.getUser(route.params['id']);
  }

}

//__Использование всех пяти типов защит маршрутов в модуле маршрутизации
// AuthGuard используется для защиты маршрута login, разрешая доступ только авторизованным пользователям.
// AdminGuard используется для защиты маршрута admin, разрешая доступ только пользователям с ролью администратора.
// FeatureGuard используется для защиты маршрута feature, разрешая загрузку модуля только если функция включена.
// EditGuard используется для защиты маршрута edit, спрашивая пользователя, действительно ли он хочет покинуть страницу, если изменения не сохранены.
// ReloadGuard используется для защиты маршрута reload, обновляя страницу при активации маршрута.

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'feature',
    component: FeatureComponent,
    canLoad: [FeatureGuard]
  },
  {
    path: 'edit',
    component: EditComponent,
    canDeactivate: [EditGuard]
  },
  {
    path: 'reload',
    component: ReloadComponent,
    canActivate: [ReloadGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//-----------------------------------------------------------------
//__Mastering Promises and Observables: Explained with Examples__//

//__Promises
// Создается новое обещание с помощью конструктора Promise.
// Обещание принимает два обратных вызова: resolve для успешного результата и reject для ошибки.
// Асинхронная операция(например, запрос к серверу) выполняется с помощью setTimeout.
// После завершения асинхронной операции вызывается resolve с данными или reject с ошибкой.
// Обработчики then и catch используются для обработки успешного результата и ошибки соответственно.
// Создаем обещание
const promise = new Promise((resolve, reject) => {
  // Асинхронная операция (например, запрос к серверу)
  setTimeout(() => {
    // Успешный результат
    resolve('Данные успешно получены!');
  }, 2000);
});

// Обработка результата обещания
promise.then((data) => {
  // Успешный результат
  console.log(data);
}).catch((error) => {
  // Ошибка
  console.error(error);
});

//__Observable
// Создается новый наблюдаемый объект с помощью конструктора Observable.
// Наблюдаемый объект принимает функцию, которая получает подписчика.
// Асинхронная операция(например, запрос к серверу) выполняется с помощью setTimeout.
// После завершения асинхронной операции вызывается next с данными.
// После завершения передачи данных вызывается complete.
// Подписка на наблюдаемый объект выполняется с помощью метода subscribe.
// Обработчики next, error и complete используются для обработки данных, ошибок и завершения передачи данных соответственно.
// Создаем наблюдаемый объект
const observable = new Observable((subscriber) => {
  // Асинхронная операция (например, запрос к серверу)
  setTimeout(() => {
    // Отправка данных подписчику
    subscriber.next('Данные успешно получены!');
  }, 2000);

  // Завершение передачи данных
  setTimeout(() => {
    subscriber.complete();
  }, 3000);
});

// Подписка на наблюдаемый объект
observable.subscribe({
  next: (data) => {
    // Получение данных
    console.log(data);
  },
  error: (error) => {
    // Ошибка
    console.error(error);
  },
  complete: () => {
    // Завершение передачи данных
    console.log('Передача данных завершена');
  }
});

//----------------------------------------------------
//__forkJoin | Simplifying Asynchronous Operations__//

//Представление оператора RxJS forkJoin, используемого для объединения нескольких наблюдаемых объектов.
// Служба обработки данных
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getAllData(): Observable<any[]> {
    const observable1 = this.getData1();
    const observable2 = this.getData2();
    const observable3 = this.getData3();

    // Объединяем наблюдаемые объекты с помощью forkJoin
    return forkJoin([observable1, observable2, observable3]);
  }

  // Методы для получения отдельных данных (например, запросы к серверу)
  getData1(): Observable<any> { }
  getData2(): Observable<any> { }
  getData3(): Observable<any> { }
}

//__
// Компонент приложения
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data: any[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Подписываемся на объединенный наблюдаемый объект
    this.dataService.getAllData().subscribe((data) => {
      //После обновления страницы все данные отображаются одновременно
      this.data = data;
    });
  }
}

//---------------------------------------------------------------
//__HTTP Interceptor | Supercharge Your Angular HTTP Requests__//
//Перехватчики - это уникальный тип сервиса Angular, который позволяет перехватывать входящие или исходящие HTTP-запросы с помощью HttpClient

// Перехватчик для добавления токена аутентификации
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Получение токена аутентификации из локального хранилища
    const token = localStorage.getItem('token');

    // Добавление токена к заголовкам запроса
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Передача измененного запроса следующему перехватчику или обработчику
    return next.handle(request).pipe();
  }
}

//__
// Модуль приложения
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }

//-----------------------------------------------------------
//__trackBy | Optimizing Performance with ngFor's trackBy__//
//trackBy оптимизирует производительность, особенно при работе с большими списками

// Компонент с использованием ngFor и trackBy
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: '<ul><li *ngFor="let user of users; trackBy: trackByFn">{{user.name}}</li></ul>'
})
export class UserListComponent {

  users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
  ];

  // Функция trackBy, возвращающая индекс элемента
  trackByFn(index: number, item: any): number {
    //return item.id
    return index;
  }
}

//-----------------------------------------------------------------
//__Custom Toastr | Taking Your Notifications to the Next Level__//

//Создание компонента toastr с контейнером для сообщения
@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  private showToast: boolean = false;
  private message: string;
  private type: string;
  private autoclose: boolean;

  showToast(message: string, type?: string, autoclose?: boolean) {
    this.showToast = true;
    this.message = message;
    this.type = type;
    this.autoclose = autoclose;

    if (autoclose) {
      setTimeout(() => {
        this.closeToast();
      }, 4000);
    }
  }

  closeToast() {
    this.showToast = false;
  }
}
/* 
<div class="toastr">
  <span class="icon"></span>
  <span class="message">{{message}}</span>
  <button class="close-btn" (click)="closeToast()">x</button>
</div>
*/

//__
@Component({
  selector: 'app-first-component',
  template: `<h1>First Component</h1>`
})
export class FirstComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.toastrService.showToast('Hello from First Component!');
  }

}

//------------------------------------------------------
//__Custom Spinner | Create Engaging Loading Effects__//

//создания пользовательского спиннера в Angular

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getData(): Observable<any> {
    return of(null).pipe(delay(10000));
  }

}

//__
@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.dataService.getData();
  }

}

//__
@Component({
  selector: 'app-final',
  template: `
    <div class="facts" *ngIf="!isLoading">
      <h1 >{{fact[currentIndex]}}</h1>
    </div>
  `
})
export class FinalComponent implements OnInit {

  isLoading: boolean = true;
  facts: string[] = ['Fact 1', 'Fact 2', 'Fact 3'];
  currentIndex: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(() => {
      this.isLoading = false;
      this.changeText();
    });
  }

  changeText() {
    if (this.currentIndex < this.facts.length) {
      setTimeout(() => {
        this.currentIndex++;
        this.changeText();
      }, 1000);
    }
  }

}

//----------------------------------------------------------------
//__ActivatedRoute vs ActivatedRouteSnapshot | Key Differences__//
//использовать ActivatedRouteSnapshot, когда нужно получить параметр маршрута только один раз, и использовать подписку, когда параметр маршрута должен обновляться

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  template: `<h1>User {{id}}</h1>`
})
export class UserComponent implements OnInit, OnDestroy {

  id: number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Получение параметров маршрута с помощью моментального снимка
    this.id = this.activatedRoute.snapshot.params['id'];

    // Получение параметров маршрута с помощью подписки
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    // Отмена подписки для предотвращения утечек памяти
    this.activatedRoute.params.unsubscribe();
  }

}

//----------------------------------------------------------------
//__Mastering Dark Light Theme Toggle: A Step-by-Step Tutorial__//

/* 
body {
  background-color: #fff;
  color: #000;
}

.dark-theme {
  background-color: #000;
  color: #fff;
}
*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggler',
  template: `
    <button (click)="toggleTheme()">Toggle Theme</button>
  `
})
export class ThemeTogglerComponent implements OnInit {

  darkTheme: boolean = false;

  ngOnInit() {
    this.darkTheme = localStorage.getItem('darkTheme') === 'true';
    this.setTheme();
  }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('darkTheme', this.darkTheme ? 'true' : 'false');
    this.setTheme();
  }

  setTheme() {
    document.body.classList.toggle('dark-theme', this.darkTheme);
  }

}

//__
@NgModule({
  declarations: [
    AppComponent,
    ThemeTogglerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//---------------------------------
//__Unlocking the Power of SCSS__//

//SCSS (Sassy CSS) является предпочтительным вариантом, поскольку он поддерживает все функции Sass и имеет простой синтаксис, похожий на CSS.

/* 
// Переменные
$primary-color: #007bff;
$secondary-color: #6c757d;

// Миксины
@mixin border-radius($radius) {
  border-radius: $radius;
}

// Компоненты
.button {
  @include border-radius(5px);
  background-color: $primary-color;
  color: $secondary-color;
  padding: 10px 20px;
}
*/

//-------------------------------------------------------------------
//__Mastering Angular's ng-content, ng-template, and ng-container__//

//ng-content - это директива Angular, которая позволяет включать контент внутри компонента из внешнего кода
@Component({
  selector: 'app-custom-component',
  template: `
    <div class="custom-component">
      <h1>Custom Component</h1>
      <ng-content></ng-content>
    </div>
  `,
})
export class CustomComponent { }

//ng-template - это механизм Angular, который позволяет определять шаблоны, которые можно использовать для отображения контента динамически
@Component({
  selector: 'app-custom-component',
  template: `
    <div class="custom-component">
      <h1>Custom Component</h1>
      <ng-template #myTemplate>
        <p>This is a template content.</p>
      </ng-template>
      <ng-container *ngTemplateOutlet="myTemplate"></ng-container>
    </div>
  `,
})
export class CustomComponent { }

//ng-container - это вспомогательная директива Angular, которая позволяет группировать элементы и применять на них директивы, не создавая дополнительных DOM-элементов. ng-container не отображается в фактической разметке страницы и используется для логической группировки элементов
@Component({
  selector: 'app-custom-component',
  template: `
    <div class="custom-component">
      <h1>Custom Component</h1>
      <ng-container *ngIf="showContent">
        <p>This content is displayed conditionally.</p>
      </ng-container>
    </div>
  `,
})
export class CustomComponent {
  showContent = true;
}

//---------------------------------------------------------
//__Async Pipe | Simplifying Asynchronous Data Handling__//

//встроенный механизм в Angular, который позволяет обрабатывать асинхронные данные в шаблонах компонентов
//Async Pipe упрощает обработку асинхронных данных в шаблонах, устраняет необходимость вручную подписываться на Observable или разрешать Promise, автоматически помечает компонент для проверки изменений при выдаче нового значения.
@Component({
  selector: 'app-async-pipe',
  template: `
    <p>Observable data: {{ observableData | async }}</p>
    <p>Promise data: {{ promiseData | async }}</p>
  `
})
export class AsyncPipeComponent implements OnInit {
  observableData: Observable<string>;
  promiseData: Promise<string>;

  ngOnInit(): void {
    this.observableData = of('Observable data');
    this.promiseData = Promise.resolve('Promise data');
  }
}

//--------------------------------------------------------------
//__DOM Sanitizer | XSS Attack | Ensuring Secure Web Content__//

//DOM Sanitizer - это сервис в Angular, который помогает предотвратить межсайтовые сценарии (XSS) атаки. XSS-атаки происходят, когда злоумышленник может внедрить вредоносный код в веб-страницу, что позволяет им выполнять произвольные действия в браузере пользователя.Идет из коробки но при получении данных можем

//Метод bypassSecurityTrustHtml() используется для дезинфекции HTML-кода
//Использование метода bypassSecurityTrustHtml() гарантирует, что HTML-код, отображаемый в вашем приложении Angular, безопасен и не может использоваться для выполнения вредоносных действий.
import { Component, OnInit, DomSanitizer } from '@angular/core';

@Component({
  selector: 'app-dom-sanitizer',
  template: `
    <div [innerHTML]="sanitizedHtml"></div>
  `
})
export class DomSanitizerComponent implements OnInit {
  sanitizedHtml: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml('<p>Safe HTML</p>');
  }
}

//------------------------------------------------------------
//__Custom Validator | Boosting Form Validation Like a Pro__//
//Пользовательские валидаторы позволяют выполнять сложные проверки в реактивных формах Angular, которые не могут быть выполнены с помощью встроенных валидаторов.

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class NoSwearWordsValidator implements ValidatorFn {
  validate(control: AbstractControl): ValidationErrors | null {
    const swearWords = ['damn', 'hell', 'shit'];
    const comment = control.value;

    if (swearWords.some((word) => comment.includes(word))) {
      return { noSwearWords: true };
    }

    return null;
  }
}

//__
@Component({
  selector: 'app-custom-validator',
  template: `
    <form [formGroup]="formGroup">
      <input formControlName="comment" />

      <button type="submit">Submit</button>
    </form>
  `
})
export class CustomValidatorComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      comment: ['', [Validators.required, new NoSwearWordsValidator()]]
    });
  }
}
//------------------------------------------------------------
//__Change Detection | How Angular Tracks and Updates Data__//
