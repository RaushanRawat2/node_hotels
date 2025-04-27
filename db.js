const mongoose = require('mongoose');

// define the MongoDB connection URL

const mongoURL = 'mongodb://localhost:27017/hotels';
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

// for the acknowledge to user
db.on('connected',()=> {
  console.log('connected to mongoDBserver');
  
})

db.on('error',(err)=> {
    console.log('connected to mongoDBserver', err);
    
  });
  
  db.on('Disconnected',()=> {
    console.log('mongoBD disconnected');
    
  })

  // export the database connection
  module.exports = db;