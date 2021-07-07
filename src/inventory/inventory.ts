import fs from 'fs';

export interface Inventory {
  item: string;
  position: string;
  price: number;
  stock: number
}


export let inventory: Inventory[];

export function loadInventory(){
  fs.readFile('inventory.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
      inventory= JSON.parse(data)
      
  });
}


function itemString(item: Inventory){

  return `${item.position}. ${item.item} -$${item.price}`;
}

function displayContents(){
  inventory.forEach(item => {
    console.log( itemString(item));
  })
}

function getByPosition(position: string){
  return inventory.find(item => item.position === position);
}

export function restockItem(itemName: string){
  let selection = inventory.find(item => item.item === itemName);
  if (selection){
    selection.stock++
  }
}

function saveInventory(){
  let i = JSON.stringify(inventory);
  fs.writeFileSync('inventory.json', i)

}