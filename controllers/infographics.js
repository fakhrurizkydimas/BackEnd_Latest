const infographics = require('../models/infographics')
const jwtcheck = require('./jwtcheck')
const { response } = require('express')


exports.create = (request,response)=>{
  let verify = jwtcheck.check(request.headers.authorization)
    const newinfo = new infographics({
        username: verify.username,
        divisi: verify.divisi,
        Date:new Date(),
        link: verify.link,
    })

    newinfo.save(newinfo).then(coba =>{
      response.send({
        message: 'bisa nih',
        result: coba})
        })
}

 exports.view = (request,response)=>{
  login.find().then(coba =>{
    response.send({
        message: 'bisa nih',
        result: coba
    })
  }) 
 }