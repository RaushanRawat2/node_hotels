const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get('/', function(req,res){
      res.send('welcome to my hotel how can i help you');
})

// import menu router files
const menuItemRoutes = require('./routes/menuItemRoutes');
//use the routers
app.use('/menu', menuItemRoutes)


//import the person router files
const personRoutes = require('./routes/personRoutes');
//use the routers 
app.use('/person',personRoutes)



app.listen(3000,()=>{
   console.log('listening on port 3000');
   
})