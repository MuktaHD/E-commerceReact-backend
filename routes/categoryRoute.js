
const express=require('express')
const auth=require('../middleware/auth');
const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}=require('../controllers/categoryController');

const router=express.Router();

router.post('/addCategory', createCategory);

router.get('/getAllCategories', getAllCategories);

router.put('/updateCategory/:id', updateCategory);

router.delete('/deleteCategory/:id', deleteCategory);

module.exports=router;

