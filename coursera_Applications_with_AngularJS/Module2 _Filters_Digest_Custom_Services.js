//-------------
//__Фильтры__//

/* 
Фильтры в AngularJS
Фильтры используются для изменения выходных данных выражения. Их можно применять как в HTML, так и в JavaScript.
Применение фильтров в JavaScript
Для использования фильтров в JavaScript необходимо:
Внедрить сервис $filter в контроллер.
Создать функцию фильтрации с помощью $filter.
Выполнить функцию фильтрации, передав ей выражение в качестве аргумента.
*/
// Внедрение сервиса $filter
angular.module('myApp', [])
    .controller('MyController', function ($scope, $filter) {
        // Создание функции фильтрации
        var uppercaseFilter = $filter('uppercase');

        // Выполнение функции фильтрации
        var output = uppercaseFilter('Hello');
    });

//Применение фильтров в HTML
//{{ expression | filterName | filterArguments }}

//{{ 'Hello' | uppercase }}

//----------------------------------------
//__Создание пользовательских фильтров__//

/* 
Создание пользовательских фильтров в AngularJS

Шаги:
Определить функцию-фабрику фильтра (FilterFactory):

Эта функция создает и возвращает экземпляр функции фильтра.
Зарегистрировать FilterFactory в модуле:

Вызывается метод filter на модуле, указывается имя фильтра и ссылка на FilterFactory.
Внедрить фильтр:

Внедрить фильтр в конструкцию, где он будет использоваться (например, контроллер).
Имя внедряемого фильтра должно быть именем зарегистрированной фабрики фильтра с добавлением суффикса "filter".
*/

// Определение FilterFactory
function CustomFilterFactory() {
    return function (input) {
        // Фильтрация input
        return filteredOutput;
    };
}

// Регистрация FilterFactory
angular.module('myApp').filter('customFilter', CustomFilterFactory);

// Внедрение фильтра в контроллер
angular.module('myApp').controller('MyController', function ($scope, customFilter) {
    // Использование фильтра
    var filteredValue = customFilter(input);
});

/* 
Важные моменты

Имя FilterFactory может быть любым, но имя внедряемого фильтра должно соответствовать зарегистрированному имени фабрики с добавлением суффикса "filter".
При вызове FilterFactory создается функция фильтра, которая затем выполняется с указанным входным значением.
Избегайте регистрировать FilterFactory с именем, заканчивающимся на "filter", чтобы не возникало конфликтов с внедряемым фильтром.
*/

//__Создание пользовательского фильтра в AngularJS
//Определение функции-фабрики фильтра (FilterFactory)
function LovesFilter() {
    return function (input) {
        if (!input) {
            return '';
        }
        return input.replace('likes', 'loves');
    };
}

//Регистрация FilterFactory
angular.module('myApp').filter('loves', LovesFilter);

//Внедрение фильтра в контроллер
angular.module('myApp').controller('MyController', function ($scope, lovesFilter) {
    // Использование фильтра
    $scope.sayLovesMessage = function () {
        return lovesFilter($scope.message);
    };
});
//<div>{{ sayLovesMessage() }}</div>

//__Создание пользовательских фильтров с параметрами

function TruthFilter() {
    return function (input, target, replace) {
        return input.replace(target, replace);
    };
}

angular.module('myApp').filter('truth', TruthFilter);

//{{ sayLovesMessage() | truth:'healthy':'cookie' | uppercase }}

//__full code
(function () {
    'use strict';

    angular.module('MsgApp', [])
        .controller('MsgController', MsgController)
        .filter('loves', LovesFilter)
        .filter('truth', TruthFilter);

    MsgController.$inject = ['$scope', 'lovesFilter'];
    function MsgController($scope, lovesFilter) {
        $scope.stateOfBeing = "hungry";

        $scope.sayMessage = function () {
            var msg = "Yaakov likes to eat healthy snacks at night!";
            return msg;
        };

        $scope.sayLovesMessage = function () {
            var msg = "Yaakov likes to eat healthy snacks at night!";
            msg = lovesFilter(msg)
            return msg;
        };

        $scope.feedYaakov = function () {
            $scope.stateOfBeing = "fed";
        };
    }

    function LovesFilter() {
        return function (input) {
            input = input || "";
            input = input.replace("likes", "loves");
            return input;
        };
    }

    function TruthFilter() {
        return function (input, target, replace) {
            input = input || "";
            input = input.replace(target, replace);
            return input;
        }
    }

})();
/* 
<div ng-controller='MsgController'>
      Original: {{sayMessage()}} <br>
      Loves: {{ sayLovesMessage() }} <br>
      Truth: {{ sayLovesMessage() | truth : 'healthy' : 'cookie' }} <br>
      BIG TRUTH: {{ sayLovesMessage() | truth : 'healthy' : 'cookie' | uppercase }}
      <div>
        <button ng-click="feedYaakov()">Feed Yaakov</button>
        <br>

        <img ng-src="images/yaakov_{{stateOfBeing}}.png">
      </div>
</div>
*/

//------------------
//__Digest Cycle__//

/* 
**Как AngularJS обновляет веб-страницу при вводе данных**

**Процесс обновления веб-страницы:**

1. Пользователь вводит данные в поле ввода.
2. Событие ввода (например, нажатие клавиши) добавляется в очередь событий.
3. AngularJS обрабатывает событие с помощью специальных директив (например, `ng-keyup`).
4. AngularJS запускает функцию `$digest`, которая проверяет наличие изменений в наблюдаемых свойствах (watchers).
5. AngularJS выполняет цикл проверки (digest loop), чтобы обнаружить изменения и обновить DOM.

**Цикл проверки (digest loop)**

Цикл проверки - это процесс, при котором AngularJS проверяет все наблюдаемые свойства на наличие изменений.

1. AngularJS запускает цикл проверки, чтобы проверить, изменились ли наблюдаемые свойства.
2. Если обнаружены изменения, AngularJS обновляет соответствующие части DOM.
3. Цикл проверки повторяется, пока не будут обнаружены дальнейшие изменения.

**Необходимость повторного выполнения цикла проверки**

Цикл проверки выполняется дважды, чтобы гарантировать, что все изменения были обнаружены. Первая итерация обнаруживает изменения, а вторая итерация проверяет, не было ли вызвано дополнительных изменений первой итерацией.

**Dirty checking**

Цикл проверки использует метод "dirty checking", который предполагает, что свойства могут изменяться только в результате наблюдаемых событий. Это эффективный метод, но он может не обнаружить изменения, вызванные не наблюдаемыми событиями.

**Обновление DOM**

После завершения цикла проверки AngularJS обновляет DOM, отображая измененные значения.
*/

//__Создание наблюдателей (watchers) вручную

// Использование функции $watch для создания наблюдателей:
// - Функция $watch принимает два аргумента:
// Имя наблюдаемого свойства
// Функция обработчик, которая вызывается при изменении свойства
// - Обработчик получает два аргумента:
// newValue: Новое значение свойства
// oldValue: Предыдущее значение свойства

/* 
<div ng-controller='CounterController'>
      <button ng-click="showNumberOfWatchers()">
        Log # of Watchers</button>
        <input type="text" ng-model="name">
      <div>
        <button ng-click="countOnce()">Up Once Counter (once)</button>
        <button ng-click="upCounter()">Increment Counter</button>
      </div>
      <div>
        Once counter: {{ onceCounter }} <br>
        Regular counter: {{ counter }}
</div>
*/
(function () {
    'use strict';

    angular.module('CounterApp', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope'];
    function CounterController($scope) {
        $scope.onceCounter = 0;
        $scope.counter = 0;
        $scope.name = "Yaakov";

        $scope.showNumberOfWatchers = function () {
            console.log("# of Watchers: ", $scope.$$watchersCount);
        };

        $scope.countOnce = function () {
            $scope.onceCounter = 1;
        };

        $scope.upCounter = function () {
            $scope.counter++;
        };

        $scope.$watch(function () {
            console.log("Digest Loop Fired!");
        })

        // $scope.$watch('onceCounter', function (newValue, oldValue) {
        //   console.log("onceCounter old value: ", oldValue);
        //   console.log("onceCounter new value: ", newValue);
        // });
        //
        // $scope.$watch('counter', function (newValue, oldValue) {
        //   console.log("counter old value: ", oldValue);
        //   console.log("counter new value: ", newValue);
        // });

    }

})();


//__Автоматическое создание наблюдателей

// AngularJS предоставляет более автоматизированные способы создания наблюдателей:

// Использование интерполяции с двойными фигурными скобками:
// Интерполяция свойств в шаблоне HTML (например, {{onceCounter}}) автоматически создает наблюдатель для этого свойства.

// Использование ng-model:
// Элементы ввода с атрибутом ng-model создают наблюдатели для связанных свойств.
//<input ng-model="name">

//Отслеживание цикла проверки
//Чтобы отследить цикл проверки, можно создать функцию, которая будет вызываться при каждом проходе цикла
$scope.$watch(function () {
    console.log("Digest Loop Fired!");
});

//----------------------
//__$digest и $apply__//

/* 
Триггеры цикла проверки (digest loop) вне Angular-контекста

В предыдущей лекции мы обсуждали, что цикл проверки запускается только в том случае, если событие в очереди событий является "Angular-осознанным", то есть знает о цикле проверки и запускает его в процессе обработки. Но что делать, если код находится вне нашего Angular-приложения и все же должен влиять на значения внутри него?
Для этого существуют специальные функции $digest и $apply.

Использование $digest
Вызов $scope.$digest вручную после выполнения кода вне Angular-контекста запустит цикл проверки, который обнаружит изменения в свойствах области видимости и обновит интерфейс.

Использование $apply
Функция $apply является более предпочтительной, чем $digest, поскольку она:
Перехватывает исключения, возникающие в коде, и делает их видимыми для AngularJS.
Автоматически запускает цикл проверки после выполнения кода.

Использование $timeout
Вместо использования собственной функции setTimeout JavaScript можно использовать службу $timeout AngularJS, которая выполняет ту же функцию, но в Angular-контексте. Это избавляет от необходимости вручную запускать цикл проверки.
*/

/* 
<div ng-controller='CounterController'>
      <div>
        <button ng-click="upCounter()">Increment Counter</button>
      </div>
      <div>
        Regular counter: {{ counter }}
      </div>
</div>
*/
(function () {
    'use strict';

    angular.module('CounterApp', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope', '$timeout'];
    function CounterController($scope, $timeout) {
        $scope.counter = 0;

        $scope.upCounter = function () {
            $timeout(function () {
                $scope.counter++;
                console.log("Counter incremented!");
            }, 2000);
        };

        // $scope.upCounter = function () {
        //   setTimeout(function () {
        //     $scope.$apply(function () {
        //       $scope.counter++;
        //       console.log("Counter incremented!");
        //     });
        //   }, 2000);
        // };

        // $scope.upCounter = function () {
        //   setTimeout(function () {
        //     $scope.counter++;
        //     console.log("Counter incremented!");
        //     $scope.$digest();
        //   }, 2000);
        // };
    }

})();

//----------------------------------------------------------
//__Двустороннее, одностороннее и однократное связывание__//

/* 
Связывание данных в AngularJS

2-стороннее связывание
Устанавливается с помощью ng-model на элементе ввода.
Позволяет изменять значение свойства как из пользовательского интерфейса, так и из контроллера.
AngularJS создает слушатель изменений значения элемента ввода и обновляет свойство в области видимости.
Обновление свойства в области видимости также приводит к обновлению пользовательского интерфейса
//<input ng-model="firstName">
.
1-стороннее связывание
Устанавливается с помощью двойных фигурных скобок вокруг свойства.
Позволяет обновлять значение свойства только из контроллера.
AngularJS создает наблюдатель для свойства и обновляет пользовательский интерфейс, когда свойство изменяется в контроллере.
//<p>{{ fullName }}</p>

1-разовое связывание
Похоже на 1-стороннее связывание, но с добавлением двойных двоеточий перед именем свойства.
AngularJS создает наблюдатель для свойства, но удаляет его после первоначальной инициализации значения свойства.
Это означает, что пользовательский интерфейс обновляется только при первоначальной инициализации свойства и не реагирует на последующие изменения.
//<p>{{ ::fullName }}</p>

Преимущества 1-разового связывания
Уменьшает количество наблюдателей в цикле проверки, что улучшает производительность.
Подходит для свойств, которые не должны изменяться в течение жизненного цикла приложения, например, полное имя пользователя.
Недостатки 1-разового связывания
//<p>{{ ::user.profile.fullName }}</p>

Изменения свойства после первоначальной инициализации не будут отражаться в пользовательском интерфейсе.
*/

//---------------
//__ng-repeat__//

// Ng-repeat - это директива AngularJS, которая расширяет функциональность HTML-элементов, к которым она применяется. Она позволяет перебирать данные и отображать их в пользовательском интерфейсе.

/* 
<div ng-controller='ShoppingListController'>
      <!-- Shopping List #1: -->
      <h3>Shopping List:</h3>
      <!-- <ul>
        <li ng-repeat="item in shoppingList1">{{ item }}</li>
      </ul> -->

      <!-- Shopping List #2: -->
      <!-- <ul>
        <li ng-repeat="item in shoppingList2">Buy {{item.quantity}} of {{item.name}}(s)</li>
      </ul> -->

      <!-- Shopping List #3: -->
      <input type="text" ng-model="shoppingList2[0].quantity">
      <ul>
        <li ng-repeat="item in shoppingList2">{{$index + 1}}. Buy {{item.quantity}} of {{item.name}}(s)</li>
      </ul>
      <input type="text" ng-model="newItemName" placeholder="item name">
      <input type="text" ng-model="newItemQuantity" placeholder="item quantity">
      <button ng-click="addToList()">Add To List</button>
</div>
*/
(function () {
    'use strict';

    var shoppingList1 = [
        "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
    ];

    var shoppingList2 = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        }
    ];

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['$scope'];
    function ShoppingListController($scope) {
        $scope.shoppingList1 = shoppingList1;
        $scope.shoppingList2 = shoppingList2;

        $scope.addToList = function () {
            var newItem = {
                name: $scope.newItemName,
                quantity: $scope.newItemQuantity
            };

            $scope.shoppingList2.push(newItem);
        };
    }

})();

//--------------------------------------
//__AngularJS: Фильтрация__//

/* 
Фильтр создает новый массив, содержащий элементы, удовлетворяющие условию функции сравнения.

Фильтры в AngularJS
AngularJS имеет встроенный фильтр filter.
Фильтр filter принимает строку в качестве первого аргумента и фильтрует массив, сопоставляя все элементы со строки.
*/
var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Number array: ", numberArray);

function above5Filter(value) {
    return value > 5;
}
var filteredNumberArray = numberArray.filter(above5Filter);
console.log("Filtered number array: ", filteredNumberArray);

var shoppingList = [
    "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
];
console.log("Shopping List: ", shoppingList);

var searchValue = "Bismol";
function containsFilter(value) {
    return value.indexOf(searchValue) !== -1;
}
var searchedShoppingList = shoppingList.filter(containsFilter);
console.log("Searched Shopping List: ", searchedShoppingList);


// Использование фильтра в ng-repeat
// Фильтр можно использовать в ng-repeat для фильтрации массива, выводимого в списке.
// Синтаксис: item in collection | filter: searchString
// searchString привязан к полю ввода текста, что позволяет пользователю вводить строку поиска.
// Изменение searchString обновляет список ng-repeat в соответствии с введенной строкой поиска.
/* 
<input type="text" ng-model="search">
<ul>
    <li ng-repeat="item in shoppingList | filter : search">{{ item }}</li>
</ul>
*/

//------------------------------
//__Прототипное наследование__//

// Прототипное наследование
// Наследование - когда объект или класс основывается на другом объекте или классе (родительском объекте), используя ту же реализацию и/или те же значения.
// Прототипное наследование отличается от объектно-ориентированного наследования:
// Основано на экземплярах объектов, а не на классах.
// Более простое и прямолинейное.
// Оригинальный экземпляр объекта становится прототипом для всех последующих созданных объектов.

var parent = {
    value: "parentValue",
    obj: {
        objValue: "parentObjValue"
    },
    walk: function () {
        console.log("walking!");
    }
};

var child = Object.create(parent);
console.log("CHILD - child.value: ", child.value);//CHILD - child.value:  parentValue
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);//CHILD - child.obj.objValue:  parentObjValue
console.log("PARENT - parent.value: ", parent.value);//PARENT - parent.value:  parentValue
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);//PARENT - parent.obj.objValue:  parentObjValue
console.log("parent: ", parent);//parent:  {value: 'parentValue', obj: {…}, walk: ƒ}
console.log("child: ", child);

child.value = "childValue";
child.obj.objValue = "childObjValue";
console.log("*** CHANGED: child.value = 'childValue'");//*** CHANGED: child.value = 'childValue'
console.log("*** CHANGED: child.obj.objValue = 'childObjValue'");//*** CHANGED: child.obj.objValue = 'childObjValue'
console.log("CHILD - child.value: ", child.value);//CHILD - child.value:  childValue
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);//CHILD - child.obj.objValue:  childObjValue
console.log("PARENT - parent.value: ", parent.value);//PARENT - parent.value:  parentValue
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);//PARENT - parent.obj.objValue:  childObjValue
console.log("parent: ", parent);//{value: 'parentValue', obj: {…}, walk: ƒ}
console.log("child: ", child);//{value: 'childValue'}

console.log("child.obj === parent.obj ? ", child.obj === parent.obj);//true

var grandChild = Object.create(child);
console.log("Grandchild: ", grandChild);//{}
grandChild.walk();//walking!

function Dog(name) {
    this.name = name;
    console.log("'this' is: ", this);//Dog {name: 'Max'}
}

var myDog = new Dog("Max");
console.log("myDog: ", myDog);////Dog {name: 'Max'}

// Not being used as a function constructor
Dog("Max2");

//-----------------------------------
//__Наследование области действия__//

// Контроллеры в AngularJS организованы иерархически, при этом внутренние контроллеры наследуют область видимости внешних контроллеров.
// Свойства, объявленные в области видимости внешнего контроллера, доступны во внутренних контроллерах без дополнительных усилий.
// Однако внутренние контроллеры могут маскировать свойства внешних контроллеров, объявляя те же свойства в своей собственной области видимости.

// Наследование областей видимости в действии
// Пример с контроллерами ParentController1 и ChildController1 демонстрирует наследование областей видимости.
// ChildController1 наследует свойство parentValue от ParentController1 через прототипную цепочку.
// Однако, если ChildController1 определяет свое собственное свойство parentValue, оно маскирует свойство родительского контроллера.
// Изменение свойства parentValue в области видимости ChildController1 также изменяет его в области видимости ParentController1, поскольку JavaScript-движок переходит к прототипу, чтобы получить доступ к свойству.

// Доступ к свойствам контроллера через $parent
// Объект $parent в области видимости контроллера предоставляет доступ к свойствам родительского контроллера.
// Это позволяет трассировать прототипную цепочку и получать доступ к свойствам родительского контроллера без необходимости явного указания прототипа.

// Преимущества наследования областей видимости при работе с объектами
// Объекты, которые являются свойствами области видимости, ведут себя иначе, чем примитивные типы при наследовании областей видимости.
// Изменение свойств унаследованных объектов в дочернем контроллере влияет на эти свойства во всех контроллерах, которые их наследуют.

{/* <h1>Controller As Syntax</h1>
    <div ng-controller='ParentController1'>
      <div ng-controller='ChildController1'>
      </div>
    </div> */}
angular.module('ControllerAsApp', [])
    .controller('ParentController1', ParentController1)
    .controller('ChildController1', ChildController1)
    .controller('ParentController2', ParentController2)
    .controller('ChildController2', ChildController2);

ParentController1.$inject = ['$scope'];
function ParentController1($scope) {
    $scope.parentValue = 1;
    $scope.pc = this;
    $scope.pc.parentValue = 1;
}


ChildController1.$inject = ['$scope'];
function ChildController1($scope) {
    console.log("$scope.parentValue: ", $scope.parentValue);//$scope.parentValue:  1
    console.log("CHILD $scope: ", $scope);//CHILD $scope:  {...}

    $scope.parentValue = 5;
    console.log("*** CHANGED: $scope.parentValue = 5 ***");//*** CHANGED: $scope.parentValue = 5 ***
    console.log("$scope.parentValue: ", $scope.parentValue);//$scope.parentValue:  5
    console.log($scope);//{...}

    console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);//$scope.pc.parentValue:  1
    $scope.pc.parentValue = 5;
    console.log("** CHANGED: $scope.pc.parentValue = 5; ***");//** CHANGED: $scope.pc.parentValue = 5; ***
    console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);//$scope.pc.parentValue:  5
    console.log("$scope: ", $scope);

    console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);//$scope.$parent.parentValue:  1
}

//__
//Контроллер как синтаксис
/* 
<div ng-controller='ParentController2 as parent'>
      Parent value: {{ parent.value }}

      <div ng-controller='ChildController2 as child'>
        Child value: {{ child.value }}
        Parent value: {{ parent.value }}
      </div>
    </div>
*/
// ** Controller As syntax
function ParentController2() {
    var parent = this;
    parent.value = 1;
}
ChildController2.$inject = ['$scope'];
function ChildController2($scope) {
    var child = this;
    child.value = 5;
    console.log("ChildController2 $scope: ", $scope);//child - 5 / parent - 1
}

