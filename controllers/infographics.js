const infographics = require('../models/infographics')
const jwtcheck = require('./jwtcheck')
const { response } = require('express')

function getDates (startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
    }
    while (currentDate <= endDate) {
        dates.push(currentDate)
        currentDate = addDays.call(currentDate, 1)
    }
    return dates
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

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
            username: verify.username,
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

exports.Params = async (req, res) => {
    let verify = await jwtcheck.check(req.headers.authorization)
    if ( !verify ) {
        res.send({
            message: `false`,
            statusCode: 403
        })
    } else {
        let fromDate = req.body.from !== 'null' ? new Date(req.body.from).toISOString() : ''
        let endDate = req.body.end !== 'null' ?  new Date(req.body.end).toISOString() : ''
        let findPass
        if ( req.body.username === '' && req.body.from === 'null' && req.body.end === 'null' ) {  
            findPass = {}
        } else if ( req.body.username !== '' && req.body.from === 'null' && req.body.end === 'null' ) {
            findPass = {
                username: { $regex: req.body.username },
            }
        } else if ( req.body.username === '' && req.body.from !== 'null' && req.body.end !== 'null' ) {
            findPass = { 
                date: { $gte: fromDate, $lte: endDate }
            }
        } else if ( req.body.username === '' && req.body.from !== 'null' && req.body.end === 'null' ) {
            findPass = { 
                date: fromDate
            }
        } else if ( req.body.username === '' && req.body.from === 'null' && req.body.end !== 'null' ) {
            findPass = { 
                date: endDate
            }
        } else if ( req.body.username === '' && req.body.from === 'null' && req.body.end === 'null' ) {
            findPass = {
                username: { $regex: req.body.username },
                date: { $gte: fromDate, $lte: endDate }
            }
        }

        function getDates (startDate, endDate) {
            const dates = []
            let currentDate = startDate
            const addDays = function (days) {
                const date = new Date(this.valueOf())
                date.setDate(date.getDate() + days)
                return date
            }
            while (currentDate <= endDate) {
                dates.push(currentDate)
                currentDate = addDays.call(currentDate, 1)
            }
            return dates
        }

        console.log(getDates(new Date(req.body.from), new Date(req.body.end)))

        // username: { $regex: req.body.username },
        //     date: { $gte: fromDate, $lte: endDate }

        await infographics.find(findPass).then(response => {
            res.send({
                message: `successfull to get data infographics`,
                result: {
                    countedData: response.length
                }
            })
            // res.send(response)
        }).catch(err => {
            console.log(err)
        })
    }
}

exports.ParamsTwo = async (req, res) => {
    let verify = await jwtcheck.check(req.headers.authorization)
    if ( !verify ) {
        res.send({
            message: `false`,
            statusCode: 403
        })
    } else {
        let fromDate = req.body.from !== 'null' ? new Date(req.body.from).toISOString() : ''
        let endDate = req.body.end !== 'null' ?  new Date(req.body.end).toISOString() : ''

        let arrayDate, dataArray = []
        if ( fromDate !== '' && endDate !== '' ) {
            arrayDate = getDates(new Date(fromDate), new Date(endDate))
        } else if ( fromDate === '' ) {
            arrayDate = getDates(new Date(endDate), new Date(endDate))
        } else if ( endDate === '' ) {
            arrayDate = getDates(new Date(fromDate), new Date(fromDate))
        }

        let newDataWithDate = []
        if ( arrayDate.length > 0 ) {
            for( let i = 0; i < arrayDate.length; i++ ) {
                // console.log(formatDate(arrayDate[i]))
                await infographics.find({
                    username: { $regex: req.body.username },
                    date: { $gte: formatDate(arrayDate[i]) }
                }).then(response =>{ 
                    console.log(response.length)
                    // newDataWithDate[i] = response // with get data
                    newDataWithDate[i] = response.length // for counted data
                }).catch(err => {
                    console.log(err)
                })
            }

            res.send({
                message: `successfull to get data infographics`,
                result: {
                    resDateArray: arrayDate,
                    resDateData: newDataWithDate
                }
            })
        } else {
            await infographics.find({
                username: { $regex: req.body.username },
            }).then(response =>{ 
                res.send({
                    message: `successfull to get data infographics`,
                    result: response
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}

exports.ParamsGet = async (req, res) => {
    let fromDate = new Date(req.query.from).toISOString()
    let endDate = new Date(req.query.end).toISOString()
    
    await infographics.find({
        username: { $regex: req.query.username },
        date: { $gte: fromDate, $lte: endDate }
    }).then(response => {
        res.send({
            message: `successfull to get data infographics`,
            result: {
                countedData: response.length,
                resData: response
            }
        })
    }).catch(err => {
        console.log(err)
    })
    // res.send(Date(req.query.from))
}