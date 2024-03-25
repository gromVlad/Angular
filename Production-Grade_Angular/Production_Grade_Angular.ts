//__Managing Complexity__//
//Сложность при маштобировании приложении это контроль за всеми состояниями
//Нет универсального смособа все зависит о технологии которые мы используем
//Сначало делаем чтобы работало
//Далее знать и сделать это правильно
//После сделать это быстро
//Код должет быть документируемый
//Код должен быть разделенный на мелкие части
//Пользоваться чистыми функциями это уменьшает затраты на управления проектом
//Абстракции должны уменьшить сложность
//Группировать код
//Создавать по принципу переносимости
//Предпочтение отдаеться композиции а не наследованию
//Не нарушать принцип единой ответсвенности
//Если у вас есть скрытое состоясние то перемещайте его в параметр

//Комоненты
//Компоненты должен потреблять ровно столько данных сколько треубет его шаблон
//Не должны обращать внимание на бизнес логику
//Фасады(Сервисы) эффективный способ делегирование между компонентам и остальной частью приложения
//Коспонент не должен становиться библиотекой до сих пор пока не будет использован во многих частях приложении(не сторайтесь все оптимизировать преждевременно)

//Взаимодействия с сервером и состоянием должны быть отделены (избегать связывание)

//Хорошие источники
//книги - чистый код Роберт Мартин
//рефакторинг -Мартин Фаулер
//https://angular.io/guide/styleguide

//Компоненты предтсавления не должны иметь некакой логики просто input или output и все, должны быть очень тонкими
//Контейнерная компонента отвечает за извлечения достоточного количества данных для компоненты представления

//если вы не можите протестировать и переместить компонент то он нуждаеться в рефакторинге

//-------------------------
//__CLI & Nx Workspaces__//
//Angular CLI хорош для использование в одном приложении

//__Data Modeling
//Когда мы хорошо понимаем модель данных нам очень легко работать с ней
//Если понимаем модель данных то можем реализовать фронтенд без бэкэнда
//Сложность всего приложения заключаеться в пользовательском интерфейсе и бизнес логике
//Если данные не соответвует нашему приложения, например плохо написан сервер то можем применить прослойку дополнительную, типо адаптера или фасада(сервисы), который будет обрабатывать эти данные отдельно и передовать уже необходиммые данные, чтобы не перегружать проект ненужными паразитными данными что могут имет последствие

//__Nx Workspaces & Angular CLI
//NX сидит поверх Angular CLI, и генерирует его с некоторыми различиями, с дополнительной функциональностью
//NX позволяет управлять сложностью проектов

//npx create-nx-workspace@10.3.2 production-angular --appName=dashboard --preset=angular-nest --npmScope=fem --linter=tslint --styles=scss --nx-cloud=false

//установим библиотеку concurrently
//yarn add concurrently --save-dev

/* 
serve:api": "nx run api:serve",
"serve:web": "ng serve --open",
"serve:all": "concurrently \"npm run serve:api\" \"npm run serve:web\""
*/

//-------------------------
//__Nx & Monorepo Setup__//
//client-e2e - сквозное тестирование отдельная папка на уровне одного из приложения

//генерируем через nx g lib ...
//Если вы обнаружите, что вам нужно решить одну и ту же проблему в нескольких приложениях (или вы хотите поделиться своим решением с другими разработчиками), у вас есть кандидат на создание библиотеки
//libs/api-interfaces/src/lib/api-interfaces.ts
export interface Message {
  message: string;
}

export interface BaseEntity {
  id: string | null;
}

export interface Widget extends BaseEntity {
  title: string;
  description: string;
}

//ng g lib core-data --parent-module=app/dashboard.../core-data.module.ts -- routing
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [CommonModule],
})
export class CoreDataModule {}
//libs/core-data/src/lib/services/widgets/widgets.service.ts
@Injectable({
  providedIn: "root",
})
export class WidgetsService {}

//nx.json
//Набор зависимостей
/* 
 },
    "dashboard-e2e": {
      "tags": [],
      "implicitDependencies": ["dashboard"]
    },
*/

//tsconfig.base.json
//есть набор alias при использовании библиотек
/* 
"paths": {
      "@env/*": ["apps/dashboard/src/environments/*"],
      "@fem/api-interfaces": ["libs/api-interfaces/src/index.ts"],
      "@fem/core-data": ["libs/core-data/src/index.ts"],
      "@fem/core-state": ["libs/core-state/src/index.ts"],
      "@fem/material": ["libs/material/src/index.ts"],
      "@fem/ui-toolbar": ["libs/ui-toolbar/src/index.ts"]
    }
*/

//Также эспортируем например с библиотеки material angular те модули которые нам нужны
//из libs/material/src/index.ts
import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
//....

@NgModule({
  exports: [
    MatAutocompleteModule,
  //....
  ],
})
export class MaterialModule {}

//----------------------------------
//__Boilerplate App & Components__//
//При использовании сервеса лучше всего использовать абстракцию 
//то есть изменяя тип виджета мы будем менять тип запроса сервера
//в текущий момент используем "widgets", меняем модель на "users" и уже получаем другие данные
//то есть сервер становиться универсальный

@Injectable({
  providedIn: "root",
})
export class WidgetsService {
  model = "widgets";

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Widget[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Widget>(this.getUrlWithId(id));
  }

  create(widget: Widget) {
    return this.http.post(this.getUrl(), widget);
  }

  update(widget: Widget) {
    return this.http.put(this.getUrlWithId(widget.id), widget);
  }

  delete(widget: Widget) {
    return this.http.delete(this.getUrlWithId(widget.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}

//обработку ошибок в общем лучше проводить на уровне effects 
//но лучше придерживаться гибридного подхода и ошибки которые возникают в результате инициализации на стороне сервера ловить сразу при его происхождении а не отдавать выше
//тут не существует плохого и хорошего способа все зависит от задачи

//------------------------
//__Complex Workspaces__//

//можем сгенерировать еще одно приложения angular 
//ng g app __ 
//Прокидываем сервис и в это приложения
//По итогу общий сервис который передает одни и теже данные сразу в 2 приложения

//то же самое делаем и с компонентами, создаем в библиотеке универсальную компоненту а далее ее уже пробрасываем в несколько приложений
//сначало создаем
//nx g lib ui-toolbar --style=scc
//libs/ui-toolbar/src/lib/toolbar/toolbar/toolbar.component.ts

//далее на основании его создаем компоненту в определенном приложении
//nx g c toolbar/toolbar --project=ui-toolbar --style=css
@Component({
  selector: "fem-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  @Output() logout = new EventEmitter();
  @Output() toggleSidenav = new EventEmitter();
}

//Sharing Components Through a Lib
//4.38