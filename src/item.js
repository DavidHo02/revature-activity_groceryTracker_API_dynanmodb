const { v4: uuidv4 } = require('uuid');

module.exports = class Item {
    constructor(name, quantity, price, bought) {
        this.ItemID = uuidv4();
        this.name = name;
        this.quantity = parseInt(quantity);
        this.price = parseFloat(price).toFixed(2);
        this.bought = bought;
    }

    togglePurchased() {
        this.bought = !this.bought;
    }
}

// class Item {
//     constructor(name, quantity, price, bought) {
//         this.id = uuidv4();
//         this.name = name;
//         this.quantity = quantity;
//         this.price = price;
//         this.bought = bought;
//     }
// }

//let item = new Item('bread', 1, 1.99, false)
//console.log(new Item('bread', 1, 1.99, false));