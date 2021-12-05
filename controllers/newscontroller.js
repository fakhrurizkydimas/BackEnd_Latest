const newscontent = require('../models/newscontent')
const jwtcheck = require('../controllers/jwtcheck')
const { response } = require('express')



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
    const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}


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