var usuario = require("../models/Usuario")
var TokenSenha = require('../models/SenhaToken')
var jwt = require("jsonwebtoken")
const Usuario = require("../models/Usuario")
const bcrypt = require('bcrypt')


var secret = "dfoelfplsadfdflsdf124g46"

class usuarioController {

    async index(req, res){
      var usuarios = await usuario.listar()
      res.json(usuarios)

    }

    async encontrarUsuario (req, res) {
        var id = req.params.id
        var usuarioporId = await usuario.listarPorId(id)

        if(usuarioporId == undefined ){
            
            res.status(404).json({err: "Usuário não existe"})
        } else {
            res.status(200).json(usuarioporId)
        }
    }


    async criar (req, res) {
        var {email, nome, senha} = req.body

        if(email == undefined || email.length < 8 ) {
            res.status(400)
            res.send({err: "O e-mail é inválido!"})            
            return            
        } 

        var emailExistente =  await usuario.EncontrarEmail(email)

        if(emailExistente) {
            res.status(406).json({err: "O E-mail já está cadastrado"})
            return

        } else {
        await usuario.criar(email,senha,nome)        
        res.status(200)
        res.send("Tudo Ok!")

        }
              
    }

    async editar (req, res) {
        var {id,email, nome, cargo} = req.body
      var resultado = await usuario.atualizar(id, email, nome, cargo)

      if (resultado != undefined) {
        if(resultado.status) {
            res.send("Operação feita com sucesso")
        } else {
            res.status(406).json(resultado.err)

        }


      } else {
          res.status(406).json(resultado.err)
      }

      
    }
    async remover (req, res) {
        var id = req.params.id

        var resultado = await usuario.deletar(id)

        if(resultado.status) {
            res.status(200).send({msg: "Usuário deletado"})
            

        } else {
            res.status(406)
            res.send(resultado.err)
        }       
    }

    async recuperarSenha(req, res) {
        var email = req.body.email
       var resultado = await TokenSenha.inserir(email)

       if(resultado.status) {
           res.status(200)
           res.send(" " + resultado.token)


       } else {
           res.status(406)
           res.send(resultado.err)
       }

    }

    async mudarSenha (req, res) {
        var token = req.body.token
        var senha = req.body.senha

       const tokenValido = await TokenSenha.validar(token)      
       

       if(tokenValido.status) {

     await usuario.mudarSenha(senha, tokenValido.token.usuario_id, tokenValido.token.token)
       res.status(200)
       res.send("Senha alterada")

       } else {
           res.status(406)
           res.send("Token inválido ou já utilizado")
           
       }
    }

    async login (req, res) {
        var {email, senha} = req.body

        const usuario = await Usuario.listarPorEmail(email)

        if (usuario != undefined) {
          var resultado =  await bcrypt.compare(senha, usuario.senha)

            if(resultado) {
                var token = jwt.sign({email: usuario.email, cargo: usuario.cargo}, secret)

                res.status(200).json({token: token})

            } else {
                res.status(406)
                res.send("Senha inválida")
            }

        } else {
           
            res.json({status: false})

        }

    }


}

module.exports = new usuarioController()