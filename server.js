const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const bodyParser=require('body-parser');
const productRoutes=require('./routes/productRoute');
const userRoutes=require('./routes/userRoute');
const categoryRoutes=require('./routes/categoryRoute');
const File=require('./model/fileModel');
const multer=require('multer');
const path = require('path');
const Product = require('./model/product');

require('dotenv').config();
const app=express();

app.use(cors());
app.use(bodyParser.json());



//multer throught add img

const storage=multer.diskStorage({
    destination:'./Uploads',
    filename :(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
})
const upload=multer({storage});

app.post('/Uploads', upload.single('File'), async (req, res) => {
    const { filename, path, originalname, mimetype, size } = req.file;

    const newFile = new File({ filename, path, originalname, mimetype, size });

    try {
        await newFile.save();
        res.status(201).send(`File Upload: ${req.file.filename}`);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
app.put('/api/updateProduct/:id', upload.single('file'), async (req, res) => {
    const { id } = req.params;
    const { name, description, category, price, quantity } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid product ID" });
    }
  
    try {
      let product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
  
      // Update fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.category = category || product.category;
      product.price = price || product.price;
      product.quantity = quantity || product.quantity;

      // Update imageUrl if a new file is uploaded
      if (req.file) {
        product.imageUrl = `/Uploads/${req.file.filename}`;
      }
  
      await product.save();
      res.status(200).json(product);
    } catch (error) {
      console.error('Error updating product:', error.message);
      res.status(500).send('Server Error');
    }
  });


    
    app.get('/download/:filename',async(req,res)=>{
        console.log(req.params)
        try{
            const file=await File.findOne({filename:req.params.filename});
            if(!file){
                return res.status(404).send('File Not Found');
            }
           res.download(file.path,file.originalname);
        } catch(err){
            res.status(500).send(err);
        }
    
    });

 
mongoose.connect('mongodb://localhost:27017/E-CommerceReact')

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Connected to  Mongodb');
});
app.use('/api',productRoutes);

//userRoute added

app.use('/api/users',userRoutes);
//categoryRoute
app.use('/api/category',categoryRoutes);

app.listen(5001, () => {
        console.log('Server is running on port http://127.0.0.1:5001');
    });



