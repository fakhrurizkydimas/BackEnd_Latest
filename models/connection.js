const Mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        //MongoDB Connection 
        const Conn = await Mongoose.connect( 
            'mongodb+srv://admin:tanyakiki@learn.koklk.mongodb.net/ProjectAkhir?retryWrites=true&w=majority',
            //process.env.MONGO_TWO,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                //useFindAndModify:false,
                //useCreateIndex: false,
            }
        )

    console.log(`MongoDB connected: ${Conn.connection.host}`)
    }catch (error){
        console.log(error)
        process.exit(1)
    }
}

//routing
module.exports = ConnectDB

