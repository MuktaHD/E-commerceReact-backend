const mongoose =require('mongoose');

const CategorySchema= new mongoose.Schema({
    name: {type: String, required: true},
    createdBy : { type:mongoose.Schema.Types.ObjectId,ref : 'User', required :true},
    createdAt:{ type:Date , default:Date.now}
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;