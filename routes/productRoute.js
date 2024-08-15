const express= require('express');
const Product = require('../model/product');
const auth=require('../middleware/auth');
const {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    
    getProductByCategoryName
}= require('../controllers/productController')

const router= express.Router();

router.post('/addProduct', createProduct);


router.get('/getAllProduct', getAllProduct);
router.get('/getAllproductWithAuth',auth,async(req,res)=>{

    try {
        const products = await Product.find().populate('category', 'name');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

router.put('/updateProduct/:id', updateProduct);

router.delete('/deleteProduct/:id', deleteProduct);
router.get('/getProductById/:id', getProductById);  

router.get('/getProductByCategoryName/:name', getProductByCategoryName);

module.exports=router;