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
routes.get('/viewnews/search/params',newscontroller.Search)
routes.get('/viewnews/search',newscontroller.SearchGet)
routes.post('/news/edit', newscontroller.Edit)
routes.get('/news/detail', newscontroller.Detail)

// routes.get('/extnest/detail', extnewscontroller.Get)

routes.post('/createiklan',iklan.create)
routes.post('/updateiklan',iklan.update)
routes.post('/deleteiklan',iklan.delete)
routes.get('/viewiklan',iklan.view)

// InfoGraphics
routes.post('/infographics', infographics.create)
routes.post('/infographics/save', infographics.Detect)
routes.get('/infographics/detect', infographics.Get)
routes.get('/infographics/detect/get', infographics.ParamsGet)
routes.post('/infographics/detect', infographics.Detect)
routes.post('/infographics/detect/params', infographics.ParamsTwo)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbWFzIiwiZW1haWwiOiJkaW1hc0BidWtvcGluLmNvbSIsInJvbGVzIjoiYWRtaW4iLCJpYXQiOjE2Mzg3NjYxNDF9.xdZbkDjQ2236rOWIp475J9nij0JiHDFkU_7vDbKFMyU

module.exports = routes