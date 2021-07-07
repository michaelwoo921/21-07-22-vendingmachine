import fs from 'fs'

export let users

export function loadUsers(){
  fs.readFile('users.json', 'utf-8', function(err, data){
    if(err){
      console.log(err)
    } else {
      users = JSON.parse(data);

    }

  });
}




// function saveUsers(){

// }

// function getUser(username){


// }

// function login(username, password){


// }

// function register(username, password, money){

// }

