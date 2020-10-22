const store = require ('./store')

function addUser(name){
    if (!name){
        return Promise.reject('Invalid name')
    }
    const NewUser = {
        name: name,
    }
    return store.add (NewUser)
 }

//function getUsers(listUsers){
   //return new Promise((resolve,reject) => {

       //resolve(store.list(listUsers))
    //})
//}
function getUsers(){
    return store.list()
}

module.exports = {
    addUser,
    getUsers
    //getMessages,   
}
