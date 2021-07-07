import dynamo from '../dynamo/dynamo';
import { DocumentClient} from 'aws-sdk/clients/dynamodb';
import {User} from './user';
import { logger } from '../log';

class UserService {

  private doc: DocumentClient
  constructor(){
    this.doc = dynamo
  }





  async addUser(user: User){
    const params = {
      TableName: 'users',
      Item: user

    }

    return await this.doc.put(params).promise().then(result => {
      logger.info('successfully created item');
      return true;
    }).catch((error) =>{
      logger.error(error);
      return false;
    })

  }
}

const userService = new UserService();
Object.freeze(userService);
export default userService;
