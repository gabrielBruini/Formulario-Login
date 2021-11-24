const knex = require('../database/connection')
const uuid = require('crypto').randomUUID()



class Senhatoken {

    async inserir(email) {
      

      var usuario = await this.ListarEmail(email)

      
      

    
 

      if(usuario != undefined) {
        var token = uuid

        try {
          await knex.insert({usuario_id: usuario.id,
            usado:0,
            token: token
          }).table("senhasusuario")

          return {status: true, token: token}

        } catch (err) {
          console.log(err)

          return {status: false, err: err}
          
        }
   

      } else {
        return {status: false, err: "O email não existe no banco de dados"}
      } 

    }

    async validar(token) {
      try {
        var resultado = await knex.select().where({token: token}).table("senhasusuario")
        

        if(resultado.length > 0) {

          var tk = resultado[0]

          if(tk.usado) {      
            return {status: false}
            
          } else {        
            return {status: true, token: tk}
          }

        } else {
          return false
        }


      } catch (err) {
        console.log(err)
        return false
      }
    }

    async Usado(token) {
      await knex.update({usado: 1}).where({token: token}).table("senhasusuario")
    }
    async ListarEmail(email) {
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


}

module.exports = new Senhatoken ()