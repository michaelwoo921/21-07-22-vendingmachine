import readline from 'readline';
import { loadInventory, inventory, displayContents, saveInventory, getByPosition, Inventory, restockItem } from './inventory/inventory';
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
  logger.trace('Attempting Restock');
  rl.question('restock which? ', function(answer){
    let selection = getByPosition(answer);
    if (selection){
      restockItem(selection.item);
      start();
    } else{
      logger.warn('Item does not exist for restock');
      console.log('Incorrect, try again');
      start();
    }
  })
}

function makeSelection(){
  if (loggedUser){
    rl.question('Which one do you want? ', function(answer){
      // To Do: sanitize input
      let selection = getByPosition(answer);
      if(selection){
        console.log(selection);
        // obtain payment
        obtainPayment(selection);
      } else {
        console.log('incorrect, try again.')
        start();
      }
    })
  }else{
    console.log('Please login to proceed.');
    start();
  }


}


function obtainPayment(selection: Inventory){
  // obtain payemnt
  console.log(`Remit payment of $${selection.price}.`);
  if (selection.price > loggedUser.money){
    console.log(`You don't have enough money to buy it. You have $${loggedUser.money}.`);
    start();
  } else{
    rl.question('Accept? (y or n)', function(answer){
      if(answer === 'y'){
        dispenseProduct(selection);
      } else {
        start();
      }
    });
  }


}

function dispenseProduct(selection: Inventory){
  if (selection.stock > 0){
    loggedUser.money -= selection.price;
    console.log(`Here is your ${selection.item}. You have ${loggedUser.money} remaining`);
    selection.stock--;
    start();

  }
  else {
    console.log(`not enough ${selection.item}. Returing ${selection.price} `);
    start();
  }
}

export function checkUserRole(){
  logger.trace('checking user role.');
  if (loggedUser && loggedUser.role === 'Employee'){
    restock();
  }
  else{
    logger.warn('Attempt to Restock not permitted');
    console.log('Login as Employee');
    start();
  }
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
        checkUserRole(); break;
      case 'q':

        exit(); break; 
      default:
        start();

   }


  });

}





export function load(){
  loadUsers();
  loadInventory();
}
