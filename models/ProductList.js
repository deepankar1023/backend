const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    
        id:{
            type:Number,
            required:true,
            unique:true
        } ,
        name: {
            type: String,
            required:true,
            unique:true
        },
        info: {
            type:String,
        
        },
        image:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        stock:{
            type:Number,
            default:20,
            required:true
        },
        available:{
            type:Boolean,
            default: true
        },
        category: {
            type:String,
            required:true, 
        },
      plastic:{
        type:Boolean,
        default:false
      }
});

// Hash password before saving

const ProductList = mongoose.model('ProductList', productSchema);
module.exports = ProductList;
