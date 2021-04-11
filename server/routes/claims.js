const express =require( 'express')
<<<<<<< HEAD
const { getClaims, getClaimById, createClaim, updateClaim, deleteClaim } =require('../controllers/claims.js');
=======
const { getClaims, getClaimById, createClaim, updateClaim, deleteClaim, traiterClaim } =require('../controllers/claims.js');
>>>>>>> hajer3

var router = express.Router();

/* GET products listing. */
router.get("/", getClaims);
router.get("/:id", getClaimById);
router.post("/", createClaim);
router.patch("/:id", updateClaim);
router.delete("/:id", deleteClaim);
<<<<<<< HEAD

=======
router.patch("/:id/traiterClaim", traiterClaim);
>>>>>>> hajer3


module.exports= router ;
