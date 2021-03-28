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
const multer = require('multer')

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
app.use('/users', userRoutes);


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

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
let upload = multer({ dest: 'uploads/' })
app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

