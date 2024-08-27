
const express=require('express')
const auth=require('../middleware/auth');
const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}=require('../controllers/categoryController');

const router=express.Router();

router.post('/addCategory', auth.authorise,auth.admin,createCategory);

router.get('/getAllCategories',auth.authorise,auth.admin, getAllCategories);

router.put('/updateCategory/:id',auth.authorise,auth.admin, updateCategory);

router.delete('/deleteCategory/:id',auth.authorise,auth.admin, deleteCategory);

module.exports=router;

