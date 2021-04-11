const express =require( 'express')
const { getClaims, getClaimById, createClaim, updateClaim, deleteClaim, traiterClaim } =require('../controllers/claims.js');

var router = express.Router();

/* GET products listing. */
router.get("/", getClaims);
router.get("/:id", getClaimById);
router.post("/", createClaim);
router.patch("/:id", updateClaim);
router.delete("/:id", deleteClaim);
router.patch("/:id/traiterClaim", traiterClaim);


module.exports= router ;
