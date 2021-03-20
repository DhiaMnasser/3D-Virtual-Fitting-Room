import express from 'express'
import { getProducts, createProduct } from '../controllers/products.js';
import auth from "../middleware/auth.js";


var router = express.Router();

/* GET products listing. */
router.get("/", getProducts);
router.post("/",auth , createProduct);

// router.get("/cpus", function(req, res, next) {
//   var cpus = os.cpus();
//   res.send(cpus);
//   for (var ndex = 0, len = cpus.length; ndex < len; ndex++) {
//     console.log("CPU:", cpus[ndex].model);
//   }
// });

// router.get("/cpus/:id", function(req, res) {
//   res.json(os.cpus()[req.params.id]);
// });


export default router;
