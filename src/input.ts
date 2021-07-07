import readline from 'readline';
import { loadInventory, inventory, displayContents } from './inventory/inventory';
import { loadUsers, users } from './users/user';
import {logger} from './log';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



export function load(){
  loadUsers();
  loadInventory();

}

export function start(){

  // console.log('prgram starts here...');

  rl.question(`What do you want to do?
  0. Register
  1. Login
  2. Display Contents
  3. Make Selection
  4. Restock 
  q. Exit
  
  ` , function(answer) {
  
   switch(answer){
     case '0':
       attemptRegister(); break;
      case '1':
        attemptLogin(); break;
      case '2':
        displayContents(); start();
        break;
      case '3':
        makeSelection(); break;
      case '4':
        restock(); break;
      case 'q':
        exit(); break; 
      default:
        start();

   }

// users, inventory, exit
    });

}

function attemptRegister(){
  console.log('register logic goes here')
  rl.question('type your name: ', function(username){
    rl.question('type your password: ', function(password){

      logger.debug(`username: ${username}- password ${password} \n`)

    })
  })
}

function attemptLogin(){
  console.log('login logic goes here')
}

function restock(){
  console.log('restock login goes here')
}

function makeSelection(){
  console.log('selection logic goes here')
}
function exit(){

  process.exit(0);
}
