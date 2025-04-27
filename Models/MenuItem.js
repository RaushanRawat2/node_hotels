const mongoose = require('mongoose');

//define the person schema
const menuIteamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true,
    },
    is_drink:{
        type:Boolean,
        default:false,
    },
    ingredient:{
        type:[String],
        default:[],
    },
    num_sales:{
        type:Number,
        default:0,
    }
})
const MenuItem = mongoose.model('MenuItem',menuIteamSchema);
module.exports = MenuItem;