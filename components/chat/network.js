const express = require ('express') // Este archivo es el encargado de recibir la peticion HTTP, procesar la informacion y enviarla al controlador *todo lo que salga de aqui no será responsabilidad de la cappa de red
const response = require ('../../network/response')
const router = express.Router()
const controller = require ('./controller')

router.post('/',function(req,res){
    controller.addChat(req.body.users)
        .then((data)=> {
            response.success(req,res,data,201)
        })
        .catch (err=>{
            response.error(req,res,'Error al mostrar mensajes - chat network',500,err)
        })
    //res.status(201).send([{error:'',body:'Mensaje ' + req.body.textito +' Creado correctamente'}]);
})
router.get ('/:userId', function(req,res){
    const filterChats = req.params.userId || null
    controller.listChats(filterChats)
    
        .then((users)=> {
            response.success(req,res,users,200)
        })
        .catch (err =>{
            response.error(req,res,'Error de network - chat', 500, err)
        })
})
module.exports = router