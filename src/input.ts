import readline from 'readline';
import { displayContents, getByPosition, Inventory, createItem, updateItem } from './inventory/inventory';
import { register,login, updateUser, User } from './users/user';
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
    let selection = getByPosition(answer, updateItem, start, function(item: Inventory){
      item.stock++;
    }); 
  })
}

function makeSelection(){
  if (loggedUser){
    rl.question('Which one do you want? ', function(answer){
      // To Do: sanitize input

      let valid = false;
      if (answer.match(/^[A-Z][0-9]{1,2}$/)){ valid = true; }
      if (valid) {
          let selection = getByPosition(answer, obtainPayment, start);
      }
      else {
        start()
      }
    });
  }

  else{
    console.log('Please login to proceed.');
    start();
  }

}


function obtainPayment(selection: Inventory, callback? : Function){
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
    updateUser(loggedUser);
    console.log(`Here is your ${selection.item}. You have ${loggedUser.money} remaining`);
    selection.stock--;
    updateItem(selection, start);

  }
  else {
    console.log(`not enough ${selection.item}. Returing ${selection.price} `);
    start();
  }
}

export function checkUserRole(callback: Function){
  logger.trace('checking user role.');
  if (loggedUser && loggedUser.role === 'Employee'){
    callback();
  }
  else{
    logger.warn('Attempt to Restock not permitted');
    console.log('Login as Employee');
    start();
  }
}

export function addItem(){
  rl.question('position: ', position=> {
    rl.question('name: ', item => {
      rl.question('price', price => {
        rl.question('stock: ', stock => {
          try{
            createItem({
              position, item, price: Number(price), stock: Number(stock)
            }, start);
          } catch{
            logger.warn('String input for price or stock. Try again.')
          }
        })
      })
    })
  })
}

function attemptRegister(){
  rl.question('Username? ', username => {
    rl.question('Password? ', password => {
      rl.question('Money? ', money => {
        register(username, password, Number(money), start);
      })
    })
  })
}

function attemptLogin(){
  rl.question('Username? ', function(username){
    rl.question('password? ', function(password){
      logger.debug(username + ' ' + password);
      login(username, password).then(user => {
        if (user){
          loggedUser = user;
          console.log(`Welcome back ${loggedUser.name}. You have ${loggedUser.money} dollars`);
        }
        else {
          console.log('Login failed');
        }
        start();
      });
    
    });
  });
}

function exit(){
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
  5. Add Item
  q. Exit
  
  ` , function(answer) {
    let valid = false;
    if (answer.match(/^[0-5q]$/)){
      valid = true;
    }
    if(valid){
      switch(answer){
        case '0':
          logger.info('Registration');
          attemptRegister(); break;
         case '1':
           logger.info('Login')
           attemptLogin(); break;
         case '2':
           logger.info('Contents')
           displayContents(start); break;
           break;
         case '3':
           logger.info('Selection');
           makeSelection(); break;
         case '4':
           logger.info('Restock');
           checkUserRole(restock); break;
          case '5':
            logger.info('Add item');
            checkUserRole(addItem); break;
         case 'q':
   
           exit(); break; 
         default:
           start();
   
      }

    } else{
      console.log('invalid input, try again.');
      start();
    }



  });

}





// export function load(){
//   loadUsers();
//   loadInventory();
// }
