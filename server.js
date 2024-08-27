const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const bodyParser=require('body-parser');
const productRoutes=require('./routes/productRoute');
const userRoutes=require('./routes/userRoute');
const categoryRoutes=require('./routes/categoryRoute');

require('dotenv').config();

const app=express();

app.use(cors());
app.use(bodyParser.json());
 
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