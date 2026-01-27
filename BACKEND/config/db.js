const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        const DB = await mongoose.connect(process.env.MONGO_URI);
        console.log('the database is connected...');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;