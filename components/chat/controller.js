const store = require ('./store')

function addChat (users){
    if(!users || !Array.isArray(users)){
        return Promise.reject('Invalid data user [controller-chat]')
    }
    const chat = {
        users: users,
    }
    return store.addChat(chat)

}
function listChats(userId){
    return store.list(userId)
}
module.exports = {
    addChat: addChat,
    listChats: listChats
}