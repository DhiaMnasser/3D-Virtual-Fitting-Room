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
var fs = require('fs');
const axios = require('axios');
pulls=['https://www.ha.com.tn/femme/sweater/sweat-shirt.html',
'https://www.ha.com.tn/femme/sweater/sweat-zippe.html',
'https://www.ha.com.tn/femme/sweater/pull-basique-ml.html',
'https://www.ha.com.tn/femme/sweater/pull-fantaisie-ml.html',
'https://www.ha.com.tn/homme/sweater/sweat-shirt.html',
'https://www.ha.com.tn/homme/sweater/sweat-zippe.html',
'https://www.ha.com.tn/homme/sweater/pull-basique-ml.html',
'https://www.ha.com.tn/homme/sweater/pull-fantaisie-ml.html']
pantalons=[
    'https://www.ha.com.tn/homme/pantalon/chinos-pantalons.html',
'https://www.ha.com.tn/homme/pantalon/pantalon-formel.html',
'https://www.ha.com.tn/homme/pantalon/pantalon-jog.html',
'https://www.ha.com.tn/homme/pantalon/jean-jec.html',
'https://www.ha.com.tn/femme/pantalon/chinos-pantalons.html',
'https://www.ha.com.tn/femme/pantalon/pantalon-lin.html',
'https://www.ha.com.tn/femme/pantalon/pantalon-formel.html',
'https://www.ha.com.tn/femme/pantalon/pantalon-jog.html',
'https://www.ha.com.tn/femme/pantalon/jean.html',
'https://www.ha.com.tn/femme/pantalon/pantacheville.html'
]
gilets=['https://www.ha.com.tn/femme/gilet/gilet-court.html',
'https://www.ha.com.tn/femme/gilet/gilet-long.html',
'https://www.ha.com.tn/femme/gilet/bolero.html',
'https://www.ha.com.tn/homme/gilet.html']
blousons=['https://www.ha.com.tn/homme/outwear/veste.html',
'https://www.ha.com.tn/homme/outwear/manteau.html',
'https://www.ha.com.tn/homme/outwear/blouson.html',
'https://www.ha.com.tn/homme/outwear/doudoune.html',
'https://www.ha.com.tn/homme/outwear/coupe-vent.html',
'https://www.ha.com.tn/homme/outwear/jacket.html',
'https://www.ha.com.tn/homme/outwear/teddy.html']
manteaus=['https://www.ha.com.tn/femme/manteau-femme-23546.html',
'https://www.ha.com.tn/femme/outwear/veste.html',
'https://www.ha.com.tn/femme/outwear/parka-trench.html',
'https://www.ha.com.tn/femme/outwear/blouson.html',
'https://www.ha.com.tn/femme/outwear/doudoune.html',
'https://www.ha.com.tn/femme/outwear/teddy.html']
chemises=['https://www.ha.com.tn/femme/chemise/chemise-ml.html',
         'https://www.ha.com.tn/femme/chemise/blouse-mc.html',
         'https://www.ha.com.tn/femme/chemise/blouse-ml.html',
         'https://www.ha.com.tn/femme/chemise/liquette-ml.html',
        'https://www.ha.com.tn/homme/chemise.html'
    
    ]
shorts=[
'https://www.ha.com.tn/femme/short-bermuda.html']
costumes=['https://www.ha.com.tn/homme/costume.html']
chaussures=['https://www.ha.com.tn/homme/chaussures/baskets.html',
'https://www.ha.com.tn/homme/chaussures/boots.html',
'https://www.ha.com.tn/homme/chaussures/derby.html',
'https://www.ha.com.tn/homme/chaussures/mules.html',
'https://www.ha.com.tn/homme/chaussures/tennis.html',
'https://www.ha.com.tn/femme/chaussures/boots.html',
'https://www.ha.com.tn/femme/chaussures/derby.html',
'https://www.ha.com.tn/femme/chaussures/mules.html'
]
accessoires=['https://www.ha.com.tn/femme/accessoires/echarpe.html',
         'https://www.ha.com.tn/femme/accessoires/chaussettes.html',
         'https://www.ha.com.tn/homme/accessoires.html']


pull={link:['https://www.exist.com.tn/215-pulls-polos?page='],page:11}
pantalon={link:['https://www.exist.com.tn/208-pantalons?page='],page:4}
gilet={link:['https://www.exist.com.tn/219-gilets?page='],page:3}
blouson={link:['https://www.exist.com.tn/205-blousons?page='],page:2}
manteau={link:['https://www.exist.com.tn/245-manteau?page='],page:1}
chemise={link:['https://www.exist.com.tn/206-chemises?page='],page:4}
short={link:['https://www.exist.com.tn/236-short?page='],page:1}
costume={link:['https://www.exist.com.tn/221-costumes?page='],page:1}
chaussure={link:['https://www.exist.com.tn/209-chaussures?page='],page:6}
accessoire={link:['https://www.exist.com.tn/212-accessoires?page='],page:9}

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
var max = 1;
var i = 0;

var timer = setInterval( function(){
   if(i === max){
      // stop the timer from looping.
      clearInterval(timer);
   }else{
       i++
    
 axios.all([
   axios.post('https://three-vfr-p.herokuapp.com/exist', {link:["https://www.exist.com.tn/215-pulls-polos?page="],page:10}),
   axios.post('https://three-vfr-p.herokuapp.com/ha',{link:[...pulls,...pantalons,...chemises]}),
   axios.post('https://three-vfr-p.herokuapp.com/exist',{link:['https://www.exist.com.tn/208-pantalons?page='],page:4}),
   axios.post('https://three-vfr-p.herokuapp.com/exist',{link:['https://www.exist.com.tn/206-chemises?page='],page:4}),
    axios.post('https://three-vfr-p.herokuapp.com/exist',{link:['https://www.exist.com.tn/219-gilets?page='],page:3}),
]).then(res => {
  //this will be executed only when all requests are complete
  
  var data1=res[0]
  var data2=res[1]
  var data3=res[2]
  var data4=res[3]
  var data5=res[4]
  console.log(data1)
  console.log(data2)
  var exist= [...data1.data,...data3.data,...data4.data]
  var ha = [...data2.data]
  var json1 = JSON.stringify(exist);
var json2 = JSON.stringify(ha);
fs.writeFile('exist.json', json1, 'utf8',(err)=>{console.log(err)});
fs.writeFile('ha.json', json2, 'utf8',(err)=>{console.log(err)});
}).catch(err=>console.log(err));
  

   }   
},1000);
app.get("/exist",async(req,res)=>{
fs.readFile('exist.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
        res.json({err})
    } else {
    obj = JSON.parse(data); //now it an object
    res.status(200).json(obj)
    }
})})
app.get("/ha",async(req,res)=>{
fs.readFile('ha.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
        res.json({err})
    } else {
    obj = JSON.parse(data); //now it an object
    res.status(200).json(obj)
    }
})})
// mongoDB setup
// https://www.mongodb.com/cloud/atlas
const CONNECTION_URL = 'mongodb+srv://admin:admin123@cluster0.pdxx0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// console.log('process.env.PORT');
// process.env.PORT=9000
// console.log(process.env);
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