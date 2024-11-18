

// // Define routes
// router.post('/addProduct', createProduct);
// router.get('/getAllProduct', getAllProduct);

// // The route that caused the error:
// router.get('/getAllproductWithAuth', auth.authorise, async (req, res) => {
//     try {
//         const products = await Product.find().populate('category', 'name');
//         res.json(products);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // router.get('/getAllproductWithAuth', auth.authorise, async (req, res) => {
// //     try {
// //         // Fetch products and populate category name
// //         const products = await Product.find().populate('category', 'name');

// //         // Map products to include image URL
// //         const modifiedProducts = products.map(product => ({
// //             id: product._id,
// //             name: product.name,
// //             productImage: product.imageUrl ? `http://localhost:5002/uploads/${product.image}` : null,
// //             category: product.category.name,  // Assuming you want the category name
// //             price: product.price,
// //             // Add other fields as needed
// //         }));

// //         // Send the modified response
// //         res.status(200).json(modifiedProducts);
// //     } catch (err) {
// //         console.error(err.message);
// //         res.status(500).send('Server Error');
// //     }
// // });

// router.put('/updateProduct/:id', Upload.single('file'), updateProduct);
// // router.put('/updateProduct/:id', updateProduct);
// router.delete('/deleteProduct/:id', deleteProduct);
// // app.get('/api/getProductById/:id', getProductById);
// router.get('/getProductById/:id', getProductById);
// router.get('/getProductByCategoryName/:name', getProductByCategoryName);


// module.exports = router;

const express = require('express');
const Product = require('../model/product');
const auth = require('../middleware/auth');
const upload = require('../config/uploadConfig'); // Import the upload instance
const {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategoryName
} = require('../controllers/productController');

const router = express.Router();

// Define routes
router.post('/addProduct',upload.none(), createProduct);
router.get('/getAllProduct', getAllProduct);

router.get('/getAllproductWithAuth', auth.authorise, async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/updateProduct/:id', upload.single('file'), updateProduct); // Use the upload instance
router.delete('/deleteProduct/:id', deleteProduct);
router.get('/getProductById/:id', getProductById);
router.get('/getProductByCategoryName/:name', getProductByCategoryName);

module.exports = router;
