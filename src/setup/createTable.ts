import * as AWS from 'aws-sdk'
import inventoryService from '../inventory/inventory.service'
import { users } from '../users/user';
import userService from '../users/user.service'

AWS.config.update({
  region: 'us-west-2'
})



const dynamodb = new AWS.DynamoDB();


const inventoryKeySchema = {
    TableName : "inventory_items",
    KeySchema: [       
        { AttributeName: "position", KeyType: "HASH"},  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "position", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 3, 
        WriteCapacityUnits: 3
    }
};

const userSchema = {
  TableName : "users",
  KeySchema: [       
      { AttributeName: "name", KeyType: "HASH"},  //Partition key
  ],
  AttributeDefinitions: [       
      { AttributeName: "name", AttributeType: "S" }
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 3, 
      WriteCapacityUnits: 3
  }
};


const removeInventory = {
  TableName: "Inventory_items"
}

const removeUsers ={
  TableName: "users"
}



dynamodb.deleteTable(removeInventory, function(err, data) {
  if (err) {
      console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
  }

  setTimeout(() => {

    dynamodb.createTable(inventoryKeySchema, function(err, data) {
      if (err) {
          console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
      }

      setTimeout(()=>{
        populateInventoryTable();
      }, 10000)


  });
  }, 5000)

});

dynamodb.deleteTable(removeUsers, function(err, data) {
  if (err) {
      console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
  }


  setTimeout(() => {
    dynamodb.createTable(userSchema, function(err, data) {
      if (err) {
          console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
      }
    });

    setTimeout(()=>{
      populateUserTable();
    }, 10000)
  
  }, 5000)

});


function populateInventoryTable(){
  inventoryService.addItem({
    item: 'Gatorate', position: 'Z67', price: 5, stock: 5
  }).then(()=>{});
  inventoryService.addItem({
    item: 'Pepsi Zero', position: 'Z68', price: 5, stock: 5
  }).then(()=>{});
  inventoryService.addItem({
    item: 'Water', position: 'Z69', price: 8, stock: 5
  }).then(()=>{});
  inventoryService.addItem({
    item: 'Cholate Chip', position: 'A23', price: 2, stock: 5
  }).then(()=>{});
  inventoryService.addItem({
    item: 'Snickers', position: 'B37', price: 3, stock: 5
  }).then(()=>{});
  inventoryService.addItem({
    item: 'Chips', position: 'S7', price: 4, stock: 5
  }).then(()=>{});
}

function populateUserTable(){
  userService.addUser({
    name: 'Michael', password: 'pass', money: 20, role: 'Employee'
  }).then(() =>{});
  userService.addUser({
    name: 'Jung', password: 'pass', money: 20, role: 'Customer'
  }).then(() =>{});

}



