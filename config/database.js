const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }).then(()=>{
        console.log('DB Connected');
    }).catch((err)=>{
        console.log('DB Connection Error: ', err);
        process.exit(1);
    });
}