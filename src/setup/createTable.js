"use strict";
exports.__esModule = true;
var AWS = require("aws-sdk");
AWS.config.update({
    region: 'us-west-2'
});
var dynamodb = new AWS.DynamoDB();
var inventoryKeySchema = {
    TableName: "inventory_items",
    KeySchema: [
        { AttributeName: "position", KeyType: "HASH" }, //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "position", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    }
};
var userSchema = {
    TableName: "users",
    KeySchema: [
        { AttributeName: "name", KeyType: "HASH" }, //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    }
};
var removeInventory = {
    TableName: "Inventory_items"
};
var removeUsers = {
    TableName: "users"
};
dynamodb.deleteTable(removeInventory, function (err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    }
    else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
dynamodb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    }
    else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
// dynamodb.createTable(userSchema, function(err, data) {
//   if (err) {
//       console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//   } else {
//       console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//   }
// });
// dynamodb.createTable(inventoryKeySchema, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });
