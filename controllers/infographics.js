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
            result: coba
        })
    })
}

// exports.view = (request,response)=>{
//     login.find().then(coba =>{
//         response.send({
//             message: 'bisa nih',
//             result: coba
//         })
//     }) 
// }


// New Controllers
exports.Get = async (req, res) => {
    let verify = await jwtcheck.check(req.headers.authorization)
    if ( !verify ) {
        res.send({
            message: `false`,
            statusCode: 403
        })
    } else {
        console.log(verify.username)
        let getStatus = await infographics.find({
            'username': verify.username,
        }).then(response => response).catch(err => false)
        
        if ( !getStatus ) {
            res.status(500).send({ message: 'failed to get data infographics' })
        } else {
            let NewDataPassing = {
                user: verify.username,
                counted: getStatus.length,
                fulldata: getStatus,
            }

            res.send({
                message: 'successfull to get data infographics',
                statusCode: 200,
                result: NewDataPassing
            })
        }
    }
}

exports.Detect = async (req, res) => {
    console.log('hitted')
    let verify = await jwtcheck.check(req.headers.authorization)
    if ( !verify ) {
        res.send({
            message: `false`,
            statusCode: 403
        })
    } else {
        const infosave = new infographics({
            username: verify.username,
            divisi: 'divisi',
            date: Date(),
            link: req.body.urlpath,
        })

        let saveStatus = await infosave.save(infosave).then(response => response).catch(err => false ) 
        if ( !saveStatus ) {
            res.status(500).send({
                message: 'failed to save data'
            })
        } else {
            res.status(200).send({
                message: 'successfull to save data records',
                statusCode: 200,
                result: saveStatus
            })
        }
    }
}