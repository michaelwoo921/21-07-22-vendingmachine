import readline from 'readline';
import { loadInventory, inventory } from './inventory/inventory';
import { loadUsers, users } from './users/user';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



export function load(){
  loadUsers();
  loadInventory();

}

export function start(){

  console.log('prgram starts here...');

  rl.question("What do you want to da ? ", function(ans) {
  
    console.log(ans)

    console.log(users)
    console.log(inventory)


        exit();
    });

}


function exit(){

  process.exit(0);
}
