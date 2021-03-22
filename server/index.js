import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import avatarRoutes from './routes/avatars.js';
import claimRoutes from './routes/claims.js';
import orderRoutes from './routes/orders.js';

var app = express();


// json setup
app.use(bodyParser.json({limit: "60mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "60mb", extended: true}));
app.use(cors());

// routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/avatars', avatarRoutes);
app.use('/claims', claimRoutes);
app.use('/orders', orderRoutes);

// mongoDB setup
// https://www.mongodb.com/cloud/atlas

const CONNECTION_URL = 'mongodb+srv://admin:admin123@cluster0.pdxx0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`server running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify', false);

