import fs from 'fs';

export let inventory;

export function loadInventory(){
  fs.readFile('inventory.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
      inventory = JSON.parse(data)
      
  });
}

// function saveInventory(){

// }
// function itemString(item){

// }

// function displayContents(){

// }

// function getByPosition(position){

// }

