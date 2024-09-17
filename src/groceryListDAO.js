const { DynamoDBClient, QueryCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand
} = require("@aws-sdk/lib-dynamodb");

const { logger } = require('./util/logger');

const client = new DynamoDBClient({region: 'us-west-1'});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = 'GroceryList';

async function queryGroceryItem(itemID) {
    const command = new QueryCommand({
        TableName,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeNames: { '#id': 'ItemID'},
        ExpressionAttributeValues: {
            ':id': {S: itemID}
        }
    });

    try {
        const data = await documentClient.send(command);
        return data.Items[0];
    } catch(err) {
        console.error(err);
    }
}

//queryGroceryItem('06ef06be-d8f6-4b55-86ff-b27f4e766e16');

// returns a promise
async function scanGroceryList() {
    const command = new ScanCommand({
        TableName
    })

    try {
        const data = await documentClient.send(command);
        return data.Items;
    } catch(err) {
        console.error(err);
    }
}

async function createGroceryItem(Item) {
    const command = new PutCommand({
        TableName,
        Item
    });

    try {
        const response = await documentClient.send(command);
        return response;
    } catch(err) {
        console.error(err);
    }
}

// TO DO
async function editGroceryItem(itemID, newBool) {
    const command = new UpdateCommand({
        TableName,
        Key: {
            'ItemID': itemID
        },
        UpdateExpression: 'SET bought = :bool',
        ExpressionAttributeValues: {
            ':bool': newBool
        }
    });

    try {
        const data = await documentClient.send(command);
        return data.Items;
    } catch(err) {
        console.error(err);
    }
}

//editGroceryItem('ab693453-3f1c-41c9-a5f7-f5b1e17c62f5');

async function deleteGroceryItem(itemID) {
    const command = new DeleteCommand({
        TableName,
        Key: {
            'ItemID': itemID
        }
    });

    try {
        const data = await documentClient.send(command);
        return data.Items;
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    scanGroceryList,
    createGroceryItem,
    editGroceryItem,
    deleteGroceryItem
}