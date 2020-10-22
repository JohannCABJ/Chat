const express = require ('express') // Este archivo es el encargado de recibir la peticion HTTP, procesar la informacion y enviarla al controlador *todo lo que salga de aqui no será responsabilidad de la capa de red
const multer = require ('multer')
const config = require ('../../config')
const response = require ('../../network/response')
const router = express.Router()
const controller = require ('./controller')

const upload = multer({
    dest: 'public/' + config.filesRoute + '/'
})

router.get ('/', function(req,res){
    const filterMessages = req.params.chat || null
    controller.getMessages(filterMessages)
    
        .then((messageList)=> {
            response.success(req,res,messageList,200)
        })
        .catch (e =>{
            response.error(req,res,'Unexpected Error', 500, e)
        })
})

router.post('/',upload.single('file'),function(req,res){
    console.log(req.file)
    controller.addMessages(req.body.chat,req.body.user,req.body.message, req.file)
        .then((fullMessage)=> {
            response.success(req,res,fullMessage,201)
        })
        .catch (e=>{
            response.error(req,res,'Informacion Invalida',400, 'Error en el controladoor')
        })
            //res.status(201).send([{error:'',body:'Mensaje ' + req.body.textito +' Creado correctamente'}]);
})

router.patch('/:id',function(req,res){
    controller.actualizaMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req,res,data,200)
    })
    .catch(e=>{
        response.error(req,res,'Error al actualizar',500,e)
    })
})

router.delete ('/:id',function(req,res){
    controller.deleteMessage(req.params.id)
    .then(()=>{
        response.success(req,res,`Usuario ${req.params.id} eliminado satsifactoriamente`,200)
    })
    .catch(e=>{
        response.error(req,res,'No se pudo eliminar el mensaje',500,e)
    })
})

module.exports = router