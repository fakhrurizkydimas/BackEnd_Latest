const { response } = require('express')
const JWT = require('jsonwebtoken')

exports.jwtcheck=(params)=>{
    console.log(params)  
}

exports.check = (params = null, response = null) => {
    let token = params.split(' ')

    if ( token[0] !== 'Bearer'){
        response.send(403).send({
            message:"wrong token"
        })
    } else {
        let VerifyToken = JWT.verify(token[1], "myPrivateKey", (err, ResultVerify) =>{
            if (err) return false
            if (ResultVerify) return ResultVerify
        })
        console.log(VerifyToken)
        return VerifyToken
    }
}


