
const Product =require('../models/Product.js');
const mongoose =require('mongoose');
const asyncHandler =require('express-async-handler');
const child_process =require('child_process');
const sharp = require('sharp');


var recombee = require('recombee-api-client');
var rqs = recombee.requests;
var client = new recombee.ApiClient('it-paladins-dev', 'Rd3LLBOVVE7xG0YimO8eX8MegH9PAtQSa2pAU8wWytCawy7vC7TzJ4Wysg8iOsoF');



 const getProducts = async(req, res) => {
    try {
        const productModels = await Product.find();
        console.log('getting products');
        res.status(200).json(productModels);
    } catch (error) {
        res.status(404).send({message: error.message}); 
    }
}

 const getProductById = async (req, res) => { 
    const { id } = req.params;
    console.log(' getProductById');

    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

const createProduct = async(req, res) => {
    console.log(`create prod in server ${req}`);
    
    const { productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color } = req.body;
    const newProduct = await new Product({productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color});
    addItemToRecombee(newProduct);
    
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).send({message: error.message});
        
    }
}
              

 const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { _id, productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);


    const updatedProduct ={ "id":_id, productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color };

    await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    addItemToRecombee(updatedProduct);

    res.status(200).json(updatedProduct);
}

 const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await Product.findByIdAndRemove(id);
    deleteItemFromRecombee(id);
    res.status(200).json({ message: "Product deleted successfully." });
}

// best ptoduct by rating
const getBestProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
      // const products = await Product.find();
      console.log('getting top products');

      res.status(200).json(products);
  } catch (error) {
      res.status(404).send({message: error.message}); 
  }
  };

const addItemToRecombee = async (product) =>{
    let addPropertyRequests = [];
    let productToSend = {}
    // product = JSON.parse(product);
    for (const [key, value] of Object.entries(product)) {
        if(["image","arModel"].includes(key)){
            const uri = value[0].split(';base64,').pop()
            let imgBuffer = Buffer.from(uri, 'base64');
    
            const data = await sharp(imgBuffer)
            .jpeg({
                quality: 100,
                chromaSubsampling: '4:4:4'
            })
            .toBuffer()
            .then(data => {
                console.log('success')
                // console.log(data.toString('base64'));
                // productToSend[key] = ["data:image/jpeg;base64,"+data.toString('base64')];  
            })
            .catch(err => console.log(`format image  ${err}`));

            productToSend[key] = value;  
    
            addPropertyRequests.push(new rqs.AddItemProperty(key, 'set'));
        }
        else{
            productToSend[key] = value;
            addPropertyRequests.push(new rqs.AddItemProperty(key, typeof(key)));
        }
      };
    
    //   client.send(new rqs.Batch(addPropertyRequests))
    //   .then((response)=>{
    //     console.log('AddItemProperty');
    //     console.log(response);
    //   })    
    //   .catch((error)=>{
    //         console.log('error AddItemProperty');
    //     console.log(error);
            
    //     });

    client.send(new rqs.SetItemValues(product._id, productToSend, {cascadeCreate: true}))
    .then((response)=>{
        console.log('SetItemValues response');
        console.log(response);
        // return client.send(new rqs.AddDetailView(userId, product._id /*, {cascadeCreate: true}*/ ))
    })
        .catch((error)=>{
        console.log('error SetItemValues');
        // console.log(error);
    });
}


const deleteItemFromRecombee = (productId)=>{
  client.send(new rqs.DeleteItem(productId))  .then((response)=>{
    console.log('DeleteItem');
    console.log(response);
  })    
  .catch((error)=>{
        console.log('error DeleteItem');
    console.log(error);
        
    });
}

const itemAddedToBasket = async (req,res)=>{
    const {userId, product} = req.body

    client.send(new rqs.AddCartAddition(userId, product._id /*, {cascadeCreate: true}*/ ))
    .then((response)=>{
        console.log('AddCartAddition response');
        console.log(response);
        // return client.send(new rqs.RecommendItemsToUser(userId, 5 ,{returnProperties:true}))
    })
    .catch((error)=>{
        console.log('AddCartAddition error');
        console.log(error);
        // res.status(401).send([]);

    });
}

  let output;


  const getRecombeeRecommendation = async (req, res) => {
    // const {id} = req.params;  
    console.log("getRecombeeRecommendation() is called");

    const {userId, product} = req.body


    client.send(new rqs.AddUser(userId, { cascadeCreate: true}))
    .then((response)=>{
        console.log('AddUser');
            console.log(response);
            // res.status(200).json(response);
        })
    .catch((error)=>{
        console.log('error AddUser');

    });

//   res.status(400).send(productToSend['image']);


// deleteItemFromRecombee("607ed11178307f2768830349");
     addItemToRecombee(product);

//   ***********    Detele Item property *************

//   client.send(new rqs.DeleteItemProperty('image'))  .then((response)=>{
//     console.log('DeleteItemProperty');
//     console.log(response);
//   })    
//   .catch((error)=>{
//         console.log('error DeleteItemProperty');
//     console.log(error);
        
//     });

//   ***********    AddItemProperty  *************

//   client.send(new rqs.Batch(addPropertyRequests))
//   .then((response)=>{
//     console.log('AddItemProperty');
//     console.log(response);
//   })    
//   .catch((error)=>{
//         console.log('error AddItemProperty');
//     console.log(error);
        
//     });

//   ***********    SetItemValues    *************

// console.log("productToSend");
// console.log(productToSend);

    // client.send(new rqs.SetItemValues(product._id, productToSend, {cascadeCreate: true}))
    // .then((response)=>{
    //     console.log('SetItemValues response');
    //     console.log(response);
    //     // return client.send(new rqs.AddDetailView(userId, product._id /*, {cascadeCreate: true}*/ ))
    // })
    //     .catch((error)=>{
    //     console.log('error SetItemValues');
    //     console.log(error);
    // });

// res.status(200).send(productToSend);


//   ***********    RecommendItemsToUser    *************

    client.send(new rqs.AddDetailView(userId, product._id /*, {cascadeCreate: true}*/ ))
    .then((response)=>{
        console.log('AddDetailView response');
        console.log(response);
        // return client.send(new rqs.RecommendItemsToUser(userId, 5 ,{returnProperties:true}))
    })
    .catch((error)=>{
        console.log('AddDetailView error');
        console.log(error);
        // res.status(401).send([]);

    });
    client.send(new rqs.RecommendItemsToUser(userId, 5 ,{returnProperties:true}))
    .then((response)=>{
        console.log('RecommendItemsToUser ok');
        let results = [];

        response.recomms.forEach((recom) => {
            // if(recom.values){
            if(recom.values.image){
                    console.log(recom.values.productName);

            results.push(recom.values);
        }
            
            
        });
        // res.status(200).send(response.recomms);
        res.status(200).send(results);
    })
    .catch((error)=>{
        console.log('general error');
        console.log(error);
        res.status(401).send([]);

    });


    };

module.exports= {deleteProduct,updateProduct,createProduct,getProductById,getProducts, getBestProducts, getRecombeeRecommendation, itemAddedToBasket} 