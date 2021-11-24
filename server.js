//This app starts a server and listens on port 9001 for connections.  For every other path, it will respond with a 404 Not Found.
const express = require ('express') 
const app = express()
const port = 3031
const morgan = require('morgan')
const upload = require('express-fileupload')
const cors = require('cors')
//const path = require('path')


//untuk membaca data HTTP POST, kita harus menggunakan modul simpul "body-parser". body-parser adalah sepotong middleware ekspres yang membaca input formulir dan menyimpannya sebagai objek javascript yang dapat diakses melaluireq.body
// const bodyParser = require('body-parser')
app.use(upload())
app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }) )
app.use(express.json())
app.use(cors())
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port,() => {console.log(`server berjalan di port : ${port }`) })

//Routing
const Router = require('./routes/routes')
app.use(Router)

//models
const ConnectionMongoDB = require('./models/connection')
ConnectionMongoDB()