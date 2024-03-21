//любая программа набор инсрукции

//на низком уровне можем просто перечислять инсрукции
//самые первые программы были имеено такими

//в первым языках програмирование было с помощью конструкции goto() - инсрукция низкоуровневая , сложность программы завист от используемых в нем goto() - оператор безусловного перехода 
var a = 1;
if (a > 0) {
  goto(4);
} else {
  goto(5);
}

//__структурное програмирование 
//программа строиться из струкурных блоков , циклов, ветвлений и состоит из подпрограмм (процедуры)также есть процедуры которые позволяют вынести набор иснрукции (в js этой функции)
if (a > 0) {
  foo()
} else {
  foo();
}
foo();

interface User {
  name:string,
  age:number
}

const jhon: User = {
  name: "jhon",
  age: 23,
};

const bob: User = {
  name: "bob",
  age: 23,
};

console.log(jhon.name);
console.log(bob.name);

//теперь заменяет создаем абстракцию 
function showName(user: User) {
  return user.name;
} 

//минус подхода когда увеличиваем объем кода то процедур становиться много поэтому придумали ООП

//---------
//__ООП__//

//__Инкапсуляция
//Объединяет данные и методы, работающие с этими данными, внутри класса и скрывает их от прямого доступа извне. Она обеспечивает контролируемый доступ к данным и защиту их от неправильного использования
//поведения ассоциированно с данными
//есть объект это какие то данные, все это инкапсулировано, и значения получаем с помощью this

//this - неявный аргумент функции
const vlad = {
  name: "jhon",
  age: 23,
  showUserInfo(){
    return this.name
  }
};
//значения береться слева от точки
const f = vlad.showUserInfo();
//тут контескт теряеться
f()

//инкапсуляция позволяет языку добавить механизм как сокрытие данных

//__Наследование
//Один из основных принципов объектно-ориентированного программирования, позволяющий создавать иерархию классов, где дочерние классы наследуют атрибуты и методы от родительских классов
//позволяет переиспользовать код от родительской сущности
//у объекта есть прообразы которые передаються по цепочке

//proto - это ссылка на другой объект если в текущем объекте своства не будет найдено то она пойдет по ссылке
//js - все прототипном наследовании
//прототип - это прообраз другого объекта
//объект прообраз называют предком
//а дочерние элементы потомками
const user = {
  showName1() {
    return console.log('hello');
    ;
  },
}; 

const jhon1 = {
  name: "jhon",
  age: 23,
  __proto__:user
};

const bob1 = {
  name: "bob",
  age: 23,
  __proto__: user,
};
bob1.showName1();

//иерархия наследования может быть очень глубокой
function ff(){}
ff.__proto__ ==== Function.prototype
Function.prototype.__proto__ === Object.prototype

//__Полиморфизм подтипов
//Полиморфизм подтипов позволяет использовать объекты классов-потомков вместо объектов класса-родителя, не нарушая работу программы. Это означает, что методы, определенные в классе-родителе, могут быть вызваны на объектах классов-потомков без знания конкретного типа объекта.
function f1(obj){
  if(obj === user || user.isPrototypeOf(obj)){
    obj.showName1()
  }
}
f1(bob1)

//__Свойства и методы не заморожены
//Методы в прототипе не наследуются напрямую. Вместо этого создается новая копия метода в объекте-потомке. Таким образом, изменение метода в потомке не влияет на метод в прототипе
//Таким образом, вы можете изменять и переназначать свойства и методы объектов, но эти изменения ограничены только для данного объекта и не распространяются на его родительские объекты или другие объекты того же типа
bob1.showName1 = function(){}

//Если объект имеет свойство, которое ссылается на другой объект (например, объект-родитель через большую вложеность), и если вы измените это свойство через потомка, то изменения будут отражены и в родительском объекте. В JavaScript это связано с механизмом прототипного наследования

//можно вместо __proto__ использовать Object.create()
const a1 = {
  a:1,
  v:2,
  c:3
}
const b = Object.create(a1)

//------------------------
//__Функция коструктор__//
//старый код
//можем пробрасывать this явно
function User3(name,age) {
  this.name = name
  this.age = age
}

User3.prototype // {__proto__:Object.prototype,constructor:User}

User3.prototype.show = function (params:any) {
  console.log(params);
}

function Managers(name,age,role) {
  User.call(this,name,age)
  this.role = role
}

//соединяем цепочку
Managers.prototype = {
  cconstructor:Managers,
  __proto__:User3.prototype,
  deleteUser(){}
}

const newUser = User3.call({},'vlad',45)
const newUser2 = User3.apply({},['vlad',45])

//с оператором new
const newUser3 = new User3('vlad',45)
const newUser4 = new User3('vlad',45)

//функция коструктор очень гибкая можем переопределить __proto__ вручную
newUser4.__proto__ = {}

//__добовлять свои методы в js
//например у каждой функции будет свой метод
//так делать не нужно - переопределять что то в коробке js
function a2() {}
a2.__proto__ === Function.prototype
Function.prototype.debounce = function (params:any) {
  console.log(params); 
}
a2.debounce()

//__фабрика
//простой пример с Object
const a3 = Object(true ) // new Boolean(true)

function Object(value){
  //если используеться с new
  if (new.target === Object){
    if (typeof value === 'object'){
      return value
    }
    return this
  }
  switch (typeof value) {
    case 'string':
      return new String()
    case 'number':
      return new Number()
    case 'boolean':
      return new Boolean()
    default:
      return {}
  }
}

//-----------
//__Class__//
//возник из функции конструктора
//синтаксический сахар

function User2(name,age) {
  this.name = name
  this.age = age
}

//класс это формализация объекта
//определенный стандарт

class User {
  name:string
  age:number

  constructor(name,age){
    this.name = name
    this.age = age
  }

  show(){
    console.log();
  }
}
const jh = new User('jh',23)
Object.getPrototypeOf(jh) === User.prototype // в прототипе находиться наши методы а в самом объекте находиться наши свойства ведь семантика на запись идет только на сам объект

const hg = new User('hg',23)

function bla(obj:any) {
  if (obj instanceof User){
    obj.show()
  }
}

//_наследование 
class Manager extends User {
  role

  constructor(name,age,role){
    //конструктор самого родителя
    super(name,age)
    this.role = role
  }

  delete(){
    return 'delete'
  }
  //можем перезаписать метод
  show(){
    console.log('hello');
    //можем вызвать метод самого родителя через super
    //!!важно что мы можем вызывать методы которые написаны с show(){} , так работать не будет show:function(){}
    super.show()
  }
}

//можно использовать super и в объекте
const blaa = {
  __proto__:{
    foo(){
      return 'foo'
    }
  },
  foo(){
    //тут статический метод работает
    //ссылаемся на объект родителя
    return super.foo()
  }
}

//можем добовлять новые методы к классу
class Foo {}
Foo.prototype.foo =function(){}

//__инкапсуляция в класах
class Foo2 {
  //настоящее закрытие совйств
  #id = 2
  //внутри класса
  private bla = 1

  //при extende работает
  protected bar (){}

  getId(){
    return this.#id
  }

  //статические свойства можем их переопределить в наследнике и также вызывать через super()
  static bl(){}
}

//__можем наследоваться от нативных классах
class MyArray extends Array {}

//__стрелочные функции
// берут this из окружения
function name() {
  const that = this
  const bla = () => {
    console.log(this === that);//true
    
  }
  bla()
}
console.log(globalThis); // глобальный this

class Foo3 {
  e = 1

  bla () {
    const  helper = () => {
      this.e = 2
    }
  }
}

//_метод bind
//с частичными аргументами
function sum(a,b,c) {
  return this.a + b + c
}
const sum2 = sum.bind({a:1},1)
sum2(10) // 12

//
function bind(fn,...args){
  return function (...args2) {
    return  fn.call(...args,...args2) 
  }
}

//---------------------------
//__Проблема наследование__//
//чем выше иерархия чем сложнее изменения
//получаються монструозные классы 
//чтобы обходить придумали паттерны програмирование - проверенные временем решения (книжка банды 4 и т.д.)
class Widget {}
class Data extends Widget{}
class FormWidget extends Data {}
class Input extends FormWidget {}

//__паттерн композиция
//практический всегда лучше наследование
class Users {}
class Friends {}

class Us {
  messages;
  friends;

  constructor (id){
    this.id = id
    this.messages = new Users()
    this.friends = new Friends()
  }
}

//__паттерн стратегия
//убираем декларации if, упрощает код
class LocalStorage {}
class IndexDB {}

//сохранения по localStorage
class Store {
  engine

  constructor(engine){
    this.engine = engine
  }

  get (){
    this.engine.get()
  }

  set(){
    //...
  }

  delete (){}
}
//подстраиваеться под то что передаем в Store
new Store (new LocalStorage) 
new Store (new IndexDB) 

//__паттерн синглтон
//экземпляр конкретного класса должен быть один
let cache;

class MyReq{
  static cache

  constructor (){

    const {cache} = this.constructor
    if (cache != null){
      return cache
    }

    this.constructor.cache = this
  }

  get(arg){}
}
new MyReq().get('foo')

