

// const Product = require('../model/product');
// const Category = require('../model/category');

// //Add product
// async function createProduct(req,res){

//     const { name, description, category, price,available , quantity,createdBy } = req.body;
//         try {
//             const categoryExists = await Category.findById(category);
//             if (!categoryExists) {
//                 return res.status(400).json({ msg: 'Invalid Category' });
//             }
//             const productExists = await Product.findOne({ name, category });
//             if (productExists) {
//                 return res.status(400).json({ msg: 'Product already exists' });
//             }
    
//             const product = new Product({ name, description, category ,price,available, quantity, createdBy,createdAt:Date.now()});

//         await product.save();
//         res.status(201).json(product);
//     }
//     catch(err){
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// }

// //Get all products
// async function getAllProduct(req,res){
//     try {
//         const products = await Product.find().populate('category', 'name');
//         res.status(201).json(products);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// }


// //Get product by id

// async function getProductById(req, res) {
//     try {
//         const productId = req.params.id;
//         console.log(productId); // Correctly log the ID

//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ msg: 'Product not found' });
//         }
//         res.status(200).json(product);
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ msg: 'Product not found' });
//         }
//         res.status(500).send('Server Error');
//     }
// }



// //Update product by id
// async function updateProduct(req,res) {
//     const { name, description, category, price, quantity } = req.body;
    
//     const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ msg: "Invalid product ID" });
//   }
//     try{
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ msg: 'Product not found' });
//         }
    
//     // if (product.createdBy.toString()!== req.user.id) {
//     //     return res.status(401).json({ msg: 'Not Authorized' });
//     // }
//     product.name = name;
//     product.description = description;
//     product.category = category;
//     product.price = price;
//     product.quantity = quantity;

//         await product.save();
//         res.status(201).json(product);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
    
// }

// //delete product

// async function deleteProduct(req,res){
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) {
//             return res.status(404).json({ msg: 'Product not found' });
//         }
//         // if (product.createdBy.toString()!== req.user.id) {
//         //     return res.status(401).json({ msg: 'Not Authorized' });
//         // }
    
//         res.status(201).json({ msg: 'Product Deleted....' });
//     } catch (err) {
//         // console.error(err.message);
//         // if (err.kind === 'ObjectId') {
//         //     return res.status(404).json({ msg: 'Product not found' });
//         // }
//         res.status(500).send('Server Error');
//     }
// }

// //Get products by category name
// async function getProductByCategoryName(req,res) {
//     try {
//         const products = await Product.find({ category: req.params.name }).populate('category', 'name');
//         if (!products) {
//             return res.status(404).json({ msg: 'Products not found' });
//         }
//         res.json(products);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
    
// }

// module.exports={
//     createProduct,
//     getAllProduct,
//     updateProduct,
//     deleteProduct,
//     getProductById,
//     getProductByCategoryName,
//  };



const Product = require('../model/product');
const Category = require('../model/category');
// Add product
async function createProduct(req, res) {
    const { name, description, category, price, available, quantity, createdBy, imageUrl } = req.body;  

    try {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ msg: 'Invalid Category' });
        }

        const productExists = await Product.findOne({ name, category });
        if (productExists) {
            return res.status(400).json({ msg: 'Product already exists' });
        }

        const product = new Product({
            name,
            description,
            category,
            price,
            available,
            quantity,
            createdBy,
            imageUrl,  // Add imageUrl here
            createdAt: Date.now()
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Get product by id
async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
}

// Get all products
async function getAllProduct(req, res) {
    try {
        const products = await Product.find().populate('category', 'name');
        res.status(201).json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// Update product by id
async function updateProduct(req, res) {
    const { name, description, category, price, quantity, imageUrl } = req.body;  // Add imageUrl here
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid product ID" });
    }

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.name = name;
        product.description = description;
        product.category = category;
        product.price = price;
        product.quantity = quantity;
        product.imageUrl = imageUrl;  // Add imageUrl here

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



//delete product

async function deleteProduct(req,res){
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        // if (product.createdBy.toString()!== req.user.id) {
        //     return res.status(401).json({ msg: 'Not Authorized' });
        // }
    
        res.status(201).json({ msg: 'Product Deleted....' });
    } catch (err) {
        // console.error(err.message);
        // if (err.kind === 'ObjectId') {
        //     return res.status(404).json({ msg: 'Product not found' });
        // }
        res.status(500).send('Server Error');
    }
}



//Get products by category name
async function getProductByCategoryName(req,res) {
    try {
        const products = await Product.find({ category: req.params.name }).populate('category', 'name');
        if (!products) {
            return res.status(404).json({ msg: 'Products not found' });
        }
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
}

module.exports={
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByCategoryName,
 };