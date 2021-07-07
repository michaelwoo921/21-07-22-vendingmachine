import readline from 'readline';
import { loadInventory, inventory, displayContents, saveInventory } from './inventory/inventory';
import { loadUsers, users, getUser, register,login,  saveUsers, User } from './users/user';
import {logger} from './log';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let loggedUser: User;

/*
  List of features:
    Contains products.
    Displays info on products.
    Accepts selection of object.
    Accept payment for object.
    Dispense object.
    Be able to be restocked.

*/




function restock(){
  console.log('restock login goes here')
}

function makeSelection(){
  console.log('selection logic goes here')
}




function attemptRegister(){
  rl.question('Username? ', function(username){
    if (getUser(username)) {
      console.log('User already exists');
    } else{
      console.log('Register new user');
      rl.question('Password? ', function(password){
        // to do confirm password
        rl.question('Money?', money => {
          // validate money
          register(username, password, parseInt(money, 10));
          start();
        })
      })
    }
  })
}

function attemptLogin(){
  rl.question('Username? ', function(username){
    rl.question('password? ', function(password){
      logger.debug(username + ' ' + password);
      let user = login(username, password);
      if (user){
        loggedUser = user;
        console.log(`Welcome back ${loggedUser.name}. You have ${loggedUser.money} dollars`);
      }
      else {
        console.log('Login failed');
      }
      start();

    })
  })
}

function exit(){
  saveInventory();
  saveUsers();
  process.exit(0);
}

export function start(){

  logger.trace('Displays menu.')

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
       logger.info('Registration');
       attemptRegister(); break;
      case '1':
        logger.info('Login')
        attemptLogin(); break;
      case '2':
        logger.info('Contents')
        displayContents(); start();
        break;
      case '3':
        logger.info('Selection');
        makeSelection(); break;
      case '4':
        logger.info('Restock');
        restock(); break;
      case 'q':

        exit(); break; 
      default:
        start();

   }

// users, inventory, exit
    });

}





export function load(){
  loadUsers();
  loadInventory();
}
