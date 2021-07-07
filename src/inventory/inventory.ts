import fs from 'fs';
import { logger } from '../log';

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
  logger.trace(`ItemString called with parameter ${JSON.stringify(item)}`)
  return `${item.position}. ${item.item} -$${item.price}`;
}

export function displayContents(){
  logger.trace('displayContents called')
  inventory.forEach(item => {
    console.log( itemString(item));
  })
}

export function getByPosition(position: string){
  return inventory.find(item => item.position === position);
}

export function restockItem(itemName: string){
  logger.trace(`restock called with parameter ${itemName}`)
  let selection = inventory.find(item => item.item === itemName);
  if (selection){
    selection.stock++
  }
}

export function saveInventory(){
  let i = JSON.stringify(inventory);
  fs.writeFileSync('inventory.json', i)

}