// Что такое маршрутизация?

// Маршрутизация - это механизм, который позволяет веб-приложению отображать разные компоненты или страницы в зависимости от текущего URL-адреса.

// Использование маршрутизации

// Маршрутизация используется для следующих целей:

// Передача данных между компонентами
// Защита маршрутов
// Уменьшение размера пакета за счет отложенной загрузки
// Определение вложенных и вспомогательных маршрутов
// Разрешение глубокого связывания
// Управление реактивным состоянием
// Структура маршрута

// Маршрут всегда делится на сегменты, и каждый сегмент сопоставляется с соответствующим сегментом URL-адреса слева направо. !Порядок следования сегментов маршрута имеет значение.

// Типы маршрутов
// Существует два типа маршрутов:
// Префиксный: Маршрут сопоставляется по первому сегменту.
// Полный (полный): Маршрут ищет точное сопоставление всего пути.
// Определение маршрутов

// Маршруты определяются в модуле маршрутизации с помощью метода RouterModule.forRoot() для главного пути приложения и RouterModule.forChild() для дочерних маршрутов.

// Получение объекта событий
// Можно получить объект событий, передав вторым параметром маршрута enableTracing: true. Этот объект будет регистрировать все жизненные циклы маршрута.
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forRoot(ROUTES, {
      enableTracing: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "**", component: NotFoundComponent }, // Маршрут по умолчанию
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

//__Подключения дочерних маршрутов
//Пример подключения дочерних маршрутов с помощью метода forChild()
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "parent",
    component: ParentComponent,
    children: [
      { path: "child1", component: Child1Component },
      { path: "child2", component: Child2Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentRoutingModule {}

//_События маршрута в Angular
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.html",
  styleUrls: ["./my-component.css"],
})
export class MyComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Подписываемся на событие событий маршрута
    this.router.events.subscribe((event) => {
      // Проверяем тип события маршрута
      if (event instanceof NavigationEnd) {
        // Получаем объект события маршрута
        const eventData = event.data;

        // Выводим тип события маршрута
        console.log(eventData.type);
      }
    });
  }
}

//Получение объекта события маршрута с помощью router-outlet
//<router-outlet (activate)="onActivate($event)"></router-outlet>
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.html",
  styleUrls: ["./my-component.css"],
})
export class MyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onActivate(event: Event): void {
    // Получаем объект события маршрута
    const eventData = (event as CustomEvent).detail;

    // Выводим тип события маршрута
    console.log(eventData.type);
  }
}

//----------------------------------------------
//__Routing in Standalone Component Applications

//
@Component({
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    HeaderComponent,
    HomeComponent,
    RouterOutlet,
  ],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {}

//
export const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

//
bootstrapApplication(AppComponent, appConfig);

//
export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(ROUTES, withDebugTracing())],
};

//-----------------------------------
//__User Navigation between Views__//
//routerLink - обеспечивает прямую связь с маршрутизатором

// Абсолютные пути
// Абсолютные пути указывают на маршрут относительно корня приложения. Например, /home перейдет к маршруту с путем /home.
// - "/" или " " - абсолютный путь к маршруты 
// <a routerLink="/about">О нас</a>
// <a routerLink="/contact">Контакты</a>


// Относительные пути
// Относительные пути указывают на маршрут относительно текущего маршрута. Например, ./about перейдет к маршруту about, который является дочерним маршрутом текущего маршрута.
// - "./" - относительный путь 
// <a routerLink="./about">О нас</a>
// <a routerLink="./contact">Контакты</a>

// Пути вверх
// Пути вверх указывают на маршрут, который находится на один уровень выше текущего маршрута. Например, ../contact перейдет к маршруту contact, который является родительским маршрутом текущего маршрута.
// - "..//" - поднимаеться на один уровень выше

//Для многосегментных путей рекомендуеться использовать относительные пути чтобы при изменениий родительского пути избежать нарушений, при использовании абсолютных путей при изменений приведет к многочисленным рефакторингам

//лучшей практикой сичтаеться использование токена для определения абсолютного пути маршрута
export enum ROUTER_TOKENS {
  HOME = 'home',
  SHOP = 'shop',
  CONTACT = 'contact',
  ABOUT = 'about',
}

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: ROUTER_TOKENS.HOME,
    pathMatch: 'full',
  },
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeComponent,
  },
  {
    path: ROUTER_TOKENS.SHOP,
    component: ProductsViewComponent,
  },
  {
    path: ROUTER_TOKENS.CONTACT,
    component: ContactComponent,
  },
  {
    path: ROUTER_TOKENS.ABOUT,
    component: AboutComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

//
@Component({
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  readonly Category = Category;
  readonly ROUTER_TOKENS = ROUTER_TOKENS;

  private readonly pieService = inject(PieService);

  changeCategory(category: Category){
    this.pieService.setSelectedCategory(category);
  }
}
/* 
//лучше писать в [ так как легче изменять путь]
<button
    [routerLink]="[ROUTER_TOKENS.ABOUT]"
    routerLinkActive="active-link"
    ariaCurrentWhenActive="page"
    class="menu-item"
    mat-button
>
  About
</button>
*/

//__routerLinkActive
//Директива routerLinkActive используется для добавления классов CSS к элементу, когда соответствующий маршрут активен. Это позволяет стилизовать активные ссылки в навигационном меню или других элементах пользовательского интерфейса
//<a routerLink="/about" routerLinkActive="active">О нас</a>

//__ariaCurrentWhenActive="page"
//К сожалению, визуальная подсказка не помогает слепым или слабовидящим пользователям. Применение атрибута aria-current к элементу может помочь определить активную ссылку. 

//__navigate()
//Метод navigate() сервиса Router используется для перехода к новому маршруту. Он принимает массив путей или строку пути в качестве первого параметра.
import { Router } from '@angular/router';

constructor(private router: Router) { }

navigateToAbout() {
  this.router.navigate(['about']);
}

//navigateByUrl() - может работать только по основному пути
import { Router } from '@angular/router';

constructor(private router: Router) { }

navigateToAbout() {
  this.router.navigateByUrl('/about');
}

//пример
@Component({
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() pie!: Pie;
  readonly cartService = inject(CartService);
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly pieService = inject(PieService);

  selectPie(pie: Pie) {
    this.pieService.setSelectedCategory(pie.category);
    this.pieService.setSelectedPie(pie.id);
    //.. - Это означает, что компонент перейдет к родительскому маршруту, а затем к маршруту shop.
    this.router.navigate([`../${ROUTER_TOKENS.SHOP}`], {
      //activatedRoute: Экземпляр сервиса ActivatedRoute, который предоставляет информацию о текущем маршруте
      //Параметр relativeTo используется для указания того, что путь является относительным к текущему маршруту. Это гарантирует, что компонент будет правильно перенаправлен, даже если родительский маршрут изменится.
      relativeTo: this.activatedRoute
    });
  }
}
/* 
<button
    (click)="selectPie(pie)"
  ><img [src]="pie.image" alt="Delicious Apple Pie" /></button>
*/

