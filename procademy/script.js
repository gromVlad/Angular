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