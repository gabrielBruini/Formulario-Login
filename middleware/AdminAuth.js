const jwt = require('jsonwebtoken')
var secret = "dfoelfplsadfdflsdf124g46"

module.exports = function (req, res, next) {

    const authToken = req.headers['authorization']

    if(authToken != undefined) {

        const bearer = authToken.split(' ')
        var token = bearer[1]
     
        try {
        var decodificado = jwt.verify(token, secret)
  
        if(decodificado.cargo == 1) {
            next()

        } else {
            res.status(403).send("Você não tem permissão para isso")
            return;

        }

         

        } catch (err) {
        res.status(403).send("Você não está autenticado")
        return;

        }

    } else {
        res.status(403).send("Você não está autenticado")
        return;
    }




}