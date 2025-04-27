const express = require('express');
const router = express.Router();

const MenuItem = require('./../Models/MenuItem');



// get method for menu item

router.get('/',async(req,res)=>{
    try{
      const data = await MenuItem.find();
      console.log('data fetch success');
      res.status(200).json(data);
      
  
    }catch(error){
      console.log(err);
      res.status(500).json({error:'intrnal Server error'})    
    }
  })
  
  
  //post method for the menu items 
  router.post('/',async(req,res)=>{
   try{
    const data = req.body 
    const newMenuItem = MenuItem(data);
    const savednewMenuItem = await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(savednewMenuItem);
  
   }
   catch(err){
    console.log(err);
    res.status(500).json({error:'intrnal Server error'})
   }
    
  })


  //paramaterised get method
router.get('/:taste',async(req,res)=>{
  try{
        const tasteType = req.params.taste;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){ 
          
          const response = await MenuItem.find({taste:tasteType});
          console.log('responce fetched');
          res.status(200).json({response});
          
        }
        else{
          res.status(404).json({error:'invalid work Type'})
        }
  }
  catch(err){
    console.log(err);
    res.status(500).json({err:'internal Server error'});
  }
})




// PUT - Update a menu item by ID
router.put('/:id', async (req, res) => {
  try {
      const updatedItem = await MenuItem.findByIdAndUpdate( req.params.id, req.body,
        { new: true, runValidators:true });

      if (!updatedItem) {
          return res.status(404).json({ message: 'Menu item not found' });
      }
      console.log('menu updated');
      res.json(updatedItem);

  } catch (error) {
      res.status(200).status(400).json({ message: error.message });
  }
});

// DELETE - Delete a menu item by ID
router.delete('/:id', async (req, res) => {
  try {
      const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
          return res.status(404).json({ message: 'Menu item not found' });
      }
      res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});





  module.exports = router;