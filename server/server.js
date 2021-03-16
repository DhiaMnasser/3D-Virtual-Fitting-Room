require('dotenv').config()
const userRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')
const productsRoutes= require('./routes/products')
const claimsRoutes= require('./routes/claims')
const reviewsRoutes= require('./routes/reviews')
const avatarsRoutes= require('./routes/avatars')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json())
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABase_URL, { useNewUrlParser: true ,useUnifiedTopology: true});
const db= mongoose.connection
db.on('error',(error)=>{console.log(error)})
db.once('open',()=>{console.log("connected to db")})
app.use('/users',userRoutes)
app.use('/orders',ordersRoutes)
app.use('/products',productsRoutes)
app.use('/claims',claimsRoutes)
app.use('/reviews',reviewsRoutes)
app.use('/avatars',avatarsRoutes)
app.listen(3001,()=>{console.log("server started")})