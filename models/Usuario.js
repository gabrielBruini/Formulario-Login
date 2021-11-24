const knex = require('../database/connection')
const bcrypt = require('bcrypt')
const SenhaToken = require('./SenhaToken')

class Usuario {

    async listar() {
        try {
            var resultado = await knex.select(["id", "email", "cargo","nome"]).table("usuarios")
            return resultado

        }
        catch(err) {
            console.log(err)
            return []

        }
      
    }
    async listarPorId(id) {
        try {

            var resultado = await knex.select(["id", "nome", "cargo", "email"]).table("usuarios").where({id: id})

           

            if(resultado.length > 0) {            
                return resultado[0]
            } else {
                return undefined
            }

        }
        catch (err) {
            console.log(err)
            return undefined
        }
    }
    async listarPorEmail(email) {
        try {

            var resultado = await knex.select(["id", "nome", "cargo", "email", "senha"]).table("usuarios").where({email: email})

            if(resultado.length > 0) {            
                return resultado[0]
            } else {
                return undefined
            }

        }
        catch (err) {
            console.log(err)
            return undefined
        }
    }


    async criar(email,senha,nome){

        try{

            var hash = await bcrypt.hash(senha, 10)
            
            await knex.insert({email,senha: hash,nome,cargo: 0}).table("usuarios")
        }
      
        catch (e) {
            console.log(e)
        }
    }

    async EncontrarEmail(email) {
        try {
            var resultado = await knex.select().from("usuarios").where({email: email})
            
            if(resultado.length > 0 ){
                return true
            } else{
                return false
            }

        } catch (err) {
            console.log(err)
            return false
        }
        
    }

    async atualizar(id,email, nome, cargo) {

       var usuario = await this.listarPorId(id)

      

       if (usuario != undefined) {
            var editarUsuario = {}

            if(email != undefined) {
                if(email != usuario.email) {
                    var resultado = await this.EncontrarEmail(email)
                   
                    
                    if(resultado == false) {
                        editarUsuario.email = email
                    } else {
                        return {status: false, err: "E-mail já está cadastrado"}

                    }
                }
            }
            if (nome != undefined) {
                editarUsuario.nome = nome
            }
           
            if (cargo != undefined) {
                editarUsuario.cargo = cargo
            }
          
            try {
                console.log(editarUsuario)
                await knex.update(editarUsuario).where({id: id}).table("usuarios")
                return {status: true}
            }

            catch (err) {
                return {status: false, err: "o usuário não existe, tente outro id"}

            }


       } else {
           return {status: false, err: "O usuário não existe"}
       }


    }
    async deletar(id) {
       var usuario = await this.listarPorId(id)

       if(usuario != undefined) {
           try {
            await knex.delete().where({id: id}).table("usuarios")

            return {status: true}

           } catch (err) {

            return {status: false, err: err}

           }

       } else {
           return {status: false, err: "O usuário não existe"}
       }

    }

    async mudarSenha(senha,id,token) {
        var hash = await bcrypt.hash(senha, 10)
        await knex.update({senha: hash}).where({id: id}).table("usuarios")
        await SenhaToken.Usado(token)

    }


}

module.exports = new Usuario()