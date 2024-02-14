//библиотека NgRx реализует принцип работы Redux для Angular приложений. Главная цель NgRx — централизовать и сделать максимально понятным управление всеми состояниями приложения.

//Цель достигается благодаря заложенным в библиотеке нескольким фундаментальным принципам:

//Наличие единственного источника данных о состоянии — хранилища (store);
//Доступность состояния только для чтения;
//Изменение состояние осуществляется только через действия (actions), которые обрабатываются редюсерами (reducer), представляющими собой чистые функции.

//Actions
//Действия отражают уникальные события, которые происходят в Angular приложении, и используются для передачи данных в хранилище

//Reducers
//определяют, как должно измениться состояние Angular приложения
//NgRx Reducers регистрируются в хранилище и должны быть чистыми функциями. Редюсер принимает исходное состояние и возникшее действие в качестве аргументов, но для применения изменений он должен вернуть новое состояние, но ни в коем случае не изменять напрямую исходное.

//Store
//содержит в себе полное состояние всего приложения и существует в единственном экземпляре

//--------------------------
//__Actions
// Код интерфейса Action
interface Action {
  type: string;
}

import { Action } from '@ngrx/store';

export class GetUsers implements Action {
  readonly type = '[Users Page] GetUsers';
}

//Для инициирования обработки NgRx Actions хранилищем, используется метод хранилища dispatch()
// Здесь переменная store является экземпляром класса Store
store.dispatch(new GetUsers());

//Общепринято помещать внутри класса переданные извне данные в свойство payload.
export class DeleteUser implements Action {
  readonly type = '[Users Page] DeleteUser';

  constructor(public payload: { id: number }) { }
}
store.dispatch(new DeleteUser({ id: 7 }));

//описывайте все действия в виде перечислений
export enum UsersActions {
  GetUsers = '[Users Page] GetUsers',
  DeleteUser = '[Users Page] DeleteUser',
  DeleteAllUsers = '[Users Page] DeleteAllUsers',
}

export class GetUsers implements Action {
  readonly type = UsersActions.GetUsers;
}

export class DeleteUser implements Action {
  readonly type = UsersActions.DeleteUser;

  constructor(public payload: { id: number }) { }
}

export class DeleteAllUsers implements Action {
  readonly type = UsersActions.DeleteAllUsers;
}

//Смешанный тип
export type UsersUnion =
  | GetUsers
  | DeleteUser
  | DeleteAllUsers;

//необходим для краткости записи
export function usersReducer(state = initialState, action: UsersUnion) { }

//-------------------------
//__Reducers
//NgRx Reducers являются чистыми функциями и отвечают за смену состояния хранилища в Angular приложении в ответ на возникновение действия, при этом каждый редюсер может изменять только определенную часть состояния.

//users.actions.ts
export enum UsersActions {
  LoadUsers = '[Users Page] LoadUsers',
  DeleteUsers = '[Users Page] DeleteUsers',
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export class LoadUsers implements Action {
  readonly type = UsersActions.LoadUsers;

  constructor(public payload: { users: User[] }) { }
}

export class DeleteUsers implements Action {
  readonly type = UsersActions.DeleteUsers;
}

export type UsersUnion = LoadUsers | DeleteUsers;

//users.reducer.ts
import {
  UsersUnion,
  UserActions,
} from '../actions/users.actions';

export interface State {
  users: User[];
  count: number;
}

const initialState: State = {
  users: [],
  count: 0,
};

export function usersReducer(
  state: State = initialState,
  action: UsersUnion
) {
  switch (action.type) {
    case UsersActions.LoadUsers:
      return {
        ...state,
        users: action.payload.users,
      };
    case UsersActions.DeleteUsers:
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
}

//Любое действие, отправляемое в хранилище методом dispatch(), передается всем редюсерам, каждый из которых либо изменяет состояние согласно текущему действию, либо возвращает состояние нетронутым, если обработка такого действия в нем не предусмотрена
//При первом вызове редюсера в качестве значения состояния ему передается undefined, поэтому очень важно определить значение части хранилища по умолчанию, которое задаст необходимую структуру и, если это необходимо, исходные значения свойств этой структуры

//В приложении регистрация NgRx Reducers осуществляется с помощью метода forRoot() модуля StoreModule.
@NgModule({
  imports: [StoreModule.forRoot({ users: usersReducer })],
})

//----------
//__Store
//Формирование глобального состояния в NgRx Store происходит путем объединения более мелких состояний

//users.reducer.ts
export interface State {
  /* ... */
}
export function usersReducer(
  state: State = initialState,
  action: UsersUnion
) {
  /* ... */
}

//articles.reducer.ts
export interface State {
  /*...*/
}
export function articlesReducer(
  state: State = initialState,
  action: ArticlesUnion
) {
  /*...*/
}

//index.ts
import * as Users from './reducers/users.reducer';
import * as Articles from './reducers/articles.reducer';

export interface State {
  users: Users.State;
  articles: Articles.State;
}

export const reducers: ActionReducerMap<State> = {
  users: Users.usersReducer,
  articles: Articles.articlesReducer,
};

//app.module.ts
import { reducers } from './store/reducers/index';

@NgModule({
  imports: [StoreModule.forRoot(reducers)],
})
export class AppModule { }

//__может формироваться из состояний, определенных для второстепенных модулей
//users.module.ts
import { usersReducer } from './reducers/users.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('users', usersReducer),
    UsersModule,
  ],
})
export class UsersModule { }

//app.module.ts
@NgModule({
  imports: [StoreModule.forRoot({}), UsersModule],
  // ...
})
export class AppModule { }

//Доступ к глобальному состоянию осуществляется через экземпляр сервиса Store, прямое обращение к которому возвращает объект Observable.
//articles.actions.ts
import { Action } from '@ngrx/store';

export enum ArticlesActions {
  LoadArticle = '[Articles Page] LoadArticle',
  PublishArticle = '[Articles Page] PublishArticle',
}

export interface Article {
  id: number;
  title: string;
  published: boolean;
}

export class LoadArticle implements Action {
  readonly type = ArticlesActions.LoadArticle;

  constructor(public payload: { article: Article }) { }
}

export class PublishArticle implements Action {
  readonly type = ArticlesActions.PublishArticle;

  constructor(public payload: { id: number }) { }
}

export type ArticlesUnion = LoadArticle | PublishArticle;

//articles.reducer.ts
export interface State {
  articles: { [id: number]: Article },
  count: number;
}

const initialState: State = {
  articles: {},
  count: 0
};

export function articlesReducer(state: State = initialState, action: ArticlesUnion) {
  switch (action.type) {
    case ArticlesActions.LoadArticle:
      return {
        ...state,
        articles: { ...state.articles, [action.payload.article.id]: action.payload.article }
      };
    case ArticlesActions.PublishArticle:
      return {
        ...state,
        articles: {
          ...{ published: true, ...state.article[action.payload.id] }, ...state.articles
        };
        default:
                    return state;
      }
  }
}
//app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.subscribe((state) => console.log(state));

    this.store.dispatch(
      new LoadArticle({
        article: {
          id: 1,
          title: 'Learn NgRx',
          publish: false,
        },
      })
    );

    this.store.dispatch(new PublishArticle({ id: 1 }));
  }
}

//Значение NgRx Store передается обработчику непосредственно в момент вызова метода subscribe() и далее при любом изменении состояния.
//Для доступа к определенным частям состояния или вычисления новых данных на основе уже имеющихся в хранилище, используйте селекторы.

//------------------
//__Selectors
//В NgRx селекторы представляют собой чистые функции и используются для получения определенных частей глобального состояния

//createSelector()
//Селекторы создаются с помощью функции NgRx createSelector(), которая может принимать неограниченное количество функций, каждая из которых возвращает определенную часть состояния. При этом самой последней функции, которая и возвращает конечный результат, в качестве аргументов передаются результаты первых функций.
export interface User {
  id: number;
  name: string;
  email: string;
}

interface Article {
  id: number;
  user_id: number;
  title: string;
}

interface UsersState {
  list: { [id: number]: User };
  count: number;
}

interface ArticlesState {
  list: { [id: number]: Article };
  count: number;
}

export interface State {
  users: UsersState;
  articles: ArticlesState;
}

//Пример получения данных состояния
const selectUsers = (state: State) => state.users;

export const selectUsersList = createSelector(
  selectUsers,
  (state: UsersState) => state.list
);

//NgRx селекторы могут быть использованы для создания других селекторов (композиция)
function selectUsers(state: State) {
  return state.users;
}

export const selectUsersCount = createSelector(
  selectUsers,
  (state: UsersState) => state.count
);

const selectArticles = (state: State) => state.articles;

export const selectArticlesCount = createSelector(
  selectArticles,
  (state: ArticlesState) => state.count
);

export const selectCountSum = createSelector(
  selectUsersCount,
  selectArticlesCount,
  (usersCount, articlesCount) =>
    usersCount + articlesCount
);

//__select()
//Для использования селектор необходимо передать функции NgRx select(), которая вызывается в методе pipe() хранилища (экземпляра объекта Store).
//можете совместно с NgRx select() использовать имеющиеся в RxJS операторы
export class AppComponent {
  constructor(private store: Store) {
    this.store
      .pipe(select(selectCountSum))
      .subscribe((vl) => console.log(vl));
  }
}

//Для получения состояния на основе данных, отсутствующих в хранилище, вторым параметром функции NgRx select() передайте эти данные и они будут доступны в последней функции в качестве последнего параметра
const selectArticles = (state: State) => state.articles;

export const selectArticlesList = createSelector(
  selectArticles,
  (state: ArticlesState) => state.list
);

export const selectArticlesByUser = createSelector(
  selectArticlesList,
  (articles, props) => {
    return articles.filter(
      (item) => item.user_id === props.user_id
    );
  }
);

//в компоненте
this.store
  .pipe(select(selectArticlesByUser, { user_id: 3 }))
  .subscribe((vl) => console.log(vl));


//__createFeatureSelector()
//Для удобства получения срезов состояния верхнего уровня глобального объекта используйте функцию NgRx createFeatureSelector(), которая строковым параметром принимает один из верхних ключей.
const selectArticles = createFeatureSelector < State > (
  'articles'
);

//__Мемоизация
//Мемоизация позволяет избежать повторных вычислений при вызове функции, которая уже вызывалась ранее
//При первом вызове запоминается возвращаемое функцией значение, которое будет пересчитано и обновлено при любом изменении в наборе параметров, в противном же случае будет возвращаться сохраненное значение.
//Для сброса (удаления) сохраненного значения необходимо вызвать у селектора метод release(). Настоятельно рекомендуется его использовать, если вычисленные данные занимают в памяти много места и в последующем вам больше не понадобятся.
//получаем и запоминаем все статьи по запрашиваемому user_id
this.store
  .pipe(select(selectArticlesByUser, { user_id: 3 }))
  .subscribe((vl) => console.log(vl));

//сбрасываем сохраненное значение
selectArticlesByUser.release();

//------------------------
//__Effects
//NgRx Effects реализуют побочные эффекты, работающие на основе библиотеки RxJS, применительно к хранилищу
//NgRx Effects устанавливаются отдельно - npm i @ngrx/effects

//__посмотрим на пример без них

//articles.service.ts
@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get('/api/articles');
  }
}

//articles.component.ts
@Component({
  selector: 'app-articles',
  template: `
        <ul>
            <li
                *ngFor="let item of articles"
                [textContent]="item.title"
            ></li>
        </ul>
    `,
})
export class ArticlesComponent {
  articles: Article[] = [];

  constructor(private articlesService: ArticlesService) {
    this.getArticles();
  }

  getArticles() {
    this.articles = [];

    this.articlesService.getArticles().subscribe(
      (items) => (this.articles = items),
      (err) => console.log(err)
    );
  }
}

//__c внедрением NgRx Effects

//articles.actions.ts
export enum ArticlesActions {
  LoadArticles = '[Articles Page] Load Articles',
  ArticlesLoadedSuccess = '[Articles Page] Articles Loaded Success',
  ArticlesLoadedError = '[Articles Page] Articles Loaded Error',
}

export interface Article {
  id: number;
  author: string;
  title: string;
}

export class LoadArticles implements Action {
  readonly type = ArticlesActions.LoadArticles;
}

export class ArticlesLoadedSuccess implements Action {
  readonly type = ArticlesActions.ArticlesLoadedSuccess;

  constructor(public payload: { articles: Article[] }) { }
}

export class ArticlesLoadedError implements Action {
  readonly type = ArticlesActions.ArticlesLoadedError;
}

export type ArticlesUnion =
  | LoadArticles
  | ArticlesLoadedSuccess
  | ArticlesLoadedError;

//articles.reducer.ts
//with select
export interface ArticlesState {
  list: Article[];
}

const initialState: ArticlesState = {
  list: [],
};

export function articlesReducer(
  state: State = initialState,
  action: ArticlesUnion
) {
  switch (action.type) {
    case ArticlesActions.ArticlesLoadedSuccess:
      return {
        ...state,
        list: action.payload.articles,
      };
    case ArticlesActions.ArticlesLoadedError:
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
}

const selectArticles = (state: State) => state.articles;

export const selectArticlesList = createSelector(
  selectArticles,
  (state: ArticlesState) => state.list
);

//articles.effects.ts
@Injectable()
export class ArticlesEffects {
  constructor(
    //Создание NgRx Effect начинается c отслеживания потока событий, который представлен сервисом Actions c декоратором @Effect()
    private actions$: Actions,
    private articlesService: ArticlesService
  ) { }

  //@Effect({ dispatch: false }) - новое действие генерировать не нужно
  @Effect()
  //начала действие обрабатывается редюсером, а только потом попадает в поток сервиса Actions
  loadArticles$ = this.actions$.pipe(
    //с помощью оператор ofType() задается тип действия
    ofType(ArticlesActions.LoadArticles),
    mergeMap(() =>
      this.articlesService.getArticles().pipe(
        map(
          (articles) =>
            new ArticlesLoadedSuccess({
              articles: articles,
            })
        ),
        catchError(() =>
          of(new ArticlesLoadedError())
        )
      )
    )
  );

}

//app.module.ts
@NgModule({
  //на уровне корневого модуля, то необходимо использовать метод forRoot(), если на уровне второстепенного — forFeature(). Оба метода принимают массив эффектов к качестве параметра
  imports: [EffectsModule.forRoot([ArtilcesEffects])],
})
export class AppModule { }

//articles.component.ts
@Component({
  selector: 'app-articles',
  template: `
        <ul>
            <li
                *ngFor="let item of articles"
                [textContent]="item.title"
            ></li>
        </ul>
    `,
})
export class ArticlesComponent {
  articles$: Observable = this.store.pipe(
    select(selectArticlesList)
  );

  constructor(private store: Store) {
    this.store.dispatch(new LoadArticles());
  }
}

//__Жизненный цикл NgRx Effects
// NgRx предоставляет возможность управлять жизненным циклом эффекта с помощью реализации интерфейсов:
// OnInitEffects — возвращает действие сразу после того, как эффект был зарегистрирован в приложении;
// OnRunEffects — позволяет управлять началом и окончанием работы эффекта(по умолчанию начинается и заканчивается вместе с работой приложения);
// OnIdentifyEffects — позволяет регистрировать NgRx Effects несколько раз(по умолчанию эффект регистрируется в Angular приложении один раз, независимо от того, сколько раз загружается сам класс эффекта).
@Injectable()
export class ArticlesEffects
  implements OnInitEffects, OnRunEffects {

  constructor(
    private actions$: Actions,
    private articlesService: ArticlesService
  ) { }

  @Effect()
  loadArticles$ = this.actions$.pipe(
    ofType(ArticlesActions.LoadArticles),
    startWith(new LoadArticles()),
    mergeMap(() =>
      this.articlesService.getArticles().pipe(
        map(
          (articles) =>
            new ArticlesLoadedSuccess({
              articles: articles,
            })
        ),
        catchError(() =>
          of(new ArticlesLoadedError())
        )
      )
    )
  );
  
  ngrxOnInitEffects(): Action {
    return new ArticlesEffectsInit();
  }

  ngrxOnRunEffects(
    resolvedEffects$: Observable<EffectNotification>
  ) {
    return this.actions$.pipe(
      ofType(ArticlesActions.ArticlesEffectsInit),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(
            this.actions$.pipe(
              ofType(
                ArticlesActions.ArticlesLoadedSuccess
              )
            )
          )
        )
      )
    );
  }
}

//В пределах одного класса может быть реализовано сразу несколько эффектов.
@Injectable()
export class ArticlesEffects {
  @Effect()
  loadArticles$ = '.../'

  @Effect()
  loadAuthors$ = '.../'
}

//------------------------
//__Router store
//NgRx Router State, который позволяет отслеживать процесс смены URL в Angular приложении с помощью действий
//npm i @ngrx/router-store --save

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot(),
  ],
})

//состояния router выглядит следующим образом
// {
//   state: { - информация в текущем маршруте, содержит два свойства
//     root: {/*...*/ }, - экземпляр корневого маршрута
//     url: '/' -  текущий URL-адрес
//   },
//   navigationId: 1 - порядковый номер смены маршрутизации в рамках текущей сессии работы Angular приложения
// }

/* 
В NgRx Router Store предусмотрены пять действий, каждое из которых представляет одну из стадий процесса смены маршрута:
ROUTER_REQUEST — начало перехода на другой URL;
ROUTER_NAVIGATION — сам процесс перехода, вызывается до выполнения всех Guards и Resolvers;
ROUTER_NAVIGATED — успешный переход на заданный URL;
ROUTER_CANCEL — генерируется, если смена URL была заблокирована Guard или Resolver;
ROUTER_ERROR — генерируется, если в процессе перехода возникает ошибка
Действия ROUTER_CANCEL и ROUTER_ERROR содержат информацию в маршруте с которого осуществляется переход.
*/

//Конфигурация NgRx Router Store
//Метод StoreRouterConnectingModule.forRoot() в качестве необязательного параметра принимает объект с пользовательскими настройками NgRx Router Store.

// Передаваемый объект должен реализовывать интерфейс StoreRouterConfig с тремя не обязательными свойствами:
// stateKey — имя части глобального состояния, в которой будут храниться все данные маршрутизации(по умолчанию router); помимо строки может принимать селектор;
// serializer — позволяет кастомизировать структуру данных состояния, которое передается в каждом действии;
// navigationActionTiming — определяет момент генерации действия ROUTER_NAVIGATION и может быть либо NavigationActionTiming.PreActivation(по умолчанию), либо NavigationActionTiming.PostActivation.

// NavigationActionTiming.PreActivation означает, что ROUTER_NAVIGATION будет сгенерировано до вызова всех Guards и Resolvers, а NavigationActionTiming.PostActivation — после.

import {
    Params,
    RouterStateSnapshot,
    Data,
} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface AppRouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

export class AppSerializer
  implements RouterStateSerializer<AppRouterStateUrl> {
  serialize(
    state: RouterStateSnapshot
  ): AppRouterStateUrl {
    let currentRoute = state.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = state;
    const { params, data } = currentRoute;

    return { url, params, queryParams, data };
  }
}

//app.module.ts
StoreRouterConnectingModule.forRoot({
  serializer: CustomSerializer,
});

//-----------------------------
//__Meta reducers
//NgRx Meta Reducers это функции, вызываемые сразу после возникновения действия, но перед тем, как они будут переданы глобальному редюсеру. На практике они чаще всего используются для логирования.
//NgRx Meta Reducers не должны изменять передаваемые им состояние и действие.

//logs.meta-reducer.ts
//В качестве входного аргумента NgRx Meta Reducers принимают редюсер, вызов которого передает обработку действия далее в хранилище
export function log(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

//app.module.ts
import { reducers } from './store/reducers/index';
import { log } from './store/meta-reducers/log.meta-reducer';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    { metaReducers: [log] },
  ],
  // ...
})
export class AppModule { }

//--------------------------
//__Entity state
//State, который предоставляет собственное API для управления массивами сущностей хранилища в NgRx этих сущностей

//__Entity State
//Entity State представляет собой обычный интерфейс обобщенного типа, в котором обобщенным типом является модель (интерфейс) сущности, составляющей массив
interface EntityState<V> {
  ids: string[] | number[]; //массив идентификаторов сущностей (по умолчанию id);
  entities: { [id: string | id: number]: V }; //объект со всеми сущностями, в котором ключ — идентификатор сущности, а значение — сама сущность
}

//Часть состояния, которая обрабатывает массивы сущностей, должна реализовывать интерфейс NgRx Entity State.
interface Article {
  id: number;
  user_id: number;
  title: string;
}

export interface State extends EntityState<Article> {
  currentArticle: number | null;
}

//__Entity Adapter
//Доступ к API для работы с сущностями предоставляет экземпляр класса EntityAdapter, который создается с явным указанием типа сущности.
// Метод createEntityAdapter() принимает необязательный параметр — объект с свойствами:
// selectId метод для выбора идентификатора сущности, обязателен, если у сущности отсутствует поле id;
// sortComparer — функция для сортировки сущностей в массива, но помните, что CRUD операции будут выполняться быстрее, если не придется сортировать массив.
export const adapter: EntityAdapter<Article> = createEntityAdapter <Article> ({
    selectId: (item) => item.id,
    sortComparer: false, //явное указание, что сортировать массив не нужно
  });

/* 
NgRx Entity Adapter имеет обширное API для работы с сущностями:
getInitialState() — возвращает исходное состояние для массива сущностей заданного типа, параметром принимает объект со свойствами, которые также должны быть частью состояния;
addOne() — добавляет в массив новую сущность;
addMany() — добавляет несколько сущностей в массив;
addAll() — заменяет все текущие записи переданными;
removeOne() — удаляет одну указанную сущность;
removeMany() — удаляет несколько заданных сущностей;
removeAll() — удаляет все записи;
updateOne() — обновляет указанную сущность;
updateMany() — обновляет несколько заданных записей;
upsertOne() — обновляет переданную сущность, если она уже есть в массиве, в противном случае добавляет ее как новую;
upsertMany() — то же самое, что и upsertOne(), только может принимать массив записей;
map() — применяет к каждой сущности массива переданную функцию, которая должна возвращать обновленную сущность.
*/

//Пример использования методов управления массивом

//article.actions.ts
export enum ArticleActionTypes {
  LoadArticles = '[Articles Page] Load Articles',
  AddArticle = '[Articles Page] Add Article',
  UpsertArticle = '[Articles Page] Upsert Article',
  AddArticles = '[Articles Page] Add Articles',
  UpsertArticles = '[Articles Page] Upsert Articles',
  UpdateArticle = '[Articles Page] Update Article',
  UpdateArticles = '[Articles Page] Update Articles',
  MapArticles = '[Articles Page] Map Articles',
  DeleteArticle = '[Articles Page] Delete Article',
  DeleteArticles = '[Articles Page] Delete Articles',
  DeleteAllArticles = '[Articles Page] Delete All Articles',
}

export class LoadArticles implements Action {
  readonly type = ArticleActionTypes.LoadArticles;

  constructor(public payload: { articles: Article[] }) { }
}

export class AddArticle implements Action {
  readonly type = ArticleActionTypes.AddArticle;

  constructor(public payload: { article: Article }) { }
}

export class UpsertArticle implements Action {
  readonly type = ArticleActionTypes.UpsertArticle;

  constructor(public payload: { article: Article }) { }
}

export class AddArticles implements Action {
  readonly type = ArticleActionTypes.AddArticles;

  constructor(public payload: { articles: Article[] }) { }
}

export class UpsertArticles implements Action {
  readonly type = ArticleActionTypes.UpsertArticles;

  constructor(public payload: { articles: Article[] }) { }
}

export class UpdateArticle implements Action {
  readonly type = ArticleActionTypes.UpdateArticle;

  constructor(
    public payload: { article: Update<Article> }
  ) { }
}

export class UpdateArticles implements Action {
  readonly type = ArticleActionTypes.UpdateArticles;

  constructor(
    public payload: { articles: Update<Article>[] }
  ) { }
}

export class MapArticles implements Action {
  readonly type = ArticleActionTypes.MapArticles;

  constructor(
    public payload: { entityMap: EntityMap<Article> }
  ) { }
}

export class DeleteArticle implements Action {
  readonly type = ArticleActionTypes.DeleteArticle;

  constructor(public payload: { id: string }) { }
}

export class DeleteArticles implements Action {
  readonly type = ArticleActionTypes.DeleteArticles;

  constructor(public payload: { ids: string[] }) { }
}

export class DeleteAllArticles implements Action {
  readonly type = ArticleActionTypes.DeleteAllArticles;
}

export type ArticleActionsUnion =
  | LoadArticles
  | AddArticle
  | UpsertArticle
  | AddArticles
  | UpsertArticles
  | UpdateArticle
  | UpdateArticles
  | MapArticles
  | DeleteArticle
  | DeleteArticles
  | DeleteAllArticles;

//article.reducer.ts
interface Article {
  id: number;
  user_id: number;
  title: string;
}

export interface State extends EntityState<Article> {
  currentArticle: number | null;
}

export const adapter: EntityAdapter<Article> = createEntityAdapter <
  Article
  > ();

export const initialState: State = adapter.getInitialState({
  currentArticle: null,
});

export function articlesReducer(
  state = initialState,
  action: ArticleActionsUnion
): State {
  switch (action.type) {
    case ArticleActionTypes.LoadArticles: {
      return adapter.addAll(
        action.payload.articles,
        state
      );
    }

    case ArticleActionTypes.AddArticle: {
      return adapter.addOne(
        action.payload.article,
        state
      );
    }

    case ArticleActionTypes.UpsertArticle: {
      return adapter.upsertOne(
        action.payload.article,
        state
      );
    }

    case ArticleActionTypes.AddArticles: {
      return adapter.addMany(
        action.payload.articles,
        state
      );
    }

    case ArticleActionTypes.UpsertArticles: {
      return adapter.upsertMany(
        action.payload.articles,
        state
      );
    }

    case ArticleActionTypes.UpdateArticle: {
      return adapter.updateOne(
        action.payload.article,
        state
      );
    }

    case ArticleActionTypes.UpdateArticles: {
      return adapter.updateMany(
        action.payload.articles,
        state
      );
    }

    case ArticleActionTypes.MapArticles: {
      return adapter.map(
        action.payload.entityMap,
        state
      );
    }

    case ArticleActionTypes.DeleteArticle: {
      return adapter.removeOne(
        action.payload.id,
        state
      );
    }

    case ArticleActionTypes.DeleteArticles: {
      return adapter.removeMany(
        action.payload.ids,
        state
      );
    }

    case ArticleActionTypes.DeleteAllArticles: {
      return adapter.removeAll({
        ...state,
        currentArticle: null,
      });
    }

    default: {
      return state;
    }
  }
}

//Еще одним полезным методом NgRx Entity Adapter является getSelectors()
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectArticleIds = selectIds;
export const selectArticleEntities = selectEntities;
export const selectAllArticles = selectAll;
export const selectArticleTotal = selectTotal;

//-------------------------------
//__Организация кода
// В корне модуля создайте директорию store со следующей структурой:
// actions; - хранятся файлы с описанием всех действий (NgRx Actions). В одном файле должны описываться только взаимосвязанные действия и именоваться файл должен соответственно, например, если вы реализовываете авто каталог, то файл с действиями будет называться cars.actions.ts
// effects; - располагаются все побочные эффекты (NgRx Effects) авто каталога.
// models; - содержит описание моделей всех сущностей, используемых при разработке. Для каждой сущности должен создаваться отдельный файл.
// reducers; - находятся все редюсеры (NgRx Reducers) для изменения состояния хранилища. Причем каждый редюсер должен также содержать описание части состояния, за обработку которой он ответственен. Здесь же создается Entity Adapter для управления массивом сущностей
// index.ts. - импортируются все созданные редюсеры и описывается полная модель хранилища, которое описывает директория store. Далее эта модель передается в качестве параметра методу StoreModule.forRoot()

//store/actions/cars.actions.ts
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Car } from '../models/car.model';

export enum CarActionTypes {
  AddCarRequest = '[Create/Edit Car] Add Car Request',
  CarAddedSuccess = '[Create/Edit Car] Car Added Success',
  CarAddedError = '[Create/Edit Car] Car Added Error',

  UpdateCarRequest = '[Create/Edit Car] Update Car Request',
  CarUpdatedSuccess = '[Create/Edit Car] Car Updated Success',
  CarUpdatedError = '[Create/Edit Car] Car Updated Error',

  LoadCars = '[Cars list] Load Cars',
  CarsLoadedSuccess = '[Cars list] Cars Loaded Success',
  CarsLoadedError = '[Cars list] Cars Loaded Error',

  DeleteCarRequest = '[Cars list] Delete Car Request',
  CarDeletedSuccess = '[Cars list] Car Deleted Success',
  CarDeletedError = '[Cars list] Car Deleted Error',
}

export class AddCarRequest implements Action {
  readonly type = CarActionTypes.AddCarRequest;

  constructor(public payload: { car: Car }) { }
}

export class CarAddedSuccess implements Action {
  readonly type = CarActionTypes.CarAddedSuccess;

  constructor(public payload: { car: Car }) { }
}

export class CarAddedError implements Action {
  readonly type = CarActionTypes.CarAddedError;
}

export class UpdateCarRequest implements Action {
  readonly type = CarActionTypes.UpdateCarRequest;

  constructor(public payload: { car: Car }) { }
}

export class CarUpdatedSuccess implements Action {
  readonly type = CarActionTypes.CarUpdatedSuccess;

  constructor(public payload: { car: Update<Car> }) { }
}

export class CarUpdatedError implements Action {
  readonly type = CarActionTypes.CarUpdatedError;
}

export class LoadCars implements Action {
  readonly type = CarActionTypes.LoadCars;
}

export class CarsLoadedSuccess implements Action {
  readonly type = CarActionTypes.CarsLoadedSuccess;

  constructor(public payload: { cars: Car[] }) { }
}

export class CarsLoadedError implements Action {
  readonly type = CarActionTypes.CarsLoadedError;
}

export class DeleteCarRequest implements Action {
  readonly type = CarActionTypes.DeleteCarRequest;

  constructor(public payload: { id: number }) { }
}

export class CarDeletedSuccess implements Action {
  readonly type = CarActionTypes.CarDeletedSuccess;

  constructor(public payload: { id: number }) { }
}

export class CarDeletedError implements Action {
  readonly type = CarActionTypes.CarDeletedError;
}

export type CarUnion =
  | AddCarRequest
  | CarAddedSuccess
  | CarAddedError
  | UpdateCarRequest
  | CarUpdatedSuccess
  | CarUpdatedError
  | LoadCars
  | CarsLoadedSuccess
  | CarsLoadedError
  | DeleteCarRequest
  | CarDeletedSuccess
  | CarDeletedError;

//store/effects/cars.effects.ts
import {
  CarActionTypes,
  CarsLoadedSuccess,
  CarsLoadedError,
  AddCarRequest,
  CarAddedSuccess,
  CarAddedError,
  DeleteCarRequest,
  CarDeletedSuccess,
  CarDeletedError,
} from '../actions/car.actions';

import { Car } from '../models/car.model';

import { CarsService } from '../../services/cars/cars.service';

@Injectable({ providedIn: 'root' })
export class CarEffects {

  constructor(
    private actions$: Actions,
    private carsService: CarsService
  ) { }

  @Effect()
  loadCars$ = this.actions$.pipe(
    ofType(CarActionTypes.LoadCars),
    mergeMap(() =>
      this.carsService.getCars().pipe(
        map(
          (cars: Car[]) =>
            new CarsLoadedSuccess({
              cars: cars,
            })
        ),
        catchError(() => of(new CarsLoadedError()))
      )
    )
  );

  @Effect()
  addCar$ = this.actions$.pipe(
    ofType(CarActionTypes.AddCarRequest),
    mergeMap((action: AddCarRequest) =>
      this.carsService
        .createCar(action.payload.car)
        .pipe(
          map(
            (car: Car) =>
              new CarAddedSuccess({
                car: car,
              })
          ),
          catchError(() =>
            of(new CarAddedError())
          )
        )
    )
  );

  @Effect()
  deleteCar$ = this.actions$.pipe(
    ofType(CarActionTypes.DeleteCarRequest),
    mergeMap((action: DeleteCarRequest) =>
      this.carsService
        .deleteCar(action.payload.id)
        .pipe(
          map(
            (id: number) =>
              new CarDeletedSuccess({
                id: id,
              })
          ),
          catchError(() =>
            of(new CarDeletedError())
          )
        )
    )
  );

}

//store/reducers/cars.reducer.ts
import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
} from '@ngrx/entity';

import { Car } from '../models/car.model';
import {
  CarActionTypes,
  CarUnion,
} from '../actions/car.actions';

export const adapter: EntityAdapter<Car> = createEntityAdapter <Car> ({
    selectId: (car: Car) => car.ID,
  });

export interface State extends EntityState<Car> {
  pending: boolean;
}

export const initialState: State = adapter.getInitialState({
  pending: false,
});

export const reducer = (
  state: State = initialState,
  action: CarUnion
) => {
  switch (action.type) {
    case CarActionTypes.AddCarRequest:
      return adapter.addOne(action.payload.car, {
        ...state,
        pending: false,
      });
    case CarActionTypes.CarAddedSuccess:
      return { ...state, pending: true };
    case CarActionTypes.CarAddedError:
      return { ...state, pending: false };

    case CarActionTypes.UpdateCarRequest:
      return { ...state, pending: true };
    case CarActionTypes.CarUpdatedSuccess:
      return adapter.updateOne(action.payload.car, {
        ...state,
        pending: false,
      });
    case CarActionTypes.CarUpdatedError:
      return { ...state, pending: false };

    case CarActionTypes.LoadCars:
      return { ...state, pending: true };
    case CarActionTypes.CarsLoadedSuccess:
      return adapter.addAll(action.payload.cars, {
        ...state,
        pending: false,
      });
    case CarActionTypes.CarsLoadedError:
      return { ...state, pending: false };

    case CarActionTypes.DeleteCarRequest:
      return { ...state, pending: true };
    case CarActionTypes.CarDeletedSuccess:
      return adapter.removeOne(action.payload.id, {
        ...state,
        pending: false,
      });
    case CarActionTypes.CarDeletedError:
      return { ...state, pending: false };

    default:
      return state;
  }
};

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectCarsIds = selectIds;
export const selectCarEntities = selectEntities;
export const selectAllCars = selectAll;
export const selectCarTotal = selectTotal;

//store/index.ts
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as cars from './reducers/car.reducer';

export interface State {
  cars: cars.State;
}

export const reducers: ActionReducerMap<State> = {
  cars: cars.reducer,
};

export const selectAdminState = createFeatureSelector <State> ('admin');
export const selectCarsState = createSelector(
  selectAdminState,
  (state: State) => state.cars
);

export const selectAllCars = createSelector(
  selectCarsState,
  cars.selectAllCars
);

export const selectCarsPending = createSelector(
  selectCarsState,
  (state: cars.State) => state.pending
);

//catalog.module.ts
import { reducers } from './store';
import { CarEffects } from './store/effects/car.effects';

@NgModule({
  imports: [
    //...
    EffectsModule.forFeature([CarEffects]),
    StoreModule.forFeature('catalog', reducers),
  ],
  //...
})
export class CatalogModule { }

//app.module.ts
@NgModule({
  imports: [
    //...
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
  ],
  //...
})
export class AppModule { }
//StoreModule.forRoot() должен быть вызван в корневом модуле даже если у него нет своего хранилища. То же самое касается и NgRx Effects


