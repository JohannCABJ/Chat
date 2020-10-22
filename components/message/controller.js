const store = require ('./store')
const socket = require ('../../socket.js').socket
const config = require ('../../config')

function addMessages(chat,user, message, file){
    return new Promise((resolve,reject)=> {
        if (!chat || !message){
            console.error('[messageController]No hay Usuario o mensaje' )
            return reject('Los datos son incorrectos')
        }
        let fileUrl = ''
        if (file){
            fileUrl = config.host + ':' + config.port + config.PublicRoute + '/' + config.filesRoute + file.filename
        }

        const fullMessage = {
            chat:chat,
            user: user,
            message: message,   
            date: new Date(), 
            file: fileUrl
        }
                
        store.add (fullMessage)
        
        socket.io.emit('message', fullMessage)

        resolve(fullMessage)
        
    })
 }
function getMessages(filterUser){
    return new Promise((resolve,reject) => {
        resolve(store.list(filterUser))
        //console.log(filterUser)
    })
}

function actualizaMessage(id,message){
    return new Promise(async(resolve,reject) => {
        if(!id || !message){
            reject('Invalid data')
            return false
        }
        const result = await store.updateText(id,message)

        resolve(result)
    })
}

function deleteMessage (id){
    return new Promise ((resolve,reject) =>{
        if (!id ){
            reject('Id Invalido')
            return false
        }
        store.remove(id)
            .then(() => {
                resolve()
            })
            .catch(e =>{
                reject(e)
           })
})
}


module.exports = {
    addMessages,
    getMessages,
    actualizaMessage,
    deleteMessage
}
