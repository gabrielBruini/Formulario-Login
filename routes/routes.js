var express = require("express")
var app = express();
var router = express.Router();
var usuarioController = require("../controllers/UsuarioController")
const AdminAuth = require('../middleware/AdminAuth')


router.post('/usuario', usuarioController.criar)
router.get('/usuarios', AdminAuth, usuarioController.index)
router.get('/usuario/:id',AdminAuth, usuarioController.encontrarUsuario)
router.put("/usuario",AdminAuth, usuarioController.editar)
router.delete("/usuario/:id",AdminAuth, usuarioController.remover)
router.post("/recuperarsenha", usuarioController.recuperarSenha)
router.post("/mudarsenha", usuarioController.mudarSenha)
router.post("/login", usuarioController.login)

module.exports = router;