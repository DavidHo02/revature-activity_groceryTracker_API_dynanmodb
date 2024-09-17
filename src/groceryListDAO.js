const fs = require('fs');
const path = require('path');
const { logger } = require('./util/logger');

const filePath = path.join(__dirname, "data.json");

function writeGroceryList(groceryList){
    fs.writeFileSync(filePath, JSON.stringify(groceryList, null, 2));
    logger.info("Grocery list updated in data.json");
}

function readGroceryList(){
    if (!fs.existsSync(filePath)) {
        // if file does not exist, create an empty shopping list
        fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

module.exports = {
    readGroceryList,
    writeGroceryList
}