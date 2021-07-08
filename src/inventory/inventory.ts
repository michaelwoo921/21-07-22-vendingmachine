import fs from 'fs';
import { callbackify } from 'util';
import { logger } from '../log';
import inventoryService from './inventory.service';

export interface Inventory {
  item: string;
  position: string;
  price: number;
  stock: number
}


// export let inventory: Inventory[];

// export function loadInventory(){
//   fs.readFile('inventory.json', 'utf8' , (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//       inventory= JSON.parse(data)
      
//   });
// }

export function updateItem(item: Inventory, callback: Function){
  logger.trace(`update called with parameter ${JSON.stringify(item)}`);
  inventoryService.updateItem(item).then(bool => {
    callback();
  });
}



function itemString(item: Inventory){
  logger.trace(`ItemString called with parameter ${JSON.stringify(item)}`)
  return `${item.position}. ${item.item} -$${item.price}`;
}

export function displayContents(callback: Function){
  logger.trace('displayContents called');
  inventoryService.getItems().then(items => {
    items.forEach(item => {
      console.log( itemString(item));
    });
    callback();
  })

}

export function getByPosition(position: string, success: Function, cont: Function, operation?: Function){
  inventoryService.getItemByPositionSimple(position).then(selection => {
    if (selection) {
      if (operation){
        operation(selection);
      }
      success(selection as Inventory, cont);
    } else {
      console.log('incorrect, try again.');
      cont();
    }
  })
}

// export function restockItem(itemName: string){
//   logger.trace(`restock called with parameter ${itemName}`)
//   let selection = inventory.find(item => item.item === itemName);
//   if (selection){
//     selection.stock++
//   }
// }

// export function saveInventory(){
//   let i = JSON.stringify(inventory);
//   fs.writeFileSync('inventory.json', i)

// }

export function createItem(item: Inventory, callback: Function){
  logger.info('Adding item to db');
  inventoryService.addItem(item).then(res => {
    logger.trace(res);
    callback();
  }).catch( err => {
    logger.error(err);
    callback();
  })
}