const express = require ('express') // Este archivo es el encargado de recibir la peticion HTTP, procesar la informacion y enviarla al controlador *todo lo que salga de aqui no será responsabilidad de la cappa de red
const response = require ('../../network/response')
const router = express.Router()
const controller = require ('./controller')

router.post('/',function(req,res){
    controller.addUser(req.body.name)
        .then((data)=> {
            response.success(req,res,data,201)
        })
        .catch (err=>{
            response.error(req,res,'Internal Error',500,err)
        })
    //res.status(201).send([{error:'',body:'Mensaje ' + req.body.textito +' Creado correctamente'}]);
})
router.get ('/', function(req,res){
    const filterUser = req.query.name || null
    controller.getUsers(filterUser)
    
        .then((userList)=> {
            response.success(req,res,userList,200)
        })
        .catch (e =>{
            response.error(req,res,'[error network] No se pueden mostrar los usuarios', 500, e)
        })
})
module.exports = router