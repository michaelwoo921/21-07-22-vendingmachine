import fs from 'fs'
import { logger } from '../log';

export class User {
  role = 'Customer';
  constructor(public name: string, public password: string, public money: number, role: string){
    this.role = role;
  }
}

export let users: User[]

export function loadUsers(){
  fs.readFile('users.json', 'utf-8', function(err, data){
    if(err){
      console.log(err)
    } else {
      users = JSON.parse(data);
      logger.debug(users);

    }

  });
}


export function getUser(username: string){
  return users.find(person => person.name === username);

}

export function login(username:string, password:string){
  logger.debug(users);
  logger.debug(username + ' ' + password);
  return users.find(person => person.name === username && person.password === password);

}

export function register(username:string, password:string, money: number){
  logger.debug(users);

  users.push({
    name: username, 
    password,
    money,
    role: 'Customer'
  })
  logger.debug(users);
  //TO DO:  registration for employee
}


export function saveUsers(){
  let i = JSON.stringify(users);
  fs.writeFileSync('users.json', i)

}
