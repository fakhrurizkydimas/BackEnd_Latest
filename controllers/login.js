const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const Bcrypt = require('bcrypt')
const login = require('../models/login')
const jwtcheck = require('./jwtcheck')
const multer = require('multer');


exports.loginuser = async(request, response) => {
    let uname = request.body.username;
    let pass = request.body.password;

    //if - else checking input
    if( uname === '' || pass === '' || uname === null || pass === null ) {
      response.status(404).send( {
        message: "Hey, Invalid username or password",
        result: "Hey, Invalid username or password"
      })
    } else {
      const userData = await login.findOne( {'username': uname, 'password': pass} ).exec()
  
      console.log(userData)
  
      if( userData === null || userData === 'undefined' ) {
        response.status(404).send({
          message: "Hey, Invalid username or password",
          result: "Hey, Invalid username or password"
        })      
      } else {
        let token = jwt.sign( {
          username: userData.username,
          email: userData.email,
          roles: userData.roles,
        }, 'myPrivateKey' );
  
        let passingData = {
          uid: userData._id,
          username: userData.username,
          email: userData.email,
          divisi: userData.divisi,
          roles: userData.roles,
          images: userData.images,
          token: token,
          token_type: 'Bearer'
        }
  
        response.status(200).send({
          message: "Login Accepted",
          result: passingData
        })
      }
    }
  }
  

  // exports.create = (request,response)=> {
  //     let file = request.files.file
  //     let extension = file.mimetype.replace('image/', '.')
  //     if ( file.mimetype.includes('image') ) {
  //         file.mv(`./Public/Files/${ makeid(25) + extension}`)
  //         response.send({ message: file })
  //     } else {
  //         response.send({ message: 'not supported file' })
  //     }
  // }
  
    //console.log(request.files)

  // const storage = multer.diskStorage({
  //     destination: (request, file, cb) => {
  //         cb(null, 'uploads');
  //     },
  //     filename: (request, file, cb) => {
  //         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  //     }
  // });




  
  const filefilter = (request, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
          cb(null, true);
      } else {
          cb(null, false);
      }
  }
  
  const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
  }

  // const upload = multer({ storage: storage, fileFilter: filefilter });

  // try{
  //   const User = new login({
  //     username:  'ridho',
  //     password: 'masagus',
  //     email:  'ridhomasagus@gmail.com',
  //     divisi: 'IT',
  //     roles: 'admin',
  //     // username:  request.body.username,
  //     // password: request.body.password,
  //     // email:  request.body.email,
  //     // divisi: request.body.divisi,
  //     // roles: request.body.roles,
  //     fileName: request.files.images.name,
  //     filePath: request.files.images.path,
  //     fileType: request.files.images.mimetype,
  //     fileSize: fileSizeFormatter(request.files.images.size, 2) // 0.00
  //   });
  //   //const file = request.files;
  //   console.log(request);
  //   //console.log(request.files);
  //   //console.log(User);   
  //   //const posting = login.save();
    
  //   // if( posting !== null || posting === undefined ) {
  //   //   response.status(201).send({ message: 'File Uploaded Successfully', result: dataOptions});
  //   //   response.status(201).render('new-form', {message: 'File Uploaded Successfully', result: dataOptions});
  //   // }
  // } catch {
  //   response.status(400).send('Error');
  // }

  exports.createuser = (request,response)=>{
    console.log(request.files.images)
    let file = request.files.images
    let fileName = makeid(25) + file.mimetype.replace('image/','.')
    if (file.mimetype.includes('image/')) {
      const user = new login({
        username:  request.body.username,
        password: request.body.password,
        email:  request.body.email,
        divisi: request.body.divisi,
        roles: request.body.roles,
        images: '/Files/'+ fileName,
      })
      user.save(user).then(response=>{
        file.mv(`./public/Files/user/${ fileName }`)
        console.log(response)
      }).catch(err=>{
        console.log(err)
      })
    }
  }

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
    let _id = request.body._id;

    login.deleteOne( { _id: _id } )
      .then(resp => {
        response.send({
          message: "Delete Success",
          result: _id
        })
      })
      .catch(err => {
        response.send({
          message: "Failed to Delete Data",
          result: err
        })
      })  
  }

  exports.update = async (request, response) => {
    let datax = await request.body;
    let params = {
      _id:request.body._id,
      username:  request.body.username,
      password: request.body.password,
      email:  request.body.email,
      divisi: request.body.divisi,
      roles: request.body.roles,
      image: request.body.image,
    }
    console.log(params)
    login.updateOne({_id: datax._id}, params)
    .then(resp => {
      response.send({
        message: "Update Success",
        result: datax._id
      })
    })
    .catch(err => {
      response.send({
        message: "failed to update data",
        result: err
      })
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



