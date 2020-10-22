const Model = require('./model')

function addUser (user){
  const myUser = new Model(user)
  return myUser.save()
}
async function getUsers (filterUser){
  let filter = {}
  if (filterUser !== null){
      filter = {name: filterUser}
    }
   const users = await Model.find(filter)
   return users
  
}

module.exports = {
    add: addUser,
    list: getUsers, //Obtener todos los usuarios
    //updateText: updateText,
   // remove: removeMessage
    //get: (Esta es para coger un mensaje en específico)
    //update:(Para actualizar un mensaje en específico)
}