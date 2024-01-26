//платформа разрабокти клиентских приложений (SPA)
//фреймворк(платформа для создание приложений) который использует js / html / css

//весрия angular - 1 версия angular.js , 2 версия angular (2016 c ts) -  послностью отличаеться от первой версии далее уже обновляли 2 версию , сейчас 17 

//--------------------------------
//__Creating a new Angular Project
// + node.js
// + npm
// cli angular (npm install -g @angular/cli)
// ng version
// ng new my-first-project
// cd my-first-project
// ng serve

//-------------------------------------
//___Angular files and folder structure

//package.json - стандартный конфигурационый файл (зависемости)
//package-lock.json - детальный конфигурационый файл (точную версию указанной зависемости) 
//node_modules - все зависимые библиотеки
//.editorconfig - для настройки програмной среды
//.gitignore - игнор дял git
//angular.json - конфигурация проекта
//assets - статические ресурсы
//favicon.ico - значок приложения
//styles.scss - глобальные стили

//__Инициализация
/* 
<body>
  <app-root></app-root> // < ---- корневой тэг куда загружаеться наше приложения
</body>

*/
//main.ts 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // браузер платформы (можно загружать и на мобильные устройство)
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule) // <--- корневой модуль приложения
  .catch(err => console.error(err));

//app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//передаем объект метаданных
@NgModule({
  //что принадлежит нашему модулю
  declarations: [
    AppComponent
  ],
  //все внешние модулю которые требуеться для нашего приложения
  imports: [
    BrowserModule
  ],
  //регистрирум все сервисы 
  providers: [],
  //загрузочный массив (начальный)
  bootstrap: [AppComponent]
})
export class AppModule { }

//app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',//использум компонент как тэг (также можно использовать как атрибут или класс)
  templateUrl: './app.component.html', // шаблон представления (url или cам шаблон)
  styleUrls: ['./app.component.scss'] // массив стилей (url или cами стили)
})
export class AppComponent {
  title = 'proAcademy-project';
}
//<h1>hello</h1>

//------------------------
//__What is TypeScript 
//при компиляции преобразуться в js
//ts -строгт типизирован
//можем ловить ошибки во время компиляции

//-----------------------
//__What is a Component
//Компонент эта ключая функция angular
//В корневой компонент включаем все остальные компоненты
//cтили по умолчанию не действует глобально а локально на свой шаблон

import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  template: `
    <h1>Hello World!</h1>
    <p>This template definition spans multiple lines.</p>
  `,
  styles: ['h1 { font-weight: normal; }']
})
export class HeaderComponent { }

//app.component.html
//<h1>hello</h1>
//<app-header></app-header>

//styles.scss - эти стили будут применины ко всему приложению глобально типо шрифт и т.д
/* 
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
body{
    font-family: 'Montserrat', sans-serif;
}
*/

//-------------------------------------
//___Create Component 
//Генерирует и/или изменяет файлы на основе схемы.
//ng generate component [name]
//selector: '[app-header]' | '.app-header' | '#app-header'  - можно использовать как селектор, как класс, как id, не рекомендуеться используем как тэг

//------------------
//__Data Binding__//
//Привязка данных - поток данных связывающий класс компонента и шаблон
//существет одностороняя привязка данных и двустороняя привязка данных(могут передоваться в обоих направлениях)

//_String Interpolation
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  addToCart: number = 0;
  product = {
    name: 'iPhone X',
    price: 789,
    color: 'Black',
    discount: 8.5,
    inStock: 10,
    pImage: '/assets/images/iphone.png'
  }

  getDiscountedPrice() {
    return this.product.price - (this.product.price * this.product.discount / 100)
  }
}
/* 
<p>Name: {{ product.name }}</p>
<p>Price: {{ '$' + product.price }}</p>
<p>Color: {{product.color}}</p>
<p>Discounted Price: {{ getDiscountedPrice().toFixed(2) }}</p>
<p>{{product.inStock > 0 ? 'Only' + product.inStock +' items left': 'Not in Stock'}}</p>
*/


