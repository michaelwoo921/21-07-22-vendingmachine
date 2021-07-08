import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import dynamo  from '../dynamo/dynamo';
import { logger } from '../log';
import {Inventory} from './inventory';



class InventoryService {

  private doc: DocumentClient;
  constructor(){
    this.doc = dynamo;
  }

  async getItems(): Promise<Inventory[]>{
    const params = { TableName: 'inventory_items'}
    return await this.doc.scan(params).promise().then(result => {
      return result.Items as Inventory[];
    }).catch(error => {
      logger.error(error);
      return [];
    })
  }
 
  async getItemByPosition(position: string) : Promise<Inventory|null>{

    const params ={
      TableName: 'inventory_items',
      KeyConditionExpression: '#pos = :position',
      ExpressionAttributeNames: {
        '#pos': 'position'
      },
      ExpressionAttributeValues: {
        ':position': position
      }
    };
    return await this.doc.query(params).promise().then(data => {
      if (data && data.Items && data.Items.length){
        return data.Items[0] as Inventory
      }
      else {
        return null;
      }
    });
  }

  async getItemByPositionSimple(position: string): Promise<Inventory|null>{
    const params ={
      TableName: 'inventory_items',
      Key: {
        'position': position
      }
    };

    return await this.doc.get(params).promise().then(data => {
      if (data && data.Item)
        return data.Item as Inventory;
      else
        return null;
    })

  }

  async updateItem(inventory: Inventory): Promise<boolean>{
    const params ={
      TableName: 'inventory_items',
      Key: {
        'position': inventory.position
      },
      UpdateExpression: 'set stock = :s, price = :p',
      ExpressionAttributeValues:{
        ':p': inventory.price,
        ':s': inventory.stock
      },
      ReturnValues: 'UPDATED_NEW'
    };
    return await this.doc.update(params).promise().then(data => {
      console.log(data);
      return true;
    }).catch(error => {
      logger.error(error);
      return false;
    })

  }



  async addItem(inventory: Inventory): Promise<boolean>{
    const params = {
      TableName: 'inventory_items',
      Item: inventory,
      ConditionExpression: '#p <> :pos',
      ExpressionAttributeNames: {
        '#p': 'position'
      },
      ExpressionAttributeValues: {
        ':pos': inventory.position
      }
    };

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
