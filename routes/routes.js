const { req, res } = require('express')
const express = require ('express')
const routes = express.Router()
const newscontroller = require('../controllers/newscontroller')
const infographics = require('../controllers/infographics')
const iklan = require('../controllers/iklan')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (request, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const upload = multer({ dest:'uploads/' })
const login = require('../controllers/login')

routes.post('/login',login.loginuser)
routes.post('/deleteuser',login.delete)
routes.post('/updateuser',login.update)
routes.get('/viewuser',login.view)
routes.post('/createuser',login.createuser)

routes.post('/createnews',newscontroller.create)
routes.post('/updatenews',newscontroller.update)
routes.post('/deletenews',newscontroller.delete)
routes.get('/viewnews',newscontroller.view)
routes.post('/viewDetail',newscontroller.viewDetail)


routes.post('/infographics',infographics.create)

routes.post('/createiklan',iklan.create)
routes.post('/updateiklan',iklan.update)
routes.post('/deleteiklan',iklan.delete)
routes.get('/viewiklan',iklan.view)



module.exports = routes