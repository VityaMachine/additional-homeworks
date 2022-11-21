function Hamburger(size, stuffing) {
  try {
    if (!size) {
      throw new HamburgerException("no size given");
    }

    if (!size.includes("SIZE")) {
      throw new HamburgerException(`invalid size '${size}'`);
    }

    if (!stuffing) {
      throw new HamburgerException("no stuffing given");
    }

    if (!stuffing.includes("STUFFING")) {
      throw new HamburgerException(`invalid stuffing '${stuffing}'`);
    }

    this.size = size;
    this.stuffing = stuffing;
    this.topping = [];
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
}

Hamburger.SIZE_SMALL = "SIZE_SMALL";
Hamburger.SIZE_LARGE = "SIZE_LARGE";
Hamburger.STUFFING_CHEESE = "STUFFING_CHEESE";
Hamburger.STUFFING_SALAD = "STUFFING_SALAD";
Hamburger.STUFFING_POTATO = "STUFFING_POTATO";
Hamburger.TOPPING_MAYO = "TOPPING_MAYO";
Hamburger.TOPPING_SPICE = "TOPPING_SPICE";


Hamburger.prototype.addTopping = function (topping) {
  try {
    if (!topping) {
      throw new HamburgerException("no topping given");
    }

    if (!topping.includes("TOPPING")) {
      throw new HamburgerException(`invalid topping '${topping}'`);
    }

    if (this.topping.includes(topping)) {
      throw new HamburgerException(`duplicate topping '${topping}'`);
    }

    this.topping.push(topping);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

Hamburger.prototype.removeTopping = function (topping) {
  try {
    if (!topping) {
      throw new HamburgerException("no topping given");
    }

    if (!topping.includes("TOPPING")) {
      throw new HamburgerException(`wrond topping name '${topping}'`);
    }

    if (!this.topping.includes(topping)) {
      throw new HamburgerException(`topping '${topping}' not found`);
    }

    this.topping = this.topping.filter(function (item) {
      if (item !== topping) {
        return item;
      }
    });
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

Hamburger.prototype.getToppings = function () {
  try {
    if (this.topping.length < 1) {
      throw new HamburgerException("no included toppings");
    }

    return this.topping;
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

Hamburger.prototype.getSize = function () {
  try {
    return this.size;
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

Hamburger.prototype.getStuffing = function () {
  try {
    return this.stuffing;
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

Hamburger.prototype.calculatePrice = function () {
  var sizePrice = 0;
  var stuffingPrice = 0;
  var toppingPrice = 0;

  try {
    if (this.size === Hamburger.SIZE_LARGE) {
      sizePrice = 100;
    } else if (this.size === Hamburger.SIZE_SMALL) {
      sizePrice = 50;
    }

    if (this.stuffing === Hamburger.STUFFING_CHEESE) {
      stuffingPrice = 10;
    } else if (this.stuffing === Hamburger.STUFFING_SALAD) {
      stuffingPrice = 20;
    } else if (this.stuffing === Hamburger.STUFFING_POTATO) {
      stuffingPrice = 15;
    }

    toppingPrice = this.topping.reduce(function (sum, item) {
      var priceSpice = 15;
      var priceMayo = 20;

      if (item === Hamburger.TOPPING_SPICE) {
        sum += priceSpice;
      }

      if (item === Hamburger.TOPPING_MAYO) {
        sum += priceMayo;
      }

      return sum;
    }, 0);

    return sizePrice + stuffingPrice + toppingPrice;
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

Hamburger.prototype.calculateCalories = function () {
  var sizeCalories = 0;
  var stuffingCalories = 0;
  var toppingCalories = 0;

  try {
    if (this.size === Hamburger.SIZE_SMALL) {
      sizeCalories = 20;
    }
    if (this.size === Hamburger.SIZE_LARGE) {
      sizeCalories = 40;
    }

    if (this.stuffing === Hamburger.STUFFING_CHEESE) {
      stuffingCalories = 20;
    }
    if (this.stuffing === Hamburger.STUFFING_SALAD) {
      stuffingCalories = 5;
    }
    if (this.stuffing === Hamburger.STUFFING_POTATO) {
      stuffingCalories = 10;
    }

    if (this.topping.includes(Hamburger.TOPPING_MAYO)) {
      toppingCalories = 5;
    }

    return sizeCalories + stuffingCalories + toppingCalories;
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

function HamburgerException(message) {
  this.name = "HamburgerException";
  this.message = message;
}



var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// А сколько теперь стоит?
console.log("Price with sauce: %f", hamburger.calculatePrice());
// Проверить, большой ли гамбургер?
console.log(
  "Is hamburger large: %s",
  hamburger.getSize() === Hamburger.SIZE_LARGE
); // -> false
// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1






// не передали обязательные параметры
var h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
var h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
var h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
h4.addTopping(Hamburger.TOPPING_MAYO);
h4.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'
