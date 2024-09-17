const Item = require('./item');
const { logger } = require('./util/logger');

const { scanGroceryList, createGroceryItem, editGroceryItem, deleteGroceryItem } = require('./groceryListDAO');

/* CANT DO THIS */
//let groceryList = await scanGroceryList();

function getItems() {
    console.log('getting grocery items');
    return scanGroceryList();
}

async function addItem(name, quantity, price, bought = false) {
    const newItem = new Item(name, quantity, price, bought);
    let data = await createGroceryItem(newItem);
    logger.info(`Added ${name} to grocery list`);
}

async function editItem(itemID, newBool) {
    editGroceryItem(itemID, newBool);
}

async function deleteItem(itemID) {
    deleteGroceryItem(itemID);
}

module.exports = {
    getItems,
    addItem,
    editItem,
    deleteItem
}