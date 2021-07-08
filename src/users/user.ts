import fs from 'fs'
import { logger } from '../log';
import userService from './user.service';

export class User {
  public role = 'Customer';
  constructor(public name: string, public password: string, public money: number, role: string){
    this.role = role;
  }
}

//  export let users: User[]

// export function loadUsers(){
//   fs.readFile('users.json', 'utf-8', function(err, data){
//     if(err){
//       console.log(err)
//     } else {
//       users = JSON.parse(data);
//       logger.debug(users);

//     }

//   });
// }


// export function getUser(username: string){
//   return users.find(person => person.name === username);

// }

export async function login(username:string, password:string): Promise<User|null> {
  logger.debug(username + ' ' + password);

  return await userService.getUserByName(username).then(user => {
    if (user && user.password === password){
      return user
    } else {
      return null;
    }
  })

}

export function register(username:string, password:string, money: number, callback: Function){
  userService.addUser(new User(username, password, money, 'Customer')).then(res => {
    logger.trace(res);
    callback();
  }).catch(err => {
    logger.error(err);
    console.log('Error, this probablu=y means that the username is already taken.');
    callback();
  });
}



// export function saveUsers(){
//   let i = JSON.stringify(users);
//   fs.writeFileSync('users.json', i)

// }

export function updateUser(user: User){
  userService.updateUser(user).then(success => {
    logger.info('user updated successfully');
  }).catch(error => {
    logger.warn('user not updated');
  });
}