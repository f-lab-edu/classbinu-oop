// 인터페이스
interface ICustomer {
  order(menuItem: IMenuItem): ICoffee;
  drink(coffee: ICoffee): void;
}

interface IMenuItem {
  getName(): string;
  getPrice(): number;
}

interface IBarista {
  makeCoffee(menuItem: IMenuItem): ICoffee;
}

interface ICoffee {
  drink(): void;
  getAmount(): number;
}

// 구현
class Customer implements ICustomer {
  constructor(private barista: IBarista) {}

  order(menuItem: IMenuItem): ICoffee {
    console.log(
      `${menuItem.getName()}를 ${menuItem.getPrice()}원에 주문합니다.`
    );
    // 주문 후 바리스타에게 커피를 만들어 달라고 메시지를 보냅니다.
    return this.barista.makeCoffee(menuItem);
  }

  drink(coffee: ICoffee) {
    console.log("커피를 원샷으로 마십니다.");
    coffee.drink();
  }
}

class MenuItem implements IMenuItem {
  constructor(private name: string, private price: number) {}

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}

class Barista implements IBarista {
  // 커피를 만들 책임을 가집니다.
  makeCoffee(menuItem: IMenuItem): ICoffee {
    console.log(`바리스타가 ${menuItem.getName()}를 만듭니다.`);
    return new Coffee(menuItem);
  }
}

class Coffee implements ICoffee {
  constructor(private menuItem: IMenuItem) {}

  amount: number = 100;

  drink() {
    this.amount = 0;
  }

  getAmount(): number {
    return this.amount;
  }
}

// Usage
const barista = new Barista();
const customer = new Customer(barista);
const americano = new MenuItem("Americano", 1000);
const coffee = customer.order(americano);
console.log(`남은 커피: ${coffee.getAmount()}`);
customer.drink(coffee);
console.log(`남은 커피: ${coffee.getAmount()}`);
