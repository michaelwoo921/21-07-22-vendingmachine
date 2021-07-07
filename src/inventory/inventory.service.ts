import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import dynamo  from '../dynamo/dynamo';
import { logger } from '../log';
import {Inventory} from './inventory';



class InventoryService {

  private doc: DocumentClient;
  constructor(){
    this.doc = dynamo
  }

 

  async addItem(inventory: Inventory){
    const params = {
      TableName: 'inventory_items',
      Item: inventory
    }

    return await this.doc.put(params).promise().then(result => {
      logger.info('successfully created item');
      return true;
    }).catch(error => {
      logger.error(error);
      return false;
    })


  }

}

const inventoryService = new InventoryService();
Object.freeze(inventoryService);
export default inventoryService;
