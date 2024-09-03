const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const bodyParser=require('body-parser');
const productRoutes=require('./routes/productRoute');
const userRoutes=require('./routes/userRoute');
const categoryRoutes=require('./routes/categoryRoute');
const File=require('./model/fileModel');
const multer=require('multer');

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



// app.post('/Uploads',upload.single('File'),async(req,res)=>{
//     const {filename ,path, originalname, mimetype, size}=req.file;
    
//     const newFile=new File({ filename ,path, originalname, mimetype, size});
    
//     try{
//         await newFile.save();
//         res.status(201).send(`File Upload:${req.file.filename}`);
    
//     }catch (err) {
//         res.status(500).send(err);
//     }
    
//     });
    
    
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