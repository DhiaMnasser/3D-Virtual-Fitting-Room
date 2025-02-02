const express =require("express");
const mongoose =require("mongoose");
const bodyParser =require("body-parser");
const cors =require("cors");
const productRoutes =require('./routes/products.js');
const categoryRoutes =require('./routes/categories.js');
const avatarRoutes =require('./routes/avatars.js');
const claimRoutes =require('./routes/claims.js');
const orderRoutes =require('./routes/orders.js');
const reviewRoutes =require('./routes/reviews.js');
const userRoutes =require("./routes/user.js");
const mailRoutes =require('./routes/mails.js');
const fileRoutes = require("./routes/files.js");
const chatbotRoutes = require("./routes/chatbot/chatbot.js");
const messagesRoutes =require('./routes/message.js');
const scrapingRoutes = require("./routes/scraping.js");
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const stripe = require("stripe")("sk_test_51IcLvHCPAWlRLabTKXrUtBtjKUfrCpayBeReUcudDNg23OMhZhMQg70MqbXOvATDviRQPpo7HKhigVqSNqk45BNM00WrYq0y9m")
const {v4:uuid} = require("uuid");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


var app = express();

// json setup
app.use(bodyParser.json({limit: "60mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "60mb", extended: true}));
app.use(cors());


// routes
app.use('/reviews', reviewRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/avatars', avatarRoutes);
app.use('/claims', claimRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/mails',mailRoutes)
app.use('/chatbot',chatbotRoutes);
app.use('/messages',messagesRoutes);
app.use('/scraping',scrapingRoutes)
app.post("/checkout",async(req,res)=>{
    let error;
    let status;
    try{
        const{product,token}=req.body;
    
        const idempotencey_key = uuid()
        
        const charge =await stripe.charges.create({
            amount:product.price*100,
            currency:"usd",
            source: token.id,
            receipt_email:token.email,
            description:`purchased the  ${product.name}`}
        ).catch((err)=>{console.log(err)});
        console.log("charge:",{charge});
        status="success";
        }catch(error){
           console.log("error:",error); 
           status="failure" ;
        }
        res.json({error,status})
        
    
})
app.use('/users', userRoutes);
app.use('/mails',mailRoutes)

// mongoDB setup
// https://www.mongodb.com/cloud/atlas
const CONNECTION_URL = 'mongodb+srv://admin:admin123@cluster0.pdxx0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;
const conn = mongoose.createConnection(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`server running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify', false);

// create storage engine
const storage = new GridFsStorage({
  url: CONNECTION_URL,
  file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
              if (err) {
                  return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                  filename: filename,
                  bucketName: 'uploads'
              };
              resolve(fileInfo);
          });
      });
  }
});

const upload = multer({ storage });

app.use('/files', fileRoutes(upload));

// catch 404 and forward to error handler

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });