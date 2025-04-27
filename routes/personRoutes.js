const express = require('express');
const router = express.Router();
const Person = require('./../Models/person');


// POST route to add a person
router.post('/',async(req,res)=>{
     try{
      const data = req.body //Assummung the request body conatain the person data
      //create a new person document using the mongoose model
      const newPerson = Person(data);
      //save the new person to the database
      const savedPerson = await newPerson.save();
      console.log('data saved');
      res.status(200).json(savedPerson);

     }catch(err){
       console.log(err);
       res.status(500).json({error:'intrnal Server error'})
       
     }
});



//get method to get the person data
router.get('/',async(req,res)=>{
    try{
      const data = await Person.find();
      console.log('data fetch success');
      res.status(200).json(data);
      

    }catch(error){
      console.log(err);
      res.status(500).json({error:'intrnal Server error'})    
    }
});



//paramaterised get method
router.get('/:workType',async(req,res)=>{
    try{
          const workType = req.params.workType;
          if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){ 
            
            const response = await Person.find({work:workType});
            console.log('responce fetched');
            res.status(200).json({response});
            
          }
          else{
            res.status(404).json({error:'invalid work Type'})
          }
    }
    catch(err){
      console.log(err);
      res.status(500).json({err:'intrnal Server error'});
    }
});

//put(update method to update the DB)
router.put('/:id',async(req,res)=>{
  try{
    const personId = req.params.id; //extract the id from the URL parameter
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
      new:true, //return the updated document
      runValidators:true, //run mongoose validation
    });
    console.log('data updated');
    res.status(200).json(response);
    
    if(!response){
       return res.status(404).json({error:'Person not found'})
    }


  }catch(err){
    console.log(err);
    res.status(500).json({err:'intrnal Server error'});
  }
});
//delete person from databse
router.delete('/:id',(req,res)=>{
  try{
    const personId = req.params.id; //extract the id from the URL parameter
    //assuming you have a person model
    const response = Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error:'Person not found'})
   }
   console.log('data delete');
   res.status(200).json({message:'person deleted successsfully'})
   

  }catch(err){
    console.log(err);
    res.status(500).json({err:'intrnal Server error'});
  }
})



module.exports = router;
