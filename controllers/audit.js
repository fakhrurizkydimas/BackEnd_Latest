const newscontent = require('../models/audit')
const jwtcheck = require('../controllers/jwtcheck')
const { response } = require('express')


exports.audit = (request,response)=>{
    const audit = new audit({
        username: request.body.username,
        divisi: request.body.divisi,
        Date:new Date(),
    })

    audit.save(audit).then(coba =>{
      response.send({
        message: 'bisa nih',
        result: coba})

        })

}