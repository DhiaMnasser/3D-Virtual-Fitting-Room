const express = require('express');

const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products.js');
const Product =require('../models/Product.js');
var router = express.Router();

/* GET products listing. */
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.get("/page/:id?", function (req, res) {
    //Pagination For number Of receords on page
    if (req.params.id) {
        //Case For Counting Number OF Users
        Product.find({})
        .count()
        .then(data => {
            res.status(200).send({
                "cnt" : Math.ceil(data/9)
            })
        })
        .catch(err => {
           res.status(400).send({
               "err" : err
           })
        })
    }
})
router.post("/page/",function(req,res){
    const pagination = req.body.pagination ? parseInt(req.body.pagination) : 9;
    //PageNumber From which Page to Start 
    const pageNumber = req.body.page ? parseInt(req.body.page) : 1;
    const recherche = req.body.recherche?req.body.recherche:""
    const category = req.body.category?req.body.category:""
var table = req.body.filter.split(",")

   Product.find( {size : { $in: table},productName:{ $regex: recherche },categoryId:{$regex: category}})
        //skip takes argument to skip number of entries 
        .sort({"id" : 1})
        .skip((pageNumber - 1) * pagination)
        //limit is number of Records we want to display
        .limit(pagination)
        .then(data => {
            res.status(200).send({
                "products": data
                
            })
        })
        .catch(err => {
            res.status(400).send({
                "err": err
            })
        })
})


module.exports= router;
