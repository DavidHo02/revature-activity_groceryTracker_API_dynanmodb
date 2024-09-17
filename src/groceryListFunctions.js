const Item = require('./item');
const { logger } = require('./util/logger');

const { readGroceryList, writeGroceryList } = require('./groceryListDAO');

groceryList = readGroceryList();

function addItem(name, quantity, price, bought = false) {
    newItem = new Item(
        name, 
        parseInt(quantity), 
        parseFloat(price).toFixed(2), 
        bought
    );
    groceryList.push(newItem);
    writeGroceryList(groceryList);
    logger.info(`Added ${newItem.name} to grocery list`);
    return `${newItem.name} has been added to the grocery list`;
}

function togglePurchased(itemName) {
    let index = searchItem(itemName);
    if(index === -1) { // could not find item in groceryList
        return `Could not find ${itemName} in the grocery list`;
    }
    else { // did find the item in grocery_list, now change old values to new values
        groceryList.at(index).bought = !groceryList.at(index).bought;
        logger.info(`Set ${itemName}'s bought status as ${groceryList.at(index).bought} in the grocery list`);
    }
    writeGroceryList(groceryList);
    return `${itemName} has been set as ${groceryList.at(index).bought}`;
}

function deleteItem(itemName) {
    let index = searchItem(itemName);
    if(index === -1) { // could not find item in grocery_list
        return `Could not find ${itemName} in the grocery list`;
    }
    else { // did find the item in grocery_list, now remove it
        groceryList.splice(index, 1);
        logger.info(`Deleted ${itemName} from grocery list`);
    }
    writeGroceryList(groceryList);
    return `${itemName} has been removed from the grocery list`;
}

function searchItem(itemName) {
    return groceryList.findIndex((item) => item.name == itemName);
}

module.exports = {
    groceryList,
    addItem,
    togglePurchased,
    deleteItem,
}