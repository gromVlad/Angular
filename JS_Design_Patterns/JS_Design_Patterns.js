//Рассмотрим самые распространённые паттерны проектирования, которые используются при разработке. Паттерны, или шаблоны - это определённые, зарекомендовавшие себя конструкции, которые служат для решения типовых задач программирования.

//!!!никогда не подстраивать код под паттерны програмирование

///-------------------------------------///
///__Пораждающее паттерны(creational)__///
//Порождающие паттерны (Creational patterns) - это группа паттернов проектирования, которые решают задачи создания объектов. Они предоставляют механизмы для гибкого и управляемого создания объектов, скрывая детали их создания.

//---------------
//__Singleton__//
//Singleton - это паттерн проектирования, который обеспечивает, чтобы класс имел только один экземпляр, и предоставляет глобальную точку доступа к этому экземпляру. Это полезно, когда требуется иметь только один объект определенного типа в системе.

//instance представляет собой статическое свойство класса Counter, которое используется для хранения единственного экземпляра класса

class Counter {
  constructor() {
    //проверяем, существует ли уже объект Counter.instance
    if (typeof Counter.instance === "object") {
      // Если это так то возвращаем этот существующий объект вместо создания нового экземпляра класса
      return Counter.instance;
    }
    //Если объект Counter.instance не существует, мы создаем новый экземпляр класса Counter и сохраняем его в Counter.instance
    this.count = 0;
    Counter.instance = this;
    return this;
  }
  getCount() {
    return this.count;
  }
  increaseCount() {
    return this.count++;
  }
}
const myCount = new Counter()
const myCount2 = new Counter()
myCount.increaseCount()
myCount2.increaseCount()
console.log(myCount.getCount());//2
console.log(myCount2.getCount());//2

//--------------//
//___Factory____//
//когда нужно создавать множество однотипных объектов

//класс коснструктор
class Bmw {

  constructor(model, price, maxSpeed) {
    this.model = model;
    this.price = price;
    this.maxSpeed = maxSpeed;
  }
}

//класс который вызывает конструктор передовая определенные параметры
class BmwFactory {
  create(type) {
    if (type === 'X5')
      return new Bmw(type, 108000, 300);
    if (type === 'X6')
      return new Bmw(type, 111000, 320);
  }
}
const x5 = factory.create('X5');
console.log(x5);
// Вывод: Bmw { model: 'X5', price: 108000, maxSpeed: 300 }

const x6 = factory.create('X6');
console.log(x6);
// Вывод: Bmw { model: 'X6', price: 111000, maxSpeed: 320 }

//----------------------
//__Abstract-factory__//
//Абстрактная фабрика - это паттерн проектирования, который позволяет создавать семейства связанных объектов без указания конкретных классов этих объектов.Он абстрагирует процесс создания объектов, предоставляя интерфейс для создания объектов разных типов, связанных друг с другом.Позволяет создавать семейства связанных объектов без привязки к конкретным классам, обеспечивая гибкость и разделение ответственности между созданием объектов и их использованием. Он позволяет легко добавлять новые семейства объектов, сохраняя совместимость с существующим кодом.

//создает интерфейс групирующий другие фабрики
//абстракция для фабрики и фабричного метода
//позволяет не привязываться к отдельным объектам

//абстрактная фабрика
function bmwProducer(kind) {
  return kind === 'sport' ? sportCarFactory : familyCarFactory;
}

//фабрика 1 
function sportCarFactory() {
  return new Z4();
}

//фабрика 2 
function familyCarFactory() {
  return new I3();
}

class Z4 {
  info() {
    return "Z4 is a Sport car!";
  }
}

class I3 {
  info() {
    return "i3 is a Family car!";
  }
}

const produce = bmwProducer('sport');

const myCar = new produce();
console.log(myCar.info());
// Вывод: "Z4 is a Sport car!"

const produce2 = bmwProducer('family');
const myCar2 = new produce2();
console.log(myCar2.info());
// Вывод: "i3 is a Family car!"

//---------------
//__Prototype__//
//Прототип - это паттерн проектирования, который позволяет создавать объекты путем клонирования существующих объектов-прототипов, вместо создания новых объектов с помощью конструкторов. Прототипы служат в качестве шаблонов для создания новых объектов и содержат метод клонирования.
//создает объекты не вдоваясь в подробности ее реализации

class TeslaCar {

  constructor(model, price, interior, autopilot) {
    this.model = model;
    this.price = price;
    this.interior = interior;
    this.autopilot = autopilot;
  }

  //позволяет создавать объекты-копии с теми же значениями свойств
  produce() {
    return new TeslaCar(this.model, this.price, this.interior, this.autopilot);
  }
}

//базовый (типо документация)
const prototypeCar = new TeslaCar('Model S', 80000, 'black', true);

//на основании создаем экзкмпляры
const car1 = prototypeCar.produce();
console.log(car1);
// Вывод: TeslaCar { model: 'Model S', price: 80000, interior: 'black', autopilot: true }
//дальше уже изменяем сам клон
car1.interior = 'white'

const car2 = prototypeCar.produce();
car2.interior = 'white';
console.log(car2);
// Вывод: TeslaCar { model: 'Model S', price: 80000, interior: 'white', autopilot: true }


//-------------
//__Builder__//
// Строитель - это паттерн проектирования, который позволяет создавать сложные объекты пошагово, разделяя процесс конструирования и предоставляя гибкость при создании объектов с различными конфигурациями.

// позволяет создавать сложные объекты инициализацию которых проблематично уместить в конструкторе
// полезно, когда конструирование объекта требует множества шагов или имеет множество опций

//инициализирует свойства
class Car {

  constructor() {
    this.autoPilot = false;
    this.parktronic = false;
    this.signaling = false;
  }
}

class CarBuilder {
  constructor() {
    this.car = new Car();
  }

  addAutoPilot(autoPilot) {
    this.car.autoPilot = autoPilot;
    return this;
  }

  addParktronic(parktronic) {
    this.car.parktronic = parktronic;
    return this;
  }

  addSignaling(signaling) {
    this.car.signaling = signaling;
    return this;
  }

  updateEngine(engine) {
    this.car.engine = engine;
    return this;
  }

  build() {
    return this.car;
  }
}

const carBuilder = new CarBuilder();
const car = carBuilder
  .addAutoPilot(true)
  .addParktronic(true)
  .updateEngine('V8')
  .build();

console.log(car);
// Вывод: Car { autoPilot: true, parktronic: true, signaling: false, engine: 'V8' }

///-------------------------------------///
///__Cтруктурные паттерны(structural)__///
// Структурные паттерны(Structural patterns) - это группа паттернов проектирования, которые решают задачи организации классов и объектов в более крупные структуры.Они помогают создавать гибкие и эффективные системы, путем определения отношений между объектами и классами.
// Структурные паттерны обеспечивают способы компоновки объектов и классов, чтобы они работали вместе, предоставляют альтернативные способы наследования и комбинирования объектов, а также упрощают взаимодействие между классами.Они позволяют изменять структуру системы без изменения самого кода.

//---------------
//__Decorator__//
//Паттерн "Декоратор" позволяет динамически добавлять новые возможности и функциональность объектам без изменения их базовой структуры.

//позволяет обернуть существующий класс

//базовый класс
class Car {

  constructor() {
    this.price = 10000;
    this.model = 'Car'
  }

  getPrice() {
    return this.price;
  }

  getDescription() {
    return this.model
  }
}

class Tesla extends Car {

  constructor() {
    super();
    this.price = 25000;
    this.model = 'Tesla';
  }
}

//декоратор Autopilot
class Autopilot {
  constructor(car) {
    this.car = car;
  }

  getPrice() {
    return this.car.getPrice() + 5000;
  }

  getDescription() {
    return `${this.car.getDescription()} with autopilot`;
  }
}

//декоратор Parktronic
class Parktronic {
  constructor(car) {
    this.car = car;
  }

  getPrice() {
    return this.car.getPrice() + 3000;
  }

  getDescription() {
    return `${this.car.getDescription()} with parktronic`;
  }
}

const myTesla = new Tesla();
console.log(myTesla.getPrice()); // Вывод: 25000
console.log(myTesla.getDescription()); // Вывод: Tesla

const myTeslaWithAutopilot = new Autopilot(myTesla);
console.log(myTeslaWithAutopilot.getPrice()); // Вывод: 30000 (25000 + 5000)
console.log(myTeslaWithAutopilot.getDescription()); // Вывод: Tesla with autopilot

const myTeslaWithAutopilotAndParktronic = new Parktronic(myTeslaWithAutopilot);
console.log(myTeslaWithAutopilotAndParktronic.getPrice()); // Вывод: 33000 (30000 + 3000)
console.log(myTeslaWithAutopilotAndParktronic.getDescription()); // Вывод: Tesla with autopilot with parktronic

//------------
//__Facade__//
//Паттерн "Фасад" предоставляет унифицированный интерфейс для группы интерфейсов в подсистеме, скрывая сложную логику и предоставляя простой способ взаимодействия с подсистемой.
//Он позволяет клиентам работать с подсистемой, не заботясь о ее сложной логике и деталях реализации

//скрыть сложную логику

class Сonveyor {

  setBody() {
    console.log('Body set!');
  }

  getEngine() {
    console.log('Dismantle Engine!');
  }

  setEngine() {
    console.log('Engine set!');
  }

  setInterior() {
    console.log('Exterior added!');
  }

  changeInterior() {
    console.log('Update interior!');
  }

  setExterior() {
    console.log('Added interior!');
  }

  setWheels() {
    console.log('Wheels!');
  }

  addElectronics() {
    console.log('Added electronics!');
  }

  paint() {
    console.log('Car painted!');
  }
}

class СonveyorFacade {
  constructor(car) {
    this.car = car;
  }

  assembleCar() {
    this.car.setBody();
    this.car.setEngine();
    this.car.setInterior();
    this.car.setExterior();
    this.car.setWheels();
    this.car.addElectronics();
    this.car.paint();
  }
}

const conveyor = new Сonveyor();
const conveyorFacade = new СonveyorFacade(conveyor);

conveyorFacade.assembleCar();
// Вывод:
// Body set!
// Engine set!
// Exterior added!
// Added interior!
// Wheels!
// Added electronics!
// Car painted!

//------------
//__proxy___//
//Позволяет контролировать доступ к объекту, предоставляя прокси для него.Прокси может добавлять дополнительную функциональность, проверять условия доступа или выполнять другие действия до и после вызова методов объекта, который он замещает.Это позволяет управлять доступом к объекту и его поведением без изменения самого объекта.

//вместо реальных объектов подстовляет объекты заменители
//как прослойка

//оригинальный класс
class CarAccess {
  open() {
    console.log('Opening car door')
  }

  close() {
    console.log('Closing the car door')
  }
};

//заместитель с тем же интерфейсом как оригинал
class SecuritySystem {
  constructor(door) {
    this.door = door;
  }

  open(password) {
    if (this.authenticate(password)) {
      this.door.open();
    } else {
      console.log('Access denied!');
    }
  }

  authenticate(password) {
    return password === 'Ilon';
  }

  close() {
    this.door.close()
  }
};

const carAccess = new CarAccess();
const securitySystem = new SecuritySystem(carAccess);

securitySystem.open('Ilon'); // Вывод: Opening car door
securitySystem.open('wrong_password'); // Вывод: Access denied!
securitySystem.close(); // Вывод: Closing the car door

//-------------
//__Adapter__//
// Позволяет обернуть объект с несовместимым интерфейсом и сделать его совместимым с другим объектом без изменения исходного кода

class Engine2 {
  simpleInterface() {
    console.log('Engine 2.0 - tr-tr-tr')
  }
}

class EngineV8 {
  complecatedInterface() {
    console.log('Engine V8! - wroom wroom!')
  }
}

//оборачивает нестандартный класс чтобы сделать его стандартным
class EngineV8Adapter {
  constructor(engine) {
    this.engine = engine;
  }

  simpleInterface() {
    this.engine.complecatedInterface();
  }
}

class Auto {
  startEngine(engine) {
    engine.simpleInterface()
  }
}


const engine2 = new Engine2();
const engineV8 = new EngineV8();
const engineV8Adapter = new EngineV8Adapter(engineV8);

const auto = new Auto();
auto.startEngine(engine2); // Вывод: Engine 2.0 - tr-tr-tr
auto.startEngine(engineV8Adapter); // Вывод: Engine V8! - wroom wroom!

//------------------
//__Сomposite__//
// Позволяет создавать иерархические структуры объектов, образующих древовидную структуру, и работать с ними единообразно

//группирует множество объектов в древовидную структуру и далее работать с этой структурой так как будто это один единственный объект

//связи между ними это ветки а сами объекты это листья

//единый интерфейс вызова

//базовый интерфейс
class Equipment {
  getPrice() {
    return this.price || 0;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  setPrice(price) {
    this.price = price;
  }
}

//можно было добавить фабрику

class Engine extends Equipment {
  constructor() {
    super();
    this.setName('Engine');
    this.setPrice(800);
  }
}

class Body extends Equipment {
  constructor() {
    super();
    this.setName('Body');
    this.setPrice(3000);
  }
}

class Tools extends Equipment {
  constructor() {
    super();
    this.setName('Tools');
    this.setPrice(4000);
  }
}

class Composite extends Equipment {
  constructor() {
    super();
    this.equipments = [];
  }

  add(equipment) {
    this.equipments.push(equipment);
  }

  getPrice() {
    return this.equipments
      .map(equipment => equipment.getPrice())
      .reduce((a, b) => a + b);
  }
}

class Car extends Composite {
  constructor() {
    super();
    this.setName('Audi');
  }
}

const engine = new Engine();
const body = new Body();
const tools = new Tools();

const car = new Car();
car.add(engine);
car.add(body);
car.add(tools);

console.log(car.getName()); // Вывод: Audi
console.log(car.getPrice()); // Вывод: 8200 (800 + 3000 + 4000)

//------------
//__Bridge__//
// Разделяет классы на иерархии абстракцию и реализацию что помогает изменять их без зависемостей друг от друга.Это особенно полезно, когда имеется несколько вариаций одной функциональности или когда необходимо сделать классы более гибкими и расширяемыми

//заменяет обычное наследование композицией

//абстракция - эта специальная обертка которая сама не выполняет ничего а делегирует одному из объектов реализации
//реализация - эта объект в котором написанно непосредственно сама реализация всего

//реализация
class Model {
  constructor(color) {
    this.color = color;
  }
};

//реализация
//являеться мостом
class Color {
  constructor(type) {
    this.type = type;
  }
  get() {
    return this.type;
  }
};

//абстракция
class BlackColor extends Color {
  constructor() {
    super("dark-black");
  }
}

//абстракция
class SilbrigColor extends Color {
  constructor() {
    super("Silbermetallic");
  }
}

class Audi extends Model {
  constructor(color) {
    super(color);
  }

  //связь 
  paint() {
    return `Auto: Audi, Color: ${this.color.get()}`;
  }
};

class Bmw extends Model {
  constructor(color) {
    super(color);
  }

  paint() {
    return `Auto: Bmw, Color: ${this.color.get()}`;
  }
};

const black = new BlackColor();
const silber = new SilbrigColor();

const audi = new Audi(black);
const bmw = new Bmw(silber);

console.log(audi.paint()); // Вывод: Auto: Audi, Color: dark-black
console.log(bmw.paint()); // Вывод: Auto: Bmw, Color: Silbermetallic

//---------------
//__flyweight__//
// Используется для эффективной поддержки большого количества мелких объектов, разделяя их на две части: внутреннее и внешнее состояния.Внутреннее состояние, которое является инвариантным и не зависит от контекста, разделяется между несколькими объектами.Внешнее состояние, которое зависит от контекста, хранится отдельно и может быть передано объекту при необходимости

//позволяет экономить ресурсы
//как кэширование

//то что будет кэшироваться
class Auto {
  constructor(model) {
    this.model = model;
  }
}

class AutoFactory {
  constructor(name) {
    this.models = {};
  }

  create(name) {
    //Если объект уже существует, он возвращается
    let model = this.models[name];
    if (model) return model;

    //Если объекта с такой моделью еще нет, создается новый объект Auto с указанной моделью, добавляется в поле models и возвращается.
    this.models[name] = new Auto(name);
    return this.models[name];
  }
};

const factory = new AutoFactory();

const audi = factory.create('Audi');
const bmw = factory.create('BMW');
const audi2 = factory.create('Audi');

console.log(audi === audi2); // Вывод: true (экземпляры audi и audi2 совпадают, так как используют одну и ту же модель 'Audi')
console.log(audi === bmw); // Вывод: false (экземпляры audi и bmw разные, так как используют разные модели 'Audi' и 'BMW')

///---------------------------------------///
///__Поведенческие паттерны (Behavioral)__///
// Поведенческие паттерны(Behavioral patterns) в объектно - ориентированном программировании являются одним из видов паттернов проектирования.Они сосредоточены на взаимодействии и коммуникации между объектами, определяют общие способы организации взаимодействия, управления потоком данных и изменения поведения объектов.

// Поведенческие паттерны включают в себя различные приемы и подходы, которые помогают решать типичные задачи, связанные с поведением объектов, такие как управление состоянием, управление потоком выполнения, координация взаимодействия между объектами и др.

//------------//
//__Mediator__//
//Предоставляет централизованный объект-посредник для координации взаимодействия между группой объектов, не связывая их напрямую. Посредник обеспечивает слабую связанность между объектами, управляет и координирует их взаимодействие, обеспечивая более гибкую и расширяемую систему.

class OfficialDealer {
  constructor() {
    this.customers = [];
  }

  orderAuto(customer, auto, info) {
    const name = customer.getName();
    console.log(`Order name: ${name}. Order auto is ${auto}`);
    console.log(`Additional info: ${info}`);
    this.addToCustomersList(name);
  }

  addToCustomersList(name) {
    this.customers.push(name);
  }

  getCustomerList() {
    return this.customers;
  }
};

class Customer {
  constructor(name, dealerMediator) {
    this.name = name;
    this.dealerMediator = dealerMediator;
  }

  getName() {
    return this.name;
  }

  makeOrder(auto, info) {
    this.dealerMediator.orderAuto(this, auto, info)
  }
};

// Создание объекта посредника (дилера)
const dealer = new OfficialDealer();

// Создание объектов клиентов
const customer1 = new Customer("John", dealer);
const customer2 = new Customer("Alice", dealer);

// Клиенты размещают заказы через посредника
customer1.makeOrder("Sedan", "Color: Blue");
// Order name: John.Order auto is Sedan
// Additional info: Color: Blue
customer2.makeOrder("SUV", "Color: Red");
// Order name: Alice.Order auto is SUV
// Additional info: Color: Red

// Получение списка клиентов у дилера
const customerList = dealer.getCustomerList();
console.log("Customer List:", customerList);//Customer List: ["John", "Alice"]

//--------------
//__iterator__//
//Итератор обеспечивает унифицированный интерфейс для перебора элементов различных типов коллекций

class ArrayIterator {
  constructor(el) {
    this.index = 0;
    this.elements = el;
  }

  next() {
    return this.elements[this.index++];
  }

  //проверка существование следующего элемента
  hasNext() {
    return this.index < this.elements.length;
  }
};

class ObjectIterator {
  constructor(el) {
    this.index = 0;
    this.keys = Object.keys(el),
      this.elements = el;
  }

  next() {
    return this.elements[this.keys[this.index++]];
  }

  hasNext() {
    return this.index < this.keys.length;
  }
};

const array = [1, 2, 3, 4, 5];
const arrayIterator = new ArrayIterator(array);

while (arrayIterator.hasNext()) {
  console.log(arrayIterator.next());//[1, 2, 3, 4, 5]
}

const object = { a: 1, b: 2, c: 3 };
const objectIterator = new ObjectIterator(object);

while (objectIterator.hasNext()) {
  console.log(objectIterator.next());//{ a: 1, b: 2, c: 3 }
}

//-----------------------------
//__Сhain-of-responsibility__//
// Позволяет создать цепочку объектов-обработчиков и передавать запрос по этой цепочке до тех пор, пока один из объектов не обработает запрос или пока запрос не достигнет конца цепочки

//цепочка ответственности
class Account {
  pay(orderPrice) {
    if (this.canPay(orderPrice)) {
      console.log(`Paid ${orderPrice} using ${this.name}`);
    } else if (this.incomer) {
      console.log(`Cannot pay using ${this.name}`);
      this.incomer.pay(orderPrice)
    } else {
      console.log('Unfortunately, not enough money');
    }
  }

  canPay(amount) {
    return this.balance >= amount;
  }

  setNext(account) {
    this.incomer = account;
  }
};

class Master extends Account {
  constructor(balance) {
    super();
    this.name = 'Master Card';
    this.balance = balance;
  }
};

class Paypal extends Account {
  constructor(balance) {
    super();
    this.name = 'Paypal';
    this.balance = balance;
  }
};

class Qiwi extends Account {
  constructor(balance) {
    super();
    this.name = 'Qiwi';
    this.balance = balance;
  }
};

const masterCard = new Master(100);
const paypal = new Paypal(200);
const qiwi = new Qiwi(50);

masterCard.setNext(paypal);
paypal.setNext(qiwi);

masterCard.pay(150);//Paid 150 using Paypal

//--------------
//__Strategy__//
// Позволяет определить семейство алгоритмов, инкапсулировать каждый из них в отдельный класс и сделать их взаимозаменяемыми. При этом позволяется изменять алгоритмы независимо от клиентов, которые их используют

//стратигии должны иметь одинаковый интерфейс взаимодействия

function baseStrategy(amount) {
  return amount;
};

function premiumStrategy(amount) {
  return amount * 0.85;
};

function platinumStrategy(amount) {
  return amount * 0.65;
};

class AutoCart {
  constructor(discount) {
    this.discount = discount;
    this.amount = 0;
  }

  checkout() {
    return this.discount(this.amount);
  }

  setAmount(amount) {
    this.amount = amount;
  }
};

const cart = new AutoCart(premiumStrategy);
cart.setAmount(1000);
console.log(cart.checkout()); // Вывод: 850

cart.discount = platinumStrategy;
console.log(cart.checkout()); // Вывод: 650

//-------------
//__Memento__//
// Позволяет сохранять и восстанавливать внутреннее состояние объекта без нарушения инкапсуляции. Этот паттерн позволяет создавать снимки состояния объекта и восстанавливать его в любой момент времени

//функция востановление 

class Memento {
  constructor(value) {
    this.value = value;
  }
};

const creator = {
  save: val => new Memento(val),
  restore: memento => memento.value,
};

//структура где будем хранить снимки
class Caretaker {
  constructor() {
    this.values = [];
  }

  addMemento(memento) {
    this.values.push(memento);
  }

  getMemento(index) {
    return this.values[index];
  }
};

const caretaker = new Caretaker();
caretaker.addMemento(creator.save("State 1"));
caretaker.addMemento(creator.save("State 2"));

console.log(creator.restore(caretaker.getMemento(0))); // Вывод: "State 1"
console.log(creator.restore(caretaker.getMemento(1))); // Вывод: "State 2"

//--------------
//__Template__//
// Определяет скелет алгоритма в базовом классе, оставляя определение некоторых шагов алгоритма для подклассов. Таким образом, базовый класс определяет общую структуру алгоритма, а подклассы могут переопределить определенные шаги алгоритма без изменения его общей структуры

class Builder {
  build() {
    this.addEngine();
    this.installChassis();
    this.addElectronic();
    this.collectAccessories();
  }
};

class TeslaBuilder extends Builder {
  addEngine() {
    console.log('Add Electronic Engine');
  }

  installChassis() {
    console.log('Install Tesla chassis');
  }

  addElectronic() {
    console.log('Add special electronic');
  }

  collectAccessories() {
    console.log('Collect Accessories');
  }
}

class BmwBuilder extends Builder {
  addEngine() {
    console.log('Add BMW Engine');
  }

  installChassis() {
    console.log('Install BMW chassis');
  }

  addElectronic() {
    console.log('Add electronic');
  }

  collectAccessories() {
    console.log('Collect Accessories');
  }
}

const teslaBuilder = new TeslaBuilder();
teslaBuilder.build();
// Вывод:
// Add Electronic Engine
// Install Tesla chassis
// Add special electronic
// Collect Accessories

const bmwBuilder = new BmwBuilder();
bmwBuilder.build();
// Вывод:
// Add BMW Engine
// Install BMW chassis
// Add electronic
// Collect Accessories

//-------------
//__Visitor__//
// Позволяет добавлять новые операции к объектам без изменения их классов. Он достигается путем выделения этих операций в отдельные классы посетителей

class Auto {
  accept(visitor) {
    visitor(this);
  }
}

class Tesla extends Auto {
  info() {
    return 'It is a Tesla car!';
  }
}

class Bmw extends Auto {
  info() {
    return 'It is a BMW car!';
  }
}

class Audi extends Auto {
  info() {
    return 'It is an Audi car!';
  }
}

function exportVisitor(auto) {
  if (auto instanceof Tesla)
  //auto.export является свойством, которое добавляется к объекту auto в функции exportVisitor
    auto.export = console.log(`Exported data: ${auto.info()}`);
  if (auto instanceof Bmw)
    auto.export = console.log(`Exported data: ${auto.info()}`);
  if (auto instanceof Audi)
    auto.export = console.log(`Exported data: ${auto.info()}`);
};

const tesla = new Tesla();
const bmw = new Bmw();
const audi = new Audi();

exportVisitor(tesla);
// Вывод: Exported data: It is a Tesla car!

exportVisitor(bmw);
// Вывод: Exported data: It is a BMW car!

exportVisitor(audi);
// Вывод: Exported data: It is an Audi car!

//-------------
//__Сommand__//
// Позволяет инкапсулировать запросы в отдельные объекты, позволяя параметризовать клиентов с различными запросами, организовывать очередь или записывать историю запросов

// Driver - класс, представляющий водителя, который будет выполнять команды. В конструкторе принимается объект команды, которую необходимо выполнить. Метод execute() вызывает метод execute() у переданной команды.

// Engine - класс, представляющий двигатель. Имеет состояние state, которое определяет, включен ли двигатель. Методы on() и off() изменяют состояние двигателя.

// OnStartCommand - класс команды для включения двигателя. В конструкторе принимается объект двигателя engine. Метод execute() вызывает метод on() у двигателя.

// onSwitchOffCommand - класс команды для выключения двигателя. В конструкторе принимается объект двигателя engine. Метод execute() вызывает метод off() у двигателя.

class Driver {
  constructor(command) {
    this.command = command;
  }

  execute() {
    this.command.execute();
  }
};

class Engine {
  constructor() {
    this.state = false;
  }

  on() {
    this.state = true;
  }

  off() {
    this.state = false;
  }
};

//инкапсулированная команда
//как бизнес логика
class OnStartCommand {
  constructor(engine) {
    this.engine = engine;
  }

  execute() {
    this.engine.on();
  }
};

////инкапсулированная команда
class onSwitchOffCommand {
  constructor(engine) {
    this.engine = engine;
  }

  execute() {
    this.engine.off();
  }
};

const engine = new Engine();

const onStartCommand = new OnStartCommand(engine);
const onSwitchOffCommand = new onSwitchOffCommand(engine);

const driver = new Driver(onStartCommand);
driver.execute();
// Включение двигателя

driver.command = onSwitchOffCommand;
driver.execute();
// Выключение двигателя

//--------------
//__Оbserver__//
// Предоставляет механизм подписки и оповещения наблюдателей об изменениях в объекте

class AutoNews {

  constructor() {
    this.news = '';
    this.actions = [];
  }

  setNews(text) {
    this.news = text;
    this.notifyAll();
  }

  notifyAll() {
    return this.actions.forEach(subs => subs.inform(this));
  }

  register(observer) {
    this.actions.push(observer);
  }

  unregister(observer) {
    this.actions = this.actions.filter(el => !(el instanceof observer));
  }
};

class Jack {
  inform(message) {
    console.log(`Jack has been informed about: ${message.news}`);
  }
};

class Max {
  inform(message) {
    console.log(`Max has been informed about: ${message.news}`);
  }
};

const autoNews = new AutoNews();

const jack = new Jack();
const max = new Max();

autoNews.register(jack);
autoNews.register(max);

autoNews.setNews('New electric car released!');
// Вывод:
// Jack has been informed about: New electric car released!
// Max has been informed about: New electric car released!

autoNews.unregister(jack);

autoNews.setNews('New SUV model announced!');
// Вывод:
// Max has been informed about: New SUV model announced!

//-----------
//__State__//
// Позволяет объекту изменять свое поведение в зависимости от внутреннего состояния

class OrderStatus {
  constructor(name, nextStatus) {
    this.name = name;
    this.nextStatus = nextStatus;
  }

  next() {
    return new this.nextStatus();
  }
}

class WaitingForPayment extends OrderStatus {
  constructor() {
    super('waitingForPayment', Shipping);
  }
}

class Shipping extends OrderStatus {
  constructor() {
    super('shipping', Delivered);
  }
}

class Delivered extends OrderStatus {
  constructor() {
    super('delivered', Delivered);
  }
}

class Order {
  constructor() {
    this.state = new WaitingForPayment();
  }

  nextState() {
    this.state = this.state.next();
  };
}

const order = new Order();
console.log(order.state.name);
// Вывод: waitingForPayment

order.nextState();
console.log(order.state.name);
// Вывод: shipping

order.nextState();
console.log(order.state.name);
// Вывод: delivered

order.nextState();
console.log(order.state.name);
// Вывод: delivered