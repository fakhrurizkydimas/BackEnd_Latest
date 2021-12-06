const newscontent = require('../models/newscontent')
const jwtcheck = require('../controllers/jwtcheck')
const { response } = require('express')
const fs = require('fs')
const { findOneAndUpdate } = require('../models/newscontent')

const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.create = (request,response)=>{
    console.log(request.files)
    // let verify = jwtcheck.check(request.headers.authorization)
    // if ( verify == false){
    //     response.status(500).send({
    //         message:"verify false"
    //     })
    // } else {            
    //     if ( verify.roles !== "admin"){
    //         response.status(500).send({
    //           message:"verify false"
    //         })
    //     } else{
    let file = request.files
    console.log(file)
    if ( !file.images.mimetype.includes('image/') ) {
        console.log(false)
    } else {
        let NewName = makeid(25)
        let extension = file.images.mimetype.replace('image/', '.')
        const news = new newscontent({
            title: request.body.title,
            excerpt:  request.body.description,
            description: request.body.description,
            date: request.body.date,
            images: `Files/news/${ NewName + extension}`
        })
        news.save(news).then(response=>{
        file.images.mv(`./public/Files/news/${ NewName + extension}`)
        console.log(response)
        }).catch(err=>{
            console.log(err)
            })
        }

    }
// } 


    exports.delete = (request, response) => {
        let _id = request.body._id
        let verify = jwtcheck.check(request.headers.authorization)
        if ( verify == false){
            response.status(500).send({
                message:"verify false"
            })
        } else {            
            if ( verify.roles !== "admin"){
                response.status(500).send({
                  message:"verify false"
                })
            } else{
                newscontent.findOne({"upload" : verify.username,"_id": request.body._id  })
                .then(result=>{
                    if(result === null){
                        response.send({ message : 'content salah user'})
                        }else{
                        if (verify.username !== result.upload){
                            response.send({ message: 'user upload salah', status: 501, auth: false })
                            }else {
                                let params = {
                                    title: request.body.title,
                                    excerpt:  request.body.description.substring(0,30),
                                    description: request.body.description,
                                    image:  request.body.image,
                                    date: request.body.date,
                                    upload: verify.username,
                                    images: '/Files/'+ fileName,
                                }
                                newscontent.deleteOne( { _id: _id } )
                                .then(resp => {
                                    response.send({
                                        message: "Delete Success",
                                        result: _id
                                    })
                                })
                                .catch(err =>{
                                    response.send({
                                        message:"error"
                                })
                            })
                        }
                    }
                })
            }
        }
    }
      
    
    exports.view = (request,response)=>{let verify = jwtcheck.check(request.headers.authorization)
        if ( verify == false){
            response.status(500).send({
                message:"verify false"
            })
        } else {            
            if ( verify.roles !== "admin"){
                response.status(500).send({
                  message:"verify false"
                })
            } else{
                newscontent.find().then(coba =>{
                    response.send({
                        message: 'view News',
                        result: coba
                    })
                }) 
            }
        }
    }


    exports.update = (request,response)=>{let verify = jwtcheck.check(request.headers.authorization)
        if ( verify == false){
            response.status(500).send({
                message:"verify false"
            })
        } else {            
            if ( verify.roles !== "admin"){
                response.status(500).send({
                  message:"verify false"
                })
            }else{
                newscontent.findOne({"upload" : verify.username,"_id": request.body._id  })
                .then(result=>{
                    if(result === null){
                        response.send({ message : 'content salah user'})
                        }else{
                        if (verify.username !== result.upload){
                            response.send({ message: 'user upload salah', status: 501, auth: false })
                            }else {
                                let params = {
                                    title: request.body.title,
                                    excerpt:  request.body.description.substring(0,30),
                                    description: request.body.description,
                                    image:  request.body.image,
                                    date: request.body.date,
                                    upload: verify.username,
                                    images: '/Files/'+ fileName,
                                }
                                newscontent.updateOne({_id: request.body._id}, params)
                                .then(resp => {
                                response.send({
                                    message: "Update Success",
                                    })
                                })
                                .catch(err =>{
                                    response.send({
                                        message:"error"
                                })
                            })
                        }
                    }
                })
            }
        }
    }


    exports.createNews = (request,response)=>{
        let verify = jwtcheck.check(request.headers.authorization)
        if ( verify == false){
            response.status(500).send({
                message:"verify false"
            })
        } else {            
            if ( verify.roles !== "admin"){
                response.status(500).send({
                  message:"verify false"
                })
            } else{
                let file = request.files.images
                console.log(file)
                // let fileName = makeid(25) + file.mimetype.replace('image/','.')
                // if (file.mimetype.includes('image/')) {
                //     console.log(request.body)
                //     const news = new newscontent({
                //     title: request.body.title,
                //     excerpt:  request.body.description,
                //     description: request.body.description,
                //     date: new Date(),
                //     upload: verify.username,
                //     images: '/Files/'+ fileName,
                // })        
                // news.save(news).then(response=>{
                //     message:"verify masuk"
                //     file.mv(`./public/Files/news/${ fileName }`)
                //     console.log(response)
                // }).catch(err=>{
                //     console.log(err)
                //     })
                // }
           }
        } 
    }
    exports.viewDetail = (request,response)=>{let verify = jwtcheck.check(request.headers.authorization)
        if ( verify == false){
            response.status(500).send({
                message:"verify false"
            })
        } else {            
            if ( verify.roles !== "admin"){
                response.status(500).send({
                  message:"verify false"
                })
            } else{
                console.log(request.body)   
                newscontent.findOne({"title": request.body.title }).then(coba =>{
                    console.log(response)
                    response.send({
                        message: 'view News',
                        result: coba
                    })
                }) 
            }
        }
    }


exports.Search = (req, res) => {
    res.send('ok search')
}

exports.SearchGet = async (req, res) => {
    await newscontent.find({ 'title': { $regex: req.query.query } }).then(response => {
        console.log(response )
        res.status(200).send({
            message: 'success to get data',
            statusCode: 200,
            result: response
        })
    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: 'failed to get data', err: err.message })
    })
}

exports.Edit = async (req, res) => {
    let verify = jwtcheck.check(req.headers.authorization)
    if ( !verify ){
        response.status(403).send({ message:"verify false" })
    } else {
        let file, NewNameFiles = makeid(25), extension = ''
        if ( req.body.images ) {
            file = null
        } else {
            file = req.files.images
            extension = file.mimetype.replace('image/', '.')
        }

        let NewData = {
            _id: req.body.id,
            title: req.body.title,
            excerpt: req.body.excerpt,
            description: req.body.description,
            date: new Date(req.body.date),
            upload: verify.username,
            images: `Files/news/${ NewNameFiles + extension }`
        }

        let ExistingData = await newscontent.findOne({ '_id': req.body.id }).then(response => response).catch(err => false)
        if ( ExistingData ) {
            console.log('data is exist')
            fs.unlink(`./public/Files/news/${ ExistingData.images }`, async (err, ResponseUnlink) => { if (err) return false; if (ResponseUnlink) return true })
            await newscontent.findOneAndUpdate({ '_id': req.body.id }, NewData).then(response => {
                console.log(response)
                if ( !req.body.images ) {
                    file.mv(`./public/Files/news/${ NewNameFiles + extension }`)
                }

                res.status(200).send({
                    message: `successfull to update data`,
                    statusCode: 200,
                    result: response
                })
            }).catch(err => {
                res.status(500).send({
                    message: `failed to save data`
                })
            })
            
        } else {
            console.log('data is not exits')
            res.status(500).send({
                message: `failed to save data`
            })
        }
    }
}

// let test = {
//     _id: new ObjectId("61a5aadafd4e4d6316ee5b0d"),
//     title: 'Sosialiasi Rebranding KB Bukopin',
//     excerpt: 'Jakarta, 22 Desember 2020 – Bank Bukopin menggelar Rapat Umum Pemegang Saham Luar Biasa (RUPSLB) pada Selasa 22 Desember 2020 bertempat di The Westin Jakarta Ballroom Hotel, Jl. H.R. Rasuna Said Kav.C 22-A Jakarta Selatan, dalam rangka meminta persetujuan para Pemegang Saham guna menjalankan Aksi Korporasi selanjutnya. Pada pelaksanaan RUPSLB hari ini, terdapat 3 
//   (tiga) agenda yang dibahas oleh Bank Bukopin untuk dimintakan persetujan kepada para pemegang saham, ketiga agenda tersebut adalah, perubahan Anggaran Dasar, perubahan susunan Direksi dan Dewan Komisaris, dan peningkatan Paket Remunerasi bagi anggota Direksi dan Dewan Komisaris. Perubahan nama dan logo Perseroan sebagai salah satu dari proses transformasi Perseroan diyakini dapat merubah dan memperbaiki citra Perseroan dalam skala nasional khususnya di dunia perbankan. Sehingga diharapkan perubahan 
//   nama dan logo Perseroan dapat kembali meningkatkan kinerja Perseroan kedepannya.',
//     description: 'Jakarta, 22 Desember 2020 – Bank Bukopin menggelar Rapat Umum Pemegang Saham Luar Biasa (RUPSLB) pada Selasa 22 Desember 2020 bertempat di The Westin Jakarta Ballroom Hotel, Jl. H.R. Rasuna Said Kav.C 22-A Jakarta Selatan, dalam rangka 
//   meminta persetujuan para Pemegang Saham guna menjalankan Aksi Korporasi selanjutnya. Pada pelaksanaan RUPSLB hari ini, terdapat 3 (tiga) agenda yang dibahas oleh Bank Bukopin untuk dimintakan persetujan kepada para pemegang saham, ketiga agenda tersebut adalah, perubahan Anggaran Dasar, perubahan susunan Direksi dan Dewan Komisaris, dan peningkatan Paket Remunerasi bagi anggota Direksi dan Dewan Komisaris. Perubahan nama dan logo Perseroan sebagai salah satu dari proses transformasi Perseroan diyakini dapat merubah dan memperbaiki citra Perseroan dalam skala nasional khususnya di dunia perbankan. Sehingga diharapkan perubahan nama dan logo Perseroan dapat kembali meningkatkan kinerja Perseroan kedepannya.',
//     date: 2021-11-30T04:38:50.828Z,
//     upload: 'dimas',
//     images: 'Wokee',
//     __v: 0
//   }