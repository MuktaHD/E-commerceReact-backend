

// // Get all products
// async function getAllProduct(req, res) {
//     try {
//         const products = await Product.find().populate('category', 'name');
//         res.status(201).json(products);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// }

  
  
  

// // Update product by id
// async function updateProduct(req, res) {
//     const { name, description, category, price, quantity, imageUrl } = req.body;  
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ msg: "Invalid product ID" });
//     }

//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ msg: 'Product not found' });
//         }

//         product.name = name;
//         product.description = description;
//         product.category = category;
//         product.price = price;
//         product.quantity = quantity;
//         product.imageUrl = imageUrl;  // Add imageUrl here

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


// async function getProductByCategoryName(req, res) {
//     try {
//         // Find the category by name
//         const category = await Category.findOne({ name: req.params.name });
//         if (!category) {
//             return res.status(404).json({ msg: 'Category not found' });
//         }

//         // Find products with the found category's ObjectId
//         const products = await Product.find({ category: category._id }).populate('category', 'name');
//         if (!products.length) {
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




// //  http://127.0.0.1:5001/api/getProductByCategoryName/Television







const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const Product = require('../model/product');
const Category = require('../model/category');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Update product by id
async function updateProduct(req, res) {
  const { name, description, category, price, quantity, imageUrl } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;
    product.quantity = quantity;

    // Handle image upload
    if (req.file) {
      // Remove old image if necessary
      if (product.imageUrl) {
        fs.unlinkSync(path.join('uploads', product.imageUrl));
      }
      product.imageUrl = `/Uploads/${req.file.filename}`;;
    } else if (imageUrl) {
      product.imageUrl = imageUrl;
    }

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}



// Add product
async function createProduct(req, res) {
  const { name, description, category, price, available, quantity, createdBy, imageUrl } = req.body;
 

  // Check if category is present
  if (!category) {
    return res.status(400).json({ msg: 'Missing category' });
  }
  // const { category } = req.body;
  console.log('Received category ID:', category);
  if (!createdBy) {
    return res.status(400).json({ msg: 'Missing createdBy field' });
  }

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
      category: categoryExists._id,
      price,
      available,
      quantity,
      createdBy,
      imageUrl,
      createdAt: Date.now()
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  console.log('Request body:', req.body);
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
    res.status(200).json(products);  // Use 200 for successful retrieval
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Delete product
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    // Optionally remove image if necessary
    if (product.imageUrl) {
      fs.unlinkSync(path.join('uploads', product.imageUrl));
    }
    res.status(200).json({ msg: 'Product Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Get products by category name
async function getProductByCategoryName(req, res) {
  try {
    const category = await Category.findOne({ name: req.params.name });
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    const products = await Product.find({ category: category._id }).populate('category', 'name');
    if (!products.length) {
      return res.status(404).json({ msg: 'Products not found' });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByCategoryName,
};
