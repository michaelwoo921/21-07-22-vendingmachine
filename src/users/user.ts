import fs from 'fs'

class User {
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

    }

  });
}


function getUser(username: string){
  return users.find(person => person.name === username);

}

function login(username:string, password:string){
  return users.find(person => person.name === username && person.password === password);

}

function register(username:string, password:string, money: number){
  users.push({
    name: username, 
    password,
    money,
    role: 'Customer'
  })
}


function saveUsers(){
  let i = JSON.stringify(users);
  fs.writeFileSync('users.json', i)

}
