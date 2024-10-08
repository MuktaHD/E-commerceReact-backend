const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

  
    category:{
        type:mongoose.Schema.Types.ObjectId, ref : 'Category',
       
    },
 
    price:{
        type:Number,
        required:true
    },
   available : {
    type:Boolean, 
    default: true    
   },
   quantity: {
    type:Number,
    required:true,
   },
   createdBy:{
    type: mongoose.Schema.Types.ObjectId, ref : 'User',
    required:true,
   },
   createdAt: {
    type: Date,
    default: Date.now
   },
   imageUrl: { type: String, required: true },
   
});

const Product=mongoose.model('Product',productSchema);

module.exports=Product;

