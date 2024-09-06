
const express=require('express')
const auth=require('../middleware/auth');
const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}=require('../controllers/categoryController');

const router=express.Router();

router.post('/addCategory', auth.authorise,auth.Admin,createCategory);

// router.get('/getAllCategories',auth.authorise,auth.Admin, getAllCategories);
router.get('/getAllCategories', auth.authorise, auth.Admin, getAllCategories);

router.put('/updateCategory/:id',auth.authorise,auth.Admin, updateCategory);

router.delete('/deleteCategory/:id',auth.authorise,auth.Admin, deleteCategory);

module.exports=router;

